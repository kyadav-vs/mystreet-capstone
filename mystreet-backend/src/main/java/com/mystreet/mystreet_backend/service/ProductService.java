package com.mystreet.mystreet_backend.service;

import com.mystreet.mystreet_backend.model.Product;
import com.mystreet.mystreet_backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getAllProducts(String brand, String size, BigDecimal minPrice, BigDecimal maxPrice, String sort) {
        List<Product> products = productRepository.findAll();
        
        if (brand != null && !brand.isEmpty()) {
            products = products.stream()
                    .filter(p -> p.getBrand().equalsIgnoreCase(brand))
                    .collect(Collectors.toList());
        }
        
        if (size != null && !size.isEmpty()) {
            products = products.stream()
                    .filter(p -> p.getSizesCsv() != null && p.getSizesCsv().contains(size))
                    .collect(Collectors.toList());
        }

        if (minPrice != null) {
            products = products.stream()
                    .filter(p -> p.getPrice().compareTo(minPrice) >= 0)
                    .collect(Collectors.toList());
        }

        if (maxPrice != null) {
            products = products.stream()
                    .filter(p -> p.getPrice().compareTo(maxPrice) <= 0)
                    .collect(Collectors.toList());
        }

        if (sort != null && !sort.isEmpty()) {
            switch (sort.toLowerCase()) {
                case "price_asc":
                    products.sort((p1, p2) -> p1.getPrice().compareTo(p2.getPrice()));
                    break;
                case "price_desc":
                    products.sort((p1, p2) -> p2.getPrice().compareTo(p1.getPrice()));
                    break;
                case "newest":
                    products.sort((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()));
                    break;
                default:
                    break;
            }
        }
        
        return products;
    }

    public Product getProductById(UUID id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(UUID id) {
        productRepository.deleteById(id);
    }
}
