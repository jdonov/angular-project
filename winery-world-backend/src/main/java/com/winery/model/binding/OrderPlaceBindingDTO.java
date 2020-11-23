package com.winery.model.binding;

import com.winery.constraint.AddressUserValidation;
import com.winery.constraint.AddressWineryValidation;
import com.winery.constraint.OrderedWines;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;

public class OrderPlaceBindingDTO {

    private Set<OrderWineBindingDTO> orderedWines;
    private AddressUserBindingDTO receiverAddress;

    public OrderPlaceBindingDTO() {
    }

    public OrderPlaceBindingDTO(Set<OrderWineBindingDTO> orderedWines, AddressUserBindingDTO receiverAddress) {
        this.orderedWines = orderedWines;
        this.receiverAddress = receiverAddress;
    }

    @OrderedWines
    public Set<OrderWineBindingDTO> getOrderedWines() {
        return orderedWines;
    }

    public void setOrderedWines(Set<OrderWineBindingDTO> orderedWines) {
        this.orderedWines = orderedWines;
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
