import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {UserInfoResponse} from '../../../../models/user/user-info-response.dto';
import {FormsModule} from '@angular/forms';
import {AgoraRtcService} from '../../../../services/agora-rtc.service';
import {AgoraRtmService} from '../../../../services/agora-rtm.service';
import {UserService} from '../../../../services/user.service';
import {Subscription} from 'rxjs';

interface Message {
  senderId: number;
  senderName: string;
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-content',
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './meeting-content.component.html',
  standalone: true,
  styleUrl: './meeting-content.component.css'
})
export class MeetingContentComponent implements OnDestroy {
  @Input() sidebarContent: 'CHAT' | 'PARTICIPANTS' | 'HIDDEN';
  @Output() hideSidebar = new EventEmitter<void>();

  messages: Message[] = [];
  participants: UserInfoResponse[] = [];
  volumeLevels: { [userId: number]: number } = {};
  inputMessage: string = '';
  subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    protected rtcService: AgoraRtcService,
    protected rtmService: AgoraRtmService
  ) {
  }

  ngOnInit(): void {
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
        this.participants = this.participants.filter(
          part => part.userId != Number(memberId));
      }),
      this.rtmService.channelMessage$.subscribe(message => {
        // message: { content: string, memberId: string, ts: number }
        console.log(`RTM: A new message ${message.content} from ${message.memberId} at ${message.ts}`);
        this.messages.push(JSON.parse(message.content));
      }),
      this.rtcService.volumeIndicator$.subscribe(volumes => {
        // volumes: { level: number, uid: number }[]
        volumes.forEach(({ level, uid }) => {
          console.log(`Level: ${level}, UID: ${uid}`);
          this.volumeLevels[uid] = level;
        });
      })
    );

    this.loadMeetingParticipants();
  }

  async loadMeetingParticipants() {
    const participantsIds = await this.rtmService.getChannelMembers();
    participantsIds.forEach(participantId => {
      this.userService.getUserById(Number(participantId))
        .subscribe({
          next: participant => {
            this.participants.push(participant);
          }
        });
    });
  }

  isSpeaking(userId: number): boolean {
    return this.volumeLevels[userId] >= 50;
  }

  onHideSidebar() {
    this.hideSidebar.emit();
  }

  sendMessage() {
    if (this.inputMessage.trim()) {
      const userInfo: UserInfoResponse =
        JSON.parse(sessionStorage.getItem("userInfo"));
      const message = {
        senderId: userInfo.userId,
        senderName: `${userInfo.firstName} ${userInfo.lastName}`,
        text: this.inputMessage.trim(),
        timestamp: new Date()
      };
      this.messages.push(message);
      this.inputMessage = '';
    }
  }

  get sortedParticipants() {
    return this.participants.sort((a, b) => {
      return a.firstName < b.firstName ? -1 :
        a.firstName > b.firstName ? 1 :
          a.lastName < b.lastName ? -1 :
            a.lastName > b.lastName ? 1 :
              a.username.toLowerCase().localeCompare(b.username.toLowerCase());
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
