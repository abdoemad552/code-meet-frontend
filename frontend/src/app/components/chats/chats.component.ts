import {Component} from '@angular/core';
import {RecentChatsComponent} from './recent-chats/recent-chats.component';
import {ChatService} from '../../services/chat.service';
import {ChatboxComponent} from './chatbox/chatbox.component';
import {MessageService} from '../../services/message.service';
import {PeerMessageRequest} from '../../models/chats/peer-message-request';
import {PeerChatInfoResponse} from '../../models/chats/peer-chat-info-response';
import {RoomChatInfoResponse} from '../../models/chats/room-chat-info-response';
import {PeerMessageResponse} from '../../models/chats/peer-message-response';
import {RoomMessageResponse} from '../../models/chats/room-message-response';
import {RoomMessageRequest} from '../../models/chats/room-message-request';
import {fadeInOut} from '../../shared/animations';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    RecentChatsComponent,
    ChatboxComponent,
  ],
  animations: [fadeInOut],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {
  peerChats: PeerChatInfoResponse[];
  roomChats: RoomChatInfoResponse[];
  peerChatsMessages = new Map<number, PeerMessageResponse[]>();
  roomChatsMessages = new Map<number, RoomMessageResponse[]>();

  selectedPeerChat: PeerChatInfoResponse = null;
  selectedRoomChat: RoomChatInfoResponse = null;

  constructor(
    private chatService: ChatService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.getAllPeerChats();
    this.getAllRoomChats();

    this.messageService.peerMessage$
      .subscribe({
        next: message => {
          this.peerChatsMessages.get(message.peerId).push(message);
          for (let chat of this.peerChats) {
            if (chat.peer.userId === message.peerId) {
              chat.lastSentMessage = message;
            }
          }
        }
      });
    this.messageService.roomMessage$
      .subscribe({
        next: message => {
          this.roomChatsMessages.get(message.roomId).push(message);
          for (let chat of this.roomChats) {
            if (chat.room.roomId === message.roomId) {
              chat.lastSentMessage = message;
            }
          }
        },
        error: err => console.error(err)
      });
  }

  getAllPeerChats() {
    this.chatService.getAllPeerChats()
      .subscribe({
        next: peerChats => {
          console.log(peerChats);
          this.peerChats = peerChats;
          for (let chat of this.peerChats) {
            chat.currentInput = '';
            this.chatService.getAllMessagesOfPeerChatByChatId(chat.chatId)
              .subscribe({
                next: peerChatMessages => {
                  console.log(peerChatMessages);
                  this.peerChatsMessages.set(chat.peer.userId, peerChatMessages)
                },
                error: err => console.error(err)
              });
          }
        }
      });
  }

  getAllRoomChats() {
    this.chatService.getAllRoomChats()
      .subscribe({
        next: roomChats => {
          console.log(roomChats);
          this.roomChats = roomChats;
          for (let chat of this.roomChats) {
            chat.currentInput = '';
            this.chatService.getAllMessagesOfRoomChatByChatId(chat.chatId)
              .subscribe({
                next: roomChatMessages => {
                  console.log(roomChatMessages);
                  this.roomChatsMessages.set(chat.room.roomId, roomChatMessages)
                },
                error: err => console.error(err)
              });
          }
        }
      });
  }

  onPeerChatSelected(selectedPeerChat: PeerChatInfoResponse) {
    this.selectedPeerChat = selectedPeerChat;
    this.selectedRoomChat = null;
  }

  onRoomChatSelected(selectedRoomChat: RoomChatInfoResponse) {
    this.selectedPeerChat = null;
    this.selectedRoomChat = selectedRoomChat;
  }

  onHideChatbox() {
    this.selectedPeerChat = null;
    this.selectedRoomChat = null;
  }

  onPeerMessageSent(messageRequest: PeerMessageRequest) {
    this.messageService.sendPeerMessage(messageRequest);
  }

  onRoomMessageSent(messageRequest: RoomMessageRequest) {
    this.messageService.sendRoomMessage(messageRequest);
  }

  get selectedPeerChatMessages() {
    return this.selectedPeerChat ?
      this.peerChatsMessages.get(this.selectedPeerChat.peer.userId) : null
  }

  get selectedRoomChatMessages() {
    return this.selectedRoomChat ?
      this.roomChatsMessages.get(this.selectedRoomChat.room.roomId) : null
  }
}
