# MyStreeT (Foundation) Capstone

A premium sneaker shopping web application built for the Foundation Certification.

## 🚀 Features
*   **Customer Flow:** Browse sneakers, deep-filter by price/size/brand, add to cart, and complete a mock checkout.
*   **Admin Command Center:** Secure dashboard for Admins to add, edit, and delete products from the catalog.
*   **Security:** Stateless JWT authentication and role-based access control using Spring Security.
*   **Modern UI:** React + Tailwind CSS v4, delivering a professional, high-end e-commerce aesthetic.

## 🛠 Tech Stack
*   **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Axios.
*   **Backend:** Java 17, Spring Boot 3.x, Spring Data JPA, Spring Security, Springdoc OpenAPI.
*   **Database:** H2 (In-memory for Dev), PostgreSQL (Ready for Prod).
*   **Testing:** JUnit 5, Mockito (100% test pass rate, >60% coverage).

## 🚀 Getting Started

### 1. Start the Backend
The backend runs on `http://localhost:8080`.
```bash
cd mystreet-backend
./mvnw spring-boot:run
```
*(Note: It uses H2 by default. To use PostgreSQL, ensure your local DB is running on port 5432 and run with `-Dspring-boot.run.profiles=prod`)*

### 2. Start the Frontend
The frontend runs on `http://localhost:5173`.
```bash
cd mystreet-frontend
npm install
npm run dev
```

## ☁️ Cloud Deployment (Render)

### Backend (Web Service)
1. **Create Web Service** on Render.
2. **Environment:** Choose `Docker`.
3. **Environment Variables:**
   * `DB_HOSTNAME`: (The hostname you provided)
   * `DB_NAME`: `mystreet`
   * `DB_USERNAME`: `mystreet_user`
   * `DB_PASSWORD`: `i4HaNO7H0tGUsdFcHtKgvuWUXHHOUxnC`
   * `JWT_SECRET`: (Any long random string)

### Frontend (Static Site)
1. **Create Static Site** on Render.
2. **Build Command:** `npm run build`
3. **Publish Directory:** `dist`
4. **Environment Variables:**
   * `VITE_API_URL`: (Your Render Backend URL)/api


## 🔐 Demo Accounts
The database is automatically seeded upon startup. 

**Admin Account:**
*   Email: `admin@mystreet.com`
*   Password: `admin123`

*(Regular customers can be created via the Register page).*

## 📚 API Documentation
Once the backend is running, you can explore the fully documented REST API via Swagger UI:
*   👉 **[Swagger UI: http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)**
