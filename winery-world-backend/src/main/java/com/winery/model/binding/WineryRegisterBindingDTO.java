package com.winery.model.binding;

import com.winery.constraint.AddressWineryValidation;
import com.winery.model.entity.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class WineryRegisterBindingDTO {
    private String name;
    private AddressWineryBindingDTO address;

    public WineryRegisterBindingDTO() {
    }

    public WineryRegisterBindingDTO(String name, AddressWineryBindingDTO address) {
        this.name = name;
        this.address = address;
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
}
