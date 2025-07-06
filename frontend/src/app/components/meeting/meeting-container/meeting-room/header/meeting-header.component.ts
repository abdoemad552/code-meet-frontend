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
}
