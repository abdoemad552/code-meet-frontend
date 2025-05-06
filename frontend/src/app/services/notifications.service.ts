import {Injectable} from '@angular/core';
import {WebSocketService} from './websocket.service';
import {NotificationInfo} from '../models/notification/notification-info.dto';

@Injectable({
  providedIn:'root'
})
export class NotificationsService {
  notifications: NotificationInfo[] = [];

  constructor(
    private wsService: WebSocketService
  ) {
    this.wsService.connection$.subscribe({
      next: isConnected => {
        const userId = JSON.parse(sessionStorage.getItem("userInfo")).userId;
        if (isConnected) {
          const topic = `/user/${userId}/notifications`;
          wsService.subscribe(topic)
            .subscribe({
              next: message => {
                const notification: NotificationInfo = message.body;
                this.notifications.push(notification);
                alert(`Notification received: ${notification}`);
              },
              error: error => console.log(error)
            });
        } else {
          wsService.unsubscribe(`/user/${userId}/notifications`);
        }
      },
      error: error => console.log(error)
    });
  }
}
