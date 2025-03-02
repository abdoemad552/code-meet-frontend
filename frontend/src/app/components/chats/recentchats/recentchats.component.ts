import { Component } from '@angular/core';
import {ChatcardComponent} from './chatcard/chatcard.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recentchats',
  standalone: true,
  imports: [
    ChatcardComponent
  ],
  templateUrl: './recentchats.component.html',
  styleUrl: './recentchats.component.css'
})
export class RecentChatsComponent {

  isChatBoxShown = false;

  constructor(private router: Router) {}

  toggleChatBox() {
    if (this.isChatBoxShown) {
      this.router.navigate(['/chats']);
    } else {
      this.router.navigate(['/chats', 123456])
    }
    this.isChatBoxShown = !this.isChatBoxShown;
  }

}
