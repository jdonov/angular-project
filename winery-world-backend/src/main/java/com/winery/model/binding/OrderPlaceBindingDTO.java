package com.winery.model.binding;

import com.winery.constraint.AddressUserValidation;
import com.winery.constraint.AddressWineryValidation;
import com.winery.constraint.OrderedWines;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;

public class OrderPlaceBindingDTO {

    private Set<OrderWineBindingDTO> orderedWines;
    private String username;
    private AddressUserBindingDTO receiverAddress;

    public OrderPlaceBindingDTO() {
    }

    public OrderPlaceBindingDTO(Set<OrderWineBindingDTO> orderedWines, String username, AddressUserBindingDTO receiverAddress) {
        this.orderedWines = orderedWines;
        this.username = username;
        this.receiverAddress = receiverAddress;
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
    @AddressUserValidation
    public AddressUserBindingDTO getReceiverAddress() {
        return receiverAddress;
    }

    public void setReceiverAddress(AddressUserBindingDTO receiverAddress) {
        this.receiverAddress = receiverAddress;
    }

}
