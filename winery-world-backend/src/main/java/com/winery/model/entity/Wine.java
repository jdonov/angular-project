package com.winery.model.entity;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PositiveOrZero;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "wine")
public class Wine extends BaseEntity{
    private String name;
    private BigDecimal price;
    private String description;
    private String imageUrl;
    private Winery winery;
    private List<WineRate> ratings;

    public Wine() {
    }

    @Column(name = "name", nullable = false)
    @Length(min = 3, message = "Name must be at least 3 characters long!")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "price", nullable = false)
    @PositiveOrZero(message = "Price must be positive number!")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    @NotEmpty(message = "Description can not be empty!")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "image_url", nullable = false)
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "winery_id", referencedColumnName = "id")
    public Winery getWinery() {
        return winery;
    }

    public void setWinery(Winery winery) {
        this.winery = winery;
    }

    @OneToMany(mappedBy = "wine", fetch = FetchType.EAGER)
    public List<WineRate> getRatings() {
        return ratings;
    }

    public void setRatings(List<WineRate> ratings) {
        this.ratings = ratings;
    }
}
