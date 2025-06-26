import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {MessageResponse} from '../../../../models/chats/message-response';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent {
  @Input() message: MessageResponse;
  @Input() outgoingMessage: boolean;
  @Input() isPrevSame: boolean;
  @Input() isPeerChat: boolean;

  constructor() {
    console.log(this.isPrevSame);
  }
}
