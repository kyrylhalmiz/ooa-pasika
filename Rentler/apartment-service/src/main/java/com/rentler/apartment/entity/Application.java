package com.rentler.apartment.entity;

import com.rentler.apartment.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime creationDate;

    @Column(nullable = false)
    private String owner;

    @Column(nullable = false)
    private Integer price;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Apartment apartment;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;

    @PrePersist
    public void prePersist() {
        creationDate = LocalDateTime.now();
    }
}

