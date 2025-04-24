import {Component, EventEmitter, Output} from '@angular/core';
import {FriendCardComponent} from '../friend-card/friend-card.component';
import {FriendshipInfoResponse} from '../../../models/friendship/friendship-info-response.dto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-friend-requests',
  standalone: true,
  imports: [
    FriendCardComponent
  ],
  templateUrl: './friend-requests.component.html',
  styleUrl: './friend-requests.component.css'
})
export class FriendRequestsComponent {
  requests! : boolean;

  @Output() requestsState = new EventEmitter<boolean>();

  testFriend: FriendshipInfoResponse = {
    friendshipId: 1,
    friendFirstName: 'Ahmed',
    friendLastName: 'Mohamed',
    friendUserName: 'ahMo214',
    friendProfilePictureUrl: 'https://placehold.co/65'
  };

  constructor(private router : Router) {
  }

  hideRequests() {
    this.router.navigateByUrl('/friends')
      .catch(reason => console.log(reason));
    this.requests = false;
    this.requestsState.emit(this.requests);
  }
}
