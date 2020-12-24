package com.winery.service;

import com.winery.model.binding.OrderPlaceBindingDTO;
import com.winery.model.entity.OrderStatus;
import com.winery.model.service.OrderServiceDTO;

import java.util.List;

public interface OrderService {
    OrderServiceDTO placeOrder(OrderPlaceBindingDTO orderPlaceBindingDTO);

    List<OrderServiceDTO> getClientOrders();

    List<OrderServiceDTO> getOrdersByOwner();

    OrderServiceDTO confirmOrder(String orderId);

    OrderServiceDTO cancelOrder(String orderId);

    OrderServiceDTO setOrderStatus(String orderId, OrderStatus status);
}
