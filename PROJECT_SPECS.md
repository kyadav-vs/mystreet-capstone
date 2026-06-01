# MyStreeT (Foundation) – Capstone Project Specifications

## Purpose
The capstone project demonstrates foundational proficiency in building a full-stack e-commerce web application using React, Spring Boot, and a relational database (H2/PostgreSQL).

## Application Overview
**MyStreeT** is a premium sneaker shopping platform that provides a clean "Happy Path" for users to browse a catalog, manage a shopping cart, and place mock orders. It includes role-based access control (Admin vs. Customer).

## Technical Architecture
- **Frontend:** React with TypeScript, Vite, Tailwind CSS v4, Context API, Lucide-React.
- **Backend:** Spring Boot (Java 17), Spring Web, Spring Data JPA, Spring Security (JWT).
- **Database:** H2 (in-memory) for development, designed to easily transition to PostgreSQL for production.

## Key Features & Requirements
1. **Catalog Management:** Display products with details (Name, Brand, Price, Sizes). Admin users can perform CRUD operations via a dedicated dashboard.
2. **Shopping Cart:** Persistent cart (via `localStorage`) allowing users to add/remove items and adjust quantities.
3. **Authentication & Authorization:** Secure registration and login using JWT. Passwords hashed using BCrypt.
4. **Checkout Flow:** Capture shipping details and simulate a payment transaction, resulting in a confirmed order with a unique ID.
5. **Advanced Discovery (Phase 4 Additions):** Deep filtering (by price, size, brand), dynamic sorting (Newest, Price), and dedicated Brand/New Arrival pages.

## Implementation Phases
- **Phase 1 (Foundations & Catalog):** Project setup, basic API, UI scaffolding, and product listing with hero banners.
- **Phase 2 (Auth & Cart):** User registration, login, JWT integration, and cart state management.
- **Phase 3 (Checkout & Admin):** Order processing, checkout UI, order confirmation, and admin catalog management.
- **Phase 4 (Polish & Advanced):** UI refinement (clean/light aesthetics), filtering, sorting, and rich database seeding.
