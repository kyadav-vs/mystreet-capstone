package com.mystreet.mystreet_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemRequest {
    private UUID productId;
    private String selectedSize;
    private Integer quantity;
}
