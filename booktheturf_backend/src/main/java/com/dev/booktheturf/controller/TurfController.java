package com.dev.booktheturf.controller;

import com.dev.booktheturf.entity.Turf;
import com.dev.booktheturf.service.TurfService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}