import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MembershipInfoResponse} from '../../../../models/membership/membership-info-response.dto';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-member-card',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input() membership: MembershipInfoResponse;
  @Input() isMembershipRequest: boolean;
  @Output() membershipAccepted = new EventEmitter<number>();
  @Output() membershipCanceled = new EventEmitter<number>();

  onMembershipAccepted() {
    console.log('Accepted: ', this.membership.membershipId);
    this.membershipAccepted.emit(this.membership.membershipId);
  }

  onMembershipCanceled() {
    this.membershipCanceled.emit(this.membership.membershipId);
  }
}
