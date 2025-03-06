import { Component } from '@angular/core';
import {ChatcardComponent} from './chatcard/chatcard.component';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-recentchats',
  standalone: true,
  imports: [
    ChatcardComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './recentchats.component.html',
  styleUrl: './recentchats.component.css'
})
export class RecentChatsComponent {

  isChatBoxShown = false;

  constructor(private router: Router) {}

  openChatBox() {
    if (this.isChatBoxShown) {
      this.router.navigate(['/chats']);
    } else {
      this.router.navigate(['/chats', 123456])
    }
    this.isChatBoxShown = !this.isChatBoxShown;
  }

}
