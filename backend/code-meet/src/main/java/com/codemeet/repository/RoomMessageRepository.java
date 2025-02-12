package com.codemeet.repository;

import com.codemeet.entity.RoomMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomMessageRepository extends JpaRepository<RoomMessage, Integer> {
}
