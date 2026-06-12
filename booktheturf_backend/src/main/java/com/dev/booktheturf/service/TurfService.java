package com.dev.booktheturf.service;

import com.dev.booktheturf.entity.Turf;

import java.util.List;

public interface TurfService {

    List<Turf> getAllTurfs();

    Turf getTurfById(Long id);
}