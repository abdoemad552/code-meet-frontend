import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {PeerChatInfoResponse} from '../models/chats/peer-chat-info-response';
import {RoomChatInfoResponse} from '../models/chats/room-chat-info-response';
import {PeerMessageResponse} from '../models/chats/peer-message-response';
import {RoomMessageResponse} from '../models/chats/room-message-response';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {
  }

  getPeerChatById(chatId: number): Observable<PeerChatInfoResponse> {
    return this.http.get<PeerChatInfoResponse>(`${this.url}/peer/${chatId}`);
  }

  getRoomChatById(chatId: number): Observable<RoomChatInfoResponse> {
    return this.http.get<RoomChatInfoResponse>(`${this.url}/room/${chatId}`);
  }

  getAllPeerChats(): Observable<PeerChatInfoResponse[]>  {
    const owner = JSON.parse(sessionStorage.getItem("userInfo"));
    return this.http.get<PeerChatInfoResponse[]>(`${this.url}/peer/${owner.userId}/all`);
  }

  getAllRoomChats(): Observable<RoomChatInfoResponse[]>  {
    const owner = JSON.parse(sessionStorage.getItem("userInfo"));
    return this.http.get<RoomChatInfoResponse[]>(`${this.url}/room/${owner.userId}/all`);
  }

  getAllMessagesOfPeerChatByChatId(chatId: number): Observable<PeerMessageResponse[]> {
    return this.http.get<PeerMessageResponse[]>(`${this.url}/peer/${chatId}/messages`);
  }

  getAllMessagesOfRoomChatByChatId(chatId: number): Observable<RoomMessageResponse[]> {
    return this.http.get<RoomMessageResponse[]>(`${this.url}/room/${chatId}/messages`);
  }
}
