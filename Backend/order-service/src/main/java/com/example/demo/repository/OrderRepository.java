package com.example.demo.repository;

import com.example.demo.entity.Order;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order,Long> {

    // Custom method to fetch orders by userId
    List<Order> findByUserId(String userId);

}
