package com.winery.model.service;

public class UserServiceDTO extends BaseServiceModel{
    private String username;

    public UserServiceDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
