import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MeetingHeaderComponent} from './header/meeting-header.component';
import {MeetingContentComponent} from './content/meeting-content.component';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';
import {AgoraRtcService} from '../../../services/agora-rtc.service';
import {AgoraRtmService} from '../../../services/agora-rtm.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../../services/user.service';

interface Message {
  senderId: number;
  senderName: string;
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-meeting-room',
  imports: [MeetingContentComponent, MeetingHeaderComponent],
  templateUrl: './meeting-room.component.html',
  standalone: true,
  styleUrl: './meeting-room.component.css'
})
export class MeetingRoomComponent {
  @Input() meetingId: string;
  @Output() meetingLeaveClicked = new EventEmitter<void>();

  messages: Message[] = [];
  participants: UserInfoResponse[] = [];

  sidebarContent: 'chat' | 'participants' | 'hidden' = 'chat';
  volumeLevels: { [userId: number]: number } = {};
  subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    protected rtcService: AgoraRtcService,
    protected rtmService: AgoraRtmService
  ) {}

  ngOnInit(): void {
    // getting the meeting ID
    this.subscriptions.push(
      this.rtmService.memberJoined$.subscribe(memberId => {
        console.log(`RTM: ${memberId} joined the channel`);
        this.userService.getUserById(Number(memberId))
          .subscribe({
            next: participant => {
              this.participants.push(participant);
            }
          });
      }),
      this.rtmService.memberLeft$.subscribe(memberId => {
        console.log(`RTM: ${memberId} left the channel`);
        this.participants = this.participants.filter(p => p.userId != Number(memberId));
      }),
      this.rtmService.channelMessage$.subscribe(message => {
        // message: { content: string, memberId: string, ts: number }
        console.log(`RTM: A new message ${message.content} from ${message.memberId} at ${message.ts}`);
        this.messages.push(JSON.parse(message.content));
      }),
      this.rtmService.tokenExpired$.subscribe(async () => {
        console.warn('RTM: RTM token expired');
        // Renew the token...
      }),
      this.rtmService.privilegeTokenWillExpire$.subscribe(() => {
        console.warn('RTM: RTM privilege token will expire');
        // Renew the token...
      }),
      this.rtcService.volumeIndicator$.subscribe(volumes => {
        // volumes: { level: number, uid: number }[]
        volumes.forEach(({ level, uid }) => {
          // console.log(`Level: ${level}, UID: ${uid}`);
          this.volumeLevels[uid] = level;
        });
      })
    );

    this.loadMeetingParticipants();
  }

  async loadMeetingParticipants() {
    const existingParticipantsIds = await this.rtmService.getChannelMembers();
    existingParticipantsIds.forEach(participantId => {
      this.userService.getUserById(Number(participantId))
        .subscribe({
          next: participant => {
            this.participants.push(participant);
          }
        });
    });
  }

  onToggleMicMuted() {
    this.rtcService.toggleMicMuted();
  }

  onToggleCamEnabled() {
    this.rtcService.toggleCamEnabled();
  }

  onMeetingLeaveClicked() {
    this.meetingLeaveClicked.emit();
  }

  onHideSidebar() {
    this.sidebarContent = 'hidden';
  }

  onSidebarChanged(content: 'chat' | 'participants') {
    console.log(content);
    if (this.sidebarContent === content) {
      this.sidebarContent = 'hidden';
    } else {
      this.sidebarContent = content;
    }
  }

  onMessageSent(message: string) {
    this.messages.push(JSON.parse(message));
    this.rtmService.sendMessage(message);
  }
}
