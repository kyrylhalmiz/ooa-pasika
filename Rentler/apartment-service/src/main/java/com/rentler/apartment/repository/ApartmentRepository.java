package com.rentler.apartment.repository;

import com.rentler.apartment.entity.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Long> {

    Optional<Apartment> findByIdAndOwner(Long id, String owner);

    List<Apartment> findAllByOwner(String owner);
}

