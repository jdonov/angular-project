package com.winery.service.impl;

import com.winery.exception.NoSuchOrderException;
import com.winery.model.binding.OrderPlaceBindingDTO;
import com.winery.model.entity.*;
import com.winery.model.service.OrderServiceDTO;
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
//        User user = this.userService.getLoggedInUser(); //TODO UNCOMMENT TO GET LOGGED IN USER
        User user = this.userService.getUser("test@test.com");
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
//        User user = this.userService.getLoggedInUser(); //TODO UNCOMMENT TO GET LOGGED IN USER
        User user = this.userService.getUser("test@test.com");
        return this.orderRepository.findAllByUser(user).stream()
                .map(o -> this.modelMapper.map(o, OrderServiceDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public OrderServiceDTO confirmOrder(String orderId) {
        Order order = getOrderValidated(orderId);
        order.setStatus(OrderStatus.CONFIRMED);
        order = this.orderRepository.saveAndFlush(order);
        return this.modelMapper.map(order, OrderServiceDTO.class);
    }

    @Override
    public OrderServiceDTO cancelOrder(String orderId) {
        Order order = getOrderValidated(orderId);
        order.setStatus(OrderStatus.CANCELED);
        order = this.orderRepository.saveAndFlush(order);
        return this.modelMapper.map(order, OrderServiceDTO.class);
    }

    private Order getOrderValidated(String orderId) {
        Order order = this.orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            throw new NoSuchOrderException("There is no order with id " + orderId + "!");
        }
        return order;
    }
}
