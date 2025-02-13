package com.codemeet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codemeet.entity.User;
import com.codemeet.repository.UserRepository;
import com.codemeet.utils.dto.UserDTO;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

 public List<UserDTO> getAllUsers() {

    return userRepository.findAll()
            .stream()
            .map(this::convertToDTO)
            .toList();
      }

    public UserDTO getUserDTOById(int userId) {
      User user=getUserById(userId);
       return convertToDTO(user);
    }
    public User getUserById(int userId)
    {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserDTO getUserByUsername(String username) {
        User user =  userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return convertToDTO(user);
    }
   private UserDTO convertToDTO(User user)
   {
       return new UserDTO(user.getId(),user.getFirstName(),
               user.getLastName(),user.getUsername(),user.getEmail(),user.getPhoneNumber());
   }
    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }
}
