package com.winery.service;

import com.winery.model.binding.WineryRegisterBindingDTO;
import com.winery.model.entity.Winery;
import com.winery.model.service.WineryServiceDTO;

public interface WineryService {
    WineryServiceDTO registerWinery(WineryRegisterBindingDTO wineryRegisterBindingDTO);
    Winery getWineryById(String id);

}
