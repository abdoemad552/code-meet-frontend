package com.codemeet.service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import com.codemeet.entity.UserRole;
import com.codemeet.utils.dto.UserInfoResponse;
import com.codemeet.utils.dto.UserLoginRequest;
import com.codemeet.utils.dto.UserSignupRequest;
import com.codemeet.utils.dto.UserUpdateRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.codemeet.entity.User;
import com.codemeet.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User getUserEntityById(int id) {

        Optional<User> optionalUser = userRepository.findById(id);

        return optionalUser
                .orElseThrow(() ->new RuntimeException("User with userid = "+id +"not found"));
    }
    public UserInfoResponse getUserById(int id) {
        User user = getUserEntityById(id);
        return UserInfoResponse.of(user);
    }

    public User getUserEntityByUsername(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        return optionalUser
                .orElseThrow(() -> new RuntimeException("user with username= "+username+ "is not found"));
    }

    public User getUserEntityByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        return optionalUser
                .orElseThrow(() -> new RuntimeException("user with email= "+email+ "is not found"));
    }
   @Async
    public CompletableFuture<List<User>> getAllUserEntities() {
        return CompletableFuture.completedFuture(userRepository.findAll());
    }
    
    public User addUserEntity(User user) {
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
    
    public User updateUserEntity(User user) {
        Integer id = user.getId();
        
        if (userRepository.existsById(id)) {
            return userRepository.save(user);
        } else {
            throw new RuntimeException("user not found");
        }
    }


    public UserInfoResponse getUserByUsername(String username) {
        User user = getUserEntityByUsername(username);
        return UserInfoResponse.of(user);
    }
    
    public UserInfoResponse getUserByEmail(String email) {
        User user = getUserEntityByEmail(email);
        return UserInfoResponse.of(user);
    }
    
    public List<UserInfoResponse> getAllUsers() {
        return getAllUserEntities().join().stream()
            .map(UserInfoResponse::of)
            .toList();
    }
    

    
    public UserInfoResponse update(UserUpdateRequest updateRequest) {
        User user = userOf(updateRequest);
        return UserInfoResponse.of(updateUserEntity(user));
    }

    
    private User userOf(UserSignupRequest signupRequest) {
        User user = new User();
        user.setFirstName(signupRequest.firstName());
        user.setLastName(signupRequest.lastName());
        user.setUsername(signupRequest.username());
        user.setEmail(signupRequest.email());
        user.setPassword(signupRequest.password());
        user.setPhoneNumber(signupRequest.phoneNumber());
        user.setRole(UserRole.USER);
        return user;
    }
    
    public User userOf(UserUpdateRequest updateRequest) {
        User user = new User();
        user.setId(updateRequest.id());
        user.setFirstName(updateRequest.firstName());
        user.setLastName(updateRequest.lastName());
        user.setUsername(updateRequest.username());
        user.setEmail(updateRequest.email());
        user.setPassword(updateRequest.password());
        user.setPhoneNumber(updateRequest.phoneNumber());
        user.setRole(UserRole.USER);
        user.setProfilePicture(updateRequest.profilePicture());
        return user;
    }
}
