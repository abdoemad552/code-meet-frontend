package com.codemeet.utils.dto;

public record UserSignupRequest(
    String firstName,
    String lastName,
    String username,
    String email,
    String password,
    String phoneNumber
) {
}
