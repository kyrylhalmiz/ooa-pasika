package com.rentler.apartment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {
    private Long id;

    @NotBlank
    private String city;

    @NotBlank
    private String street;

    private String houseNumber;
}
