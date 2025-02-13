package com.codemeet.service;

import com.codemeet.repository.NotificationRepository;
import com.codemeet.utils.dto.NotificationDTO;
import jakarta.persistence.criteria.CriteriaBuilder;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    public NotificationService(NotificationRepository notificationRepository)
    {
        this.notificationRepository=notificationRepository;
    }

    public List<NotificationDTO>getNotifications(Integer userId)
    {
    List<NotificationDTO>notifications=notificationRepository.getNotifications(userId);

        return notifications;
    }


}
