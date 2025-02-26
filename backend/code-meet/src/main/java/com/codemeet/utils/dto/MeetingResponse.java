package com.codemeet.utils.dto;

import java.time.Instant;

public record MeetingResponse
        (
                Integer id,
                String title,
             Instant startsAt

        )
{
}
