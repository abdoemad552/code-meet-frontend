import { Injectable } from '@angular/core';
import {ChatService} from '../chat.service';
import {WebSocketService} from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {

  constructor(
    private chatService: ChatService,
    private wsService: WebSocketService
  ) {
  }
}
