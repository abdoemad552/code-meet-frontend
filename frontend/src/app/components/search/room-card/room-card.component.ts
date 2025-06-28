import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {RoomInfoResponse} from '../../../models/room/room-info-response.dto';
import {NgIf} from '@angular/common';

@Component({
  selector: 'search-room-card',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  @Input() room: RoomInfoResponse;
  @Input() matchingPart: string;

  before(str: string) {
    let index = str.toLowerCase().indexOf(this.matchingPart.toLowerCase());
    if (index === -1) return str;
    return str.substring(0, index);
  }

  matching(str: string) {
    let index = str.toLowerCase().indexOf(this.matchingPart.toLowerCase());
    if (index === -1) return '';
    return str.substring(index, index + this.matchingPart.length);
  }

  after(str: string) {
    let index = str.toLowerCase().indexOf(this.matchingPart.toLowerCase());
    if (index === -1) return '';
    return str.substring(index + this.matchingPart.length);
  }

  formatTime(isoString: string): string {
    if (!isoString) isoString = new Date().toISOString();
    const date = new Date(isoString);

    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = date.toLocaleDateString('en-GB'); // British format gives DD/MM/YYYY

    return `${dateString} ${timeString}`;
  }
}
