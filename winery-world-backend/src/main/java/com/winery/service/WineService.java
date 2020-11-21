package com.winery.service;

import com.winery.model.binding.WineRegisterDTO;
import com.winery.model.binding.WineUpdateDTO;
import com.winery.model.entity.Rating;
import com.winery.model.entity.Wine;
import com.winery.model.service.WineDeletedServiceDTO;
import com.winery.model.service.WineServiceDTO;


import java.util.List;

public interface WineService {
    WineServiceDTO addNewWine(WineRegisterDTO wineRegisterDTO);

    WineServiceDTO updateWine(WineUpdateDTO productUpdateDTO);

    Wine getWineById(String id);

    List<WineServiceDTO> getAllWines(String wineryId);

    WineServiceDTO rateWine(String wineId, Rating rating);

    WineServiceDTO rateWineInit(String wineId, Rating rating, String username);

    WineDeletedServiceDTO deleteWine(String id);

}
