import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {MembershipInfoResponse} from '../../../../models/membership/membership-info-response.dto';
import {NgForOf, NgIf} from '@angular/common';
import {MemberCardComponent} from '../member-card/member-card.component';
import {MembershipService} from '../../../../services/membership.service';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'app-membership-requests',
  imports: [
    NgForOf,
    NgIf,
    MemberCardComponent
  ],
  templateUrl: './membership-requests.component.html',
  styleUrl: './membership-requests.component.css'
})
export class MembershipRequestsComponent implements OnInit {
  requests: MembershipInfoResponse[] = [];

  @Input() roomId: number;
  @Output() hideRequests = new EventEmitter<void>();
  @Output() membershipAccepted = new EventEmitter<void>();

  constructor(private membershipService: MembershipService) {
  }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.membershipService.getAllPendingMembershipsByRoomId(this.roomId)
      .subscribe({
        next: requests => {
          this.requests = requests;
          console.log(requests);
        },
        error: err => console.log(err)
      });
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.onHideRequests()
    event.preventDefault();
  }

  onHideRequests() {
    this.hideRequests.emit();
  }

  onMembershipAccepted(membershipId: number) {
    console.log('Membership Id: ', membershipId);
    this.membershipService.acceptMembershipById(membershipId)
      .subscribe({
        next: response => {
          if (response.status == HttpStatusCode.NoContent) {
            this.requests =
              this.requests.filter(r => r.membershipId != membershipId);
            this.membershipAccepted.emit();
          }
        },
        error: err => console.error(err)
      });
  }

  onMembershipCanceled(membershipId: number) {
    this.membershipService.cancelMembershipById(membershipId)
      .subscribe({
        next: response => {
          if (response.status == HttpStatusCode.NoContent) {
            this.requests =
              this.requests.filter(r => r.membershipId != membershipId);
          }
        },
        error: err => console.log(err)
      });
  }
}
