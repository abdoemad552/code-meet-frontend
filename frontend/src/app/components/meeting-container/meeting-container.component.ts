import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {MeetingEntranceComponent} from './meeting-entrance/meeting-entrance.component';
import {MeetingRoomComponent} from './meeting-room/meeting-room.component';
import {AgoraService} from '../../services/agora.service';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected agoraService: AgoraService
  ) {}

  ngOnInit(): void {
    // getting the meeting ID
    this.route.paramMap.subscribe({
      next: params => {
        this.meetingId = params.get('id');
        // A further update is to load meeting data here based on ID.
      }
    });
  }

  // called by the MeetingEntranceComponent when 'Join' is clicked
  async onEntranceJoinClicked(meetingId: string) {
    const userInfo: UserInfoResponse =
      JSON.parse(sessionStorage.getItem("userInfo")!);

    this.meetingId = meetingId;
    await this.agoraService.join(this.meetingId, userInfo.userId)
      .then(() => this.currentView = 'room')
      .catch(reason => console.log(reason));
  }

  onEntranceBackClicked() {
    this.router.navigateByUrl('/home')
      .catch(reason => console.log(reason));
  }

  async onMeetingRoomLeaveClicked() {
    this.meetingId = null;
    await this.agoraService.leave()
      .then(() => {
        this.router.navigateByUrl('/meetings')
          .catch(reason => console.log(reason));
        this.currentView = 'entrance';
      })
      .catch(reason => console.log(reason));
  }

  async onToggleMuted() {
    await this.agoraService.toggleMuted();
  }

  async ngOnDestroy() {
    // cleaning up the subscription to prevent memory leaks
    await this.onMeetingRoomLeaveClicked();
  }
}
