import { Component } from '@angular/core';
import {MeetingsboxComponent} from './meetingsbox/meetingsbox.component';
import {Router} from '@angular/router';
import {MeetingsTabsComponent} from './meetingstabs/meetingstabs.component';
import { MeetingResponse } from '../../models/meeting/meeting-response.dto';
import { MeetingService } from '../../services/meeting.service';

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [
    MeetingsboxComponent,
    MeetingsTabsComponent
  ],
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.css'
})
export class MeetingsComponent {

  currentRoute: string = '';

  comingMeetings:MeetingResponse[]=[];
  previousMeetings:MeetingResponse[]=[];

  constructor(
    private router: Router,
    private meetingService: MeetingService
  ) {
  }

  ngOnInit() {
    this.getCurrentRoute();
    this.getComingMeetings(1);
    this.getPreviousMeetings(1);
  }

  getComingMeetings(userId: number): void {
    this.meetingService.getScheduledMeetings(userId)
      .subscribe((data: MeetingResponse[]) => {
        this.comingMeetings = data;
        console.log(data);
      });
  }

  getPreviousMeetings(userId: number): void {
    this.meetingService.getPreviousMeetings(userId)
      .subscribe((data: MeetingResponse[]) => {
        this.previousMeetings = data;
        console.log(data);
      });
  }

  private getCurrentRoute() {
    // Get the current route URL
    this.currentRoute = this.router.url;

    console.log(this.currentRoute);
  }
}
