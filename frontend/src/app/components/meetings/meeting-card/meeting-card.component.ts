import { Component, Input, OnChanges } from '@angular/core';
import { MeetingInfoResponse } from '../../../models/meeting/meeting-info-response.dto';
import {formatDateTime} from '../../../shared/utils';
import {NgClass, NgIf} from '@angular/common';

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

  ngOnInit() {
    this.meeting.startsAt = formatDateTime(this.meeting.startsAt);
  }

  onCardClick() {

  }

  onActionButtonClick($event: MouseEvent) {

  }

  get buttonText(): string {
    return this.isScheduled ? 'Join / Details' : 'View Summary';
  }
}
