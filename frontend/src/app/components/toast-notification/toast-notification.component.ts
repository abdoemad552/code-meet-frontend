import {Component} from '@angular/core';
import {NotificationInfo} from '../../models/notification/notification-info.dto';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {NotificationType} from '../../models/notification/notification-type.enum';
import {formatTime} from '../../shared/utils';
import {SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-toast-notification',
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css'
})
export class ToastNotificationComponent {
  notifications: NotificationInfo[] = [];

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.notificationService.notification$.subscribe({
      next: notification => {
        notification.header = this.getNotificationHeader(notification);
        notification.text = this.getNotificationText(notification);
        notification.sentAt = formatTime(notification.sentAt);
        this.notifications.push(notification);
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

  onClick(notification: NotificationInfo): void {
    switch (notification.type) {
      case NotificationType.FRIENDSHIP_REQUEST:
        this.router.navigateByUrl(`/friends/requests`, {
          state: {}
        }); break;
      case NotificationType.FRIENDSHIP_ACCEPTED:
        this.router.navigateByUrl(`/friends`, {
          state: {}
        }); break;
      case NotificationType.MEMBERSHIP_REQUEST:
        this.router.navigateByUrl(`/room/${notification.info['roomId']}/requests`, {
          state: {}
        }); break;
      case NotificationType.MEMBERSHIP_ACCEPTED:
        this.router.navigateByUrl(`/room/${notification.info['roomId']}`, {
          state: {}
        }); break;
      case NotificationType.MEETING_SCHEDULED:
      case NotificationType.MEETING_STARTED:
        this.router.navigateByUrl(`/meeting/${notification.info['meetingId']}`, {
          state: {}
        }); break;
      case NotificationType.PEER_MESSAGE:
        this.router.navigateByUrl('/chats', {
          state: {}
        }); break;
      case NotificationType.ROOM_MESSAGE:
        this.router.navigateByUrl('/chats', {
          state: {}
        }); break;
      case NotificationType.WARNING:
      case NotificationType.ERROR:
      case NotificationType.TEST:
      default:
    }

    this.notifications = this.notifications.filter(n => n.id !== notification.id);
  }

  removeNotification(index: number) {
    if (index >= 0 && index < this.notifications.length) {
      this.notifications.splice(index, 1);
    }
  }

  clearAll() {
    this.notifications = [];
  }

  protected readonly NotificationType = NotificationType;
}
