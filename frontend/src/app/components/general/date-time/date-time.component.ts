import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-date-time',
  standalone: true,
  imports: [],
  templateUrl: './date-time.component.html',
  styleUrl: './date-time.component.css'
})
export class DateTimeComponent implements OnInit {
  currentDate: string = '';
  currentTime: string = '';
  currentDay: string = '';

  ngOnInit() {
    this.updateTimeAndDate();
    setInterval(() => this.updateTimeAndDate(), 1000); // Update every second
  }

  updateTimeAndDate() {
    const now = new Date();

    // Format date (e.g., "October 5, 2023")
    this.currentDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Format time (e.g., "10:15:30 AM")
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Format day of the week (e.g., "Thursday")
    this.currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  }
}

