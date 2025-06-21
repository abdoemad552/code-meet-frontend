import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import { FriendshipInfoResponse } from '../../../models/friendship/friendship-info-response.dto';

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.css'
})
export class FriendCardComponent {
  @Input() friendship: FriendshipInfoResponse;
  @Input() isFriendRequest: boolean;
  @Output() friendshipAccepted = new EventEmitter<number>();
  @Output() friendshipCanceled = new EventEmitter<number>();

  onFriendshipAccepted() {
    this.friendshipAccepted.emit(this.friendship.other.userId);
  }

  onFriendshipCanceled() {
    this.friendshipCanceled.emit(this.friendship.friendshipId);
  }
}
