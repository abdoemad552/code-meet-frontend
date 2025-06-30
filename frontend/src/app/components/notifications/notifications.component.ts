import {Component} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {NotificationInfo} from '../../models/notification/notification-info.dto';
import {NgClass, NgForOf} from '@angular/common';
import {formatDateTime} from '../../shared/utils';
import {SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  filter: 'GENERAL' | 'WARNING' | 'ERROR' = null;
  notifications: NotificationInfo[];

  constructor(
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.getAllNotifications();

    this.notificationService.notification$
      .subscribe({
        next: notification => {
          notification.header = this.notificationService.getNotificationHeader(notification);
          notification.text = this.notificationService.getNotificationText(notification);
          notification.sentAt = formatDateTime(notification.sentAt);
          if (this.notifications) {
            this.notifications.push(notification);
          } else {
            this.notifications = [notification];
          }
        },
        error: err => console.error(err)
      });
  }

  getAllNotifications() {
    this.notificationService.getAllNotifications()
      .subscribe({
        next: notifications => {
          notifications.forEach((notification) => {
            notification.header = this.notificationService.getNotificationHeader(notification);
            notification.text = this.notificationService.getNotificationText(notification);
            notification.sentAt = formatDateTime(notification.sentAt);
          });
          if (this.notifications) {
            this.notifications = [...notifications, ...this.notifications];
          } else {
            this.notifications = notifications;
          }
        },
        error: err => console.error(err)
      });
  }

  getNotificationHeader(notification: NotificationInfo): string {
    return this.notificationService.getNotificationHeader(notification);
  }

  getNotificationText(notification: NotificationInfo): SafeHtml {
    return this.notificationService.getNotificationText(notification);
  }

  get filteredNotifications() {
    if (this.filter === null) return this.notifications;
    if (this.notifications) {
      return this.notifications.filter(notification => {
        if (this.filter === 'GENERAL') {
          return notification.type != 'ERROR' && notification.type != 'WARNING';
        } else {
          return notification.type === this.filter;
        }
      });
    }
    return null;
  }

  deleteNotification(notification: NotificationInfo) {
    this.notificationService.deleteNotification(notification.id)
      .subscribe({
        next: response => {
          console.log(response);
          this.notifications = this.notifications.filter(n => n.id !== notification.id);
        },
        error: err => console.log(err)
      });
  }

  onFilter(filter: any) {
    this.filter = filter;
  }
}
