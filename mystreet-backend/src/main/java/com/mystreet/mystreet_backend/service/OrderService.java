package com.mystreet.mystreet_backend.service;

import com.mystreet.mystreet_backend.dto.OrderItemRequest;
import com.mystreet.mystreet_backend.dto.OrderRequest;
import com.mystreet.mystreet_backend.model.Order;
import com.mystreet.mystreet_backend.model.OrderItem;
import com.mystreet.mystreet_backend.model.Product;
import com.mystreet.mystreet_backend.model.User;
import com.mystreet.mystreet_backend.repository.OrderRepository;
import com.mystreet.mystreet_backend.repository.ProductRepository;
import com.mystreet.mystreet_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Transactional
    public Order createOrder(String userEmail, OrderRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = Order.builder()
                .user(user)
                .status("PLACED")
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .shippingAddress(request.getShippingAddress())
                .city(request.getCity())
                .state(request.getState())
                .zipcode(request.getZipcode())
                .paymentMode(request.getPaymentMode())
                .items(new ArrayList<>())
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .selectedSize(itemRequest.getSelectedSize())
                    .quantity(itemRequest.getQuantity())
                    .priceAtTime(product.getPrice())
                    .build();

            order.getItems().add(orderItem);
            total = total.add(product.getPrice().multiply(new BigDecimal(itemRequest.getQuantity())));
            
            // Optional: Reduce stock quantity here
            // if (product.getStockQty() != null) {
            //     product.setStockQty(product.getStockQty() - itemRequest.getQuantity());
            //     productRepository.save(product);
            // }
        }

        order.setTotalAmount(total);
        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Order getOrderById(UUID id, String userEmail) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        // Ensure the user owns the order
        if (!order.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized to view this order");
        }
        
        return order;
    }
}
