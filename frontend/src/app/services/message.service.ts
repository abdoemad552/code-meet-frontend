import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {WebSocketService} from './websocket.service';
import {ChatService} from './chat.service';
import {PeerMessageRequest} from '../models/chats/peer-message-request';
import {PeerMessageResponse} from '../models/chats/peer-message-response';
import {RoomMessageResponse} from '../models/chats/room-message-response';
import {RoomMessageRequest} from '../models/chats/room-message-request';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  peerMessage$ = new Subject<PeerMessageResponse>();
  roomMessage$ = new Subject<RoomMessageResponse>();

  constructor(
    private wsService: WebSocketService,
    private chatService: ChatService
  ) {
    this.wsService.connection$
      .subscribe({
        next: isConnected => {
          if (isConnected) {
            this.chatService.getAllPeerChats()
              .subscribe({
                next: peerChats => {
                  for (const chat of peerChats) {
                    wsService.subscribe(`/peer-chat/${chat.peer.userId}`)
                      .subscribe({
                        next: message => this.peerMessage$.next(JSON.parse(message.body)),
                        error: err => console.error(err)
                      });
                  }
                },
                error: err => console.error(err)
              });

            this.chatService.getAllRoomChats()
              .subscribe({
                next: roomChats => {
                  for (const chat of roomChats) {
                    this.wsService.subscribe(`/room-chat/${chat.room.roomId}`)
                      .subscribe({
                        next: message => this.roomMessage$.next(JSON.parse(message.body)),
                        error: err => console.error(err)
                      });
                  }
                },
                error: err => console.error(err)
              });
          } else {
          }
        }
      });
  }

  sendPeerMessage(messageRequest: PeerMessageRequest) {
    this.wsService.publish('/app/peer-chat', {}, JSON.stringify(messageRequest));
  }

  sendRoomMessage(messageRequest: RoomMessageRequest) {
    this.wsService.publish('/app/room-chat', {}, JSON.stringify(messageRequest));
  }
}
