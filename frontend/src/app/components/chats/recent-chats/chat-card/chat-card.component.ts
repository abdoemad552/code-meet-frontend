import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChatInfoResponse} from '../../../../models/chats/chat-info-response';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-chat-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './chat-card.component.html',
  styleUrl: './chat-card.component.css'
})
export class ChatCardComponent {
  @Input() chat: ChatInfoResponse;
  @Output() chatSelected = new EventEmitter<ChatInfoResponse>();
  @Input() isSelected: boolean;

  get chatId() {
    return this.chat.chatId;
  }

  get chatPictureUrl() {
    if (this.chat.isPeerChat) {
      return this.chat.other.profilePictureUrl;
    } else {
      return this.chat.other.roomPictureUrl;
    }
  }

  get chatName() {
    if (this.chat.isPeerChat) {
      return this.chat.other.firstName + ' ' + this.chat.other.lastName;
    } else {
      return this.chat.other.roomName;
    }
  }

  get lastSentMessageContent() {
    return this.chat.lastSentMessage?.content || '...';
  }

  onChatSelected() {
    this.chatSelected.emit(this.chat);
  }
}
