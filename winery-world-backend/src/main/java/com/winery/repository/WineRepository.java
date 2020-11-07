package com.winery.repository;

import com.winery.model.entity.Wine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface WineRepository extends JpaRepository<Wine, String> {
    Set<Wine> findAllByWineryId(String wineryId);
}
