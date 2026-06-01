package com.mystreet.mystreet_backend.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private String timestamp;
    private String path;
    private String error;
    private String message;
}
