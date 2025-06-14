import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';
import {NgIf} from '@angular/common';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent implements OnInit {
  @Output() hideEditProfile = new EventEmitter<void>();

  user: UserInfoResponse;
  isSubmitting: boolean = false;
  submitError: string = '';
  requestSent: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.onHideEditProfile();
    event.preventDefault();
  }

  onHideEditProfile() {
    this.hideEditProfile.emit();
  }

  onSubmit() {
    try {
      this.isSubmitting = true;
      this.validate();
      setTimeout(() => {
        this.isSubmitting = false;
        this.requestSent = true;
      }, 1000);
    } catch (error) {
      this.isSubmitting = false;
      this.submitError = error;
    }
  }

  validate() {
  }
}
