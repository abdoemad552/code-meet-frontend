package com.codemeet.repository;

import com.codemeet.entity.Message;
import com.codemeet.entity.P2PMessage;
import com.codemeet.entity.RoomMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query(
        """
        SELECT p2p
        FROM P2PMessage p2p
        WHERE
            (p2p.sender.id = :p1Id AND p2p.receiver.id = :p2Id)
        OR
            (p2p.sender.id = :p2Id AND p2p.receiver.id = :p1Id)
        ORDER BY p2p.sentAt
        """
    )
    List<P2PMessage> findBySenderIdAndReceiverId(int p1Id, int p2Id);

    @Query(
        """
        SELECT r
        FROM RoomMessage r
        WHERE r.id = :roomId
        ORDER BY r.sentAt
        """
    )
    List<RoomMessage> findByRoomId(int roomId);
}
