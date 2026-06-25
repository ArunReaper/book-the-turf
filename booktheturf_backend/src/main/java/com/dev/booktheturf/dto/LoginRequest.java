package com.dev.booktheturf.dto;

public record LoginRequest(
        String username,
        String password
) {
}