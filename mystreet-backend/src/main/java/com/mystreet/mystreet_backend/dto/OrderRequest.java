package com.mystreet.mystreet_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String shippingAddress;
    private String city;
    private String state;
    private String zipcode;
    private String paymentMode;
    private List<OrderItemRequest> items;
}
