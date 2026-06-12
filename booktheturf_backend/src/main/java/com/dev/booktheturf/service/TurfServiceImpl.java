package com.dev.booktheturf.service;

import com.dev.booktheturf.entity.Turf;
import com.dev.booktheturf.repository.TurfRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TurfServiceImpl implements TurfService {

    private final TurfRepository turfRepository;

    @Override
    public List<Turf> getAllTurfs() {
        return turfRepository.findAll();
    }

    @Override
    public Turf getTurfById(Long id) {
        return turfRepository.findById(id)
                .orElseThrow();
    }
}