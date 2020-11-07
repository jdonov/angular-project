package com.winery.repository;

import com.winery.model.entity.Order;
import com.winery.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findAllByUser(User user);

    @Query(value = "SELECT o FROM Order o JOIN o.wines w WHERE w.owner.id = :id ORDER BY o.status, o.orderDateTime")
    Set<Order> findAllByWineryOwner(@Param("id") String id);
}
