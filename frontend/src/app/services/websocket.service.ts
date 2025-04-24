import { Injectable } from '@angular/core';
import {Client, StompHeaders, StompSubscription} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private readonly stompClient: Client;

  private topicStompSubscription: { [topic: string]: StompSubscription } = {};
  private topicSubject: { [topic: string]: Subject<any> } = {};

  private connection = new BehaviorSubject<boolean>(false);
  connection$ = this.connection.asObservable();

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      debug: msg => console.log('[DEBUG]:', msg),
      onConnect: () => {
        this.connection.next(true);
      },
      onWebSocketClose: () => {
        this.connection.next(false);
      },
      onStompError: error => console.error('[ERROR]:', error)
    });
  }

  connect() {
    this.stompClient.activate();
  }

  disconnect() {
    if (this.connected()) {
      this.stompClient.deactivate()
        .catch(reason => console.log(reason));
    }
  }

  subscribe(topic: string, headers: StompHeaders = {}): Observable<any> {
    if (this.connected()) {
      if (!this.topicSubject[topic]) {
        this.topicSubject[topic] = new Subject();
        this.topicStompSubscription[topic] = this.stompClient.subscribe(topic, message => {
          this.topicSubject[topic].next(message);
        }, headers);
      }
      return this.topicSubject[topic].asObservable();
    } else {
      throw new Error('WebSocket Connection is not available');
    }
  }

  unsubscribe(topic: string, headers: StompHeaders = {}): void {
    if (this.topicStompSubscription[topic]) {

      // Unsubscribe from this topic (client-server).
      // The server should not send messages again to the client.
      this.topicStompSubscription[topic].unsubscribe(headers);

      // Also unsubscribe from the subject that is responsible for
      // receiving messages from the server and send them to observers.
      this.topicSubject[topic].unsubscribe();

      delete this.topicStompSubscription[topic];
      delete this.topicSubject[topic];
    }
  }

  connected(): boolean {
    return this.stompClient.connected;
  }

  publish(
    destination: string,
    headers?: StompHeaders,
    body?: string
  ): void {
    this.stompClient.publish({
      destination: destination,
      headers: headers,
      body: body
    });
  }
}
