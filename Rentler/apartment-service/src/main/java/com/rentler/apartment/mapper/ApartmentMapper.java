package com.rentler.apartment.mapper;

import com.rentler.apartment.dto.ApartmentDto;
import com.rentler.apartment.entity.Apartment;
import com.rentler.apartment.entity.Application;
import com.rentler.apartment.repository.ApplicationRepository;
import com.rentler.helper.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Optional;

@Component
public class ApartmentMapper extends Mapper<Apartment, ApartmentDto> {

    private final ApplicationRepository applicationRepository;

    @Autowired
    public ApartmentMapper(ApplicationRepository applicationRepository) {
        super(Apartment.class, ApartmentDto.class);
        this.applicationRepository = applicationRepository;
    }

    @PostConstruct
    public void setupMapper() {
        mapper.createTypeMap(Apartment.class, ApartmentDto.class)
                .addMappings(m -> m.skip(ApartmentDto::setHighestPrice))
                .addMappings(m -> m.skip(ApartmentDto::setApplicationsCount))
                .setPostConverter(toDtoConverter());
    }

    @Override
    public void mapEntityFields(Apartment source, ApartmentDto destination) {
        Optional<Application> application = applicationRepository.findFirstByApartmentOrderByPriceDesc(source);
        application.ifPresent(value -> destination.setHighestPrice(value.getPrice()));
        destination.setApplicationsCount(applicationRepository.countAllByApartment(source));
    }
}

