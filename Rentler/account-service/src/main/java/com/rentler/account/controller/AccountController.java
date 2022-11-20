package com.rentler.account.controller;


import com.rentler.account.dto.AccountCreateDto;
import com.rentler.account.dto.AccountDto;
import com.rentler.account.dto.AccountUpdateDto;
import com.rentler.account.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public ResponseEntity<List<AccountDto>> getAccounts() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(accountService.getAll());
    }

    @PostMapping
    public ResponseEntity<AccountDto> createAccount(@RequestBody @Valid AccountCreateDto accountCreateDto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(accountService.create(accountCreateDto));
    }

    @GetMapping("/{username}")
    public ResponseEntity<AccountDto> getAccount(@PathVariable String username) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(accountService.getByUsername(username));
    }

    @GetMapping("/current")
    public Object getCurrentAccount(Principal principal) {
        return accountService.getByUsername(principal.getName());
    }

    @PutMapping("/current")
    public ResponseEntity<AccountDto> updateAccount(@RequestBody @Valid AccountUpdateDto accountUpdateDto,
                                                    Principal principal) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(accountService.update(accountUpdateDto, principal.getName()));
    }
}
