package com.dev.booktheturf.controller;

import com.dev.booktheturf.dto.UpdateLeadStatusRequest;
import com.dev.booktheturf.entity.Lead;
import com.dev.booktheturf.service.LeadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    @PostMapping
    public Lead saveLead(@RequestBody Lead lead) {

        return leadService.saveLead(lead);
    }

    @GetMapping
    public List<Lead> getAllLeads() {
        return leadService.getAllLeads();
    }

    @PutMapping("/{id}/status")
    public Lead updateLeadStatus(
            @PathVariable Long id,
            @RequestBody UpdateLeadStatusRequest request
    ) {

        return leadService.updateLeadStatus(
                id,
                request.status()
        );
    }
}