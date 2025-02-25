package com.codemeet.utils.dto;

import com.codemeet.entity.RoomMessage;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public record RoomMessageInfoResponse(
    @NotNull
    Integer messageId,

    @NotNull
    String content,

    @NotNull
    Integer senderId,

    @NotNull
    Integer roomId,

    @NotNull
    Instant sentAt
) {

    public static RoomMessageInfoResponse of(RoomMessage message) {
        return new RoomMessageInfoResponse(
            message.getId(),
            message.getContent(),
            message.getSender().getId(),
            message.getRoom().getId(),
            message.getSentAt()
        );
    }
}
