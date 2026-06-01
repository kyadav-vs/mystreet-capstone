package com.mystreet.mystreet_backend.controller;

import com.mystreet.mystreet_backend.dto.OrderRequest;
import com.mystreet.mystreet_backend.model.Order;
import com.mystreet.mystreet_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request, Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(orderService.createOrder(userEmail, request));
    }

    @GetMapping("/mine")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(orderService.getUserOrders(userEmail));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable UUID id, Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(orderService.getOrderById(id, userEmail));
    }
}
