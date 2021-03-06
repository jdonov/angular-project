package com.winery.service.impl;

import com.winery.aop.ProcessOrder;
import com.winery.exception.NoSuchOrderException;
import com.winery.model.binding.OrderPlaceBindingDTO;
import com.winery.model.entity.*;
import com.winery.model.service.OrderServiceDTO;
import com.winery.model.service.OrderWineServiceDTO;
import com.winery.repository.OrderRepository;
import com.winery.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;
    private final AddressService addressService;
    private final OrderedWinesService orderedWinesService;

    public OrderServiceImpl(OrderRepository orderRepository, ModelMapper modelMapper, UserService userService, AddressService addressService, OrderedWinesService orderedWinesService) {
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.addressService = addressService;
        this.orderedWinesService = orderedWinesService;
    }

    @Override
    @Transactional
    public OrderServiceDTO placeOrder(OrderPlaceBindingDTO orderPlaceBindingDTO) {
        Order order = this.modelMapper.map(orderPlaceBindingDTO, Order.class);
        order.setWines(new HashSet<>());
        User user = this.userService.getLoggedInUser();
        order.setUser(user);
        Address receiverAddress = this.addressService.registerAddressUser(orderPlaceBindingDTO.getReceiverAddress());
        order.setReceiverAddress(receiverAddress);

        order.setStatus(OrderStatus.RECEIVED);
        order = this.orderRepository.saveAndFlush(order);
        Order orderCopy = order;
        Set<OrderedWines> orderedWines = orderPlaceBindingDTO.getOrderedWines().stream()
                .map(ow -> this.orderedWinesService.addOrderedWines(ow, orderCopy))
                .collect(Collectors.toSet());
        order.setWines(orderedWines);
        order = this.orderRepository.saveAndFlush(order);

        return this.modelMapper.map(order, OrderServiceDTO.class);
    }

    @Override
    public List<OrderServiceDTO> getClientOrders() {
        User user = this.userService.getLoggedInUser();
        return this.orderRepository.findAllByUser(user).stream()
                .map(o -> this.modelMapper.map(o, OrderServiceDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderServiceDTO> getOrdersByOwner() {
        User user = this.userService.getLoggedInUser();
        List<Order> orders = this.orderRepository.findAllByWineryOwner(user.getId());
        return orders.stream()
                .map(o -> {
                    OrderServiceDTO order = this.modelMapper.map(o, OrderServiceDTO.class);
                    Set<OrderWineServiceDTO> wines = this.ownerWines(o, user.getId());
                    order.setWines(wines);
                    return order;
                })
                .collect(Collectors.toList());
    }

    @ProcessOrder
    @Override
    public OrderServiceDTO confirmOrder(String orderId) {
        User user = this.userService.getLoggedInUser();
        Order order = getOrderValidated(orderId);
        order.getWines().stream()
                .filter(w -> w.getOwner().getId().equals(user.getId()))
                .forEach(w -> w.setStatus(OrderStatus.CONFIRMED));
        order = this.orderRepository.saveAndFlush(order);
        return this.modelMapper.map(order, OrderServiceDTO.class);
    }

    @ProcessOrder
    @Override
    public OrderServiceDTO cancelOrder(String orderId) {
        User user = this.userService.getLoggedInUser();
        Order order = getOrderValidated(orderId);
        order.getWines().stream()
                .filter(w -> w.getOwner().getId().equals(user.getId()))
                .forEach(w -> w.setStatus(OrderStatus.CANCELED));
        order = this.orderRepository.saveAndFlush(order);
        return this.modelMapper.map(order, OrderServiceDTO.class);
    }

    @Override
    public OrderServiceDTO setOrderStatus(String orderId, OrderStatus status) {
        User user = this.userService.getLoggedInUser();
        Order order = getOrderValidated(orderId);
        order.setStatus(status);
        order = this.orderRepository.saveAndFlush(order);
        OrderServiceDTO orderDTO = this.modelMapper.map(order, OrderServiceDTO.class);
        orderDTO.setWines(this.ownerWines(order, user.getId()));
        return orderDTO;
    }

    private Order getOrderValidated(String orderId) {
        Order order = this.orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            throw new NoSuchOrderException("There is no order with id " + orderId + "!");
        }
        return order;
    }

    private Set<OrderWineServiceDTO> ownerWines(Order order, String userId) {
        return order.getWines().stream()
                .filter(w -> w.getOwner().getId().equals(userId))
                .map(w -> this.modelMapper.map(w, OrderWineServiceDTO.class))
                .collect(Collectors.toCollection(HashSet::new));
    }
}
