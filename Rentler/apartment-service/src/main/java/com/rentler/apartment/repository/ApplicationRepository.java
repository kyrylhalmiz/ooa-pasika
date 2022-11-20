package com.rentler.apartment.repository;

import com.rentler.apartment.entity.Apartment;
import com.rentler.apartment.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    Optional<Application> findFirstByApartmentOrderByPriceDesc(Apartment apartment);

    List<Application> findAllByOwner(String owner);

    List<Application> findAllByApartment(Apartment apartment);

    Integer countAllByApartment(Apartment apartment);
}

