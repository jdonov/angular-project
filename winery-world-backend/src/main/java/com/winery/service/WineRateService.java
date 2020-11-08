package com.winery.service;

import com.winery.model.entity.Rating;
import com.winery.model.entity.User;
import com.winery.model.entity.Wine;
import com.winery.model.entity.WineRate;

public interface WineRateService {
    WineRate rateWineByUser(Wine wine, User user, Rating rating);

    Rating getWineRatingForUser(String wineId, String userId);
}
