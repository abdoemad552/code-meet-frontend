package com.codemeet.utils.dto;

import com.codemeet.entity.Notification;

import java.time.Instant;

public record NotificationResponse(
    String message,
    Integer receiverId,
    Instant sentAt,
    boolean isRead
) {
    
    public static NotificationResponse of(Notification notification) {
        return new NotificationResponse(
            notification.getMessage(),
            notification.getReceiver().getId(),
            notification.getSentAt(),
            notification.isRead()
        );
    }
}
