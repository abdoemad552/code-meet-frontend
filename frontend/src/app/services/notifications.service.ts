import {Injectable} from '@angular/core';
import {WebSocketService} from './websocket.service';
import {NotificationInfo} from '../models/notification/notification-info.dto';
import {UserService} from './user.service';

@Injectable({
  providedIn:'root'
})
export class NotificationsService {
  notifications: NotificationInfo[] = [];

  constructor(
    private wsService: WebSocketService,
    private userService: UserService
  ) {
    this.wsService.connection$.subscribe({
      next: isConnected => {
        if (isConnected) {
          const topic = `/user/${this.userService.userInfo.userId}/notifications`;
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
          wsService.unsubscribe(`/user/${userService.userInfo.userId}/notifications`);
        }
      },
      error: error => console.log(error)
    });
  }
}
