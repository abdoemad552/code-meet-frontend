import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {RoomInfoResponse} from '../../../models/room/room-info-response.dto';
import {NgIf} from '@angular/common';
import {formatDateTime} from '../../../shared/utils';

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

  protected readonly formatDateTime = formatDateTime;
}
