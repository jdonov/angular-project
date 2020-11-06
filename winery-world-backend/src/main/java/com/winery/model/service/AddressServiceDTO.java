package com.winery.model.service;

import com.winery.model.entity.Region;

public class AddressServiceDTO extends BaseServiceModel{
    private Region region;
    private String city;
    private String street;

    public AddressServiceDTO() {
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
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
