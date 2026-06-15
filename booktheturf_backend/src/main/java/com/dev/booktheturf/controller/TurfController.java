package com.dev.booktheturf.controller;

import com.dev.booktheturf.entity.Turf;
import com.dev.booktheturf.service.TurfService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/turfs")
@RequiredArgsConstructor
public class TurfController {

    private final TurfService turfService;

    @GetMapping
    public List<Turf> getAllTurfs() {
        return turfService.getAllTurfs();
    }

    @GetMapping("/{id}")
    public Turf getTurfById(@PathVariable Long id) {
        return turfService.getTurfById(id);
    }

    @PostMapping
    public Turf createTurf(
            @RequestBody Turf turf
    ) {

        return turfService.createTurf(turf);
    }

    @PutMapping("/{id}")
    public Turf updateTurf(
            @PathVariable Long id,
            @RequestBody Turf turf
    ) {

        return turfService.updateTurf(
                id,
                turf
        );

    }

    @DeleteMapping("/{id}")
    public void deleteTurf(
            @PathVariable Long id
    ) {

        turfService.deleteTurf(id);

    }
}