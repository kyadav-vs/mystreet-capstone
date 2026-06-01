package com.mystreet.mystreet_backend.service;

import com.mystreet.mystreet_backend.dto.OrderItemRequest;
import com.mystreet.mystreet_backend.dto.OrderRequest;
import com.mystreet.mystreet_backend.model.Order;
import com.mystreet.mystreet_backend.model.Product;
import com.mystreet.mystreet_backend.model.User;
import com.mystreet.mystreet_backend.repository.OrderRepository;
import com.mystreet.mystreet_backend.repository.ProductRepository;
import com.mystreet.mystreet_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private OrderService orderService;

    private User user;
    private Product product;
    private Order order;

    @BeforeEach
    void setUp() {
        user = User.builder().email("test@example.com").build();
        product = Product.builder().id(UUID.randomUUID()).price(new BigDecimal("100.00")).build();
        order = Order.builder().id(UUID.randomUUID()).user(user).items(new ArrayList<>()).build();
    }

    @Test
    void createOrder_ShouldReturnSavedOrder() {
        OrderItemRequest itemRequest = new OrderItemRequest(product.getId(), "9", 2);
        OrderRequest request = new OrderRequest("John", "Doe", "test@example.com", "123", "123 St", "City", "State", "12345", "MOCK_CARD", List.of(itemRequest));

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(productRepository.findById(any())).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArguments()[0]);

        Order savedOrder = orderService.createOrder("test@example.com", request);

        assertNotNull(savedOrder);
        assertEquals("PLACED", savedOrder.getStatus());
        assertEquals(1, savedOrder.getItems().size());
        assertEquals(new BigDecimal("200.00"), savedOrder.getTotalAmount());
    }

    @Test
    void getUserOrders_ShouldReturnOrderList() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(orderRepository.findByUserOrderByCreatedAtDesc(user)).thenReturn(List.of(order));

        List<Order> orders = orderService.getUserOrders("test@example.com");

        assertEquals(1, orders.size());
    }

    @Test
    void getOrderById_ShouldReturnOrder_WhenUserMatches() {
        when(orderRepository.findById(order.getId())).thenReturn(Optional.of(order));

        Order result = orderService.getOrderById(order.getId(), "test@example.com");

        assertNotNull(result);
        assertEquals(order.getId(), result.getId());
    }

    @Test
    void getOrderById_ShouldThrowException_WhenUserMismatch() {
        when(orderRepository.findById(order.getId())).thenReturn(Optional.of(order));

        assertThrows(RuntimeException.class, () -> orderService.getOrderById(order.getId(), "wrong@example.com"));
    }
}
