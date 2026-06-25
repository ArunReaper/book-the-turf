package com.dev.booktheturf.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**")
                .allowedOriginPatterns(
                        "http://localhost:*",
                        "https://*.vercel.app",
                        "https://*.booktheturf.online",
                        "https://booktheturf.online"
                )
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}