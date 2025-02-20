package com.codemeet.controller;

import java.util.List;

import com.codemeet.entity.User;
import com.codemeet.utils.dto.UserLoginRequest;
import com.codemeet.utils.dto.UserSignupRequest;
import com.codemeet.utils.dto.UserUpdateRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.codemeet.service.UserService;
import com.codemeet.utils.dto.UserInfoResponse;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserInfoResponse>> getAllUsers() {
        return ResponseEntity.ok(
            userService.getAllUsers().stream()
                .map(UserInfoResponse::map)
                .toList()
        );
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<UserInfoResponse> getUser(@PathVariable int userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(UserInfoResponse.map(user));
    }
    
    @GetMapping("/{username}")
    public ResponseEntity<UserInfoResponse> getUser(@PathVariable String username) {
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(UserInfoResponse.map(user));
    }
    
    @PostMapping("/signup")
    public ResponseEntity<UserInfoResponse> signup(
        @RequestBody UserSignupRequest signupRequest
    ) {
        UserInfoResponse info = userService.signup(signupRequest);
        return ResponseEntity.ok(info);
    }
    
    @PostMapping("/login")
    public ResponseEntity<UserInfoResponse> login(
        @RequestBody UserLoginRequest loginRequest
    ) {
        UserInfoResponse info = userService.login(loginRequest);
        return ResponseEntity.ok(info);
    }
    
    @PutMapping("/update")
    public ResponseEntity<UserInfoResponse> update(
        @RequestBody UserUpdateRequest updateRequest
    ) {
        UserInfoResponse info = userService.update(updateRequest);
        return ResponseEntity.ok(info);
    }
}
