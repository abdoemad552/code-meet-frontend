import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {RoomInfoResponse} from '../../../models/room/room-info-response.dto';

@Component({
  selector: 'search-room-card',
  imports: [
    RouterLink
  ],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  @Input() room: RoomInfoResponse;
}
