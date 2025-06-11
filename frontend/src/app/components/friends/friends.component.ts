import { Component } from '@angular/core';
import {FriendCardComponent} from './friend-card/friend-card.component';
import { FriendshipService } from '../../services/friendship.service';
import { FriendshipInfoResponse } from '../../models/friendship/friendship-info-response.dto';
import {Router} from '@angular/router';
import {FriendRequestsComponent} from './friend-requests/friend-requests.component';
import {NgForOf, NgIf} from '@angular/common';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    FriendCardComponent,
    FriendRequestsComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  friendships: FriendshipInfoResponse[] = [];
  requestsShown: boolean = false;

  constructor(
    private router: Router,
    private friendshipService: FriendshipService
  ) {
  }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends() {
    const userInfo: UserInfoResponse =
      JSON.parse(sessionStorage.getItem("userInfo"));
    this.friendshipService.getAllAcceptedFriendships(userInfo.userId)
      .subscribe({
        next: friendships => {
          this.friendships = friendships;
          console.log(friendships);
        },
        error: err => console.log(err)
      });
  }

  showRequests() : void {
    this.requestsShown = true;
    this.router.navigateByUrl('/friends/requests');
  }

  hideRequests() : void {
    this.requestsShown = false;
  }

  onUnfriend(friendshipId: number) {
    this.friendshipService.cancelFriendship(friendshipId)
      .subscribe({
        next: response => {
          this.friendships = this.friendships.filter(f => f.friendshipId != friendshipId);
        },
        error: response => {
          // Handle the error...
        }
      });
  }
}
