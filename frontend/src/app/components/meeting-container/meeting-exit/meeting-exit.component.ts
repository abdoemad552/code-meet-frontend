import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meeting-exit',
  imports: [],
  templateUrl: './meeting-exit.component.html',
  styleUrl: './meeting-exit.component.css'
})
export class MeetingExitComponent {
  @Output() rejoin = new EventEmitter<void>();

  constructor(
    private router: Router
  ) {
  }

  onRejoin() {
    this.rejoin.emit();
  }

  onReturnHome() {
    this.router.navigateByUrl('/home');
  }

  onViewRecentMeetings() {
    this.router.navigateByUrl('/meetings');
  }
}
