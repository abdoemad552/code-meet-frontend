import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {FriendCardComponent} from '../friend-card/friend-card.component';
import {FriendshipInfoResponse} from '../../../models/friendship/friendship-info-response.dto';
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
  owner: UserInfoResponse;
  requests: FriendshipInfoResponse[] = [];

  @Output() hideRequests = new EventEmitter<void>();
  @Output() friendshipAccepted = new EventEmitter<void>();

  constructor(private friendshipService: FriendshipService) {
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  ngOnInit(): void {
    this.getRequests();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.onHideRequests()
    event.preventDefault();
  }

  getRequests() {
    const userInfo: UserInfoResponse =
      JSON.parse(sessionStorage.getItem("userInfo"));
    this.friendshipService.getAllPendingReceivedFriendships(userInfo.userId)
      .subscribe({
        next: requests => {
          this.requests = requests;
          console.log(requests);
        },
        error: err => console.log(err)
      });
  }

  onHideRequests() {
    this.hideRequests.emit()
  }

  onFriendshipAccepted(toId: number) {
    this.friendshipService.acceptFriendship({
      fromId: this.owner.userId,
      toId: toId
    }).subscribe({
        next: fs => {
          this.requests = this.requests.filter(
            fsr => fsr.friendshipId != fs.friendshipId);
          this.friendshipAccepted.emit();
        },
        error: err => console.log(err)
      });
  }

  onFriendshipCanceled(friendshipId: number) {
    this.friendshipService.cancelFriendship(friendshipId)
      .subscribe({
        next: response => {
          console.log(response);
          if (response.status == HttpStatusCode.NoContent) {
            this.requests = this.requests.filter(
              fs => fs.friendshipId != friendshipId);
          }
        },
        error: err => console.log(err)
      });
  }
}
