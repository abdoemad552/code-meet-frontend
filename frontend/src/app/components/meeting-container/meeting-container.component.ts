import { Component, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {MeetingEntranceComponent} from './meeting-entrance/meeting-entrance.component';
import {MeetingRoomComponent} from './meeting-room/meeting-room.component';
import {AgoraRtcService} from '../../services/agora-rtc.service';
import {AgoraRtmService} from '../../services/agora-rtm.service';
import {AgoraTokenService} from '../../services/agora-token.service';
import {animate, style, transition, trigger} from '@angular/animations';

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
  imports: [NgIf, MeetingEntranceComponent, MeetingRoomComponent],
  templateUrl: './meeting-container.component.html',
  standalone: true,
  styleUrl: './meeting-container.component.css'
})

export class MeetingContainerComponent implements OnDestroy {
  meetingId: string = null;
  currentView: 'MEETING_ENTRANCE' | 'MEETING_ROOM' = 'MEETING_ENTRANCE';

  constructor(
    private router: Router,
    private tokenService: AgoraTokenService,
    protected rtcService: AgoraRtcService,
    protected rtmService: AgoraRtmService
  ) {}

  // Called by the MeetingEntranceComponent when 'Join' is clicked
  async onEntranceJoinClicked(meetingId: string) {
    this.meetingId = meetingId;

    // Generating RTC token..
    const { rtcToken } = await this.tokenService.getRtcToken(meetingId);
    // Generating RTM token...
    const { rtmToken } = await this.tokenService.getRtmToken(meetingId);

    await this.rtcService.join(this.meetingId, rtcToken);
    await this.rtmService.join(this.meetingId, rtmToken);

    this.currentView = 'MEETING_ROOM';
  }

  onEntranceBackClicked() {
    this.router.navigateByUrl('/home');
  }

  onMeetingLeaveClicked() {
    this.router.navigateByUrl('/meetings');
  }

  clean() {
    if (this.meetingId) {
      this.rtcService.leave();
      this.rtmService.leave();
    }
  }

  ngOnDestroy() {
    this.clean();
  }
}
