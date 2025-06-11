import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {FriendCardComponent} from '../friend-card/friend-card.component';
import {FriendshipInfoResponse} from '../../../models/friendship/friendship-info-response.dto';
import {Router} from '@angular/router';
import {FriendshipService} from '../../../services/friendship.service';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';
import {NgForOf, NgIf} from '@angular/common';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'app-friend-requests',
  standalone: true,
  imports: [
    FriendCardComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './friend-requests.component.html',
  styleUrl: './friend-requests.component.css'
})
export class FriendRequestsComponent {
  requests: FriendshipInfoResponse[] = [];

  @Output() hideRequests = new EventEmitter<void>();
  @Output() friendshipAccepted = new EventEmitter<void>();

  constructor(
    private router: Router,
    private friendshipService: FriendshipService
  ) {
  }

  ngOnInit(): void {
    const userInfo: UserInfoResponse =
      JSON.parse(sessionStorage.getItem("userInfo"));
    this.getRequests(userInfo.userId);
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.onHideRequests()
    event.preventDefault();
  }

  getRequests(userId: number) {
    this.friendshipService.getAllPendingReceivedFriendships(userId)
      .subscribe({
        next: requests => {
          this.requests = requests;
          console.log(requests);
        },
        error: err => console.log(err)
      });
  }

  onHideRequests() {
    this.router.navigateByUrl('/friends')
      .then(() => this.hideRequests.emit())
      .catch(reason => console.log(reason));
  }

  onFriendshipAccepted(friendshipId: number) {
    this.friendshipService.acceptFriendship(friendshipId)
      .subscribe({
        next: (response) => {
          if (response.status == HttpStatusCode.NoContent) {
            this.requests =
              this.requests.filter(r => r.friendshipId != friendshipId);
            this.friendshipAccepted.emit();
          }
        }
      });
  }

  onFriendshipCanceled(friendshipId: number) {
    this.friendshipService.cancelFriendship(friendshipId)
      .subscribe({
        next: response => {
          console.log(response);
          if (response.status == HttpStatusCode.NoContent) {
            this.requests =
              this.requests.filter(r => r.friendshipId != friendshipId);
          }
        },
        error: response => {
          console.log(response);
        }
      });
  }
}
