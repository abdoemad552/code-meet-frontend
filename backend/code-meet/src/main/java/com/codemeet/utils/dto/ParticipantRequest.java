package com.codemeet.utils.dto;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.validation.constraints.NotNull;

public record ParticipantRequest(
        @NotNull Integer participantId,
        @NotNull Integer meetingId
        ) {
}
