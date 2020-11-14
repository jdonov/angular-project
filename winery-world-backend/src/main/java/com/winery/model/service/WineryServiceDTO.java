package com.winery.model.service;


public class WineryServiceDTO extends BaseServiceModel{
    private String name;
    private AddressServiceDTO address;
    private String description;
    private String imageUrl;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
