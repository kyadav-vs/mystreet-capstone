package com.mystreet.mystreet_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

import java.time.format.DateTimeFormatter;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex, WebRequest request) {
        String path = ((ServletWebRequest) request).getRequest().getRequestURI();
        
        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ISO_INSTANT))
                .path(path)
                .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .message(ex.getMessage())
                .build();
                
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex, WebRequest request) {
        String path = ((ServletWebRequest) request).getRequest().getRequestURI();
        
        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ISO_INSTANT))
                .path(path)
                .error(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
                .message("An unexpected error occurred")
                .build();
                
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
