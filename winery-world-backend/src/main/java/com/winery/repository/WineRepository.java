package com.winery.repository;

import com.winery.model.entity.Wine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WineRepository extends JpaRepository<Wine, String> {
}
