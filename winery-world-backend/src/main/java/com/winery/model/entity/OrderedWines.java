package com.winery.model.entity;

import javax.persistence.*;
import javax.validation.constraints.Positive;

@Entity
@Table(name = "ordered_wines")
public class OrderedWines {
    private OrderedWinesPK id;
    private int quantity;
    private Order order;
    private Wine wine;
    private User owner;
    private OrderStatus status;

    public OrderedWines() {
    }

    @EmbeddedId
    public OrderedWinesPK getId() {
        return id;
    }

    public void setId(OrderedWinesPK id) {
        this.id = id;
    }

    @Column(name = "quantity", nullable = false)
    @Positive(message = "Quantity must be a positive number!")
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @ManyToOne(targetEntity = Order.class)
    @MapsId("orderId")
    @JoinColumn(name = "order_id",referencedColumnName = "id")
    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    @ManyToOne
    @MapsId("wineId")
    @JoinColumn(name = "wine_id", referencedColumnName = "id")
    public Wine getWine() {
        return wine;
    }

    public void setWine(Wine wine) {
        this.wine = wine;
    }

    @OneToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @Column(name = "status")
    @Enumerated(EnumType.ORDINAL)
    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
