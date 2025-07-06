import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {MeetingService} from '../../../services/meeting.service';
import {uuidValidator} from '../../../shared/validators';

@Component({
  selector: 'app-join-meeting',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './join-meeting.component.html',
  styleUrl: './join-meeting.component.css'
})
export class JoinMeetingComponent {
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
      meetingId: ['', [Validators.required, uuidValidator()]]
    });
  }

  onSubmit() {
    console.log(this.meetingForm.valid);
    if (this.meetingForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const meetingId = this.meetingForm.value['meetingId'];
      console.log('Joining the meeting:', meetingId);

      this.meetingService.getMeeting(meetingId)
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

  private showSuccessFeedback() {
    this.isSubmitting = false;
    this.successMessage = 'Found! Redirecting to the meeting...';
  }

  resetForm() {
    this.meetingForm.reset({
      title: '',
      description: '',
    });
  }

  private handleSubmissionError(error: any) {
    this.isSubmitting = false;
    this.errorMessage = 'Meeting does not exist. Please try again.';
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

  get meetingId() { return this.meetingForm.get('meetingId'); }
}
