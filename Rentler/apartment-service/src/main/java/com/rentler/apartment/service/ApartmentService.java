package com.rentler.apartment.service;

import com.rentler.apartment.dto.ApartmentDto;
import com.rentler.apartment.dto.ApartmentUpdateDto;
import com.rentler.apartment.dto.ApplicationDto;
import com.rentler.apartment.dto.SearchParams;
import com.rentler.apartment.entity.Address;
import com.rentler.apartment.entity.Apartment;
import com.rentler.apartment.enums.Amenities;
import com.rentler.apartment.enums.ApartmentType;
import com.rentler.apartment.exception.ApartmentNotFoundException;
import com.rentler.apartment.mapper.ApartmentMapper;
import com.rentler.apartment.mapper.ApplicationMapper;
import com.rentler.apartment.repository.ApartmentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApartmentService {
    private final ApartmentRepository apartmentRepository;
    private final ApartmentMapper apartmentMapper;
    private final ApplicationMapper applicationMapper;
    private final ModelMapper modelMapper;

    @Autowired
    public ApartmentService(ApartmentRepository apartmentRepository,
                            ApartmentMapper apartmentMapper,
                            ApplicationMapper applicationMapper,
                            ModelMapper modelMapper) {
        this.apartmentRepository = apartmentRepository;
        this.applicationMapper = applicationMapper;
        this.apartmentMapper = apartmentMapper;
        this.modelMapper = modelMapper;
    }

    public List<ApartmentDto> getByPage(Pageable pageable) {
        return apartmentRepository.findAll(pageable)
                .stream()
                .map(apartmentMapper::toDto)
                .collect(Collectors.toList());
    }

    public ApartmentDto getById(Long id) {
        Apartment apartment = apartmentRepository.findById(id)
                .orElseThrow(() -> new ApartmentNotFoundException("Apartment with such id not found: " + id));
        return apartmentMapper.toDto(apartment);
    }

    public List<ApplicationDto> getApplicationsByApartmentId(Long id) {
        Apartment apartment = apartmentRepository.findById(id)
                .orElseThrow(() -> new ApartmentNotFoundException("Apartment with such id not found: " + id));
        return apartment.getApplications()
                .stream()
                .map(applicationMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<ApartmentDto> getByParams(SearchParams params) {
        return apartmentRepository.findAllByOwner(params.getOwner())
                .stream()
                .map(apartmentMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<String> getAmenities() {
        return Arrays.stream(Amenities.values())
                .map(Amenities::toString)
                .collect(Collectors.toList());
    }

    public List<String> getApartmentTypes() {
        return Arrays.stream(ApartmentType.values())
                .map(ApartmentType::toString)
                .collect(Collectors.toList());
    }

    public ApartmentDto create(ApartmentUpdateDto apartmentDto, String username) {
        Apartment apartment = modelMapper.map(apartmentDto, Apartment.class);
        apartment.setOwner(username);
        return apartmentMapper.toDto(apartmentRepository.save(apartment));
    }

    public ApartmentDto update(Long id, ApartmentUpdateDto apartmentDto, String username) {
        Apartment apartment = apartmentRepository.findByIdAndOwner(id, username)
                .orElseThrow(() -> new ApartmentNotFoundException("Apartment with such id not found: " + apartmentDto.getId()));

        apartment.setName(apartmentDto.getName());
        apartment.setPrice(apartmentDto.getPrice());
        apartment.setAddress(modelMapper.map(apartmentDto.getAddress(), Address.class));
        apartment.setType(apartmentDto.getType());
        apartment.setBeds(apartmentDto.getBeds());
        apartment.setBath(apartmentDto.getBath());
        apartment.setFloor(apartmentDto.getFloor());
        apartment.setSquareMeters(apartmentDto.getSquareMeters());
        apartment.setPetPolicy(apartmentDto.getPetPolicy());
        apartment.setDescription(apartmentDto.getDescription());
        apartment.setAmenities(apartmentDto.getAmenities());
        apartment.setAvailableFrom(apartmentDto.getAvailableFrom());
        apartment.setPhotos(apartmentDto.getPhotos());

        return apartmentMapper.toDto(apartmentRepository.save(apartment));
    }
}

