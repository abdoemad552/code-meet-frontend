package com.codemeet.utils.dto;

public record RoomCreationRequest(
    String name,
    String description,
    Integer creatorId
) {
}
