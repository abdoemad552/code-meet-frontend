import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {ChatCardComponent} from './chat-card/chat-card.component';
import {PeerChatInfoResponse} from '../../../models/chats/peer-chat-info-response';
import {RoomChatInfoResponse} from '../../../models/chats/room-chat-info-response';

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
  @Input() peerChats: PeerChatInfoResponse[];
  @Input() roomChats: RoomChatInfoResponse[];
  @Input() selectedPeerChat: PeerChatInfoResponse = null;
  @Input() selectedRoomChat: RoomChatInfoResponse = null;
  @Output() peerChatSelected = new EventEmitter<PeerChatInfoResponse>();
  @Output() roomChatSelected = new EventEmitter<RoomChatInfoResponse>();

  isPeerChats: boolean = true;

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    event.preventDefault();
    this.onPeerChatSelected(null);
  }

  showPeerChats() {
    this.isPeerChats = true;
  }

  showRoomChats() {
    this.isPeerChats = false;
  }

  onPeerChatSelected(selectedPeerChat: PeerChatInfoResponse) {
    this.selectedPeerChat = selectedPeerChat;
    this.selectedRoomChat = null;
    this.peerChatSelected.emit(this.selectedPeerChat);
  }

  onRoomChatSelected(selectedRoomChat: RoomChatInfoResponse) {
    this.selectedPeerChat = null;
    this.selectedRoomChat = selectedRoomChat;
    this.roomChatSelected.emit(this.selectedRoomChat);
  }
}
