package com.mystreet.mystreet_backend.repository;

import com.mystreet.mystreet_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByBrandContainingIgnoreCase(String brand);
    // Custom queries for filtering by size can be added later if needed, 
    // but for simple CSV search, we might handle it in the service or via @Query
}
