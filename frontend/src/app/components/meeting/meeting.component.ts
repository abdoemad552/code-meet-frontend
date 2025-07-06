import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {fadeInOut} from '../../shared/animations';

@Component({
  selector: 'app-meeting',
  imports: [
    RouterOutlet
  ],
  animations: [fadeInOut],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent {

}
