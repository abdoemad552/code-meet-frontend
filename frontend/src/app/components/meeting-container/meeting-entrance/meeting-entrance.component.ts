import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meeting-entrance',
  imports: [],
  templateUrl: './meeting-entrance.component.html',
  standalone: true,
  styleUrl: './meeting-entrance.component.css'
})
export class MeetingEntranceComponent {
  @Input() meetingId: string | null = null;
  @Output() joinClicked = new EventEmitter<string>();
  @Output() backClicked = new EventEmitter<void>();

  constructor() {}

  onJoin(): void {
    if (this.meetingId) {
      this.joinClicked.emit(this.meetingId);
    } else {
      // Show
    }
  }

  onBack() {
    this.backClicked.emit();
  }
}
