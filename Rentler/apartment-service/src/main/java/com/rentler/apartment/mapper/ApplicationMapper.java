package com.rentler.apartment.mapper;

import com.rentler.apartment.dto.ApplicationDto;
import com.rentler.apartment.entity.Apartment;
import com.rentler.apartment.entity.Application;
import com.rentler.apartment.exception.ApartmentNotFoundException;
import com.rentler.apartment.repository.ApartmentRepository;
import com.rentler.helper.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class ApplicationMapper extends Mapper<Application, ApplicationDto> {

    private final ApartmentRepository apartmentRepository;

    @Autowired
    public ApplicationMapper(ApartmentRepository apartmentRepository) {
        super(Application.class, ApplicationDto.class);
        this.apartmentRepository = apartmentRepository;
    }

    @PostConstruct
    public void setupMapper() {
        mapper.createTypeMap(ApplicationDto.class, Application.class)
                .addMappings(m -> m.skip(Application::setApartment))
                .addMappings(m -> m.skip(Application::setCreationDate))
                .addMappings(m -> m.skip(Application::setOwner))
                .setPostConverter(toEntityConverter());

        mapper.createTypeMap(Application.class, ApplicationDto.class)
                .addMappings(m -> m.skip(ApplicationDto::setApartmentId))
                .setPostConverter(toDtoConverter());
    }

    @Override
    public void mapEntityFields(Application source, ApplicationDto destination) {
        destination.setApartmentId(source.getApartment().getId());
    }

    @Override
    public void mapDtoFields(ApplicationDto source, Application destination) {
        Apartment apartment = apartmentRepository.findById(source.getApartmentId())
                .orElseThrow(() -> new ApartmentNotFoundException("Apartment with such id not found: " + source.getApartmentId()));
        destination.setApartment(apartment);
    }
}

