import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MeetingInfoResponse } from '../../models/meeting/meeting-info-response.dto';
import { MeetingService } from '../../services/meeting.service';
import {ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {MeetingCardComponent} from './meeting-card/meeting-card.component';
import {MeetingBoxComponent} from './meeting-box/meeting-box.component';

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgStyle,
    NgForOf,
    MeetingCardComponent,
    MeetingBoxComponent
  ],
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.css'
})
export class MeetingsComponent {
  isScheduledShown: boolean = true;
  scheduledMeetings: MeetingInfoResponse[] = [];
  previousMeetings: MeetingInfoResponse[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private meetingService: MeetingService
  ) {
  }

  ngOnInit() {
    const owner = JSON.parse(sessionStorage.getItem("userInfo"));
    this.getComingMeetings(owner.userId);
    this.getPreviousMeetings(owner.userId);
  }

  getComingMeetings(userId: number){
    this.meetingService.getScheduledMeetings(userId)
      .subscribe({
        next: scheduledMeetings => {
          console.log(scheduledMeetings);
          this.scheduledMeetings = scheduledMeetings;
        }
      });
  }

  getPreviousMeetings(userId: number) {
    this.meetingService.getPreviousMeetings(userId)
      .subscribe({
        next: previousMeetings => {
          console.log(previousMeetings);
          this.previousMeetings = previousMeetings;
        }
      });
  }

  onShowScheduledMeetings() {
    this.isScheduledShown = true;
  }

  onShowPreviousMeetings() {
    this.isScheduledShown = false;
  }

  get shownMeetings() {
    return this.isScheduledShown ? this.scheduledMeetings : this.previousMeetings;
  }
}
