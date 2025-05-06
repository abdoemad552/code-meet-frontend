import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    NgIf
  ],
  templateUrl: './meeting-header.component.html',
  standalone: true,
  styleUrl: './meeting-header.component.css'
})
export class MeetingHeaderComponent {
  @Input() isMicMuted: boolean;
  @Input() isCamEnabled: boolean;
  @Input() isMicObtained: boolean;
  @Input() isCamObtained: boolean;
  @Output() toggleMicMuted = new EventEmitter<void>();
  @Output() toggleCamEnabled = new EventEmitter<void>();
  @Output() meetingLeaveClicked = new EventEmitter<void>();
  @Output() toggleChatSidebar = new EventEmitter<void>();
  @Output() toggleParticipantsSidebar = new EventEmitter<void>();

  onToggleMicMuted() {
    this.toggleMicMuted.emit();
  }

  onToggleCamEnabled() {
    this.toggleCamEnabled.emit();
  }

  onMeetingLeaveClicked() {
    this.meetingLeaveClicked.emit();
  }

  onToggleChatSidebar() {
    this.toggleChatSidebar.emit();
  }

  onToggleParticipantsSidebar() {
    this.toggleParticipantsSidebar.emit();
  }
}
