package com.codemeet.utils.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ParticipantDTO(
    @NotNull
    @NotBlank
    String username
) {
}
