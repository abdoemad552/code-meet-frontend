import {Component, Input} from '@angular/core';
import {ChatMessageComponent} from './chat-message/chat-message.component';
import {NgForOf} from '@angular/common';
import {UserInfoResponse} from '../../../../models/user/user-info-response.dto';

@Component({
  selector: 'chat-messages-container',
  imports: [
    ChatMessageComponent,
    NgForOf
  ],
  templateUrl: './messages-container.component.html',
  styleUrl: './messages-container.component.css'
})
export class MessagesContainerComponent {
  @Input() messages: any[];
  @Input() isPeerChat: boolean;

  owner: UserInfoResponse;

  ngOnInit(): void {
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  isPrevSame(i: number) {
    if (i === 0) return false;
    return this.messages[i - 1].sender.userId === this.messages[i].sender.userId;
  }
}
