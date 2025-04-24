import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {RoomChatInfo} from '../models/chats/room-chat-info';
import {MessageInfo} from '../models/chats/message-info';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {
  }
}
