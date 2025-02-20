package com.codemeet.utils.dto;

import com.codemeet.entity.User;

public record UserSignupRequest(
    String firstName,
    String lastName,
    String username,
    String email,
    String password,
    String phoneNumber
) {
    
    public static User map(UserSignupRequest signupRequest) {
        User user = new User();
        user.setFirstName(signupRequest.firstName());
        user.setLastName(signupRequest.lastName());
        user.setUsername(signupRequest.username());
        user.setEmail(signupRequest.email());
        user.setPassword(signupRequest.password());
        user.setPhoneNumber(signupRequest.phoneNumber());
        return user;
    }
}
