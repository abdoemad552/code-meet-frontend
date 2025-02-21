package com.codemeet.controller;

import java.util.List;

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
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    @GetMapping("/id/{id}")
    public ResponseEntity<UserInfoResponse> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
    
    @GetMapping("/username/{username}")
    public ResponseEntity<UserInfoResponse> getUserByUsername(
        @PathVariable String username
    ) {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<UserInfoResponse> getUserByEmail(
        @PathVariable String email
    ) {
        System.out.println(email);
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }
    
    @PostMapping("/signup")
    public ResponseEntity<UserInfoResponse> signup(
        @RequestBody UserSignupRequest signupRequest
    ) {
        return ResponseEntity.ok(userService.signup(signupRequest));
    }
    
    @PostMapping("/login")
    public ResponseEntity<UserInfoResponse> login(
        @RequestBody UserLoginRequest loginRequest
    ) {
        return ResponseEntity.ok(userService.login(loginRequest));
    }
    
    @PutMapping("/update")
    public ResponseEntity<UserInfoResponse> update(
        @RequestBody UserUpdateRequest updateRequest
    ) {
        return ResponseEntity.ok(userService.update(updateRequest));
    }
}
