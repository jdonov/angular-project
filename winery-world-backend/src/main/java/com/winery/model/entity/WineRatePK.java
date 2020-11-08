package com.winery.model.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
@Embeddable
public class WineRatePK implements Serializable {
    private String userId;
    private String wineId;

    public WineRatePK() {
    }

    public WineRatePK(String userId, String wineId) {
        this.userId = userId;
        this.wineId = wineId;
    }

    @Column(name = "user_id", nullable = false)
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Column(name = "wine_id", nullable = false)
    public String getWineId() {
        return wineId;
    }

    public void setWineId(String wineId) {
        this.wineId = wineId;
    }
}
