import {NotificationType} from './notification-type.enum';
import {SafeHtml} from '@angular/platform-browser';

export interface NotificationInfo {
  id: number;
  info: {
    [key: string]: any
  };
  receiverId: number;
  type: NotificationType;
  sentAt: string;
  header?: string;
  text?: SafeHtml;
}
