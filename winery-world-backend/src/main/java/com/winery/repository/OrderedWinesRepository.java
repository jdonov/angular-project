package com.winery.repository;

import com.winery.model.entity.OrderedWines;
import com.winery.model.entity.OrderedWinesPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderedWinesRepository extends JpaRepository<OrderedWines, OrderedWinesPK> {
}
