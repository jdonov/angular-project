package com.winery.model.binding;

import com.winery.model.entity.Region;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotEmpty;

public class AddressWineryBindingDTO {
    private String region;
    private String city;
    private String street;

    public AddressWineryBindingDTO() {
    }

    public AddressWineryBindingDTO(String region, String city, String street) {
        this.region = region;
        this.city = city;
        this.street = street;
    }

    @Column(name = "region")
    @NotEmpty(message = "Region can not be empty")
    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    @NotEmpty(message = "City can not be empty!")
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @NotEmpty(message = "Street can not be empty!")
    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }
}
