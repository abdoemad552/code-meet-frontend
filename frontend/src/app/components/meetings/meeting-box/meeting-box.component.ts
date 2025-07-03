import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meeting-box',
  standalone: true,
  imports: [],
  templateUrl: './meeting-box.component.html',
  styleUrl: './meeting-box.component.css'
})
export class MeetingBoxComponent {

  constructor(private router: Router) {
  }

  onInstantMeeting() {
  }

  onScheduleMeeting() {
  }

  onJoinExistingMeeting() {

  }
}
