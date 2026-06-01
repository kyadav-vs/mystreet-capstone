package com.mystreet.mystreet_backend.repository;

import com.mystreet.mystreet_backend.model.Order;
import com.mystreet.mystreet_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByUserOrderByCreatedAtDesc(User user);
}
