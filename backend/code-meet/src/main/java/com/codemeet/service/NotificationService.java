package com.codemeet.service;

import com.codemeet.entity.Notification;
import com.codemeet.repository.NotificationRepository;
import com.codemeet.utils.dto.NotificationResponse;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    
    public static final String DEFAULT_DESTINATION = "/notifications";

    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationRepository notificationRepository;
    
    public NotificationService(
        SimpMessagingTemplate messagingTemplate,
        NotificationRepository notificationRepository
    ) {
        this.messagingTemplate = messagingTemplate;
        this.notificationRepository = notificationRepository;
    }
    
    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }
    
    public List<Notification> saveAll(List<Notification> notifications) {
        return notificationRepository.saveAll(notifications);
    }
    
    public void sendToUser(String destination, Notification notification) {
        messagingTemplate.convertAndSendToUser( // Maps to /user/{userId}/notification
            notification.getReceiver().getId().toString(),
            destination,
            NotificationResponse.of(notification)
        );
    }
    
    public void sendToUser(Notification notification) {
        sendToUser(DEFAULT_DESTINATION, notification);
    }
}
