import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import { FriendshipInfoResponse } from '../../../models/friendship/friendship-info-response.dto';

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgClass
  ],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.css'
})
export class FriendCardComponent {
  @Input() friend!: FriendshipInfoResponse;
  @Input() isFriendRequest!: boolean;
}
