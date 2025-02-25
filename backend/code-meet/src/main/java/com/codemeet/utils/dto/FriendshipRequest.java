package com.codemeet.utils.dto;

import jakarta.validation.constraints.NotNull;

public record FriendshipRequest
        (
                @NotNull Integer requesterId,
                @NotNull Integer responserId
        ) {
}
