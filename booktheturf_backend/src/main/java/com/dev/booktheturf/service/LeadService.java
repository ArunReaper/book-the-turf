package com.dev.booktheturf.service;

import com.dev.booktheturf.entity.Lead;
import com.dev.booktheturf.entity.LeadStatus;

import java.util.List;

public interface LeadService {

    Lead saveLead(Lead lead);

    List<Lead> getAllLeads();

    Lead updateLeadStatus(
            Long leadId,
            LeadStatus status
    );
}