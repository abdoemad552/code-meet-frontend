import {Component, OnInit} from '@angular/core';
import {MeetingEntranceComponent} from './meeting-entrance/meeting-entrance.component';
import {MeetingRoomComponent} from './meeting-room/meeting-room.component';
import {AgoraRtcService} from '../../../services/agora-rtc.service';
import {AgoraRtmService} from '../../../services/agora-rtm.service';
import {MeetingExitComponent} from './meeting-exit/meeting-exit.component';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MeetingService} from '../../../services/meeting.service';
import {HttpStatusCode} from '@angular/common/http';
import {MeetingNotFoundComponent} from './meeting-not-found/meeting-not-found.component';
import {fadeInOut, rotate} from '../../../shared/animations';
import {MeetingStateService} from '../../../services/states/meeting-state.service';
import {MeetingView} from '../../../models/meeting/state/meeting-view';

@Component({
  selector: 'app-meeting-container',
  animations: [fadeInOut, rotate],
  imports: [MeetingEntranceComponent, MeetingRoomComponent, MeetingExitComponent, MeetingNotFoundComponent, MeetingNotFoundComponent],
  templateUrl: './meeting-container.component.html',
  standalone: true,
  styleUrl: './meeting-container.component.css'
})

export class MeetingContainerComponent implements OnInit {
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meetingService: MeetingService,
    protected state: MeetingStateService,
    protected rtcService: AgoraRtcService,
    protected rtmService: AgoraRtmService
  ) {
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state['meeting']) {
      this.state.setMeeting(nav.extras.state['meeting']);
      this.handleUserJoin();
    } else {
      this.route.url
        .subscribe({
          next: segments => {
            const meetingId = segments[0].path;
            this.meetingService.getMeeting(meetingId)
              .subscribe({
                next: meeting => {
                  console.log(meeting);
                  this.state.setMeeting(meeting);
                  this.handleUserJoin();
                },
                error: err => {
                  console.error(err);
                  if (err.status === HttpStatusCode.NotFound) {
                    this.state.setCurrentView(MeetingView.NOT_FOUND);
                  } else if (err.status === HttpStatusCode.Gone) {
                    // TODO: Handle the view of finished meeting...
                  }
                }
              });
          },
          error: err => console.error(err)
        });
    }
  }

  handleUserJoin() {
    const now = new Date();
    const startsAt = new Date(this.state.meeting.startsAt);

    this.state.setCurrentView(
      startsAt <= now ? MeetingView.ENTRANCE : MeetingView.NOT_STARTED);
  }

  ngOnDestroy() {
    this.state.setMeeting(null);
  }
}
