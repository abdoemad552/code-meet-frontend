import {NotificationType} from '../enums/notification-type.enum';

export interface NotificationInfo {
  info: {
    [key: string]: any
  };
  receiverId: number;
  type: NotificationType;
}
