package com.codemeet.controller;

import java.util.List;
import java.util.concurrent.CompletableFuture;

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

    @GetMapping("/{id}")
    public ResponseEntity<UserInfoResponse> getUserById(@PathVariable int id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping
    public ResponseEntity<?> getUsersByFilter(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email) {

        if (name != null && email != null) {
            return ResponseEntity.badRequest().body("Please provide only one search criterion: either name or email, not both.");
        }

        if (name == null && email == null) {
            return ResponseEntity.badRequest().body("Please provide at least one search criterion: either name or email.");
        }
        UserInfoResponse user;


        if (name != null) {
            user = userService.getUserByUsername(name);
        }

        else {
            user = userService.getUserByEmail(email);
        }

        return ResponseEntity.ok(user);
    }

    @PutMapping("/update")
    public ResponseEntity<UserInfoResponse> update(
        @RequestBody UserUpdateRequest updateRequest
    ) {
        return ResponseEntity.ok(userService.update(updateRequest));
    }
}
