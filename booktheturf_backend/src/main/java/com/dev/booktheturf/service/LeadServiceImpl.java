package com.dev.booktheturf.service;

import com.dev.booktheturf.entity.Lead;
import com.dev.booktheturf.entity.LeadStatus;
import com.dev.booktheturf.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;

    @Override
    public Lead saveLead(Lead lead) {

        lead.setStatus(LeadStatus.NEW);
        return leadRepository.save(lead);
    }

    @Override
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    @Override
    public Lead updateLeadStatus(
            Long leadId,
            LeadStatus status
    ) {

        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(
                        () -> new RuntimeException("Lead not found")
                );

        lead.setStatus(status);

        return leadRepository.save(lead);
    }
}