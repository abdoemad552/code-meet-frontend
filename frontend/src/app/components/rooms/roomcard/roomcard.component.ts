import { Component, Input } from '@angular/core';
import {RouterLink} from '@angular/router';
import { RoomInfoResponse } from '../../../models/room/room-info-response.dto';

@Component({
  selector: 'app-roomcard',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './roomcard.component.html',
  styleUrl: './roomcard.component.css'
})
export class RoomcardComponent {
  @Input() roomInformation!:RoomInfoResponse;
}
