import { Component, Input } from '@angular/core';
import {RouterLink} from '@angular/router';
import { RoomInfoResponse } from '../../../models/room/room-info-response.dto';
import {NgIf} from '@angular/common';
import {formatDateTime} from '../../../shared/utils';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  @Input() room: RoomInfoResponse;
  protected readonly formatDateTime = formatDateTime;
}
