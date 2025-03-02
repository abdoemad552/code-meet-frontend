import { Component } from '@angular/core';
import {FriendCardComponent} from "../friends/friend-card/friend-card.component";
import {RoomcardComponent} from './roomcard/roomcard.component';
import {ActivatedRoute} from '@angular/router';
import {RoomviewComponent} from './roomview/roomview.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    FriendCardComponent,
    RoomcardComponent,
    RoomviewComponent,
    NgIf
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  roomId!: string | null;
  isRoomView: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('id'); // Get the 'id' parameter from the URL
      this.isRoomView = !(!this.roomId); // If no ID, it's the signed-in user's profile
    });
  }
}
