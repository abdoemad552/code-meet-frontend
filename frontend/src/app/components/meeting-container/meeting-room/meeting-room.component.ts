import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MeetingHeaderComponent} from './header/meeting-header.component';
import {MeetingContentComponent} from './content/meeting-content.component';

@Component({
  selector: 'app-meeting-room',
  imports: [MeetingContentComponent, MeetingHeaderComponent],
  templateUrl: './meeting-room.component.html',
  standalone: true,
  styleUrl: './meeting-room.component.css'
})
export class MeetingRoomComponent {
  @Input() meetingId: string | null = null;
  @Output() leaveClicked = new EventEmitter<boolean>();

  constructor() {}

  onLeave() {
    this.leaveClicked.emit(true);
  }
}
