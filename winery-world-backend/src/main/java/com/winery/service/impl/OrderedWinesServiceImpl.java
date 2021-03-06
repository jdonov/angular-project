package com.winery.service.impl;

import com.winery.model.binding.OrderWineBindingDTO;
import com.winery.model.entity.Order;
import com.winery.model.entity.OrderedWines;
import com.winery.model.entity.OrderedWinesPK;
import com.winery.model.entity.Wine;
import com.winery.repository.OrderedWinesRepository;
import com.winery.service.OrderedWinesService;
import com.winery.service.WineService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderedWinesServiceImpl implements OrderedWinesService {
    private final OrderedWinesRepository orderedWinesRepository;
    private final ModelMapper modelMapper;
    private final WineService wineService;

    @Autowired
    public OrderedWinesServiceImpl(OrderedWinesRepository orderedWinesRepository, ModelMapper modelMapper, WineService wineService) {
        this.orderedWinesRepository = orderedWinesRepository;
        this.modelMapper = modelMapper;
        this.wineService = wineService;
    }

    @Override
    public OrderedWines addOrderedWines(OrderWineBindingDTO orderedWine, Order order) {
        OrderedWines ordWine = this.modelMapper.map(orderedWine, OrderedWines.class);
        OrderedWinesPK pk = new OrderedWinesPK(order.getId(), orderedWine.getId());
        ordWine.setId(pk);
        ordWine.setWine(this.wineService.getWineById(orderedWine.getId()));
        ordWine.setOrder(order);
        Wine wine = this.wineService.getWineById(orderedWine.getId());
        ordWine.setOwner(wine.getWinery().getUser());
        return  this.orderedWinesRepository.saveAndFlush(ordWine);
    }
}
