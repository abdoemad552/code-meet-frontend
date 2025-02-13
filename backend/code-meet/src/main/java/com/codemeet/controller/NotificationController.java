package com.codemeet.controller;


import com.codemeet.service.NotificationService;
import com.codemeet.service.UserService;
import com.codemeet.utils.dto.NotificationDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    @GetMapping("{userId}")
    public ResponseEntity<List<NotificationDTO>>getNotifications(@PathVariable Integer userId)
    {
        List<NotificationDTO>notifications=notificationService.getNotifications(userId);
        return ResponseEntity.ok(notifications);
    }


}
