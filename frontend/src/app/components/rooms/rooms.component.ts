import { Component } from '@angular/core';
import {RoomcardComponent} from './roomcard/roomcard.component';
import {ActivatedRoute} from '@angular/router';
import {RoomviewComponent} from './roomview/roomview.component';
import {NgIf} from '@angular/common';
import { RoomInfoResponse } from '../../models/room/room-info-response.dto';
import { RoomService } from '../../services/room.service';
import {AddRoomComponent} from './add-room/add-room.component';
import {UserService} from '../../services/user.service';
import {MembershipService} from '../../services/membership.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    RoomcardComponent,
    RoomviewComponent,
    NgIf,
    AddRoomComponent
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  rooms: RoomInfoResponse[] = [];

  addRoom : boolean = false;

  roomId!: string | null;
  isRoomView: boolean = false;

  constructor(
    private userService: UserService,
    private membershipService: MembershipService,
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('id'); // Get the 'id' parameter from the URL
      this.isRoomView = !(!this.roomId); // If no ID, it's the signed-in user's profile
    });

    this.getAllRoomsOfUser(this.userService.userInfo.userId);
  }

  getAllRoomsOfUser(userId: number): void {
    this.membershipService.getAllRoomsOfUser(userId)
      .subscribe({
        next: rooms => {
          this.rooms = rooms;
          console.log(rooms);
        },
        error: err => console.log(err)
      });
  }

  openAddRoom() {
    this.addRoom = true;
  }
}
