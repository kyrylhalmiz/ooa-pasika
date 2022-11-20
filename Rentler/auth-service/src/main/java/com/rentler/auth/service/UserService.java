package com.rentler.auth.service;

import com.rentler.auth.dto.PasswordDto;
import com.rentler.auth.dto.UserDto;
import com.rentler.auth.entity.User;
import com.rentler.auth.enums.Role;
import com.rentler.auth.exception.UserAlreadyExistsException;
import com.rentler.auth.exception.UserNotFoundException;
import com.rentler.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    @Transactional
    public void create(UserDto userDto) {
        Optional<User> existing = repository.findByUsername(userDto.getUsername());

        existing.ifPresent(usr -> {
            throw new UserAlreadyExistsException("User already exists");
        });

        User user = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .role(Role.ROLE_USER)
                .build();

        repository.save(user);
    }

    public void updatePassword(PasswordDto passwordDto, String username) {
        User user = repository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with such username not exists: " + username));

        user.setPassword(passwordEncoder.encode(passwordDto.getPassword()));

        repository.save(user);
    }
}
