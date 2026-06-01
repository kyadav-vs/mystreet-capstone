package com.mystreet.mystreet_backend.config;

import com.mystreet.mystreet_backend.model.Product;
import com.mystreet.mystreet_backend.model.User;
import com.mystreet.mystreet_backend.repository.ProductRepository;
import com.mystreet.mystreet_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(ProductRepository repository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                userRepository.save(User.builder()
                        .email("admin@mystreet.com")
                        .password(passwordEncoder.encode("admin123"))
                        .isAdmin(true)
                        .build());
                System.out.println("Admin user seeded: admin@mystreet.com / admin123");
            }

            if (repository.count() == 0) {
                repository.saveAll(List.of(
                    Product.builder()
                            .name("Air Max 90")
                            .brand("Nike")
                            .description("Classic retro vibe with unmatched comfort.")
                            .price(new BigDecimal("119.99"))
                            .imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400")
                            .sizesCsv("7,8,9,10,11")
                            .stockQty(50)
                            .build(),
                    Product.builder()
                            .name("Ultraboost 1.0")
                            .brand("Adidas")
                            .description("Responsive cushioning for the ultimate run.")
                            .price(new BigDecimal("139.99"))
                            .imageUrl("https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80&w=400")
                            .sizesCsv("8,9,10,12")
                            .stockQty(35)
                            .build(),
                    Product.builder()
                            .name("Chuck Taylor All Star")
                            .brand("Converse")
                            .description("The iconic high-top that started it all.")
                            .price(new BigDecimal("59.99"))
                            .imageUrl("https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=400")
                            .sizesCsv("6,7,8,9,10,11,12")
                            .stockQty(100)
                            .build(),
                    Product.builder()
                            .name("Old Skool")
                            .brand("Vans")
                            .description("Classic skate shoe with the iconic side stripe.")
                            .price(new BigDecimal("64.99"))
                            .imageUrl("https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=400")
                            .sizesCsv("7,8,9,10")
                            .stockQty(75)
                            .build(),
                    Product.builder()
                            .name("Classic Leather")
                            .brand("Reebok")
                            .description("Clean, minimalist design for everyday style.")
                            .price(new BigDecimal("79.99"))
                            .imageUrl("https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=400")
                            .sizesCsv("8,9,10,11")
                            .stockQty(40)
                            .build(),
                    Product.builder()
                            .name("Air Jordan 1 Retro High")
                            .brand("Jordan")
                            .description("The sneaker that started it all. Premium leather and timeless design.")
                            .price(new BigDecimal("180.00"))
                            .imageUrl("https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=400") // Verified Nike/Jordan image
                            .sizesCsv("8,9,10,11,12")
                            .stockQty(20)
                            .build(),
                    Product.builder()
                            .name("New Balance 550")
                            .brand("New Balance")
                            .description("A revival of the 1989 basketball classic. Clean, simple, and comfortable.")
                            .price(new BigDecimal("110.00"))
                            .imageUrl("https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=400") // Verified New Balance/Runner style
                            .sizesCsv("7,8,9,10")
                            .stockQty(45)
                            .build(),
                    Product.builder()
                            .name("Yeezy Boost 350 V2")
                            .brand("Adidas")
                            .description("Innovative Primeknit upper and responsive Boost midsole.")
                            .price(new BigDecimal("230.00"))
                            .imageUrl("https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=400") // Verified Adidas/Modern sneaker
                            .sizesCsv("9,10,11")
                            .stockQty(15)
                            .build(),
                    Product.builder()
                            .name("Gel-Kayano 14")
                            .brand("Asics")
                            .description("Retro running style meets modern comfort and stability.")
                            .price(new BigDecimal("150.00"))
                            .imageUrl("https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=400") // Verified Athletic shoe
                            .sizesCsv("8,9,10,11,12")
                            .stockQty(30)
                            .build()
                ));
                System.out.println("Seed data loaded successfully!");
            }
        };
    }
}
