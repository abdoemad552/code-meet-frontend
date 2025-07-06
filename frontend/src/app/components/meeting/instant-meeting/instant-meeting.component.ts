import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MeetingService} from '../../../services/meeting.service';
import {InstantMeetingRequest} from '../../../models/meeting/instant-meeting-request.dto';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-instant-meeting',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './instant-meeting.component.html',
  styleUrl: './instant-meeting.component.css'
})
export class InstantMeetingComponent {
  meetingForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private meetingService: MeetingService,
  ) {
    this.meetingForm = this.builder.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    console.log(this.meetingForm.valid);
    if (this.meetingForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formData = this.prepareFormData();
      console.log('Creating an instant meeting:', formData);

      const owner = JSON.parse(sessionStorage.getItem("userInfo"));
      const instantMeetingRequest: InstantMeetingRequest = {
        ...formData,
        creatorId: owner.userId,
      };
      console.log(instantMeetingRequest);

      this.meetingService.instantMeeting(instantMeetingRequest)
        .subscribe({
          next: meeting => {
            setTimeout(() => {
              console.log(meeting);
              this.showSuccessFeedback();
              setTimeout(() => {
                this.router.navigateByUrl(`/meeting/${meeting.meetingId}`, {
                  state: { meeting: meeting }
                });
              }, 2000);
            }, 2000);
          },
          error: (error: any) => {
            this.handleSubmissionError(error);
          }
        });
    } else {
      this.handleInvalidForm();
    }
  }

  private prepareFormData() {
    return {
      title: this.meetingForm.value['title'],
      description: this.meetingForm.value['description'],
    };
  }

  private showSuccessFeedback() {
    this.isSubmitting = false;
    this.successMessage = 'Meeting created successfully! Redirecting...';
  }

  resetForm() {
    this.meetingForm.reset({
      title: '',
      description: '',
    });
  }

  private handleSubmissionError(error: any) {
    this.isSubmitting = false;
    this.errorMessage = 'Failed to instantiate a new meeting. Please try again.';
    console.error('Submission error:', error);
    setTimeout(() => this.errorMessage = '', 5000);
  }

  private handleInvalidForm() {
    this.isSubmitting = false;
    this.markFormGroupTouched(this.meetingForm);
    this.errorMessage = 'Please fill in all required fields correctly.';
    setTimeout(() => this.errorMessage = '', 5000);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get title() { return this.meetingForm.get('title'); }
}
