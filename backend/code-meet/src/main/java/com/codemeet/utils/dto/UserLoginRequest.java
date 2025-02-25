package com.codemeet.utils.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserLoginRequest(
    @NotNull
    @NotBlank
    String username,

    @NotNull
    @NotBlank
    String password
) {
}
