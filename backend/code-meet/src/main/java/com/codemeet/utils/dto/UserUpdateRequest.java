package com.codemeet.utils.dto;

public record UserUpdateRequest(
    Integer id,
    String firstName,
    String lastName,
    String username,
    String email,
    String password,
    String phoneNumber,
    byte[] profilePicture
) {
}
