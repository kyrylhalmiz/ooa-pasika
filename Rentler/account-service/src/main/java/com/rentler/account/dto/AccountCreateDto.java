package com.rentler.account.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountCreateDto {
    @NotNull
    private String username;

    @Email
    private String email;

    @NotNull
    private String password;
}
