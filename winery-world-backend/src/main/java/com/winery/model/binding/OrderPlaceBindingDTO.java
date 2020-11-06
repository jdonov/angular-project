package com.winery.model.binding;

import com.winery.constraint.AddressWineryValidation;
import com.winery.constraint.OrderedWines;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;

public class OrderPlaceBindingDTO {

    private Set<OrderWineBindingDTO> orderedWines;
    private String username;
    private AddressWineryBindingDTO receiverAddress;

    public OrderPlaceBindingDTO() {
    }

    @OrderedWines
    public Set<OrderWineBindingDTO> getOrderedWines() {
        return orderedWines;
    }

    public void setOrderedWines(Set<OrderWineBindingDTO> orderedWines) {
        this.orderedWines = orderedWines;
    }

    @NotEmpty(message = "Receiver first name can not be empty!")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @NotNull(message = "Address can not be empty!")
    @AddressWineryValidation
    public AddressWineryBindingDTO getReceiverAddress() {
        return receiverAddress;
    }

    public void setReceiverAddress(AddressWineryBindingDTO receiverAddress) {
        this.receiverAddress = receiverAddress;
    }

}
