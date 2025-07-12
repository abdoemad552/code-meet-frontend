import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';
import {NgIf} from '@angular/common';
import {PeerChatInfoResponse} from '../../../models/chats/peer-chat-info-response';
import {RoomChatInfoResponse} from '../../../models/chats/room-chat-info-response';
import {PeerMessageResponse} from '../../../models/chats/peer-message-response';
import {RoomMessageResponse} from '../../../models/chats/room-message-response';
import {PeerMessageRequest} from '../../../models/chats/peer-message-request';
import {RoomMessageRequest} from '../../../models/chats/room-message-request';
import {FormsModule} from '@angular/forms';
import {MessagesContainerComponent} from './messages-container/messages-container.component';
import {fadeInOut} from '../../../shared/animations';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    FormsModule,
    MessagesContainerComponent
  ],
  animations: [fadeInOut],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent {
  @Input() peerChat: PeerChatInfoResponse;
  @Input() roomChat: RoomChatInfoResponse;
  @Input() peerChatMessages: PeerMessageResponse[];
  @Input() roomChatMessages: RoomMessageResponse[];
  @Output() hideChatbox = new EventEmitter<void>();
  @Output() peerMessageSent = new EventEmitter<PeerMessageRequest>();
  @Output() roomMessageSent = new EventEmitter<RoomMessageRequest>();
  @ViewChild('messageContainer') messageContainer: ElementRef;
  @ViewChild('scrollButton') scrollButton: ElementRef;

  hideTimeout: any;
  owner: UserInfoResponse;

  ngOnInit(): void {
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  onPeerMessageSent(): void {
    const content = this.peerChat.currentInput.trim();
    if (content) {
      console.log(content);
      this.peerMessageSent.emit({
        ownerId: this.owner.userId,
        peerId: this.peerChat.peer.userId,
        content: content
      });
      this.peerChat.currentInput = '';
    }
  }

  onRoomMessageSent(): void {
    const content = this.roomChat.currentInput.trim();
    if (content) {
      console.log(content);
      this.roomMessageSent.emit({
        ownerId: this.owner.userId,
        roomId: this.roomChat.room.roomId,
        content: content
      });
      this.roomChat.currentInput = '';
    }
  }

  onHideChatbox() {
    this.hideChatbox.emit();
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
}
