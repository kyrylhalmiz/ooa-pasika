package com.rentler.apartment.dto;

import com.rentler.apartment.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationDto {

    private Long id;

    @NotNull
    @Min(1)
    private Integer price;

    @NotNull
    private Long apartmentId;

    private ApplicationStatus status;

    private String owner;

    private LocalDateTime creationDate;
}
