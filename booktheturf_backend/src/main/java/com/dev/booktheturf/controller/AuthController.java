package com.dev.booktheturf.controller;

import com.dev.booktheturf.dto.LoginRequest;
import com.dev.booktheturf.dto.LoginResponse;
import com.dev.booktheturf.entity.Admin;
import com.dev.booktheturf.repository.AdminRepository;
import com.dev.booktheturf.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        Admin admin = adminRepository.findByUsername(request.username())
                .orElse(null);

        if (admin == null || !passwordEncoder.matches(request.password(), admin.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = jwtUtil.generateToken(admin.getUsername());
        return ResponseEntity.ok(new LoginResponse(token));
    }
}