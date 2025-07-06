import {Component, HostListener} from '@angular/core';
import {MeetingHeaderComponent} from './header/meeting-header.component';
import {MeetingContentComponent} from './content/meeting-content.component';
import {MeetingStateService} from '../../../../services/states/meeting-state.service';
import {MeetingView} from '../../../../models/meeting/state/meeting-view';

@Component({
  selector: 'app-meeting-room',
  imports: [MeetingContentComponent, MeetingHeaderComponent],
  templateUrl: './meeting-room.component.html',
  standalone: true,
  styleUrl: './meeting-room.component.css'
})
export class MeetingRoomComponent {
  sidebarContent: 'CHAT' | 'PARTICIPANTS' | 'HIDDEN' = 'CHAT';
  mainAreaContent: 'EDITOR' | 'SCREEN_SHARE' | 'PARTICIPANTS' = 'PARTICIPANTS';

  constructor(protected state: MeetingStateService) {
  }

  ngOnInit() {
    this.state.initMeetingRoom();
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    event.preventDefault();
    if (this.sidebarContent !== 'HIDDEN') {
      this.onSidebarChanged('HIDDEN');
    } else if (this.mainAreaContent === 'EDITOR') {
      this.onMainAreaChanged('PARTICIPANTS');
    }
  }

  onLeave() {
    this.state.setCurrentView(MeetingView.EXIT);
  }

  onHideSidebar() {
    this.sidebarContent = 'HIDDEN';
  }

  onSidebarChanged(content: 'CHAT' | 'PARTICIPANTS' | 'HIDDEN') {
    console.log(content);
    if (this.sidebarContent === content) {
      this.sidebarContent = 'HIDDEN';
    } else {
      this.sidebarContent = content;
    }
  }

  onMainAreaChanged(content: 'EDITOR' | 'SCREEN_SHARE' | 'PARTICIPANTS') {
    if (this.mainAreaContent === content) {
      this.mainAreaContent = 'PARTICIPANTS';
    } else {
      this.mainAreaContent = content;
    }
  }

  ngOnDestroy() {
    this.state.leaveMeetingRoom();
  }
}
