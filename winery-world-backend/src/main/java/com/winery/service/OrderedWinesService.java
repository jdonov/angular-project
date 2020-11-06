package com.winery.service;


import com.winery.model.binding.OrderWineBindingDTO;
import com.winery.model.entity.Order;
import com.winery.model.entity.OrderedWines;

public interface OrderedWinesService {
    OrderedWines addOrderedWines(OrderWineBindingDTO orderedWines, Order order);
}
