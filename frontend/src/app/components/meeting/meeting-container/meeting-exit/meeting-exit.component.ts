import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MeetingStateService} from '../../../../services/states/meeting-state.service';
import {MeetingView} from '../../../../models/meeting/state/meeting-view';

@Component({
  selector: 'app-meeting-exit',
  imports: [],
  templateUrl: './meeting-exit.component.html',
  styleUrl: './meeting-exit.component.css'
})
export class MeetingExitComponent {

  constructor(
    private router: Router,
    private state: MeetingStateService
  ) {
  }

  onRejoin() {
    this.state.setCurrentView(MeetingView.ENTRANCE);
  }

  onReturnHome() {
    this.router.navigateByUrl('/home');
  }

  onViewRecentMeetings() {
    this.router.navigateByUrl('/meetings');
  }
}
