package com.rentler.apartment.dto;

import com.rentler.apartment.enums.Amenities;
import com.rentler.apartment.enums.ApartmentType;
import com.rentler.apartment.enums.PetPolicy;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApartmentDto {

    private Long id;

    private String name;

    private Long price;

    private String owner;

    private AddressDto address;

    private ApartmentType type;

    private Integer beds;

    private Integer bath;

    private Integer floor;

    private Double squareMeters;

    private PetPolicy petPolicy;

    private String description;

    private Set<Amenities> amenities;

    private LocalDate availableFrom;

    private LocalDate creationDate;

    private List<String> photos;

    private Integer highestPrice;

    private Integer applicationsCount;
}
