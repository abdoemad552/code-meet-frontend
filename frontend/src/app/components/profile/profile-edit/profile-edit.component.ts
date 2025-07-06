import {Component, HostListener, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {getOwner} from '../../../shared/environment';

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
  isSubmitting: boolean = false;
  submitError: string = '';
  requestSent: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit() {
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

  get owner() {
    return getOwner();
  }
}
