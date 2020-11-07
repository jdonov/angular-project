package com.winery.service;

import com.winery.model.binding.OrderPlaceBindingDTO;
import com.winery.model.service.OrderServiceDTO;

import java.util.List;

public interface OrderService {
    OrderServiceDTO placeOrder(OrderPlaceBindingDTO orderPlaceBindingDTO);

    List<OrderServiceDTO> getClientOrders();

    OrderServiceDTO confirmOrder(String orderId);

    OrderServiceDTO cancelOrder(String orderId);
}