import { Component } from '@angular/core';
import {DateTimeComponent} from "../general/date-time/date-time.component";
import {MeetingBoxComponent} from '../meetings/meeting-box/meeting-box.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DateTimeComponent,
    MeetingBoxComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
