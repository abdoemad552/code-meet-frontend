import {Component, EventEmitter, HostListener, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MembershipService} from '../../../services/membership.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-join-room',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.css'
})
export class JoinRoomComponent {
  @Output() hideModal = new EventEmitter<void>();

  roomId: string = '';
  isSubmitting: boolean = false;
  submitError: string = '';
  requestSent: boolean = false;

  constructor(private membershipService: MembershipService) {
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.onHideModal()
    event.preventDefault();
  }

  onHideModal() {
    this.hideModal.emit();
  }

  onSubmit() {
    //TODO: Validate on roomId...
    this.submitError = '';
    this.isSubmitting = true;

    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.membershipService.requestMembership({
      userId: userInfo.userId,
      roomId: Number(this.roomId)
    }).subscribe({
      next: membershipInfo => {
        console.log(membershipInfo);
        setTimeout(() => {
          this.requestSent = true;
          this.isSubmitting = true;
        }, 1000);
      },
      error: err => {
        console.log(err);
        this.isSubmitting = false;
        this.submitError = 'Failed to send request. Please try again.';
      }
    });
  }
}
