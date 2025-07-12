import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {MeetingStateService} from '../../../../services/states/meeting-state.service';
import {MeetingView} from '../../../../models/meeting/state/meeting-view';
import {Router} from '@angular/router';
import {formatDateTime} from '../../../../shared/utils';

@Component({
  selector: 'app-meeting-not-started',
  templateUrl: './meeting-not-started.component.html',
  imports: [
    NgIf
  ]
})
export class MeetingNotStartedComponent implements OnInit, OnDestroy {
  remainingTime: string = '';
  meetingStarted = false;
  private intervalId: any;

  constructor(
    private router: Router,
    protected state: MeetingStateService
  ) {
  }

  ngOnInit() {
    this.updateRemainingTime();
    this.intervalId = setInterval(() => this.updateRemainingTime(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateRemainingTime() {
    const now = new Date();
    const startsAt = new Date(this.state.meeting.startsAt);
    const diff = startsAt.getTime() - now.getTime();

    if (diff <= 0) {
      this.meetingStarted = true;
      this.remainingTime = '00:00:00';
      clearInterval(this.intervalId);
    } else {
      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
      this.remainingTime = `${hours}:${minutes}:${seconds}`;
    }
  }

  onJoinMeeting() {
    this.state.setCurrentView(MeetingView.ENTRANCE);
  }

  onReturnHome() {
    this.router.navigateByUrl('/home');
  }

  protected readonly formatDateTime = formatDateTime;
}
