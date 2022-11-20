package com.rentler.account.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountUpdateDto {

    @Email
    private String email;

    @Length(min = 8, max = 30)
    private String password;

    @NotBlank
    @Length(max = 20)
    @Pattern(regexp = "^[a-zA-Z]*$", message = "Can contain only letters")
    private String firstName;

    @NotBlank
    @Length(max = 20)
    @Pattern(regexp = "^[a-zA-Z]*$", message = "Can contain only letters")
    private String lastName;

    @Pattern(regexp = "^\\+(?:[0-9] ?){6,14}[0-9]$", message = "Not valid format of phone number")
    private String phoneNumber;

    @Past
    private LocalDate dateOfBirth;

    private String avatar;
}
