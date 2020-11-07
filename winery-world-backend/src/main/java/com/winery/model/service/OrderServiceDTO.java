package com.winery.model.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;

public class OrderServiceDTO extends BaseServiceModel{
    private Set<OrderWineServiceDTO> wines;
    private AddressOrderServiceDTO receiverAddress;
    private LocalDateTime orderDateTime;
    private String status;

    public OrderServiceDTO() {
    }

    public Set<OrderWineServiceDTO> getWines() {
        return wines;
    }

    public void setWines(Set<OrderWineServiceDTO> wines) {
        this.wines = wines;
    }

    public AddressOrderServiceDTO getReceiverAddress() {
        return receiverAddress;
    }

    public void setReceiverAddress(AddressOrderServiceDTO receiverAddress) {
        this.receiverAddress = receiverAddress;
    }

    public LocalDateTime getOrderDateTime() {
        return orderDateTime;
    }

    public void setOrderDateTime(LocalDateTime orderDateTime) {
        this.orderDateTime = orderDateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
