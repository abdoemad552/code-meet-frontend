import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ChatmessageComponent} from './chatmessage/chatmessage.component';
import data from '../../../../../public/chats.json';
import {Chat} from '../../../models/chats/chat';
import {ChatMessage} from '../../../models/chats/chatMessage';

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [
    RouterLink,
    ChatmessageComponent
  ],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.css'
})
export class ChatboxComponent {
  chat!: Chat;
  chats: Chat[] = data;
  isPrevSame!: boolean[];
  @ViewChild('messageContent') messageInput!: ElementRef<HTMLInputElement>;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Simple Linear Search for now
      for (const chat of data) {
        if (chat.id === params['id']) {
          this.chat = chat;
          this.populateIsPrevSame();
          break;
        }
      }
    });
  }

  sendMessage(): void {
    const message = this.messageInput.nativeElement.value;

    this.chat.chatMessages.push(
      {sender: 'You', message: message, outgoing: true}
    );

    this.populateIsPrevSame();

    this.messageInput.nativeElement.value = '';
  }

  populateIsPrevSame(): void {
    this.isPrevSame = this.chat.chatMessages.map((message, index) => {
      if (index === 0) return false; // First message always shows name
      const prevSender = this.chat.chatMessages[index - 1].sender;
      return message.sender === prevSender;
    });

    console.log(this.isPrevSame);
  }
}
