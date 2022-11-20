package com.rentler.auth.bootstrap;


import com.rentler.auth.dto.UserDto;
import com.rentler.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class UserLoader implements ApplicationListener<ApplicationReadyEvent> {
    private final UserService userService;

    @Autowired
    public UserLoader(UserService userService) {
        this.userService = userService;
    }

    @Override
    @Transactional
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {

        UserDto user = UserDto.builder()
                .username("andriy")
                .password("password")
                .build();

        userService.create(user);
    }
}

