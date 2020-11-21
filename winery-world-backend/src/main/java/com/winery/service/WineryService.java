package com.winery.service;

import com.winery.model.binding.WineryRegisterBindingDTO;
import com.winery.model.entity.Winery;
import com.winery.model.service.WineryDetailsServiceDTO;
import com.winery.model.service.WineryServiceDTO;
import com.winery.model.service.WineryUpdateServiceDTO;

import java.util.List;

public interface WineryService {
    WineryDetailsServiceDTO registerWinery(WineryRegisterBindingDTO wineryRegisterBindingDTO);
    WineryServiceDTO registerWineryInit(WineryRegisterBindingDTO wineryRegisterBindingDTO, String username);
    Winery getWineryById(String id);
    WineryDetailsServiceDTO getWineryDetails(String id);
    List<WineryServiceDTO> getAllWineries();
    List<WineryServiceDTO> getMyWineries();

    WineryUpdateServiceDTO updateWinery(String id, WineryRegisterBindingDTO wineryRegisterBindingDTO);

}
