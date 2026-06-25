package com.dev.booktheturf.controller;

import com.dev.booktheturf.dto.UpdateLeadStatusRequest;
import com.dev.booktheturf.entity.Lead;
import com.dev.booktheturf.entity.Turf;
import com.dev.booktheturf.service.LeadService;
import com.dev.booktheturf.service.TurfService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final TurfService turfService;
    private final LeadService leadService;

    // ---- Turf Management ----

    @PostMapping("/turfs")
    public Turf createTurf(@RequestBody Turf turf) {
        return turfService.createTurf(turf);
    }

    @PutMapping("/turfs/{id}")
    public Turf updateTurf(
            @PathVariable Long id,
            @RequestBody Turf turf
    ) {
        return turfService.updateTurf(id, turf);
    }

    @DeleteMapping("/turfs/{id}")
    public void deleteTurf(@PathVariable Long id) {
        turfService.deleteTurf(id);
    }

    // ---- Lead Management ----

    @GetMapping("/leads")
    public List<Lead> getAllLeads() {
        return leadService.getAllLeads();
    }

    @PutMapping("/leads/{id}/status")
    public Lead updateLeadStatus(
            @PathVariable Long id,
            @RequestBody UpdateLeadStatusRequest request
    ) {
        return leadService.updateLeadStatus(id, request.status());
    }
}