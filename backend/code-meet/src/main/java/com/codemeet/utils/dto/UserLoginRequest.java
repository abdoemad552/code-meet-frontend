package com.codemeet.utils.dto;

public record UserLoginRequest(
    String email,
    String password
) {
}
