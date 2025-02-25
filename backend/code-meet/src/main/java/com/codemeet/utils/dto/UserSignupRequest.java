package com.codemeet.utils.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record UserSignupRequest(
    @NotNull
    @NotBlank
    @Length(max = 25)
    String firstName,
    
    @NotNull
    @NotBlank
    @Length(max = 25)
    String lastName,
    
    @NotNull
    @NotBlank
    @Length(max = 20)
    @Pattern(
        regexp = "",
        flags = {}
    )
    String username,
    
    @NotNull
    @NotBlank
    @Length(max = 100) // Minimum length is determined by the pattern
    @Pattern(
        regexp = "",
        flags = {}
    )
    String email,
    
    @NotNull
    @NotBlank
    @Length(
        min = 8,
        max = 100
    )
    String password,
    
    @NotNull
    @NotBlank
    @Length(max = 25)
    @Pattern(
        regexp = "",
        flags = {}
    )
    String phoneNumber
) {
}
