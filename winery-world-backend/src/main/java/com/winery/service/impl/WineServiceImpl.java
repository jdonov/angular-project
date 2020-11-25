package com.winery.service.impl;

import com.winery.model.binding.WineRegisterDTO;
import com.winery.model.binding.WineUpdateDTO;
import com.winery.model.entity.*;
import com.winery.model.service.WineDeletedServiceDTO;
import com.winery.model.service.WineServiceDTO;
import com.winery.repository.WineRepository;
import com.winery.service.UserService;
import com.winery.service.WineRateService;
import com.winery.service.WineService;
import com.winery.service.WineryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional()
public class WineServiceImpl implements WineService {
    private final WineRepository wineRepository;
    private final WineryService wineryService;
    private final WineRateService wineRateService;
    private final UserService userService;
    private final ModelMapper modelMapper;

    @Autowired
    public WineServiceImpl(WineRepository wineRepository, WineryService wineryService, WineRateService wineRateService, UserService userService, ModelMapper modelMapper) {
        this.wineRepository = wineRepository;
        this.wineryService = wineryService;
        this.wineRateService = wineRateService;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<WineServiceDTO> getAllWines(String wineryId) {
        Set<Wine> wines = this.wineRepository.findAllByWineryId(wineryId);
        User user = this.userService.getLoggedInUser();
//        User user = this.userService.getUser("test@test.com"); //TODO REMOVE STATEMENT
        return wines.stream().map(w -> {
            WineServiceDTO wineServiceDTO = this.modelMapper.map(w, WineServiceDTO.class);
            Rating yourRating = this.wineRateService.getWineRatingForUser(w.getId(), user.getId());
            wineServiceDTO.setYourRating(yourRating);
            return wineServiceDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public WineServiceDTO addNewWine(WineRegisterDTO wineRegisterDTO){
        Wine wine = this.modelMapper.map(wineRegisterDTO, Wine.class);
        wine = this.wineRepository.saveAndFlush(wine);
        return this.modelMapper.map(wine, WineServiceDTO.class);
    }

    @Override
    public WineServiceDTO updateWine(WineUpdateDTO wineUpdateDTO) {
        Wine wine = this.wineRepository.findById(wineUpdateDTO.getId()).orElse(null);
        if (wine == null) {
            throw new IllegalStateException("No such wine!");
        }
        wine.setName(wineUpdateDTO.getName());
        wine.setPrice(wineUpdateDTO.getPrice());
        wine.setDescription(wineUpdateDTO.getDescription());
        wine.setImageUrl(wineUpdateDTO.getImageUrl());

        wine = this.wineRepository.saveAndFlush(wine);
        return this.modelMapper.map(wine, WineServiceDTO.class);
    }


    @Override
    public Wine getWineById(String id) {
        return this.wineRepository.findById(id).orElse(null);
    }

    @Override
    public WineServiceDTO rateWine(String wineId, Rating rating) {
        Wine wine = this.wineRepository.findById(wineId).orElse(null);
        if (wine.getRatings() == null) {
            wine.setRatings(new ArrayList<>());
        }
        User user = this.userService.getLoggedInUser();
//        User user = this.userService.getUser("test2@test.com"); //TODO REMOVE STATEMENT
        WineRate wineRate = this.wineRateService.rateWineByUser(wine, user, rating);
        wine.getRatings().add(wineRate);
        wine = this.wineRepository.saveAndFlush(wine);
        WineServiceDTO wineServiceDTO = this.modelMapper.map(wine, WineServiceDTO.class);
        wineServiceDTO.setYourRating(wineRate.getRate());
        return wineServiceDTO;
    }

    @Override
    public WineServiceDTO rateWineInit(String wineId, Rating rating, String username) {
        Wine wine = this.wineRepository.findById(wineId).orElse(null);
        if (wine.getRatings() == null) {
            wine.setRatings(new ArrayList<>());
        }
        User user = this.userService.getUser(username);
        WineRate wineRate = this.wineRateService.rateWineByUser(wine, user, rating);
        wine.getRatings().add(wineRate);
        wine = this.wineRepository.saveAndFlush(wine);
        WineServiceDTO wineServiceDTO = this.modelMapper.map(wine, WineServiceDTO.class);
        wineServiceDTO.setYourRating(wineRate.getRate());
        return wineServiceDTO;
    }

    @Override
    public WineDeletedServiceDTO deleteWine(String id) {
        Wine wine = this.wineRepository.findById(id).orElse(null);
        if(wine != null) {
            Winery winery = this.wineryService.getWineryById(wine.getWinery().getId());
            winery.getWines().remove(wine);
            this.wineRepository.delete(wine);
            return new WineDeletedServiceDTO(id);
        }
        return null;
    }
}
