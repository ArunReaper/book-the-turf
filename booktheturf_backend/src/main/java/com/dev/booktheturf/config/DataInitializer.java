package com.dev.booktheturf.config;

import com.dev.booktheturf.entity.Admin;
import com.dev.booktheturf.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (adminRepository.findByUsername("Sonali").isEmpty()) {
            Admin admin = Admin.builder()
                    .username("Sonali")
                    .password(passwordEncoder.encode("Sonaarun@101"))
                    .build();
            adminRepository.save(admin);
            System.out.println("Default admin user created: Sonali");
        }
    }
}