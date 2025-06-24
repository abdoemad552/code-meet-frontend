import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {ChatInfoResponse} from '../models/chats/chat-info-response';
import {MessageInfoResponse} from '../models/chats/message-info-response';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {
  }

  getChatById(chatId: number): Observable<ChatInfoResponse> {
    return this.http.get<ChatInfoResponse>(`${this.url}/${chatId}`);
  }

  getAllChats(chatType: string): Observable<ChatInfoResponse[]>  {
    const user = JSON.parse(sessionStorage.getItem("userInfo"));
    return this.http.get<ChatInfoResponse[]>(`${this.url}/${user.userId}/all`, {
      params: {
        chatType: chatType
      }
    });
  }

  getAllMessagesOfChatByChatId(chatId: number): Observable<MessageInfoResponse[]> {
    return this.http.get<MessageInfoResponse[]>(`${this.url}/${chatId}/messages`);
  }
}
