import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {NgClass} from '@angular/common';
import {DateTimeComponent} from '../general/date-time/date-time.component';
import {FAQComponent} from '../general/faq/faq.component';
import {ContactusComponent} from '../general/contactus/contactus.component';
import {HomeComponent} from '../home/home.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgClass, DateTimeComponent, FAQComponent, ContactusComponent, HomeComponent, RouterOutlet],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  isSidebarMinimized!: boolean;

  getSidebarState(sidebarState: boolean) {
    this.isSidebarMinimized = sidebarState;
  }
}
