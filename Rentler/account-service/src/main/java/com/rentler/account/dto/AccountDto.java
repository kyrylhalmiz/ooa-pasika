package com.rentler.account.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountDto {

    private String username;

    private String email;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private LocalDate dateOfBirth;

    private LocalDateTime dateOfRegistration;

    private String avatar;
}
