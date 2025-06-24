import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {ChatCardComponent} from './chat-card/chat-card.component';
import {ChatInfoResponse} from '../../../models/chats/chat-info-response';

@Component({
  selector: 'app-recent-chats',
  standalone: true,
  imports: [
    NgClass,
    ChatCardComponent,
    NgForOf
  ],
  templateUrl: './recent-chats.component.html',
  styleUrl: './recent-chats.component.css'
})
export class RecentChatsComponent {
  @Input() peerChats: ChatInfoResponse[];
  @Input() roomChats: ChatInfoResponse[];
  @Input() selectedChat: ChatInfoResponse = null;
  @Output() chatSelected = new EventEmitter<ChatInfoResponse>();

  isPeerChats: boolean = true;

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    event.preventDefault();
    this.onChatSelected(null);
  }

  showPeerChats() {
    this.isPeerChats = true;
  }

  showRoomChats() {
    this.isPeerChats = false;
  }

  onChatSelected(selectedChat: ChatInfoResponse) {
    this.selectedChat = selectedChat;
    this.chatSelected.emit(selectedChat);
  }

  get currentChats() {
    return this.isPeerChats ? this.peerChats : this.roomChats;
  }
}
