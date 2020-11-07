package com.winery.service.impl;

import com.winery.model.binding.WineRegisterDTO;
import com.winery.model.binding.WineUpdateDTO;
import com.winery.model.entity.Wine;
import com.winery.model.entity.Winery;
import com.winery.model.service.WineServiceDTO;
import com.winery.repository.WineRepository;
import com.winery.service.WineService;
import com.winery.service.WineryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public List<WineServiceDTO> getAllWines() {
        //TODO MUST BE IMPLEMENTED AGAIN
        List<Wine> wines = this.wineRepository.findAll();
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
//        String imagePublicID = wine.getImagePublicId();
//        if (productUpdateDTO.getImage() != null) {
//            saveImage(wine, productUpdateDTO.getImage());
//        }
//        if (!imagePublicID.equals(wine.getImagePublicId())) {
//            this.deleteImage(imagePublicID);
//        }

        wine = this.wineRepository.saveAndFlush(wine);
        return this.modelMapper.map(wine, WineServiceDTO.class);
    }


    @Override
    public Wine getWineById(String id) {
        return this.wineRepository.findById(id).orElse(null);
    }

}
