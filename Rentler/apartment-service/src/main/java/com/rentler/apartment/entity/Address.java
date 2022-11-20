package com.rentler.apartment.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String city;

    @NotNull
    private String street;

    private String houseNumber;

    @OneToOne(mappedBy = "address", cascade = CascadeType.ALL)
    private Apartment apartment;
}
