import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {UserInfoResponse} from '../../../../models/user/user-info-response.dto';
import {FormsModule} from '@angular/forms';
import {AgoraRtcService} from '../../../../services/agora-rtc.service';
import {AgoraRtmService} from '../../../../services/agora-rtm.service';
import {UserService} from '../../../../services/user.service';
import {Subscription} from 'rxjs';
import {MeetingMessagesContainerComponent} from './meeting-messages-container/meeting-messages-container.component';
import {formatDateTime} from '../../../../shared/utils';

interface Message {
  sender: {
    id: string,
    firstName?: string,
    lastName?: string,
    username?: string
  },
  content: string,
  sentAt: string
}

@Component({
  selector: 'meeting-room-content',
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    MeetingMessagesContainerComponent
  ],
  templateUrl: './meeting-content.component.html',
  standalone: true,
  styleUrl: './meeting-content.component.css'
})
export class MeetingContentComponent implements OnDestroy {
  @Input() sidebarContent: 'CHAT' | 'PARTICIPANTS' | 'HIDDEN';
  @Output() hideSidebar = new EventEmitter<void>();
  @ViewChild('messageContainer') messageContainer: ElementRef;
  @ViewChild('scrollButton') scrollButton: ElementRef;

  hideTimeout: any;
  owner: UserInfoResponse;
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
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
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
        console.log(`RTM: A new message ${message.content} from ${message.sender.id} at ${message.sentAt}`);
        const participant = this.participants.find(p => String(p.userId) === message.sender.id);
        message.sender.firstName = participant.firstName;
        message.sender.lastName = participant.lastName;
        message.sender.username = participant.username;
        this.messages.push(message);
        this.scrollToBottom();
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
    const content = this.inputMessage.trim();
    if (content) {
      const message = {
        sender: {
          id: String(this.owner.userId),
          firstName: this.owner.firstName,
          lastName: this.owner.lastName
        },
        content: content,
        sentAt: formatDateTime(new Date().toISOString())
      };
      this.rtmService.sendMessage(content);
      this.messages.push(message);
      this.scrollToBottom();
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

  scrollToBottom(): void {
    const container = this.messageContainer?.nativeElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  startHideTimeout(): void {
    this.hideTimeout = setTimeout(() => {
      if (this.scrollButton?.nativeElement) {
        this.scrollButton.nativeElement.style.opacity = '0';
      }
    }, 500);
  }

  cancelHideTimeout(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    if (this.scrollButton?.nativeElement) {
      this.scrollButton.nativeElement.style.opacity = '1';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
