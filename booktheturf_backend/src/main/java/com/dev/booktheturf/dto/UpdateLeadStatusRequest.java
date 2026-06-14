package com.dev.booktheturf.dto;

import com.dev.booktheturf.entity.LeadStatus;

public record UpdateLeadStatusRequest(
        LeadStatus status
) {
}