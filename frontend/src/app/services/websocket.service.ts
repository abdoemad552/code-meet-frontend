import { Injectable } from '@angular/core';
import {Client, StompHeaders, StompSubscription} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private readonly stomp: Client;

  private topicStompSubscription: { [topic: string]: StompSubscription } = {};
  private topicSubject: { [topic: string]: Subject<any> } = {}

  constructor() {
    this.stomp = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      debug: msg => console.log(msg),
      onConnect: () => console.log('WebSocket connected'),
      onStompError: frame => console.error('WebSocket error: ', frame)
    });
  }

  connect() {
    this.stomp.activate();
  }

  subscribe(topic: string, headers: StompHeaders = {}): Observable<any> {
    if (!this.topicSubject[topic]) {
      this.topicSubject[topic] = new Subject();
      if (this.stomp.connected) {
        this.topicStompSubscription[topic] = this.stomp.subscribe(topic, message => {
          this.topicSubject[topic].next(message);
        }, headers);
      } else {
        throw new Error('WebSocket is not connected');
      }
    }

    return this.topicSubject[topic].asObservable();
  }

  unsubscribe(topic: string, headers: StompHeaders = {}): void {
    if (this.topicStompSubscription[topic]) {
      this.topicStompSubscription[topic].unsubscribe(headers);
    }
  }

  sendMessage(message: string) {
    if (this.stomp && this.stomp.connected) {
      this.stomp.publish({
        destination: '/app/message',
        body: message
      });
    } else {
      console.warn('WebSocket is not connected.');
    }
  }

  disconnect() {
    if (this.stomp.connected) {
      this.stomp.deactivate()
        .catch(reason => console.log(reason));
    }
  }
}
