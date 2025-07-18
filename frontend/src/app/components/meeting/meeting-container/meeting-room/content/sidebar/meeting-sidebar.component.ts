import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MeetingMessagesContainerComponent} from "../meeting-messages-container/meeting-messages-container.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {AgoraRtmService} from '../../../../../../services/agora-rtm.service';
import {MeetingStateService} from '../../../../../../services/states/meeting-state.service';
import {MeetingService} from '../../../../../../services/meeting.service';
import {UserInfoResponse} from '../../../../../../models/user/user-info-response.dto';
import {UserService} from '../../../../../../services/user.service';

@Component({
  selector: 'meeting-sidebar',
  imports: [
    FormsModule,
    MeetingMessagesContainerComponent,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './meeting-sidebar.component.html',
  standalone: true,
  styleUrl: './meeting-sidebar.component.css'
})
export class MeetingSidebarComponent {
  @Input() sidebarContent: 'CHAT' | 'PARTICIPANTS' | 'HIDDEN';
  @Input() mainAreaContent: 'EDITOR' | 'SCREEN_SHARE' | 'PARTICIPANTS';
  @Output() hideSidebar = new EventEmitter<void>();
  @ViewChild('messageContainer') messageContainer: ElementRef;
  @ViewChild('scrollButton') scrollButton: ElementRef;

  hideTimeout: any;
  inputMessage: string = '';
  joinRequests: UserInfoResponse[] = [];

  constructor(
    private meetingService: MeetingService,
    private userService: UserService,
    protected rtmService: AgoraRtmService,
    protected state: MeetingStateService,
  ) {
  }

  ngOnInit() {
    this.state.requestJoin()
      .subscribe({
        next: userId => {
          this.userService.getUserById(userId)
            .subscribe({
              next: user => {
                this.joinRequests.push(user);
              },
              error: err => console.error(err)
            });
        },
        error: err => console.error(err)
      });
  }

  sendMessage() {
    const content = this.inputMessage.trim();
    if (content) {
      const message = {
        sender: {
          id: this.state.participation.participantId,
          firstName: this.state.participation.user.firstName,
          lastName: this.state.participation.user.lastName,
          profilePictureUrl: this.state.participation.user.profilePictureUrl
        },
        content: content,
        sentAt: new Date().toISOString()
      };
      this.state.saveMessage(message);
      this.rtmService.sendMessage(JSON.stringify({
        type: 'CHAT_MESSAGE',
        text: content
      }));
      this.scrollToBottom();
      this.inputMessage = '';
    }
  }

  onHideSidebar() {
    this.hideSidebar.emit();
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

  acceptJoin(i: number) {
    this.meetingService.acceptJoin({
      meetingId: this.state.meeting.meetingId,
      userId: this.joinRequests[i].userId
    }).subscribe({
      next: participant => {
        console.log('Accepted');
        console.log(participant);
        this.removeRequest(i);
      },
      error: err => console.error(err)
    });
  }

  rejectJoin(i: number) {
    console.log('Rejected');
    this.removeRequest(i);
  }

  removeRequest(i: number) {
    this.joinRequests.splice(i, 1);
  }
}
