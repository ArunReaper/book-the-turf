package com.dev.booktheturf.service;

import com.dev.booktheturf.entity.Lead;
import com.dev.booktheturf.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;

    @Override
    public Lead saveLead(Lead lead) {

        lead.setStatus("NEW");

        return leadRepository.save(lead);
    }
}