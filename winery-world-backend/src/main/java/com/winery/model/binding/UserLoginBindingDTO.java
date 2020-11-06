package com.winery.model.binding;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

public class UserLoginBindingDTO {
    private String username;
    private String password;

    public UserLoginBindingDTO() {
    }

    @Email(message = "Enter valid e-mail!")
    @NotEmpty(message = "E-mail can not be empty!")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    //TODO Change password length to 6 characters
    @Length(min = 3, message = "Password must be at least 6 characters long!")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
