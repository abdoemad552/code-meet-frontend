import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MeetingHeaderComponent} from './header/meeting-header.component';
import {MeetingContentComponent} from './content/meeting-content.component';
import {AgoraRtcService} from '../../../services/agora-rtc.service';
import {AgoraRtmService} from '../../../services/agora-rtm.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-meeting-room',
  imports: [MeetingContentComponent, MeetingHeaderComponent],
  templateUrl: './meeting-room.component.html',
  standalone: true,
  styleUrl: './meeting-room.component.css'
})
export class MeetingRoomComponent {
  @Input() meetingId: string;
  @Output() leave = new EventEmitter<void>();

  sidebarContent: 'CHAT' | 'PARTICIPANTS' | 'HIDDEN' = 'CHAT';
  volumeLevels: { [userId: number]: number } = {};
  subscriptions: Subscription[] = [];

  constructor(
    protected rtcService: AgoraRtcService,
    protected rtmService: AgoraRtmService
  ) {}

  onLeave() {
    this.leave.emit();
  }

  onHideSidebar() {
    this.sidebarContent = 'HIDDEN';
  }

  onSidebarChanged(content: 'CHAT' | 'PARTICIPANTS') {
    console.log(content);
    if (this.sidebarContent === content) {
      this.sidebarContent = 'HIDDEN';
    } else {
      this.sidebarContent = content;
    }
  }
}
