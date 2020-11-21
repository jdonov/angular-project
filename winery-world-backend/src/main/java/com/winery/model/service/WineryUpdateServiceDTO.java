package com.winery.model.service;

import com.winery.model.binding.AddressWineryBindingDTO;

public class WineryUpdateServiceDTO extends BaseServiceModel{
    private String name;
    private AddressWineryBindingDTO address;
    private String description;
    private String imageUrl;

    public WineryUpdateServiceDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AddressWineryBindingDTO getAddress() {
        return address;
    }

    public void setAddress(AddressWineryBindingDTO address) {
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
