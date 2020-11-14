package com.winery.service.impl;

import com.winery.exception.WineryAlreadyExistsException;
import com.winery.exception.WineryNotFoundException;
import com.winery.model.binding.WineryRegisterBindingDTO;
import com.winery.model.entity.Address;
import com.winery.model.entity.User;
import com.winery.model.entity.Winery;
import com.winery.model.service.CommentServiceDTO;
import com.winery.model.service.WineryDetailsServiceDTO;
import com.winery.model.service.WineryServiceDTO;
import com.winery.repository.WineryRepository;
import com.winery.service.CommentServiceBase;
import com.winery.service.UserService;
import com.winery.service.WineryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WineryServiceImpl implements WineryService {
    private final WineryRepository wineryRepository;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final CommentServiceBase commentServiceBase;

    public WineryServiceImpl(WineryRepository wineryRepository, UserService userService, ModelMapper modelMapper, CommentServiceBase commentServiceBase) {
        this.wineryRepository = wineryRepository;
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.commentServiceBase = commentServiceBase;
    }

    @Override
    public WineryServiceDTO registerWinery(WineryRegisterBindingDTO wineryRegisterBindingDTO) {
        if (this.wineryRepository.findByName(wineryRegisterBindingDTO.getName()).orElse(null) != null) {
            throw new WineryAlreadyExistsException("Winery with this name already exists!");
        }
        Winery winery = this.modelMapper.map(wineryRegisterBindingDTO, Winery.class);
        Address address = this.modelMapper.map(wineryRegisterBindingDTO.getAddress(), Address.class);
        winery.setAddress(address);
//        User user = this.userService.getLoggedInUser(); //TODO UNCOMMENT TO GET LOGGED IN USER
        User user = this.userService.getUser("test@test.com");
        winery.setUser(user);
        winery = this.wineryRepository.saveAndFlush(winery);
        return this.modelMapper.map(winery, WineryServiceDTO.class);
    }

    @Override
    public Winery getWineryById(String id) {
        return this.wineryRepository.findById(id).orElse(null);
    }

    @Override
    public WineryDetailsServiceDTO getWineryDetails(String id) {
        Winery winery = this.wineryRepository.findById(id).orElseThrow(() -> new WineryNotFoundException("Winery with this ID does not exists!"));
        WineryDetailsServiceDTO wineryDetailsServiceDTO = this.modelMapper.map(winery, WineryDetailsServiceDTO.class);
        List<CommentServiceDTO> comments = this.commentServiceBase.getCommentsForWinery(id);
        wineryDetailsServiceDTO.setComments(comments);
        return wineryDetailsServiceDTO;
    }

    @Override
    public List<WineryServiceDTO> getAllWineries() {
        return this.wineryRepository.findAll().stream()
                .map(w -> this.modelMapper.map(w, WineryServiceDTO.class))
                .collect(Collectors.toList());
    }
}
