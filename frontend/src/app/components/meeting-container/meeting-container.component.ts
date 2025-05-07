import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgIf} from '@angular/common';
import {MeetingEntranceComponent} from './meeting-entrance/meeting-entrance.component';
import {MeetingRoomComponent} from './meeting-room/meeting-room.component';
import {AgoraRtcService} from '../../services/agora-rtc.service';
import {AgoraRtmService} from '../../services/agora-rtm.service';
import {AgoraTokenService} from '../../services/agora-token.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {MeetingExitComponent} from './meeting-exit/meeting-exit.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-meeting-container',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // when element appears
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [   // when element disappears
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
  imports: [NgIf, MeetingEntranceComponent, MeetingRoomComponent, MeetingExitComponent],
  templateUrl: './meeting-container.component.html',
  standalone: true,
  styleUrl: './meeting-container.component.css'
})

export class MeetingContainerComponent implements OnDestroy {
  meetingId: string = null;
  subscriptions: Subscription[] = [];
  currentView: 'MEETING_ENTRANCE' | 'MEETING_ROOM' | 'MEETING_EXIT' = 'MEETING_ENTRANCE';

  constructor(
    private tokenService: AgoraTokenService,
    protected rtcService: AgoraRtcService,
    protected rtmService: AgoraRtmService
  ) {
  }

  async onEntranceJoin(meetingId: string) {
    this.meetingId = meetingId;

    // Generating RTC token..
    const { rtcToken } = await this.tokenService.getRtcToken(this.meetingId);
    // Generating RTM token...
    const { rtmToken } = await this.tokenService.getRtmToken(this.meetingId);

    await this.rtcService.join(this.meetingId, rtcToken);
    await this.rtmService.join(this.meetingId, rtmToken);

    this.subscriptions.push(
      this.rtmService.tokenExpired$.subscribe(async () => {
        console.warn('RTM: RTM token expired');
        // Renew the token...
      }),
      this.rtmService.privilegeTokenWillExpire$.subscribe(async () => {
        console.warn('RTM: RTM privilege token will expire');
        // Renew the token...
      })
    );

    this.currentView = 'MEETING_ROOM';
  }

  onMeetingLeave() {
    this.clean();
    this.currentView = 'MEETING_EXIT';
  }

  onExitRejoin() {
    this.currentView = 'MEETING_ENTRANCE';
  }

  clean() {
    if (this.meetingId) {
      this.rtcService.leave();
      this.rtmService.leave();
    }
    this.meetingId = null;
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnDestroy() {
    this.clean();
  }
}
