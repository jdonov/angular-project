package com.winery.model.binding;

import javax.validation.constraints.NotEmpty;

public class AddressUserBindingDTO {
    private String city;
    private String street;

    public AddressUserBindingDTO() {
    }

    public AddressUserBindingDTO(String city, String street) {
        this.city = city;
        this.street = street;
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
