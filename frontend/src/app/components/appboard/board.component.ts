import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {NgClass} from '@angular/common';
import {HomeComponent} from '../home/home.component';
import {ActivatedRoute, RouterOutlet, NavigationEnd, Router} from '@angular/router';
import {filter, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgClass, HomeComponent, RouterOutlet],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit, OnDestroy{
  isSidebarMinimized!: boolean;
  isChatPage : boolean = false;
  private destroy$ = new Subject<void>();
  private chatWords = ['chat', 'chats'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.checkRouteForChatKeywords();
    })
  }

  private checkRouteForChatKeywords(): void {
    const currentUrl : string = this.router.url.toLowerCase();

    const hasKeyword = this.chatWords.some(word => currentUrl.includes(word.toLowerCase()))

    this.isChatPage = hasKeyword;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSidebarState(sidebarState: boolean) {
    this.isSidebarMinimized = sidebarState;
  }
}
