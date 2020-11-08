package com.winery.service.impl;

import com.winery.model.entity.*;
import com.winery.repository.WineRateRepository;
import com.winery.service.WineRateService;
import org.springframework.stereotype.Service;

@Service
public class WineRateServiceImpl implements WineRateService {
    private final WineRateRepository wineRateRepository;

    public WineRateServiceImpl(WineRateRepository wineRateRepository) {
        this.wineRateRepository = wineRateRepository;
    }

    @Override
    public Rating getWineRatingForUser(String wineId, String userId) {
        WineRate wineRate = this.wineRateRepository.findById(new WineRatePK(userId, wineId)).orElse(null);
        return wineRate == null ? null : wineRate.getRate();
    }

    @Override
    public WineRate rateWineByUser(Wine wine, User user, Rating rating) {
        WineRatePK id = new WineRatePK(user.getId(), wine.getId());
        WineRate wineRate = this.wineRateRepository.findById(id).orElse(null);
        if (wineRate == null) {
            wineRate = new WineRate();
            wineRate.setId(id);
            wineRate.setUser(user);
            wineRate.setWine(wine);
        }
        wineRate.setRate(rating);
        return this.wineRateRepository.saveAndFlush(wineRate);
    }
}
