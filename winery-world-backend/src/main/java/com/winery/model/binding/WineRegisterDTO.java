package com.winery.model.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

public class WineRegisterDTO {
    private String name;
    private BigDecimal price;
    private String description;
    private int quantityInWarehouse;
    private double weightInKg;
    private MultipartFile image;
    private boolean available;

    public WineRegisterDTO() {
    }

    @NotEmpty(message = "Product name can not be empty!")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Positive(message = "Price must be a positive number!")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @NotEmpty(message = "Description can not be empty!")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Positive(message = "Quantity must be positive!")
    public int getQuantityInWarehouse() {
        return quantityInWarehouse;
    }

    public void setQuantityInWarehouse(int quantityInWarehouse) {
        this.quantityInWarehouse = quantityInWarehouse;
    }

    @Positive(message = "Weight must be positive!")
    public double getWeightInKg() {
        return weightInKg;
    }

    public void setWeightInKg(double weightInKg) {
        this.weightInKg = weightInKg;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    @NotNull(message = "Enter availability!")
    @JsonProperty("available")
    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}
