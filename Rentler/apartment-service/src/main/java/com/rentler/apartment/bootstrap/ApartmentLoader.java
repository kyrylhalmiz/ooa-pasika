package com.rentler.apartment.bootstrap;

import com.rentler.apartment.dto.AddressDto;
import com.rentler.apartment.dto.ApartmentUpdateDto;
import com.rentler.apartment.enums.Amenities;
import com.rentler.apartment.enums.ApartmentType;
import com.rentler.apartment.enums.PetPolicy;
import com.rentler.apartment.service.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Set;

@Component
public class ApartmentLoader implements ApplicationListener<ApplicationReadyEvent> {
    private final ApartmentService apartmentService;

    @Autowired
    public ApartmentLoader(ApartmentService apartmentService) {
        this.apartmentService = apartmentService;
    }

    @Override
    @Transactional
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {

        ApartmentUpdateDto apartment = ApartmentUpdateDto.builder()
                .name("My Apartment")
                .price(10000L)
                .address(AddressDto.builder()
                        .city("Lviv")
                        .street("Shevchenka")
                        .houseNumber("80")
                        .build())
                .type(ApartmentType.APARTMENT)
                .beds(2)
                .bath(2)
                .floor(4)
                .squareMeters(55.0)
                .petPolicy(PetPolicy.NO_PETS)
                .description("Some description...")
                .amenities(Set.of(Amenities.GYM, Amenities.PARKING))
                .availableFrom(LocalDate.now())
                .build();

        apartmentService.create(apartment, "andriy");
    }
}

