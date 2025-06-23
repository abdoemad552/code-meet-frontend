import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserInfoResponse} from '../../../models/user/user-info-response.dto';
import {NgIf} from '@angular/common';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  owner: UserInfoResponse;
  isSubmitting: boolean = false;
  submitError: string = '';
  requestSent: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    event.preventDefault();
    this.onHideEditProfile();
  }

  onHideEditProfile() {
    this.router.navigateByUrl(`/profile/${this.owner.username}`);
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
