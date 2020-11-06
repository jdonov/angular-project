package com.winery.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "addresses")
public class Address extends BaseEntity{
    private Winery winery;
    private Region region;
    private String city;
    private String street;

    public Address() {
    }

    @OneToOne(mappedBy = "address", targetEntity = Winery.class)
    public Winery getWinery() {
        return winery;
    }

    public void setWinery(Winery winery) {
        this.winery = winery;
    }

    @Column(name = "region")
    @Enumerated(EnumType.ORDINAL)
    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    @Column(name = "city", nullable = false)
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Column(name = "street", nullable = false)
    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }
}
