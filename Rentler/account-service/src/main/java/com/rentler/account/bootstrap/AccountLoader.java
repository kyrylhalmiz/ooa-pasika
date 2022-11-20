package com.rentler.account.bootstrap;

import com.rentler.account.entity.Account;
import com.rentler.account.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class AccountLoader implements ApplicationListener<ApplicationReadyEvent> {
    private final AccountRepository accountRepository;

    @Autowired
    public AccountLoader(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    @Transactional
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        Account account = Account.builder()
                .username("andriy")
                .email("andriy@mail.com")
                .firstName("Andriy")
                .lastName("Pyzh")
                .phoneNumber("+380672568301")
                .dateOfBirth(LocalDate.of(2000, 12, 24))
                .dateOfRegistration(LocalDateTime.now())
                .build();

        accountRepository.save(account);
    }
}

