package com.winery.service.impl;

import com.winery.model.binding.WineRegisterDTO;
import com.winery.model.binding.WineUpdateDTO;
import com.winery.model.entity.Rating;
import com.winery.model.entity.Wine;
import com.winery.model.entity.Winery;
import com.winery.model.service.WineServiceDTO;
import com.winery.repository.WineRepository;
import com.winery.service.WineService;
import com.winery.service.WineryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class WineServiceImpl implements WineService {
    private final WineRepository wineRepository;
    private final WineryService wineryService;
    private final ModelMapper modelMapper;

    @Autowired
    public WineServiceImpl(WineRepository wineRepository, WineryService wineryService, ModelMapper modelMapper) {
        this.wineRepository = wineRepository;
        this.wineryService = wineryService;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<WineServiceDTO> getAllWines(String wineryId) {
        Set<Wine> wines = this.wineRepository.findAllByWineryId(wineryId);
        return wines.stream().map(w -> this.modelMapper.map(w, WineServiceDTO.class)).collect(Collectors.toList());
    }

    @Override
    public WineServiceDTO addNewWine(WineRegisterDTO wineRegisterDTO){
        Winery winery = this.wineryService.getWineryById(wineRegisterDTO.getWineryId());
        Wine wine = this.modelMapper.map(wineRegisterDTO, Wine.class);
        wine = this.wineRepository.saveAndFlush(wine);
        return this.modelMapper.map(wine, WineServiceDTO.class);
    }

    @Override
    public WineServiceDTO updateWine(WineUpdateDTO productUpdateDTO) {
        Wine wine = this.wineRepository.findById(productUpdateDTO.getId()).orElse(null);
        if (wine == null) {
            throw new IllegalStateException("No such wine!");
        }
        wine.setName(productUpdateDTO.getName());
        wine.setDescription(productUpdateDTO.getDescription());
        wine.setPrice(productUpdateDTO.getPrice());

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
        wine.getRatings().add(rating);
        wine = this.wineRepository.saveAndFlush(wine);
        return this.modelMapper.map(wine, WineServiceDTO.class);
    }

//    private WineServiceDTO saveAndMap(Wine wine) {
//        Wine savedWine = this.wineRepository.saveAndFlush(wine);
//        WineServiceDTO wineServiceDTO = this.modelMapper.map(wine, WineServiceDTO.class);
//        Rating avgRating = savedWine.getRatings() == null ? Rating.VERY_BAD : setWineRating(savedWine.getRatings());
//        wineServiceDTO.setRating(avgRating);
//        return wineServiceDTO;
//    }
//
//    private Rating setWineRating(List<Rating> ratings) {
//        double avgRate = ratings.stream().mapToInt(Enum::ordinal).average().orElse(0);
//        return Rating.values()[(int) Math.round(avgRate)];
//    }
}
