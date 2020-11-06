package com.winery.model.service;

public class OrderWineServiceDTO {
    private String wineId;
    private String name;
    private int quantity;

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

    @Override
    public String toString() {
        return String.format("Wine: %s, quantity: %d", this.name, this.quantity);
    }
}
