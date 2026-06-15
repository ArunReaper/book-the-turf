package com.dev.booktheturf.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "turfs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Turf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 2000)
    private String imageUrl;

    private String sportsType;

    private Double rating;

    private Double pricePerHour;

    private String contactNumber;
}