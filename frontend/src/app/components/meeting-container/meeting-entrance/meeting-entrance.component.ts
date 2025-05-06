import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-meeting-entrance',
  imports: [],
  templateUrl: './meeting-entrance.component.html',
  standalone: true,
  styleUrl: './meeting-entrance.component.css'
})
export class MeetingEntranceComponent implements OnInit {
  meetingId: string = null; // Will be replaced by the content of meetingId input...
  @Output() joinClicked = new EventEmitter<string>();
  @Output() backClicked = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.meetingId = params.get('id');
    });
  }

  onJoin(): void {
    this.joinClicked.emit(this.meetingId);
  }

  onBack() {
    this.backClicked.emit();
  }
}
