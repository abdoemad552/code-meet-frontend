import {Component, Input} from '@angular/core';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'search-user-card',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: UserInfoResponse;
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

  get fullName() {
    return this.user.firstName + ' ' + this.user.lastName;
  }
}
