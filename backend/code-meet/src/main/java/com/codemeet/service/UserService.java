package com.codemeet.service;

import java.util.List;
import java.util.Optional;

import com.codemeet.utils.dto.UserInfoResponse;
import com.codemeet.utils.dto.UserLoginRequest;
import com.codemeet.utils.dto.UserSignupRequest;
import com.codemeet.utils.dto.UserUpdateRequest;
import org.springframework.stereotype.Service;

import com.codemeet.entity.User;
import com.codemeet.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User getUserById(int userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("user not found"));
    }
    
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("user not found"));
    }
    
    public User getUserByEmail(String email) {
        return userRepository.findByUsername(email)
            .orElseThrow(() -> new RuntimeException("user not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User addUser(User user) {
        // Username and Email must be unique...
        String username = user.getUsername();
        String email = user.getEmail();
        
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("username {%s} already exists".formatted(username));
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("email {%s} already exists".formatted(email));
        }
        
        return userRepository.save(user);
    }
    
    public User updateUser(User user) {
        Integer id = user.getId();
        
        if (userRepository.existsById(id)) {
            return userRepository.save(user);
        } else {
            throw new RuntimeException("user not found");
        }
    }
    
    public UserInfoResponse signup(UserSignupRequest signupRequest) {
        User user = UserSignupRequest.map(signupRequest);
        return UserInfoResponse.map(addUser(user));
    }
    
    public UserInfoResponse login(UserLoginRequest loginRequest) {
        Optional<User> o = userRepository.findByEmail(loginRequest.email());
        if (o.isEmpty()) {
            throw new RuntimeException("user not found");
        }
        
        User user = o.get();
        if (user.getPassword().equals(loginRequest.password())) {
            return UserInfoResponse.map(updateUser(user));
        } else {
            throw new RuntimeException("incorrect password");
        }
    }
    
    public UserInfoResponse update(UserUpdateRequest updateRequest) {
        User user = UserUpdateRequest.map(updateRequest);
        return UserInfoResponse.map(updateUser(user));
    }
}
