import {Component} from '@angular/core';
import {WebSocketService} from '../../services/websocket.service';
import {UserService} from '../../services/user.service';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-notifications',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  constructor(
    private wsService: WebSocketService,
    private userService: UserService
  ) {
  }
}
