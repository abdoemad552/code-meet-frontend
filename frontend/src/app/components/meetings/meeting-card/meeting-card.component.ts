import { Component, Input, OnChanges } from '@angular/core';
import { MeetingResponse } from '../../../models/meeting/meeting-response.dto';

@Component({
  selector: 'app-meeting-card',
  standalone: true,
  templateUrl: './meeting-card.component.html',
  styleUrl: './meeting-card.component.css'
})
export class MeetingCardComponent implements OnChanges {

  @Input() comingMeeting!: MeetingResponse;
  @Input() previousMeeting!: MeetingResponse;

  meetingDay: string = '';
  meetingMonth: string = '';
  meetingYear: string = '';
  meetingTime: string = '';

  ngOnChanges(): void {
    let meetingDate=new Date();
    if(this.comingMeeting?.startsAt) meetingDate=new Date(this.comingMeeting.startsAt);
    if(this.previousMeeting?.startsAt) meetingDate=new Date(this.previousMeeting.startsAt);

      this.meetingDay = meetingDate.getDate().toString();
      this.meetingMonth = meetingDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      this.meetingYear = meetingDate.getFullYear().toString();
      this.meetingTime = meetingDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    
  }
}
