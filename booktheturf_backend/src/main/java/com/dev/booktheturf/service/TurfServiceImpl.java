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

    @Override
    public Turf createTurf(Turf turf) {

        return turfRepository.save(turf);

    }

    @Override
    public Turf updateTurf(
            Long id,
            Turf updatedTurf
    ) {

        Turf turf =
                turfRepository.findById(id)
                        .orElseThrow();

        turf.setName(updatedTurf.getName());
        turf.setLocation(updatedTurf.getLocation());
        turf.setPricePerHour(updatedTurf.getPricePerHour());
        turf.setImageUrl(updatedTurf.getImageUrl());

        return turfRepository.save(turf);
    }

    @Override
    public void deleteTurf(Long id) {

        turfRepository.deleteById(id);

    }
}