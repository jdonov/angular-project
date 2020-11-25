package com.winery.web;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.winery.exception.BindingResultException;
import com.winery.exception.Error;
import com.winery.model.binding.UserRegisterDTO;
import com.winery.model.service.UserServiceDTO;
import com.winery.security.JWTAuthenticationFilter;
import com.winery.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.stream.Collectors;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static com.winery.security.SecurityConstants.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserServiceDTO> register(@Valid @RequestBody UserRegisterDTO userRegisterDTO, BindingResult bindingResult) throws IOException {
        if (bindingResult.hasErrors()) {
            throw new BindingResultException(new Error().setErrors(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList())));
        }
        UserServiceDTO createdUser = this.userService.registerUser(userRegisterDTO);

        URI location = MvcUriComponentsBuilder.fromMethodName(UserController.class, "register", UserServiceDTO.class, BindingResult.class)
                .pathSegment("{id}").buildAndExpand(createdUser.getId()).toUri();
        LOGGER.info("User created: {}", location);
        String token = JWT.create()
                .withSubject(userRegisterDTO.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.getBytes()));
        HttpHeaders headers = new HttpHeaders();
        headers.add(HEADER_STRING, TOKEN_PREFIX + token);
        headers.add("tokenExpirationDate", String.valueOf(EXPIRATION_TIME));
        return ResponseEntity.created(location).headers(headers).body(createdUser);
    }

}
