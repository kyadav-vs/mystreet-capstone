package com.mystreet.mystreet_backend.service;

import com.mystreet.mystreet_backend.dto.AuthenticationResponse;
import com.mystreet.mystreet_backend.dto.LoginRequest;
import com.mystreet.mystreet_backend.dto.RegisterRequest;
import com.mystreet.mystreet_backend.model.User;
import com.mystreet.mystreet_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtService jwtService;
    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    private User user;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .email("test@example.com")
                .password("hashedpass")
                .isAdmin(false)
                .build();
    }

    @Test
    void register_ShouldReturnAuthResponse() {
        RegisterRequest request = new RegisterRequest("test@example.com", "password", false);
        
        when(passwordEncoder.encode(request.getPassword())).thenReturn("hashedpass");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(any(User.class))).thenReturn("mock-jwt-token");

        AuthenticationResponse response = authenticationService.register(request);

        assertNotNull(response);
        assertEquals("mock-jwt-token", response.getToken());
        assertEquals("test@example.com", response.getEmail());
        assertFalse(response.isAdmin());
    }

    @Test
    void authenticate_ShouldReturnAuthResponse() {
        LoginRequest request = new LoginRequest("test@example.com", "password");
        
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any(User.class))).thenReturn("mock-jwt-token");

        AuthenticationResponse response = authenticationService.authenticate(request);

        assertNotNull(response);
        assertEquals("mock-jwt-token", response.getToken());
        assertEquals("test@example.com", response.getEmail());
        verify(authenticationManager, times(1)).authenticate(any());
    }
}
