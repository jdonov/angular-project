package com.winery.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SecurityConstants {

    public static String SECRET;
    public static final long EXPIRATION_TIME = 3 * 60 * 60 * 1000 * (24 * 7); // 3 hours //TODO remove (24*7) it is only for dev
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String REGISTER_URL = "/api/users/register";

    @Value("${SECRET_KEY}")
    public void setSecret(String secret) {
        SecurityConstants.SECRET = secret;
    }
}
