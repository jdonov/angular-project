package com.winery.model.binding;

import com.winery.constraint.AddressWineryValidation;
import com.winery.model.entity.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class WineryRegisterBindingDTO {
    private String name;
    private AddressWineryBindingDTO address;
    private String description;
    private String imageUrl;

    public WineryRegisterBindingDTO() {
    }

    public WineryRegisterBindingDTO(String name, AddressWineryBindingDTO address, String description, String imageUrl) {
        this.name = name;
        this.address = address;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    @NotEmpty(message = "Winery name can not be empty!")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @AddressWineryValidation
    public AddressWineryBindingDTO getAddress() {
        return address;
    }

    public void setAddress(AddressWineryBindingDTO address) {
        this.address = address;
    }

    @NotNull(message = "Description is required!")

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @NotNull(message = "Image url is required!")
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
