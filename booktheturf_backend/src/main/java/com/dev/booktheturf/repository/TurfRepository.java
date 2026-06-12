package com.dev.booktheturf.repository;

import com.dev.booktheturf.entity.Turf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TurfRepository
        extends JpaRepository<Turf, Long> {
}