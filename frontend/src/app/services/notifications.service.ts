import {Injectable} from '@angular/core';
import {WebSocketService} from './websocket.service';
import {NotificationInfo} from '../models/notification/notification-info.dto';
import {UserService} from './user.service';
import {UserInfoResponse} from '../models/user/user-info-response.dto';

@Injectable({
  providedIn:'root'
})
export class NotificationsService {
  userId!: number;

  constructor(private wsService: WebSocketService) {

  }

  setUserId(id: number) {
    this.userId = id;
  }

  subscribeToNotifications() {
    this.wsService.subscribe(`/user/${this.userId}/notifications`)
      .subscribe({
        next: message => {
          const notification: NotificationInfo = message.body;
          // Handle displaying notifications...
          console.log(notification);
        },
        error: err => console.log(err)
      });
  }

  unSubscribeFromNotifications() {
    this.wsService.unsubscribe(`/user/${this.userId}/notifications`);
  }
}
