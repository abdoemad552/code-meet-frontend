import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {RoomService} from '../../services/room.service';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';
import {RoomInfoResponse} from '../../models/room/room-info-response.dto';
import {RoomCardComponent} from './room-card/room-card.component';
import {UserCardComponent} from './user-card/user-card.component';

@Component({
  selector: 'app-search',
  imports: [
    NgClass,
    FormsModule,
    NgForOf,
    RoomCardComponent,
    UserCardComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  users: UserInfoResponse[];
  rooms: RoomInfoResponse[];

  uno: boolean;
  searchInput: string = '';
  searchTimeout: any;
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
    let input = this.searchInput.trim();
    if (input.startsWith('@')) {
      this.uno = true;
      input = input.substring(1).trim();
      if (!input) return '';
    } else {
      this.uno = false;
    }
    return input;
  }

  search() {
    if (this.input) {
      if (this.isUsersShown) {
        this.users = null;
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
          console.log(`Searching for users like ~${this.input}`);
          this.userService.searchForUsers(this.input, this.uno)
            .subscribe({
              next: user => {
                this.users = user;
              },
              error: err => console.error(err)
            });
        }, 1000);
      } else {
        if (this.uno) {
          this.rooms = [];
        } else {
          this.rooms = null;
          if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
          }
          this.searchTimeout = setTimeout(() => {
            console.log(`Searching for rooms like ~${this.input}`);
            this.roomService.searchForRooms(this.input)
              .subscribe({
                next: rooms => {
                  this.rooms = rooms;
                },
                error: err => console.error(err)
              });
          }, 1000);
        }
      }
    }
  }
}
