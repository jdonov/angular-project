package com.winery.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "wine_rate")
public class WineRate {
    private WineRatePK id;
    private Rating rate;
    private Wine wine;
    private User user;

    public WineRate() {
    }

    @EmbeddedId
    public WineRatePK getId() {
        return id;
    }

    public void setId(WineRatePK id) {
        this.id = id;
    }

    @Column(name = "rating")
    @Enumerated(EnumType.ORDINAL)
    public Rating getRate() {
        return rate;
    }

    public void setRate(Rating rate) {
        this.rate = rate;
    }

    @ManyToOne(targetEntity = Wine.class)
    @MapsId("wineId")
    @JoinColumn(name = "wine_id",referencedColumnName = "id")
    public Wine getWine() {
        return wine;
    }

    public void setWine(Wine wine) {
        this.wine = wine;
    }

    @ManyToOne(targetEntity = User.class)
    @MapsId("userId")
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
