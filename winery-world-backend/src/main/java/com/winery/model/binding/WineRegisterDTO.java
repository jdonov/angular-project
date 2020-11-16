package com.winery.model.binding;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;

public class WineRegisterDTO {
    private String name;
    private BigDecimal price;
    private String description;
    private String imageUrl;
    private String wineryId;

    public WineRegisterDTO() {
    }

    public WineRegisterDTO(String name, BigDecimal price, String description, String imageUrl, String wineryId) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.wineryId = wineryId;
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

    @NotEmpty(message = "Image is required!")
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @NotEmpty(message = "Winery is required!")
    public String getWineryId() {
        return wineryId;
    }

    public void setWineryId(String wineryId) {
        this.wineryId = wineryId;
    }
}
