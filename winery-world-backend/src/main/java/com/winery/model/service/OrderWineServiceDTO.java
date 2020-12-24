package com.winery.model.service;

import java.math.BigDecimal;

public class OrderWineServiceDTO {
    private String wineId;
    private String name;
    private int quantity;
    private BigDecimal price;
    private String status;

    public OrderWineServiceDTO() {
    }

    public String getWineId() {
        return wineId;
    }

    public void setWineId(String wineId) {
        this.wineId = wineId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return String.format("Wine: %s, quantity: %d, status: %s", this.name, this.quantity, this.status);
    }
}
