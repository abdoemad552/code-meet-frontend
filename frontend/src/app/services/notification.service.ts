import {Injectable} from '@angular/core';
import {WebSocketService} from './websocket.service';
import {NotificationInfo} from '../models/notification/notification-info.dto';
import {Subject} from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class NotificationService {

  private notification = new Subject<NotificationInfo>();
  notification$ = this.notification.asObservable();

  constructor(
    private wsService: WebSocketService
  ) {
    this.wsService.connection$.subscribe({
      next: isConnected => {
        if (isConnected) {
          const userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
          const topic = `/user/${userId}/notifications`;
          wsService.subscribe(topic)
            .subscribe({
              next: message => this.notification.next(JSON.parse(message.body)),
              error: error => console.log(error)
            });
        } else {
        }
      },
      error: error => console.log(error)
    });
  }
}
