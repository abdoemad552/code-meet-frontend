import { Component } from '@angular/core';
import {MeetingsboxComponent} from './meetingsbox/meetingsbox.component';
import {Router} from '@angular/router';
import {MeetingsTabsComponent} from './meetingstabs/meetingstabs.component';

@Component({
  selector: 'app-meetings',
  standalone: true,
  imports: [
    MeetingsboxComponent,
    MeetingsTabsComponent
  ],
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.css'
})
export class MeetingsComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.getCurrentRoute();
  }

  private getCurrentRoute() {
    // Get the current route URL
    this.currentRoute = this.router.url;

    console.log(this.currentRoute);
  }
}
