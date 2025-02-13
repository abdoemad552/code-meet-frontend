package com.codemeet.utils.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserDTO(
        Integer id,

        @NotNull(message = "First name can't be null")
        @Size(min = 2, max = 25, message = "First name must be between 2 and 25 characters")
        String firstname,

        @NotNull(message = "Last name can't be null")
        @Size(min = 2, max = 25, message = "Last name must be between 2 and 25 characters")
        String lastname,

        @NotNull(message = "Phone number can't be null")
        @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Phone number must be between 10 and 15 digits, optionally starting with '+'")
        String phoneNumber,

        @NotNull(message = "Username can't be null")
        @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
        String username,

        @Email(message = "Invalid email format")
        String email
) {
}
