package com.codemeet.utils.dto;

import com.codemeet.entity.User;
import com.codemeet.entity.UserRole;

public record UserInfoResponse(
    Integer id,
    String firstname,
    String lastname,
    String username,
    String email,
    String phoneNumber,
    UserRole role,
    byte[] profilePicture
) {

    public static UserInfoResponse of(User user) {
        return new UserInfoResponse(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getUsername(),
            user.getEmail(),
            user.getPhoneNumber(),
            user.getRole(),
            user.getProfilePicture()
        );
    }
}
