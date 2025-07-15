import {Component, HostListener, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {getOwner, setOwner} from '../../../shared/environment';
import {fadeInOut} from '../../../shared/animations';
import {UserUpdateRequest} from '../../../models/user/user-update-request.dto';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
  ],
  animations: [fadeInOut],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent implements OnInit {
  updateRequest: UserUpdateRequest = {
    userId: getOwner().userId,
    firstName: getOwner().firstName,
    lastName: getOwner().lastName,
    username: getOwner().username,
    gender: getOwner().gender,
    bio: getOwner().bio
  };
  isSubmitting: boolean = false;
  submitError: string = '';
  requestSent: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    event.preventDefault();
    this.onHideEditProfile();
  }

  onHideEditProfile() {
    this.router.navigateByUrl(`/profile/${this.owner.username}`, { skipLocationChange: true })
      .then(() => {
        this.router.navigate([this.router.url]);
      });
  }

  onSubmit() {
    this.validate();
    this.isSubmitting = true;
    this.requestSent = false;
    console.log(this.updateRequest);
    this.userService.update(this.updateRequest)
      .subscribe({
        next: user => {
          setTimeout(() => {
            setOwner(user);
            this.isSubmitting = false;
            this.requestSent = true;
          }, 2000);
        },
        error: err => {
          this.isSubmitting = false;
          this.submitError = err.error.error;
        }
      });
    try {

    } catch (error) {

    }
  }

  validate() {
  }

  get owner() {
    return getOwner();
  }
}
