import {Injectable} from '@angular/core';
import {WebSocketService} from './websocket.service';
import {NotificationInfo} from '../models/notification/notification-info.dto';
import {UserService} from './user.service';
import {UserInfoResponse} from '../models/user/user-info-response.dto';

@Injectable({
  providedIn:'root'
})
export class NotificationsService {
  userInfo! : UserInfoResponse;

  constructor(private wsService: WebSocketService, private userService: UserService) {
    this.userInfo = this.userService.userInfo;
  }

  subscribeToNotifications() {
    this.wsService.subscribe(`/user/${this.userInfo.userId}/notifications`)
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
    this.wsService.unsubscribe(`/user/${this.userInfo.userId}/notifications`);
  }
}
