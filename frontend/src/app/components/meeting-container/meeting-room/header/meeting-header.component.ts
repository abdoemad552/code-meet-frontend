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
  @Input() isMuted: boolean = true;
  @Output() leaveClicked = new EventEmitter<void>();
  @Output() toggleMuted = new EventEmitter<void>();

  onLeave() {
    this.leaveClicked.emit();
  }

  onToggleMuted() {
    this.toggleMuted.emit();
  }
}
