package com.dev.booktheturf.controller;

import com.dev.booktheturf.entity.Lead;
import com.dev.booktheturf.service.LeadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    @PostMapping
    public Lead saveLead(@RequestBody Lead lead) {

        return leadService.saveLead(lead);
    }
}
