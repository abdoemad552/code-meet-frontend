package com.codemeet.repository;

import com.codemeet.entity.Message;
import com.codemeet.entity.Notification;
import com.codemeet.utils.dto.NotificationDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface NotificationRepository extends JpaRepository<Notification, Integer> {


    @Query("select new com.codemeet.utils.dto.NotificationDTO(n.content,n.sender.username) from Notification n  where n.receiver.id=:userId")
    public List<NotificationDTO> getNotifications(Integer userId);
}
