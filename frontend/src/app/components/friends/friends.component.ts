import { Component } from '@angular/core';
import {FriendCardComponent} from './friend-card/friend-card.component';
import { FriendshipService } from '../../services/friendship.service';
import { FriendshipInfoResponse } from '../../models/friendship/friendship-info-response.dto';
import {RouterLink} from '@angular/router';
import {FriendRequestsComponent} from './friend-requests/friend-requests.component';
import {NgIf} from '@angular/common';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    FriendCardComponent,
    RouterLink,
    FriendRequestsComponent,
    NgIf
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  friends: FriendshipInfoResponse[] = [];
  RequestsShown!: boolean;
  requestsExists!: boolean;

  constructor(private friendshipService: FriendshipService) {
  }

  ngOnInit(): void {
    const userInfo: UserInfoResponse =
      JSON.parse(sessionStorage.getItem("userInfo")!);
    this.getFriends(userInfo.userId);
    this.requestsExists = true; // will be true if there are friend requests.
  }

  getFriends(userId: number): void {
    this.friendshipService.getAllFriendships(userId)
      .subscribe({
        next: friends => {
          this.friends = friends;
          console.log(friends);
        },
        error: err => console.log(err)
      });
  }

  showRequests() : void {
    this.RequestsShown = true;
  }

  hideRequests() : void {
    this.RequestsShown = false;
  }
}
