import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ChatService} from '../../../services/chat.service';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';
import {NgForOf, NgIf} from '@angular/common';
import {PeerChatInfoResponse} from '../../../models/chats/peer-chat-info-response';
import {RoomChatInfoResponse} from '../../../models/chats/room-chat-info-response';
import {PeerMessageResponse} from '../../../models/chats/peer-message-response';
import {RoomMessageResponse} from '../../../models/chats/room-message-response';
import {PeerMessageRequest} from '../../../models/chats/peer-message-request';
import {RoomMessageRequest} from '../../../models/chats/room-message-request';
import {ChatMessageComponent} from './chat-message/chat-message.component';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NgForOf,
    ChatMessageComponent
  ],
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

  owner: UserInfoResponse;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {
  }

  ngOnInit(): void {
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  onPeerMessageSent(): void {
    const input = document.getElementById('peer-chat-input') as HTMLInputElement;
    const content = input.value;
    if (content) {
      console.log(content);
      this.peerMessageSent.emit({
        ownerId: this.owner.userId,
        peerId: this.peerChat.peer.userId,
        content: content
      });
      input.value = '';
    }
  }

  onRoomMessageSent(): void {
    const input = document.getElementById('room-chat-input') as HTMLInputElement;
    const content = input.value;
    if (content) {
      console.log(content);
      this.roomMessageSent.emit({
        ownerId: this.owner.userId,
        roomId: this.roomChat.room.roomId,
        content: content
      });
      input.value = '';
    }
  }

  onHideChatbox() {
    this.hideChatbox.emit();
  }

  isPrevSame(i: number) {
    if (i === 0) return false;
    if (this.peerChat) {
      return this.peerChatMessages[i - 1].sender.userId === this.peerChatMessages[i].sender.userId;
    } else {
      return this.roomChatMessages[i - 1].sender.userId === this.roomChatMessages[i].sender.userId;
    }
  }
}
