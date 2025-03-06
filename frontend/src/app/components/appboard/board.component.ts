import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {NgClass} from '@angular/common';
import {HomeComponent} from '../home/home.component';
import {ActivatedRoute, RouterOutlet, NavigationEnd, Router} from '@angular/router';
import {filter, Subject, takeUntil} from 'rxjs';
import {ChatsComponent} from '../chats/chats.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgClass, HomeComponent, RouterOutlet],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  isSidebarMinimized!: boolean;
  isChatPage : boolean = false;
  private chats : ChatsComponent | null = null;

  constructor(private router: Router) {}

  onActivated(chatsPage : any) : void {
    if (chatsPage instanceof ChatsComponent) {
      this.chats = chatsPage;
      this.chats.sidebarMinimizationState.subscribe((message: string) => {
        this.isChatPage = true;
        this.isSidebarMinimized = true;
      })
    } else {
      this.isChatPage = false;
      this.isSidebarMinimized = false;
    }
  }

  getSidebarState(sidebarState: boolean) {
    this.isSidebarMinimized = sidebarState;
  }
}
