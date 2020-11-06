package com.winery.model.service;


public class WineryServiceDTO extends BaseServiceModel{
    private String name;
    private AddressServiceDTO address;

    public WineryServiceDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AddressServiceDTO getAddress() {
        return address;
    }

    public void setAddress(AddressServiceDTO address) {
        this.address = address;
    }
}
