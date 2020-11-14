package com.winery.model.service;

import java.util.List;

public class WineryDetailsServiceDTO extends BaseServiceModel{
    private String name;
    private AddressServiceDTO address;
    private String description;
    private String imageUrl;
    private List<WineServiceDTO> wines;
    private List<CommentServiceDTO> comments;

    public WineryDetailsServiceDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AddressServiceDTO getAddress() {
        return address;
    }

    public void setAddress(AddressServiceDTO address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<WineServiceDTO> getWines() {
        return wines;
    }

    public void setWines(List<WineServiceDTO> wines) {
        this.wines = wines;
    }

    public List<CommentServiceDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentServiceDTO> comments) {
        this.comments = comments;
    }
}
