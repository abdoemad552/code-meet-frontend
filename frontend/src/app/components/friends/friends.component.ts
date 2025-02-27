import { Component } from '@angular/core';
import {FriendCardComponent} from './friend-card/friend-card.component';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    FriendCardComponent
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  handleMessage() {
    console.log('handled!!')
  }
}
