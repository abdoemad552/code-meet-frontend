import { Component } from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';

@Component({
  selector: 'app-meetingroom',
  imports: [ContentComponent, HeaderComponent],
  templateUrl: './meeting-room.component.html',
  standalone: true,
  styleUrl: './meeting-room.component.css'
})
export class MeetingRoomComponent {
  title = "Meeting Room";
}
