package com.winery.service.impl;

import com.winery.exception.WineryAlreadyExistsException;
import com.winery.model.binding.WineryRegisterBindingDTO;
import com.winery.model.entity.Address;
import com.winery.model.entity.User;
import com.winery.model.entity.Winery;
import com.winery.model.service.WineryServiceDTO;
import com.winery.repository.WineryRepository;
import com.winery.service.UserService;
import com.winery.service.WineryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class WineryServiceImpl implements WineryService {
    private final WineryRepository wineryRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public WineryServiceImpl(WineryRepository wineryRepository, UserService userService, ModelMapper modelMapper) {
        this.wineryRepository = wineryRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Override
    public WineryServiceDTO registerWinery(WineryRegisterBindingDTO wineryRegisterBindingDTO) {
        if (this.wineryRepository.findByName(wineryRegisterBindingDTO.getName()).orElse(null) != null) {
            throw new WineryAlreadyExistsException("Winery with this name already exists!");
        }
        Winery winery = this.modelMapper.map(wineryRegisterBindingDTO, Winery.class);
        Address address = this.modelMapper.map(wineryRegisterBindingDTO.getAddress(), Address.class);
        winery.setAddress(address);
        User user = this.userService.getUser("test@test.com"); //TODO CHANGE WITH LOGGED IN USER
        winery.setUser(user);
        winery = this.wineryRepository.saveAndFlush(winery);
        return this.modelMapper.map(winery, WineryServiceDTO.class);
    }
}
