package com.codemeet.service;

import com.codemeet.entity.Notification;
import com.codemeet.repository.NotificationRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationRepository notificationRepository;
    
    public NotificationService(
        SimpMessagingTemplate messagingTemplate,
        NotificationRepository notificationRepository
    ) {
        this.messagingTemplate = messagingTemplate;
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getNotifications(Integer userId) {
        List<Notification> notifications = notificationRepository.getNotifications(userId);
        return notifications;
    }
    
    /**
     * Sends a global notification to all users. All users must subscribe to
     * <code>/notifications</code> topic.
     * @param notification the notification object sent to all users.
     */
    public void sendToAll(Notification notification) {
        messagingTemplate.convertAndSend("/notifications", notification);
    }
    
    /**
     * Sends a notification to a specific user identified by <code>userId</code>. Each
     * user should subscribe to <code>/user/{userId}/notification</code> topic.
     * @param userId the id of the intended user.
     * @param notification the notification object sent to that user.
     */
    public void sendToUser(Integer userId, Notification notification) {
        messagingTemplate.convertAndSendToUser( // Maps to /user/{userId}/notification
            userId.toString(), "/notifications", notification);
    }
}
