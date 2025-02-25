package com.codemeet.utils.validator;

import com.codemeet.utils.annotation.FutureTime;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.Instant;

public class FutureTimeValidator implements ConstraintValidator<FutureTime, Instant> {

    @Override
    public boolean isValid(Instant value, ConstraintValidatorContext context) {
        return value != null && value.isAfter(Instant.now());
    }
}
