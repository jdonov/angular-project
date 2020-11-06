package com.winery.model.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class OrderedWinesPK implements Serializable {
    private String orderId;
    private String wineId;

    public OrderedWinesPK() {
    }

    public OrderedWinesPK(String orderId, String wineId) {
        this.orderId = orderId;
        this.wineId = wineId;
    }

    @Column(name = "order_id", nullable = false)
    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    @Column(name = "wine_id", nullable = false)
    public String getWineId() {
        return wineId;
    }

    public void setWineId(String wineId) {
        this.wineId = wineId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderedWinesPK)) return false;
        OrderedWinesPK that = (OrderedWinesPK) o;
        return Objects.equals(orderId, that.orderId) &&
                Objects.equals(wineId, that.wineId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, wineId);
    }
}
