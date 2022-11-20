package com.rentler.apartment.dto;

import com.rentler.apartment.enums.Amenities;
import com.rentler.apartment.enums.ApartmentType;
import com.rentler.apartment.enums.PetPolicy;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApartmentUpdateDto {
    private Long id;

    @NotBlank
    private String name;

    @NotNull
    @Positive
    private Long price;

    @NotNull
    private AddressDto address;

    @NotNull
    private ApartmentType type;

    @NotNull
    @PositiveOrZero
    private Integer beds;

    @NotNull
    @PositiveOrZero
    private Integer bath;

    @NotNull
    private Integer floor;

    @NotNull
    @Positive
    private Double squareMeters;

    @NotNull
    private PetPolicy petPolicy;

    @NotBlank
    @Length(min = 10, max = 1000)
    private String description;

    private Set<Amenities> amenities;

    @NotNull
    @FutureOrPresent
    private LocalDate availableFrom;

    private List<String> photos;
}
