package com.codemeet.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.codemeet.entity.User;
import com.codemeet.repository.UserRepository;
import com.codemeet.utils.dto.UserDTO;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

 public List<UserDTO> getAllUsers() {

    return userRepository.findAll()
            .stream()
            .map(user -> new UserDTO(
                    user.getFirstName(),
                    user.getLastName(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getPhoneNumber()
            ))
            .toList();
      }

    public UserDTO getUserById(int userId) {
       User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

       return new UserDTO(
               user.getFirstName(),
               user.getLastName(),
               user.getUsername(),
               user.getEmail(),
               user.getPhoneNumber());
    }

    public UserDTO getUserByUsername(String username) {
        User user =  userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDTO(
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
                user.getPhoneNumber());
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }
}
