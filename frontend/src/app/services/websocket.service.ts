import { Injectable } from '@angular/core';
import {Client, Frame, Message, messageCallbackType, StompHeaders, StompSubscription} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  private messageSubject = new BehaviorSubject<string>(''); // Holds the latest message

  message$ = this.messageSubject.asObservable(); // Observable for components to subscribe to

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      debug: (msg: string) => console.log(msg),
      onConnect: (frame: Frame) => {
        console.log('(WebSocket): connected...');

        this.stompClient.subscribe('/topic/response', (message: Message) => {
          console.log('Received:', message.body);
          this.messageSubject.next(message.body); // Emit received message
        });
      },
      onStompError: (frame) => {
        console.error('WebSocket Error:', frame);
      }
    });
  }

  subscribe(
    destination: string,
    callback: messageCallbackType,
    headers: StompHeaders = {}
  ): StompSubscription {
    return this.stompClient.subscribe(destination, callback, headers);
  }

  connect() {
    this.stompClient.activate();
  }

  sendMessage(message: string) {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/message',
        body: message
      });
    } else {
      console.warn('WebSocket is not connected.');
    }
  }

  disconnect() {
    if (this.stompClient.active) {
      this.stompClient.deactivate()
        .catch(reason => console.log(reason));
    }
  }
}
