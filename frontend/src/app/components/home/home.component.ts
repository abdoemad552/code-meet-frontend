import { Component } from '@angular/core';
import {DateTimeComponent} from "../general/date-time/date-time.component";
import {MeetingBoxComponent} from '../meetings/meeting-box/meeting-box.component';
import {fadeInOut} from '../../shared/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DateTimeComponent,
    MeetingBoxComponent
  ],
  animations: [fadeInOut],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
