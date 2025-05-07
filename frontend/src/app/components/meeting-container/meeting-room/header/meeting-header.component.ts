import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {AgoraRtcService} from '../../../../services/agora-rtc.service';

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
  @Output() leave = new EventEmitter<void>();
  @Output() toggleChatSidebar = new EventEmitter<void>();
  @Output() toggleParticipantsSidebar = new EventEmitter<void>();

  constructor(
    protected rtc: AgoraRtcService
  ) {
  }

  onLeave() {
    this.leave.emit();
  }

  onToggleChatSidebar() {
    this.toggleChatSidebar.emit();
  }

  onToggleParticipantsSidebar() {
    this.toggleParticipantsSidebar.emit();
  }
}
