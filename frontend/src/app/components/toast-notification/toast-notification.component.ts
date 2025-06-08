import { Component } from '@angular/core';
import {NotificationInfo} from '../../models/notification/notification-info.dto';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-toast-notification',
  imports: [
    NgIf
  ],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css'
})
export class ToastNotificationComponent {
  notification: NotificationInfo = null;
  visible = false;
  private timeout: any;

  constructor(
    private router: Router,
    private notifService: NotificationService
  ) {
    this.notifService.notification$.subscribe({
      next: notification => {
        this.notification = notification;
        this.visible = true;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.visible = false;
          setTimeout(() => (this.notification = null), 500); // wait for animation
        }, 5000);
      }
    });
  }

  handleClick() {
    if (this.notification) {
      // this.router.navigate([this.notification]);
      this.visible = false;
      setTimeout(() => (this.notification = null), 500);
    }
  }
}
