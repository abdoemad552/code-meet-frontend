package com.codemeet.utils.dto;

import com.codemeet.entity.User;

public record UserInfoResponse(
    Integer id,
    String firstname,
    String lastname,
    String username,
    String email,
    String phoneNumber,
    byte[] profilePicture
) {
    
    /**
     * Maps the given {@code User} object into a {@code UserInfoResponse} object
     * that represents the information needed by the frontend.
     * @param user A reference to the user object to be mapped.
     * @return a {@code UserInfoResponse} that represents user's information
     * required by the frontend.
     */
    public static UserInfoResponse map(User user) {
        return new UserInfoResponse(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getUsername(),
            user.getEmail(),
            user.getPhoneNumber(),
            user.getProfilePicture()
        );
    }
}
