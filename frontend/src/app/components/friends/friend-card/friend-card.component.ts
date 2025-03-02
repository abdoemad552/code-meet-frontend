import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import { FriendshipRequest } from '../../../models/friendship/friendship-request.dto';
import { FriendshipResponse } from '../../../models/friendship/friendship-response.dto';

@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.css'
})
export class FriendCardComponent {
   @Input() friend!:FriendshipResponse;


}
