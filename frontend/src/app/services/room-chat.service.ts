import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {RoomChatInfo} from '../models/chats/room-chat-info';
import {MessageInfo} from '../models/chats/message-info';

@Injectable({
  providedIn: 'root'
})
export class RoomChatService {

  private apiURL = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {
  }

  getRoomChatById(chatId: number): Observable<RoomChatInfo> {
    return this.http.get<RoomChatInfo>(`${this.apiURL}/${chatId}`);
  }

  getRoomChatByRoomId(roomId: number): Observable<RoomChatInfo> {
    return this.http.get<RoomChatInfo>(`${this.apiURL}/room/${roomId}`);
  }

  getAllRoomChatsOfUser(userId: number): Observable<RoomChatInfo[]> {
    return this.http.get<RoomChatInfo[]>(`${this.apiURL}/user/${userId}/all`);
  }

  getAllMessagesOfChat(chatId: number): Observable<MessageInfo[]> {
    return this.http.get<MessageInfo[]>(`${this.apiURL}/${chatId}/messages`);
  }
}
