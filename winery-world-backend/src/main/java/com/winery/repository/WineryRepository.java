package com.winery.repository;

import com.winery.model.entity.Winery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WineryRepository extends JpaRepository<Winery, String> {
    Optional<Winery> findByName(String name);
}
