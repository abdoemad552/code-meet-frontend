import {Component} from '@angular/core';
import {RecentChatsComponent} from './recent-chats/recent-chats.component';
import {RouterOutlet} from '@angular/router';
import {BoardDataService} from '../../services/states/board-data.service';
import {ChatService} from '../../services/chat.service';
import {ChatInfoResponse} from '../../models/chats/chat-info-response';
import {ChatboxComponent} from './chatbox/chatbox.component';
import {NgIf} from '@angular/common';
import {MessageInfoResponse} from '../../models/chats/message-info-response';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    RecentChatsComponent,
    ChatboxComponent,
  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {
  peerChats: ChatInfoResponse[] = [];
  roomChats: ChatInfoResponse[] = [];

  selectedChat: ChatInfoResponse = null;
  selectedChatMessages: MessageInfoResponse[] = null;

  constructor(
    private chatService: ChatService,
    private dataService: BoardDataService
  ) {
  }

  ngOnInit() {
    this.chatService.getAllChats('peer')
      .subscribe({
        next: peerChats => {
          console.log(peerChats);
          this.peerChats = peerChats;
        }
      });
    this.chatService.getAllChats('room')
      .subscribe({
        next: roomChats => {
          console.log(roomChats);
          this.roomChats = roomChats;
        }
      });
  }

  onChatSelected(selectedChat: ChatInfoResponse) {
    this.selectedChat = selectedChat;
    this.chatService.getAllMessagesOfChatByChatId(selectedChat.chatId)
      .subscribe({
        next: selectedChatMessages => {
          this.selectedChatMessages = selectedChatMessages;
        }
      });
  }

  onHideChatbox() {
    this.selectedChat = null;
  }
}
