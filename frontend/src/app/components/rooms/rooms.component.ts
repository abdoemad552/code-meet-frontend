import { Component } from '@angular/core';
import {RoomCardComponent} from './room-card/room-card.component';
import {NgForOf, NgIf} from '@angular/common';
import { RoomInfoResponse } from '../../models/room/room-info-response.dto';
import {CreateRoomComponent} from './create-room/create-room.component';
import {UserService} from '../../services/user.service';
import {MembershipService} from '../../services/membership.service';
import {JoinRoomComponent} from './join-room/join-room.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    NgIf,
    CreateRoomComponent,
    RoomCardComponent,
    NgForOf,
    JoinRoomComponent
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  rooms: RoomInfoResponse[] = null;

  showJoinRoomModal: boolean = false;
  showCreateRoomModal: boolean = false;

  constructor(
    private userService: UserService,
    private membershipService: MembershipService
  ) {
  }

  ngOnInit() {
    this.getAllRoomsOfUser(this.userService.userInfo.userId);
  }

  getAllRoomsOfUser(userId: number): void {
    this.membershipService.getAllRoomsByUserId(userId)
      .subscribe({
        next: rooms => {
          console.log(rooms);
          setTimeout(() => this.rooms = rooms, 500);
        },
        error: err => console.log(err)
      });
  }

  onShowCreateRoomModal() {
    this.showCreateRoomModal = true;
  }

  onHideCreateRoomModal() {
    this.showCreateRoomModal = false;
  }

  onShowJoinRoomModal() {
    this.showJoinRoomModal = true;
  }

  onHideJoinRoomModal() {
    this.showJoinRoomModal = false;
  }
}
