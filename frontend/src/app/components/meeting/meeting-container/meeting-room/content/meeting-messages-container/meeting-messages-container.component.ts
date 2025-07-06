import {Component} from '@angular/core';
import {UserInfoResponse} from '../../../../../../models/user/user-info-response.dto';
import {ChatMessageComponent} from '../../../../../chats/chatbox/messages-container/chat-message/chat-message.component';
import {NgForOf} from '@angular/common';
import {MeetingStateService} from '../../../../../../services/states/meeting-state.service';

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
  owner: UserInfoResponse;

  constructor(protected state: MeetingStateService) {
  }

  ngOnInit(): void {
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  outgoingMessage(i: number) {
    return this.state.messages[i].sender.id === this.state.participation.participantId;
  }

  isPrevSame(i: number) {
    if (i === 0) return false;
    return this.state.messages[i - 1].sender.id === this.state.messages[i].sender.id;
  }
}
