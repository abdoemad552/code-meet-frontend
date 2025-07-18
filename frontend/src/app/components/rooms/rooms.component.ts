import { Component } from '@angular/core';
import {RoomCardComponent} from './room-card/room-card.component';
import {NgForOf, NgIf} from '@angular/common';
import { RoomInfoResponse } from '../../models/room/room-info-response.dto';
import {CreateRoomComponent} from './create-room/create-room.component';
import {MembershipService} from '../../services/membership.service';
import {JoinRoomComponent} from './join-room/join-room.component';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';
import {fadeInOut} from '../../shared/animations';

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
  animations: [fadeInOut],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  owner: UserInfoResponse;
  rooms: RoomInfoResponse[] = null;

  showJoinRoomModal: boolean = false;
  showCreateRoomModal: boolean = false;

  constructor(private membershipService: MembershipService) {}

  ngOnInit() {
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
    this.getAllRooms();
  }

  getAllRooms(): void {
    this.membershipService.getAllRoomsByUserId(this.owner.userId)
      .subscribe({
        next: rooms => {
          console.log(rooms);
          setTimeout(() => this.rooms = rooms, 1000);
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

  onShowInvitations() {

  }

  onHideInvitations() {

  }
}
