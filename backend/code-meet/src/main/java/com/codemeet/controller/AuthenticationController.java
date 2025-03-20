package com.codemeet.controller;

import com.codemeet.service.AuthenticationService;
import com.codemeet.utils.dto.LoginRequest;
import com.codemeet.utils.dto.UserInfoResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    
    private final AuthenticationService authService;
    
    public AuthenticationController(AuthenticationService authService) {
        this.authService = authService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<UserInfoResponse> login(
        @RequestBody LoginRequest loginRequest
    ) {
        System.out.println(loginRequest);
        return ResponseEntity.ok(authService.login(loginRequest));
    }
}
