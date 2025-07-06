import {Component} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MeetingService} from '../../../services/meeting.service';
import {ScheduleMeetingRequest} from '../../../models/meeting/schedule-meeting-request.dto';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-schedule-meeting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent {
  meetingForm: FormGroup;
  participants: string[] = [];
  newParticipant = '';
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  // TODO: Validate from values (date, time, and others)...

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private meetingService: MeetingService
  ) {
    this.meetingForm = this.builder.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  addParticipant() {
    const participant = this.newParticipant.trim();
    if (participant && !this.participants.includes(participant)) {
      this.participants.push(participant);
      this.newParticipant = '';
    }
  }

  removeParticipant(index: number) {
    this.participants.splice(index, 1);
  }

  onSubmit() {
    console.log(this.meetingForm.valid);
    if (this.meetingForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formData = this.prepareFormData();
      console.log('Meeting scheduled:', formData);

      const owner = JSON.parse(sessionStorage.getItem("userInfo"));
      const scheduleMeetingRequest: ScheduleMeetingRequest = {
        ...formData,
        creatorId: owner.userId,
      };
      console.log(scheduleMeetingRequest);

      this.meetingService.scheduleMeeting(scheduleMeetingRequest)
        .subscribe({
          next: meeting => {
            setTimeout(() => {
              console.log(meeting);
              this.showSuccessFeedback();
              setTimeout(() => {
                this.router.navigateByUrl('/meetings');
                // TODO: Route to meeting view...
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
    const localDateTime = new Date(
      `${this.meetingForm.value.date}T${this.meetingForm.value.time}`
    );

    return {
      title: this.meetingForm.value['title'],
      description: this.meetingForm.value['description'],
      startsAt: localDateTime.toISOString(),
      participants: this.participants
    };
  }

  private showSuccessFeedback() {
    this.isSubmitting = false;
    this.successMessage = 'Meeting scheduled successfully!';
  }

  protected resetForm() {
    this.meetingForm.reset({
      title: '',
      description: '',
      date: '',
      time: ''
    });
    this.participants = [];
  }

  private handleSubmissionError(error: any) {
    this.isSubmitting = false;
    this.errorMessage = 'Failed to schedule meeting. Please try again.';
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
  get date() { return this.meetingForm.get('date'); }
  get time() { return this.meetingForm.get('time'); }
}
