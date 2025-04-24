import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './meeting-header.component.html',
  standalone: true,
  styleUrl: './meeting-header.component.css'
})
export class MeetingHeaderComponent {
  @Output() leaveClicked = new EventEmitter<boolean>();

  onLeave() {
    this.leaveClicked.emit(true);
  }
}
