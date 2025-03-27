import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../../services/websocket.service';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';
import {NotificationInfo} from '../../models/notification/notification-info.dto';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  constructor(private wsService: WebSocketService) {
  }

  ngOnInit() {
    /*
    * Placing this logic here will result in a problem.
    * When a user login, it will not subscribe to notifications
    * until pressing on `View All Notifications`.
    * I need it to subscribe once the user login.
    * Another problem is that when a user logout and login again,
    * no subscription happens. I need it to subscribe each time the
    * user login. This is because when a user logout, the connections
    * will be closed and all subscriptions will be lost. So I need
    * to subscribe again.
    **/
    const userInfo: UserInfoResponse =
      JSON.parse(sessionStorage.getItem('userInfo')!);
    this.wsService.subscribe(`/user/${userInfo.userId}/notifications`)
      .subscribe({
        next: message => {
          const notification: NotificationInfo = message.body;
          // Handle displaying notifications...
          console.log(notification);
        },
        error: err => console.log(err)
      });
  }
}
