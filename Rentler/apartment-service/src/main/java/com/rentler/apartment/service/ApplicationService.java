package com.rentler.apartment.service;

import com.rentler.apartment.dto.ApplicationDto;
import com.rentler.apartment.entity.Apartment;
import com.rentler.apartment.entity.Application;
import com.rentler.apartment.enums.ApplicationStatus;
import com.rentler.apartment.exception.ApplicationNotFoundException;
import com.rentler.apartment.mapper.ApartmentMapper;
import com.rentler.apartment.mapper.ApplicationMapper;
import com.rentler.apartment.repository.ApplicationRepository;
import com.rentler.helper.rabbit.RabbitConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;
    private final ApartmentService apartmentService;
    private final ApartmentMapper apartmentMapper;
    private final RabbitTemplate template;

    @Autowired
    public ApplicationService(ApplicationRepository applicationRepository,
                              ApplicationMapper applicationMapper,
                              ApartmentService apartmentService,
                              ApartmentMapper apartmentMapper,
                              RabbitTemplate template) {
        this.applicationRepository = applicationRepository;
        this.applicationMapper = applicationMapper;
        this.apartmentService = apartmentService;
        this.apartmentMapper = apartmentMapper;
        this.template = template;
    }


    public ApplicationDto create(ApplicationDto applicationDto, String username) {
        Application application = applicationMapper.toEntity(applicationDto);
        application.setStatus(ApplicationStatus.PENDING);
        application.setOwner(username);

        template.convertAndSend(RabbitConfig.APPLICATIONS_NEW_MAILS_QUEUE_NAME, application.getApartment().getOwner());

        return applicationMapper.toDto(applicationRepository.save(application));
    }


    public ApplicationDto update(Long id, ApplicationDto applicationDto) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ApplicationNotFoundException("Application with such id not found: " + id));

        Apartment apartment = apartmentMapper.toEntity(apartmentService.getById(applicationDto.getApartmentId()));

        if (applicationDto.getStatus() != null) {

            if (applicationDto.getStatus().equals(ApplicationStatus.APPROVED)) {
                rejectAllForApartment(apartment);

                template.convertAndSend(RabbitConfig.APPLICATIONS_APPROVED_MAILS_QUEUE_NAME, application.getApartment().getOwner());
            }

            application.setStatus(applicationDto.getStatus());
        }

        application.setPrice(applicationDto.getPrice());
        application.setApartment(apartment);

        return applicationMapper.toDto(applicationRepository.save(application));
    }

    public List<ApplicationDto> getAllByOwner(String username) {
        return applicationRepository.findAllByOwner(username)
                .stream()
                .map(applicationMapper::toDto)
                .collect(Collectors.toList());
    }


    private void rejectAllForApartment(Apartment apartment) {
        applicationRepository.findAllByApartment(apartment).forEach(a -> {
            a.setStatus(ApplicationStatus.REJECTED);
            applicationRepository.save(a);

            template.convertAndSend(RabbitConfig.APPLICATIONS_REJECTED_MAILS_QUEUE_NAME, apartment.getOwner());
        });
    }

    public void delete(Long id) {
        applicationRepository.deleteById(id);
    }
}
