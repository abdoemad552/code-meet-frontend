package com.codemeet.utils.dto;

import jakarta.validation.constraints.NotNull;

public record RoomDTO(Integer RoomId,@NotNull Integer creatorId,@NotNull String name) {
}
