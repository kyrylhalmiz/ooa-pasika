package com.rentler.account.client;

import com.rentler.account.dto.AccountCreateDto;
import com.rentler.account.dto.AccountUpdateDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(name = "auth-service")
public interface AuthServiceClient {

    @PostMapping(value = "/auth/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    void createUser(AccountCreateDto user);

    @PutMapping(value = "/auth/users/{username}", consumes = MediaType.APPLICATION_JSON_VALUE)
    void updatePassword(AccountUpdateDto user, @PathVariable("username") String username);

}