import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {MessageInfoResponse} from '../../../../models/chats/message-info-response';

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
  @Input() _message: MessageInfoResponse;
  @Input() outgoingMessage: boolean;
  @Input() message: string = '';
  @Input() senderName: string = '';
  @Input() senderProfileImage: string = '';
  @Input() isPrevSame!: boolean;

  constructor() {
    console.log(this.isPrevSame)
  }
}
