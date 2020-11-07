package com.winery.model.service;

import com.winery.model.entity.Region;

public class AddressOrderServiceDTO {
    private String city;
    private String street;

    public AddressOrderServiceDTO() {
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }
}
