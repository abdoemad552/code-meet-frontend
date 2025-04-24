import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meeting-entrance',
  imports: [],
  templateUrl: './meeting-entrance.component.html',
  standalone: true,
  styleUrl: './meeting-entrance.component.css'
})
export class MeetingEntranceComponent {
  @Input() meetingId: string | null = null;
  @Output() joinClicked = new EventEmitter<void>();

  constructor(private router: Router) {}

  onJoin(): void {
    this.joinClicked.emit();
  }

  onMeetingEntranceLeave() {
    this.router.navigateByUrl('/meetings');
  }
}
