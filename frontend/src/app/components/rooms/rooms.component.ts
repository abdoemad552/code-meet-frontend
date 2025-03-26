import { Component } from '@angular/core';
import {RoomcardComponent} from './roomcard/roomcard.component';
import {ActivatedRoute} from '@angular/router';
import {RoomviewComponent} from './roomview/roomview.component';
import {NgIf} from '@angular/common';
import { RoomInfoResponse } from '../../models/room/room-info-response.dto';
import { RoomService } from '../../services/room.service';
import {AddRoomComponent} from './add-room/add-room.component';

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
  roomsInformation: RoomInfoResponse[] = [];

  addRoom : boolean = false;

  roomId!: string | null;
  isRoomView: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('id'); // Get the 'id' parameter from the URL
      this.isRoomView = !(!this.roomId); // If no ID, it's the signed-in user's profile
    });

    this.getAllRoomsByCreator(1);
  }

  getAllRoomsByCreator(creatorId: number): void {
    this.roomService.getAllRoomsByCreator(creatorId)
      .subscribe({
        next: (data: RoomInfoResponse[]) => {
          this.roomsInformation = data;
          console.log(data);
        },
        error: err => console.log(err)
      });
  }

  openAddRoom() {
      this.addRoom = true;
  }
}
