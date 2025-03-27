import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../../services/websocket.service';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';
import {NotificationInfo} from '../../models/notification/notification-info.dto';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  constructor(private wsService: WebSocketService, private userService: UserService) {
  }

  ngOnInit() {
  }
}
