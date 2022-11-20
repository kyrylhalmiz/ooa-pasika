package com.rentler.apartment.controller;

import com.rentler.apartment.dto.ApartmentDto;
import com.rentler.apartment.dto.ApartmentUpdateDto;
import com.rentler.apartment.dto.ApplicationDto;
import com.rentler.apartment.dto.SearchParams;
import com.rentler.apartment.service.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping
public class ApartmentController {
    private final ApartmentService apartmentService;

    @Autowired
    public ApartmentController(ApartmentService apartmentService) {
        this.apartmentService = apartmentService;
    }

    @GetMapping
    public ResponseEntity<List<ApartmentDto>> getApartments(Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(apartmentService.getByPage(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApartmentDto> getApartment(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(apartmentService.getById(id));
    }

    @GetMapping("/{id}/applications")
    public ResponseEntity<List<ApplicationDto>> getApplications(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(apartmentService.getApplicationsByApartmentId(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ApartmentDto>> getByParams(SearchParams params) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(apartmentService.getByParams(params));
    }

    @GetMapping("/amenities")
    public ResponseEntity<List<String>> getAmenities() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(apartmentService.getAmenities());
    }

    @GetMapping("/types")
    public ResponseEntity<List<String>> getApartmentTypes() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(apartmentService.getApartmentTypes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApartmentDto> updateApartment(@PathVariable Long id,
                                                        @RequestBody @Valid ApartmentUpdateDto apartmentUpdateDto,
                                                        Principal principal) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(apartmentService.update(id, apartmentUpdateDto, principal.getName()));
    }

    @PostMapping
    public ResponseEntity<ApartmentDto> createApartment(@RequestBody @Valid ApartmentUpdateDto apartmentDto,
                                                        Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(apartmentService.create(apartmentDto, principal.getName()));
    }
}
