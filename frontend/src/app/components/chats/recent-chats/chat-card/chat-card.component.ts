import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {PeerChatInfoResponse} from '../../../../models/chats/peer-chat-info-response';
import {RoomChatInfoResponse} from '../../../../models/chats/room-chat-info-response';
import {UserInfoResponse} from '../../../../models/user/user-info-response.dto';

@Component({
  selector: 'app-chat-card',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './chat-card.component.html',
  styleUrl: './chat-card.component.css'
})
export class ChatCardComponent {
  @Input() peerChat: PeerChatInfoResponse;
  @Input() roomChat: RoomChatInfoResponse;
  @Input() isSelected: boolean;
  @Output() peerChatSelected = new EventEmitter<PeerChatInfoResponse>();
  @Output() roomChatSelected = new EventEmitter<RoomChatInfoResponse>();

  owner: UserInfoResponse;

  ngOnInit() {
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  onChatSelected() {
    if (!this.isSelected) {
      if (this.peerChat) {
        this.peerChatSelected.emit(this.peerChat);
      } else {
        this.roomChatSelected.emit(this.roomChat);
      }
    }
  }

  formatTime(isoString: string): string {
    if (!isoString) isoString = new Date().toISOString();
    const date = new Date(isoString);

    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = date.toLocaleDateString('en-GB'); // British format gives DD/MM/YYYY

    return `${dateString} at ${timeString}`;
  }
}
