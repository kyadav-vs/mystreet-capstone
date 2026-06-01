package com.mystreet.mystreet_backend.controller;

import com.mystreet.mystreet_backend.dto.AuthenticationResponse;
import com.mystreet.mystreet_backend.dto.LoginRequest;
import com.mystreet.mystreet_backend.dto.RegisterRequest;
import com.mystreet.mystreet_backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody LoginRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
