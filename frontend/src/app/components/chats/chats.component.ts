import {Component} from '@angular/core';
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

}
