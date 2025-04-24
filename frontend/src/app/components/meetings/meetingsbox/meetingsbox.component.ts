import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meetingsbox',
  standalone: true,
  imports: [],
  templateUrl: './meetingsbox.component.html',
  styleUrl: './meetingsbox.component.css'
})
export class MeetingsboxComponent {

  constructor(private router: Router) {}

  onInstantMeeting() {
    // will be updated (the logic will be in a separate service)
    this.router.navigateByUrl('/meeting/id'); // for ui development only
  }

  onScheduleMeeting() {

  }

  onJoinExistingMeeting() {

  }
}
