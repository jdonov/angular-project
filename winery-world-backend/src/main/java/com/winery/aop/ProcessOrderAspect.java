package com.winery.aop;

import com.winery.model.entity.OrderStatus;
import com.winery.model.service.OrderServiceDTO;
import com.winery.model.service.OrderWineServiceDTO;
import com.winery.service.OrderService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ProcessOrderAspect {
    private final OrderService orderService;

    public ProcessOrderAspect(OrderService orderService) {
        this.orderService = orderService;
    }

    @Pointcut("@annotation(com.winery.aop.ProcessOrder)")
    public void processOrder() { }

    @Around("processOrder()")
    public OrderServiceDTO processOrderCheck(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        OrderServiceDTO orderDTO = (OrderServiceDTO) proceedingJoinPoint.proceed();
        OrderWineServiceDTO wine = orderDTO.getWines().stream()
                .filter(w -> w.getStatus() == null).findFirst().orElse(null);
        if (wine == null) {
            long confirmed = orderDTO.getWines().stream().filter(w -> w.getStatus().equals("CONFIRMED")).count();
            long canceled = orderDTO.getWines().stream().filter(w -> w.getStatus().equals("CANCELED")).count();
            OrderStatus orderStatus;
            if(confirmed > 0 && canceled > 0) {
                orderStatus = OrderStatus.PROCESSED;
            } else if (confirmed > 0) {
                orderStatus = OrderStatus.CONFIRMED;
            } else {
                orderStatus = OrderStatus.CANCELED;
            }
            orderDTO = this.orderService.setOrderStatus(orderDTO.getId(), orderStatus);
            return orderDTO;
        } else if (orderDTO.getStatus().equals(OrderStatus.PARTIALLY_CONFIRMED.name())){
            return orderDTO;
        } else {
            return this.orderService.setOrderStatus(orderDTO.getId(), OrderStatus.PARTIALLY_CONFIRMED);
        }
    }
}
