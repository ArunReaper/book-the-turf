package com.dev.booktheturf.repository;

import com.dev.booktheturf.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRepository extends JpaRepository<Lead, Long> {
}