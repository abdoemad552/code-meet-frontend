import { Component } from '@angular/core';
import {ContactusComponent} from "../general/contactus/contactus.component";
import {DateTimeComponent} from "../general/date-time/date-time.component";
import {FAQComponent} from "../general/faq/faq.component";
import {NgClass} from '@angular/common';
import {MeetingsboxComponent} from '../meetings/meetingsbox/meetingsbox.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ContactusComponent,
    DateTimeComponent,
    MeetingsboxComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
