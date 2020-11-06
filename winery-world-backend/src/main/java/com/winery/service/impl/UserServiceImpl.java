package com.winery.service.impl;

import com.winery.exception.PasswordsNotMatchException;
import com.winery.exception.UserAlreadyExistsException;
import com.winery.model.binding.UserRegisterDTO;
import com.winery.model.entity.Role;
import com.winery.model.entity.User;
import com.winery.model.service.UserServiceDTO;
import com.winery.repository.UserRepository;
import com.winery.service.UserService;
import org.modelmapper.ModelMapper;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        return user.
                map(this::map).
                orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found!"));
    }

    @Override
    public UserServiceDTO registerUser(UserRegisterDTO userDTO) {
        this.userRepository.findByUsername(userDTO.getUsername()).ifPresent(u -> {
            throw new UserAlreadyExistsException(String.format("User with username '%s' already exists.", userDTO.getUsername()));
        });
        if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
            throw new PasswordsNotMatchException("Passwords doesn't match!");
        }
        User user = this.modelMapper.map(userDTO, User.class);
        if (this.userRepository.count() == 0) {
            user.setAuthorities(Set.of(Role.valueOf("ROLE_ADMIN")));
        } else {
            user.setAuthorities(Set.of(Role.valueOf("ROLE_USER")));
        }
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user = this.userRepository.saveAndFlush(user);
        return this.modelMapper.map(user, UserServiceDTO.class);
    }

    @Override
    public UserServiceDTO getUserById(String id) {
        return this.modelMapper.map(this.userRepository.findById(id), UserServiceDTO.class);
    }

    @Override
    public UserServiceDTO getUserByUsername(String username) {
        User user = this.userRepository.findByUsername(username).orElse(null);
        UserServiceDTO userServiceDTO = new UserServiceDTO();
        if (user != null) {
            userServiceDTO = this.modelMapper.map(user, UserServiceDTO.class);
        }
        return user == null ? null : userServiceDTO;
    }

    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username).orElse(null);
    }

    @Override
    public User getLoggedInUser() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.userRepository.findByUsername(username).orElse(null);
    }

    private UserDetails map(User user) {
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.
                        getAuthorities().
                        stream().
                        map(this::map).
                        collect(Collectors.toList())
        );
    }
    private GrantedAuthority map(Role role) {
        return new SimpleGrantedAuthority(role.name());
    }
}
