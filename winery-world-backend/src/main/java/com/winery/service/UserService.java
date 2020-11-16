package com.winery.service;

import com.winery.model.binding.UserRegisterDTO;
import com.winery.model.entity.User;
import com.winery.model.service.UserServiceDTO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    UserServiceDTO registerUser(UserRegisterDTO user);

    UserServiceDTO getUserById(String id);

    UserServiceDTO getUserByUsername(String username);

    User getUser(String username);

    User getLoggedInUser();

    long getCountOfAllUsers();


}
