import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {AgoraRtcService} from '../../../../../services/agora-rtc.service';
import {MeetingStateService} from '../../../../../services/states/meeting-state.service';

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
  @Output() sidebarContentChange = new EventEmitter<'CHAT' | 'PARTICIPANTS' | 'HIDDEN'>();
  @Output() mainAreaContentChange = new EventEmitter<'EDITOR' | 'SCREEN_SHARE' | 'PARTICIPANTS'>();

  constructor(
    protected rtc: AgoraRtcService,
    protected state: MeetingStateService
  ) {
  }

  onLeave() {
    this.leave.emit();
  }

  onToggleChatSidebar() {
    this.sidebarContentChange.emit('CHAT');
  }

  onToggleParticipantsSidebar() {
    this.sidebarContentChange.emit('PARTICIPANTS');
  }

  onToggleEditor() {
    this.mainAreaContentChange.emit('EDITOR');
  }

  onToggleScreenShare() {
    this.mainAreaContentChange.emit('SCREEN_SHARE');
  }

  onToggleMicMuted() {

  }

  onToggleCamEnabled() {

  }

  get timer() {
    const startedAt = new Date(this.state.meeting.startsAt);
    const now = new Date();

    const diffInMs = now.getTime() - startedAt.getTime();
    if (diffInMs < 0) {
      throw new Error("The given date is in the future.");
    }

    const totalSeconds = Math.floor(diffInMs / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return `${(hours)}:${minutes}:${seconds}`;
  }
}
