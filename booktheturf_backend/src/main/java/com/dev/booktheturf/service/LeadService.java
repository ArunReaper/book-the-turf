package com.dev.booktheturf.service;

import com.dev.booktheturf.entity.Lead;

import java.util.List;

public interface LeadService {

    Lead saveLead(Lead lead);

    List<Lead> getAllLeads();
}