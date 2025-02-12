package com.codemeet.repository;

import com.codemeet.entity.message.P2PMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface P2PMessageRepository extends JpaRepository<P2PMessage, Integer> {
}
