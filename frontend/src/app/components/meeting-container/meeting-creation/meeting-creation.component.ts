import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MeetingService} from '../../../services/meeting.service';
import {ScheduleMeetingRequest} from '../../../models/meeting/schedule-meeting-request.dto';
import {MeetingResponse} from '../../../models/meeting/meeting-response.dto';

@Component({
  selector: 'app-meeting-creation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './meeting-creation.component.html',
  styleUrls: ['./meeting-creation.component.css']
})
export class MeetingCreationComponent {
  meetingForm: FormGroup;
  participants: string[] = [];
  newParticipant = '';
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  // TODO: Validate from values (date, time, and others)...

  constructor(
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

  async onSubmit() {
    console.log(this.meetingForm.valid);
    if (this.meetingForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';


      const formData = this.prepareFormData();
      console.log('Meeting scheduled:', formData);

      const userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
      const scheduleMeetingRequest: ScheduleMeetingRequest = {
        title: formData.title,
        description: formData.description,
        creatorId: userId,
        startsAt: formData.startsAt,
        participants: formData.participants
      };

      this.meetingService.scheduleMeeting(scheduleMeetingRequest)
        .subscribe({
          next: (meetingInfo: MeetingResponse) => {
            console.log(meetingInfo);
          },
          error: (error: any) => {
            this.handleSubmissionError(error);
          },
          complete: () => {
            this.showSuccessFeedback();
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
    setTimeout(() => {
      this.resetForm();
      this.successMessage = '';
    }, 3000);
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
