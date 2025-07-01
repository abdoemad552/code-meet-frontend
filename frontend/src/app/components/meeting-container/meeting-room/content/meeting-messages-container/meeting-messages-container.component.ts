import {Component, Input} from '@angular/core';
import {UserInfoResponse} from '../../../../../models/user/user-info-response.dto';
import {ChatMessageComponent} from '../../../../chats/chatbox/messages-container/chat-message/chat-message.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'meeting-messages-container',
  imports: [
    ChatMessageComponent,
    NgForOf
  ],
  templateUrl: './meeting-messages-container.component.html',
  styleUrl: './meeting-messages-container.component.css'
})
export class MeetingMessagesContainerComponent {
  @Input() messages: any[];

  owner: UserInfoResponse;

  ngOnInit(): void {
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  isPrevSame(i: number) {
    if (i === 0) return false;
    return this.messages[i - 1].sender.id === this.messages[i].sender.id;
  }

  protected readonly String = String;
}
