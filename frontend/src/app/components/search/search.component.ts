import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {RoomService} from '../../services/room.service';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';
import {RoomInfoResponse} from '../../models/room/room-info-response.dto';
import {ChatCardComponent} from '../chats/recent-chats/chat-card/chat-card.component';
import {RoomCardComponent} from './room-card/room-card.component';
import {FriendCardComponent} from '../friends/friend-card/friend-card.component';
import {UserCardComponent} from './user-card/user-card.component';

@Component({
  selector: 'app-search',
  imports: [
    NgClass,
    FormsModule,
    ChatCardComponent,
    NgForOf,
    NgIf,
    RoomCardComponent,
    RoomCardComponent,
    FriendCardComponent,
    UserCardComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  users: UserInfoResponse[];
  rooms: RoomInfoResponse[];

  searchInput: string = '';
  isUsersShown: boolean = true;

  constructor(
    private userService: UserService,
    private roomService: RoomService
  ) {
  }

  showUsers() {
    this.isUsersShown = true;
    this.search();
  }

  showRooms() {
    this.isUsersShown = false;
    this.search();
  }

  get input() {
    return this.searchInput.trim();
  }

  search() {
    const input = this.input;
    if (input) {

    }
  }
}
