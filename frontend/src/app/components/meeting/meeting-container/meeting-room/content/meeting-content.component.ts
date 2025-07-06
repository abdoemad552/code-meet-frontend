import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AgoraRtcService} from '../../../../../services/agora-rtc.service';
import {AgoraRtmService} from '../../../../../services/agora-rtm.service';
import {MeetingMessagesContainerComponent} from './meeting-messages-container/meeting-messages-container.component';
import {formatDateTime} from '../../../../../shared/utils';
import {CodeEditorComponent} from '../../../../code-editor/code-editor.component';
import {fadeInOut} from '../../../../../shared/animations';
import {MeetingStateService} from '../../../../../services/states/meeting-state.service';

@Component({
  selector: 'meeting-room-content',
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    MeetingMessagesContainerComponent,
    CodeEditorComponent,
    NgClass
  ],
  animations: [fadeInOut],
  templateUrl: './meeting-content.component.html',
  standalone: true,
  styleUrl: './meeting-content.component.css'
})
export class MeetingContentComponent implements OnDestroy {
  @Input() sidebarContent: 'CHAT' | 'PARTICIPANTS' | 'HIDDEN';
  @Input() mainAreaContent: 'EDITOR' | 'SCREEN_SHARE' | 'PARTICIPANTS';
  @Output() hideSidebar = new EventEmitter<void>();
  @ViewChild('messageContainer') messageContainer: ElementRef;
  @ViewChild('scrollButton') scrollButton: ElementRef;

  hideTimeout: any;
  inputMessage: string = '';

  constructor(
    protected rtcService: AgoraRtcService,
    protected rtmService: AgoraRtmService,
    protected state: MeetingStateService
  ) {
  }

  ngOnInit() {}

  ngAfterViewChecked() {
    if (this.state.participants) {
      for (let participant of this.state.participants) {
        this.rtcService.playVideoTrack(participant.participantId);
      }
    }
  }

  isSpeaking(participantId: string): boolean {
    return this.rtcService.volumeLevel[participantId] >= 50;
  }

  onHideSidebar() {
    this.hideSidebar.emit();
  }

  sendMessage() {
    const content = this.inputMessage.trim();
    if (content) {
      const message = {
        sender: {
          id: this.state.participation.participantId,
          firstName: this.state.participation.user.firstName,
          lastName: this.state.participation.user.lastName
        },
        content: content,
        sentAt: formatDateTime(new Date().toISOString())
      };
      this.state.saveMessage(message);
      this.rtmService.sendMessage(JSON.stringify({
        type: 'CHAT_MESSAGE',
        info: {
          text: content
        }
      }));
      this.scrollToBottom();
      this.inputMessage = '';
    }
  }

  get sortedParticipants() {
    return this.state.participants.sort((a, b) => {
      return a.user.firstName < b.user.firstName ? -1 :
        a.user.firstName > b.user.firstName ? 1 :
          a.user.lastName < b.user.lastName ? -1 :
            a.user.lastName > b.user.lastName ? 1 :
              a.user.username.toLowerCase().localeCompare(b.user.username.toLowerCase());
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
  }
}
