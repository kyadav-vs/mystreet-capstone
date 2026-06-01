package com.mystreet.mystreet_backend.service;

import com.mystreet.mystreet_backend.model.Product;
import com.mystreet.mystreet_backend.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product product;

    @BeforeEach
    void setUp() {
        product = Product.builder()
                .id(UUID.randomUUID())
                .name("Test Sneaker")
                .brand("Nike")
                .price(new BigDecimal("100.00"))
                .sizesCsv("8,9,10")
                .createdAt(LocalDateTime.now())
                .build();
    }

    @Test
    void getAllProducts_ShouldReturnFilteredProducts() {
        when(productRepository.findAll()).thenReturn(List.of(product));
        
        List<Product> result = productService.getAllProducts("Nike", "9", new BigDecimal("50"), new BigDecimal("150"), "price_asc");
        
        assertEquals(1, result.size());
        assertEquals("Nike", result.get(0).getBrand());
    }

    @Test
    void getProductById_ShouldReturnProduct_WhenExists() {
        when(productRepository.findById(product.getId())).thenReturn(Optional.of(product));
        
        Product result = productService.getProductById(product.getId());
        
        assertNotNull(result);
        assertEquals(product.getId(), result.getId());
    }

    @Test
    void getProductById_ShouldThrowException_WhenNotExists() {
        when(productRepository.findById(any())).thenReturn(Optional.empty());
        
        assertThrows(RuntimeException.class, () -> productService.getProductById(UUID.randomUUID()));
    }

    @Test
    void saveProduct_ShouldReturnSavedProduct() {
        when(productRepository.save(any(Product.class))).thenReturn(product);
        
        Product result = productService.saveProduct(product);
        
        assertNotNull(result);
        assertEquals("Test Sneaker", result.getName());
    }

    @Test
    void deleteProduct_ShouldCallRepositoryDelete() {
        doNothing().when(productRepository).deleteById(any());
        
        productService.deleteProduct(product.getId());
        
        verify(productRepository, times(1)).deleteById(product.getId());
    }
}
