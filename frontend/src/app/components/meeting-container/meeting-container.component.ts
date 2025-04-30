import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {MeetingEntranceComponent} from './meeting-entrance/meeting-entrance.component';
import {MeetingRoomComponent} from './meeting-room/meeting-room.component';
import {AgoraRtcService} from '../../services/agora-rtc.service';
import {AgoraRtmService} from '../../services/agora-rtm.service';
import {AgoraTokenService} from '../../services/agora-token.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-meeting-container',
  imports: [NgIf, MeetingEntranceComponent, MeetingRoomComponent],
  templateUrl: './meeting-container.component.html',
  standalone: true,
  styleUrl: './meeting-container.component.css'
})

export class MeetingContainerComponent implements OnInit, OnDestroy {
  meetingId: string | null = null;
  currentView: 'entrance' | 'room' = 'entrance';

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: AgoraTokenService,
    protected rtcService: AgoraRtcService,
    protected rtmService: AgoraRtmService
  ) {}

  ngOnInit(): void {
    // getting the meeting ID
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.meetingId = params.get('id');
        // A further update is to load meeting data here based on ID.
      }),
      this.rtmService.memberJoined$.subscribe(memberId => {
        console.log(`RTM: ${memberId} joined the channel`);
      }),
      this.rtmService.memberLeft$.subscribe(memberId => {
        console.log(`RTM: ${memberId} left the channel`);
      }),
      this.rtmService.channelMessage$.subscribe(message => {
        // message: { content: string, memberId: string, ts: number }
        console.log(`RTM: A new message ${message.content} from ${message.memberId} at ${message.ts}`);
      }),
      this.rtmService.tokenExpired$.subscribe(() => {
        console.warn('RTM: RTM token expired');
        // Renew the token...
      }),
      this.rtmService.privilegeTokenWillExpire$.subscribe(() => {
        console.warn('RTM: RTM privilege token will expire');
        // Renew the token...
      }),
      this.rtcService.volumeIndicator$.subscribe(volumes => {
        // volumes: { level: number, uid: UID }[]
        volumes.forEach(volume => {
          console.log(`RTC: Level: ${volume.level}, UID: ${volume.uid}`);
        });
      })
    );
  }

  // called by the MeetingEntranceComponent when 'Join' is clicked
  async onEntranceJoinClicked(meetingId: string) {
    this.meetingId = meetingId;

    // Generate RTC token...
    const { rtcToken } = await this.tokenService.getRtcToken(meetingId);
    // Generate RTM token...
    const { rtmToken } = await this.tokenService.getRtmToken(meetingId);

    await this.rtcService.join(this.meetingId, rtcToken);
    await this.rtmService.join(this.meetingId, rtmToken);
    this.currentView = 'room';
  }

  async onEntranceBackClicked() {
    await this.router.navigateByUrl('/home');
  }

  async onMeetingRoomLeaveClicked() {
    await this.rtcService.leave();
    await this.rtmService.leave();
    this.currentView = 'entrance';
    this.meetingId = null;
    await this.router.navigateByUrl('/meetings');
  }

  async onToggleMuted() {
    await this.rtcService.toggleMuted();
  }

  async ngOnDestroy() {
    // cleaning up the subscription to prevent memory leaks
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
