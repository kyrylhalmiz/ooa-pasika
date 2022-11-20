package com.rentler.account.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "accounts")
public class Account {
    @Id
    @Column(unique = true, nullable = false, length = 20)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(length = 20)
    private String firstName;

    @Column(length = 20)
    private String lastName;

    @Pattern(regexp = "^\\+(?:[0-9] ?){6,14}[0-9]$")
    @Column(unique = true)
    private String phoneNumber;

    private LocalDate dateOfBirth;

    @Column(nullable = false)
    private LocalDateTime dateOfRegistration;

    @Column(columnDefinition = "TEXT")
    private String avatar;
}
