package com.winery.repository;

import com.winery.model.entity.WineRate;
import com.winery.model.entity.WineRatePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WineRateRepository extends JpaRepository<WineRate, WineRatePK> {

}
