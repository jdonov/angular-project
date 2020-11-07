package com.winery.model.entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order extends BaseEntity{
    private User user;
    private Set<OrderedWines> wines;
    private Address receiverAddress;
    private LocalDateTime orderDateTime;
    private OrderStatus status;

    public Order() {
    }

    @ManyToOne(targetEntity = User.class)
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @OneToMany(mappedBy = "order", targetEntity = OrderedWines.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    public Set<OrderedWines> getWines() {
        return wines;
    }

    public void setWines(Set<OrderedWines> wines) {
        this.wines = wines;
    }

    @ManyToOne(targetEntity = Address.class)
    @JoinColumn(name = "receiver_address_id", referencedColumnName = "id")
    public Address getReceiverAddress() {
        return receiverAddress;
    }

    public void setReceiverAddress(Address receiverAddress) {
        this.receiverAddress = receiverAddress;
    }

    @Column(name = "order_date_time")
    @CreationTimestamp
    public LocalDateTime getOrderDateTime() {
        return orderDateTime;
    }

    public void setOrderDateTime(LocalDateTime orderDateTime) {
        this.orderDateTime = orderDateTime;
    }

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
