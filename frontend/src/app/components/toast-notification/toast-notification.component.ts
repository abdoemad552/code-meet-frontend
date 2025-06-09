import {Component} from '@angular/core';
import {NotificationInfo} from '../../models/notification/notification-info.dto';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {NotificationType} from '../../models/enums/notification-type.enum';

@Component({
  selector: 'app-toast-notification',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css'
})
export class ToastNotificationComponent {
  notifications: NotificationInfo[] = [];

  constructor(
    private router: Router,
    private notifService: NotificationService
  ) {
    this.notifService.notification$.subscribe({
      next: notification => {
        notification.sentAt = this.formatTime(notification.sentAt);
        this.notifications.push(notification);
        const index = this.notifications.length - 1;
        console.log(this.notifications[index]);

        // setTimeout(() => this.removeNotification(index), 10000);
      }
    });
  }

  getNotificationHeader(notification: NotificationInfo): string {
    switch (notification.type) {
      case NotificationType.FRIENDSHIP_REQUEST:
        return 'Friendship Request';
      case NotificationType.FRIENDSHIP_ACCEPTED:
        return 'Friendship Accepted';
      case NotificationType.MEMBERSHIP_REQUEST:
        return 'Membership Request';
      case NotificationType.MEMBERSHIP_ACCEPTED:
        return 'Membership Accepted';
      case NotificationType.SCHEDULED_MEETING:
        return 'Scheduled Meeting';
      case NotificationType.PEER_MESSAGE:
        return 'Message Received';
      case NotificationType.ROOM_MESSAGE:
        return 'Message Received';
      case NotificationType.TEST:
        return 'Test Notification';
      default:
        return 'Notification';
    }
  }

  getNotificationText(notification: NotificationInfo): string {
    switch (notification.type) {
      case NotificationType.FRIENDSHIP_REQUEST:
        return `${notification.info['senderFullName']} (${notification.info['senderUsername']}) sent you a friendship request.`;
      case NotificationType.FRIENDSHIP_ACCEPTED:
        return `${notification.info['acceptorFullName']} (${notification.info['acceptorUsername']}) accepted your friendship request.`;
      case NotificationType.MEMBERSHIP_REQUEST:
        return `${notification.info['requesterFullName']} (${notification.info['requesterUsername']}) wants to join room "${notification.info['roomName']}".`;
      case NotificationType.MEMBERSHIP_ACCEPTED:
        return `You are now a member of room "${notification.info['roomName']}".`;
      case NotificationType.SCHEDULED_MEETING:
        return 'Scheduled Meeting';
      case NotificationType.PEER_MESSAGE:
        return 'Message Received';
      case NotificationType.ROOM_MESSAGE:
        return 'Message Received';
      case NotificationType.TEST:
        return 'This is a test notification.';
      default:
        return 'Unknown.';
    }
  }

  onClick(notification: NotificationInfo): void {
    switch (notification.type) {
      case NotificationType.FRIENDSHIP_REQUEST:
      case NotificationType.FRIENDSHIP_ACCEPTED:
      case NotificationType.MEMBERSHIP_REQUEST:
      case NotificationType.MEMBERSHIP_ACCEPTED:
      case NotificationType.SCHEDULED_MEETING:
      case NotificationType.PEER_MESSAGE:
      case NotificationType.ROOM_MESSAGE:
      case NotificationType.TEST:
      default:
    }
  }

  removeNotification(index: number) {
    if (index >= 0 && index < this.notifications.length) {
      this.notifications.splice(index, 1);
    }
  }

  formatTime(isoString: string): string {
    if (!isoString) isoString = new Date().toISOString();
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  clearAll() {
    this.notifications = [];
  }
}
