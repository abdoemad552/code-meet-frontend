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
  @Input() isMuted: boolean;
  @Input() isMicObtained: boolean;
  @Output() leaveClicked = new EventEmitter<void>();
  @Output() toggleMuted = new EventEmitter<void>();

  constructor() {}

  onLeave() {
    this.leaveClicked.emit();
  }

  onToggleMuted() {
    this.toggleMuted.emit();
  }
}
