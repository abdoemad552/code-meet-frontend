package com.codemeet.service;

import com.codemeet.entity.P2PMessage;
import com.codemeet.entity.RoomMessage;
import com.codemeet.repository.MessageRepository;
import com.codemeet.utils.dto.P2PMessageInfoResponse;
import com.codemeet.utils.dto.RoomMessageInfoResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<RoomMessage> getAllMessageEntitiesOfRoom(int roomId) {
        return messageRepository.findByRoomId(roomId);
    }

    public List<P2PMessage> getAllMessageEntitiesWithPeer(int p1Id, int p2Id) {
        return messageRepository.findBySenderIdAndReceiverId(p1Id, p2Id);
    }

    public List<RoomMessageInfoResponse> getAllMessagesOfRoom(int roomId) {
        return getAllMessageEntitiesOfRoom(roomId).stream()
            .map(RoomMessageInfoResponse::of)
            .toList();
    }

    public List<P2PMessageInfoResponse> getAllMessagesWithPeer(int p1Id, int p2Id) {
        return getAllMessageEntitiesWithPeer(p1Id, p2Id).stream()
            .map(P2PMessageInfoResponse::of)
            .toList();
    }
}
