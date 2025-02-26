package com.codemeet.utils.dto;

import com.codemeet.utils.annotation.FutureTime;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.List;

public record InstantMeetingRequest
        (
                @NotNull String title,
                String description,
                @NotNull Integer creatorId
        )
{
}