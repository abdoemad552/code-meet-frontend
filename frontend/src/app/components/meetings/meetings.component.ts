import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MeetingInfoResponse } from '../../models/meeting/meeting-info-response.dto';
import { MeetingService } from '../../services/meeting.service';
import {ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {MeetingCardComponent} from './meeting-card/meeting-card.component';
import {MeetingBoxComponent} from './meeting-box/meeting-box.component';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';
import {fadeInOut} from '../../shared/animations';

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
  animations: [fadeInOut],
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.css'
})
export class MeetingsComponent {
  owner: UserInfoResponse;
  isScheduledShown: boolean = true;
  scheduledMeetings: MeetingInfoResponse[] = [];
  previousMeetings: MeetingInfoResponse[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private meetingService: MeetingService
  ) {
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  ngOnInit() {
    this.getComingMeetings();
    this.getPreviousMeetings();
  }

  getComingMeetings(){
    this.meetingService.getScheduledMeetings(this.owner.userId)
      .subscribe({
        next: scheduledMeetings => {
          console.log(scheduledMeetings);
          this.scheduledMeetings = scheduledMeetings;
        }
      });
  }

  getPreviousMeetings() {
    this.meetingService.getPreviousMeetings(this.owner.userId)
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
