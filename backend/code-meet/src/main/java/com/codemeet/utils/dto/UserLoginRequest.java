package com.codemeet.utils.dto;

import com.codemeet.entity.User;

public record UserLoginRequest(String email, String password) {
    
    public static User map(UserLoginRequest loginRequest) {
        User user = new User();
        user.setEmail(loginRequest.email());
        user.setPassword(loginRequest.password());
        return user;
    }
}
