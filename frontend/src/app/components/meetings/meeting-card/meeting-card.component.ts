import { Component, Input, OnChanges } from '@angular/core';
import { MeetingInfoResponse } from '../../../models/meeting/meeting-info-response.dto';
import {formatDateTime} from '../../../shared/utils';
import {NgClass, NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meeting-card',
  standalone: true,
  templateUrl: './meeting-card.component.html',
  imports: [
    NgClass,
    NgIf
  ],
  styleUrl: './meeting-card.component.css'
})
export class MeetingCardComponent {
  @Input() meeting: MeetingInfoResponse;
  @Input() isScheduled: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.meeting.startsAt = formatDateTime(this.meeting.startsAt);
  }

  onCardClick() {
    this.router.navigateByUrl(`/meeting/${this.meeting.meetingId}`);
  }

  onActionButtonClick($event: MouseEvent) {

  }

  get buttonText(): string {
    return this.isScheduled ? 'Join / Details' : 'View Summary';
  }
}
