import { Component, Input } from '@angular/core';
import {RouterLink} from '@angular/router';
import { RoomInfoResponse } from '../../../models/room/room-info-response.dto';
import {NgIf} from '@angular/common';

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

  formatTime(isoString: string): string {
    if (!isoString) isoString = new Date().toISOString();
    const date = new Date(isoString);

    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = date.toLocaleDateString('en-GB'); // British format gives DD/MM/YYYY

    return `${dateString} ${timeString}`;
  }
}
