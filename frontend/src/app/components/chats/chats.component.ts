import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {RecentChatsComponent} from './recentchats/recentchats.component';
import {ChatboxComponent} from './chatbox/chatbox.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    RecentChatsComponent,
    ChatboxComponent,
    RouterOutlet
  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {
  @Output() sidebarMinimizationState = new EventEmitter<boolean>();
  isSidebarMinimized: boolean = false;

  ngOnInit() {
    this.isSidebarMinimized = true;
    this.sidebarMinimizationState.emit(this.isSidebarMinimized);
  }

}
