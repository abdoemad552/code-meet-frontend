package com.codemeet.utils.dto;

import com.codemeet.entity.User;

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
    
    public static User map(UserUpdateRequest updateRequest) {
        User user = new User();
        user.setId(updateRequest.id());
        user.setFirstName(updateRequest.firstName());
        user.setLastName(updateRequest.lastName());
        user.setUsername(updateRequest.username());
        user.setEmail(updateRequest.email());
        user.setPassword(updateRequest.password());
        user.setPhoneNumber(updateRequest.phoneNumber());
        user.setProfilePicture(updateRequest.profilePicture());
        return user;
    }
}
