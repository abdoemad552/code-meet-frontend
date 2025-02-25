package com.codemeet.utils.dto;

import com.codemeet.entity.P2PMessage;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record P2PMessageInfoResponse(
    @NotNull
    Integer messageId,

    @NotNull
    String content,

    @NotNull
    Integer senderId,

    @NotNull
    Integer receiverId,

    @NotNull
    Instant sentAt
) {

    public static P2PMessageInfoResponse of(P2PMessage message) {
        return new P2PMessageInfoResponse(
            message.getId(),
            message.getContent(),
            message.getSender().getId(),
            message.getReceiver().getId(),
            message.getSentAt()
        );
    }
}
