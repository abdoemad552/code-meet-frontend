import { Component } from '@angular/core';
import {FriendCardComponent} from './friend-card/friend-card.component';
import { FriendshipService } from '../../services/friendship.service';
import { FriendshipInfoResponse } from '../../models/friendship/friendship-info-response.dto';
import {Router, RouterOutlet} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';
import {fadeInOut} from '../../shared/animations';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    FriendCardComponent,
    NgIf,
    NgForOf,
    RouterOutlet
  ],
  animations: [fadeInOut],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  friendships: FriendshipInfoResponse[] = null;

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
          setTimeout(() => {
            console.log(friendships);
            this.friendships = friendships;
          }, 500);
        },
        error: err => console.log(err)
      });
  }

  showRequests() : void {
    this.router.navigateByUrl('/friends/requests');
  }

  onUnfriend(friendshipId: number) {
    this.friendshipService.cancelFriendship(friendshipId)
      .subscribe({
        next: response => {
          console.log(response);
          this.friendships =
            this.friendships.filter(fs => fs.friendshipId != friendshipId);
        },
        error: err => console.log(err)
      });
  }
}
