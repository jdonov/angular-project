package com.winery.model.binding;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

public class UserRegisterDTO {
    private String username;
    private String password;
    private String confirmPassword;

    public UserRegisterDTO() {
    }

    public UserRegisterDTO(String username, String password, String confirmPassword) {
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
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
    @NotEmpty(message = "Password can not be empty!")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    //TODO Change password length to 6 characters
    @Length(min = 3, message = "Password confirm must be at least 6 characters long!")
    @NotEmpty(message = "Password confirm can not be empty!")
    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
