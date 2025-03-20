package com.codemeet.service;

import com.codemeet.entity.User;
import com.codemeet.utils.dto.LoginRequest;
import com.codemeet.utils.dto.UserInfoResponse;
import com.codemeet.utils.exception.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    
    private final UserService userService;
    
    public AuthenticationService(UserService userService) {
        this.userService = userService;
    }
    
    public UserInfoResponse login(LoginRequest loginRequest) {
        User user = userService.getUserEntityByUsername(loginRequest.username());
        
        if (user.getPassword().equals(loginRequest.password())) {
            return UserInfoResponse.of(user);
        }
        
        throw new AuthenticationException("Unauthorized login attempt");
    }
}
