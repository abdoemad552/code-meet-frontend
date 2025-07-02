import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {AgoraRtcService} from '../../../../services/agora-rtc.service';

@Component({
  selector: 'meeting-room-header',
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './meeting-header.component.html',
  standalone: true,
  styleUrl: './meeting-header.component.css'
})
export class MeetingHeaderComponent {
  @Input() sidebarContent: 'CHAT' | 'PARTICIPANTS' | 'HIDDEN';
  @Input() mainAreaContent: 'EDITOR' | 'SCREEN_SHARE' | 'PARTICIPANTS';
  @Output() leave = new EventEmitter<void>();
  @Output() toggleChatSidebar = new EventEmitter<void>();
  @Output() toggleParticipantsSidebar = new EventEmitter<void>();
  @Output() toggleEditor = new EventEmitter<void>();
  @Output() toggleScreenShare = new EventEmitter<void>();

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

  onToggleEditor() {
    this.toggleEditor.emit();
  }

  onToggleScreenShare() {
    this.toggleScreenShare.emit();
  }
}
