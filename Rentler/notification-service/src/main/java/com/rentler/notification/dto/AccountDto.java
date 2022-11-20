package com.rentler.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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
}
