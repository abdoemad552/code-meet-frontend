package com.codemeet.repository;

import com.codemeet.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ChatRepository extends JpaRepository<Message, Integer> {

}
