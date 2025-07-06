import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AgoraRtcService} from '../../../../../services/agora-rtc.service';
import {AgoraRtmService} from '../../../../../services/agora-rtm.service';
import {CodeEditorComponent} from '../../../../code-editor/code-editor.component';
import {fadeInOut} from '../../../../../shared/animations';
import {MeetingStateService} from '../../../../../services/states/meeting-state.service';
import {MeetingSidebarComponent} from './sidebar/meeting-sidebar.component';

@Component({
  selector: 'meeting-room-content',
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    CodeEditorComponent,
    NgClass,
    MeetingSidebarComponent
  ],
  animations: [fadeInOut],
  templateUrl: './meeting-content.component.html',
  standalone: true,
  styleUrl: './meeting-content.component.css'
})
export class MeetingContentComponent implements OnDestroy {
  @Input() sidebarContent: 'CHAT' | 'PARTICIPANTS' | 'HIDDEN';
  @Input() mainAreaContent: 'EDITOR' | 'SCREEN_SHARE' | 'PARTICIPANTS';
  @Output() hideSidebar = new EventEmitter<void>();

  constructor(
    protected rtcService: AgoraRtcService,
    protected rtmService: AgoraRtmService,
    protected state: MeetingStateService
  ) {
  }

  ngOnInit() {}

  ngAfterViewChecked() {
    if (this.state.participants) {
      for (let participant of this.state.participants) {
        this.rtcService.playVideoTrack(participant.participantId);
      }
    }
  }

  onHideSidebar() {
    this.hideSidebar.emit();
  }

  ngOnDestroy() {
  }
}
