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

    private String description;

    private Double pricePerHour;

    private String imageUrl;

    private String contactNumber;
}