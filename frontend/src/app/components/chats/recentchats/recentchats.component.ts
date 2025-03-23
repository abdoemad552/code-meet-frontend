import {Component, Input} from '@angular/core';
import {ChatcardComponent} from './chatcard/chatcard.component';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {Chat} from '../../../models/chats/chat';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-recentchats',
  standalone: true,
  imports: [
    ChatcardComponent,
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './recentchats.component.html',
  styleUrl: './recentchats.component.css'
})
export class RecentChatsComponent {
  @Input() friendsChats!: Chat[];
  @Input() roomsChats!: Chat[];
  isRoomChats : boolean = false;

  showFriendsChats() {
    this.isRoomChats = false;
  }

  showRoomsChats() {
    this.isRoomChats = true;
  }
}
