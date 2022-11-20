package com.rentler.apartment.entity;

import com.rentler.apartment.enums.Amenities;
import com.rentler.apartment.enums.ApartmentType;
import com.rentler.apartment.enums.PetPolicy;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "apartments")
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long price;

    @Column(nullable = false)
    private String owner;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private ApartmentType type;

    @Column(nullable = false)
    private Integer beds;

    @Column(nullable = false)
    private Integer bath;

    @Column(nullable = false)
    private Integer floor;

    @Column(nullable = false)
    private Double squareMeters;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private PetPolicy petPolicy;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @ElementCollection(targetClass = Amenities.class)
    @Enumerated(value = EnumType.STRING)
    private Set<Amenities> amenities;

    @Column(nullable = false)
    private LocalDate availableFrom;

    @Column(nullable = false)
    private LocalDate creationDate;

    @ElementCollection
    @Column(columnDefinition = "TEXT")
    private List<String> photos;

    @OneToMany(mappedBy = "apartment")
    private List<Application> applications;

    @PrePersist
    public void prePersist() {
        creationDate = LocalDate.now();
    }
}