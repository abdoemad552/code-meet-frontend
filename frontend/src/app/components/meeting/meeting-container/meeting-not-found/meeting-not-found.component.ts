// meeting-not-found.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting-not-found',
  templateUrl: './meeting-not-found.component.html',
  styleUrl: 'meeting-not-found.component.css'
})
export class MeetingNotFoundComponent {
  domain = 'codemeet.com';

  constructor(private router: Router) {}

  onJoinAgain() {
    this.router.navigateByUrl('/meeting/join');
  }

  onReturnHome() {
    this.router.navigateByUrl('/home');
  }
}
