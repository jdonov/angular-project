package com.winery.web;

import com.winery.exception.BindingResultException;
import com.winery.exception.Error;
import com.winery.model.binding.OrderPlaceBindingDTO;
import com.winery.model.service.OrderServiceDTO;
import com.winery.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;
    private final ModelMapper modelMapper;

    @Autowired
    public OrderController(OrderService orderService, ModelMapper modelMapper) {
        this.orderService = orderService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("/placeOrder")
    public ResponseEntity<OrderServiceDTO> placeOrder(@Valid @RequestBody OrderPlaceBindingDTO orderPlaceBindingDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new BindingResultException(new Error().setErrors(bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.toList())));
        }

        OrderServiceDTO orderServiceDTO = this.orderService.placeOrder(orderPlaceBindingDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(orderServiceDTO);
    }

    @GetMapping("/client")
    public ResponseEntity<List<OrderServiceDTO>> clientOrders() {
        List<OrderServiceDTO> orders = this.orderService.getClientOrders();
        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        return ResponseEntity.ok(orders);
    }

    @PatchMapping("/{id}/confirm")
    public ResponseEntity<OrderServiceDTO> confirmOrder(@PathVariable("id") String orderId) {
        return ResponseEntity.ok(this.orderService.confirmOrder(orderId));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<OrderServiceDTO> cancelOrder(@PathVariable("id") String orderId) {
        return ResponseEntity.ok(this.orderService.cancelOrder(orderId));
    }
}
