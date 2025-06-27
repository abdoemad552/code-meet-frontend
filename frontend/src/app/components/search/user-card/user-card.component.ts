import {Component, Input} from '@angular/core';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';

@Component({
  selector: 'search-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: UserInfoResponse;
}
