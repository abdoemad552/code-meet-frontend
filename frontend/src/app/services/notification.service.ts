import {Injectable} from '@angular/core';
import {WebSocketService} from './websocket.service';
import {NotificationInfo} from '../models/notification/notification-info.dto';
import {Observable, Subject} from 'rxjs';
import {NotificationType} from '../models/notification/notification-type.enum';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn:'root'
})
export class NotificationService {

  private readonly url = 'http://localhost:8080/api/notification';

  notification$ = new Subject<NotificationInfo>();

  constructor(
    private wsService: WebSocketService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.wsService.connection$
      .subscribe({
        next: isConnected => {
          if (isConnected) {
            const user = JSON.parse(sessionStorage.getItem("userInfo"));
            const topic = `/notifications/${user.userId}`;
            wsService.subscribe(topic)
              .subscribe({
                next: message => this.notification$.next(JSON.parse(message.body)),
                error: error => console.log(error)
              });
          } else {
          }
        },
        error: error => console.log(error)
      });
  }

  getAllNotifications(): Observable<NotificationInfo[]> {
    const owner = JSON.parse(sessionStorage.getItem("userInfo"));
    return this.http.get<NotificationInfo[]>(`${this.url}/${owner.userId}`)
  }

  deleteNotification(notificationId: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.url}/delete/${notificationId}`, {
      observe: 'response'
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
      case NotificationType.MEETING_SCHEDULED:
        return 'Meeting Scheduled';
      case NotificationType.MEETING_STARTED:
        return 'Meeting Started';
      case NotificationType.PEER_MESSAGE:
        return 'Message Received';
      case NotificationType.ROOM_MESSAGE:
        return 'Message Received';
      case NotificationType.WARNING:
        return 'Warning';
      case NotificationType.ERROR:
        return 'Error';
      case NotificationType.TEST:
        return 'Test Notification';
      default:
        return 'Notification';
    }
  }

  getNotificationText(notification: NotificationInfo) {
    console.log(notification);
    let text = null;
    switch (notification.type) {
      case NotificationType.FRIENDSHIP_REQUEST:
        text = `${notification.info['senderFullName']} (<a href="/profile/${notification.info['senderUsername']}" class="hover:underline">${notification.info['senderUsername']}</a>) sent you a friendship request.`; break;
      case NotificationType.FRIENDSHIP_ACCEPTED:
        text = `${notification.info['acceptorFullName']} (<a href="/profile/${notification.info['acceptorUsername']}" class="hover:underline">${notification.info['acceptorUsername']}</a>) accepted your friendship request.`; break;
      case NotificationType.MEMBERSHIP_REQUEST:
        text = `${notification.info['senderFullName']} (<a href="/profile/${notification.info['senderUsername']}" class="hover:underline">${notification.info['senderUsername']}</a>) wants to join room <a href="/room/${notification.info['roomId']}" class="hover:underline font-semibold">"${notification.info['roomName']}"</a>.`; break;
      case NotificationType.MEMBERSHIP_ACCEPTED:
        text = `You are now a member of room <a href="/room/${notification.info['roomId']}" class="hover:underline font-semibold">"${notification.info['roomName']}"</a>.`; break;
      case NotificationType.MEETING_SCHEDULED:
        text = 'Meeting Scheduled'; break;
      case NotificationType.MEETING_STARTED:
        text = `"<span class="font-semibold">${notification.info['meetingTitle']}</span>" meeting started now!`; break;
      case NotificationType.PEER_MESSAGE:
        text = `You have a new message from ${notification.info['senderFirstName']} ${notification.info['senderLastName']}.`; break;
      case NotificationType.ROOM_MESSAGE:
        text = `${notification.info['roomName']}: You have a new message from ${notification.info['senderFirstName']} ${notification.info['senderLastName']}.`; break;
      case NotificationType.WARNING:
        text = 'Warning'; break;
      case NotificationType.ERROR:
        text = 'Error'; break;
      case NotificationType.TEST:
        text = 'This is a test notification.'; break;
      default:
        text = 'Unknown.';
    }

    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
