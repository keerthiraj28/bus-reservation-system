# 🚌 Bus Reservation System

A full-stack **Bus Reservation System** built using **Spring Boot** for the backend and a **separate frontend** using HTML, CSS, and JavaScript.  
The application allows users to register, log in, view buses, select seats, book seats, view booking history, and cancel bookings.

The project follows a **real-world architecture** where the backend exposes REST APIs and the frontend consumes them independently.

---

## 🚀 Features

### User Features
- User registration and login
- Logout and session handling
- View available buses
- View seat layout for a selected bus
- Book available seats
- View booking history (user-specific)
- Cancel booked seats

### Booking & Seats
- Real-time seat availability
- Prevents double booking
- Seat status updates after booking/cancellation
- Booking history linked to logged-in user

---

## 🛠 Tech Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- MySQL

### Frontend
- HTML
- CSS (separate CSS per page)
- JavaScript (Vanilla JS)
- Live Server (local development)

---

## 📁 Project Structure

```text

    bus-reservation-system
    │
    ├── bus-reservation-system
    │ ├── src/main/java/com/busreservation
    │ │ ├── controller
    │ │ ├── entity
    │ │ ├── repository
    │ │ ├── dto
    │ │ ├── config
    │ │ └── exception
    │ └── src/main/resources
    │ └── application.properties
    │
    ├── frontend
    │ ├── index.html
    │ ├── login.html
    │ ├── register.html
    │ ├── seats.html
    │ ├── bookings.html
    │ ├── scripts
    │ │ ├── buses.js
    │ │ ├── auth.js
    │ │ ├── seats.js
    │ │ └── bookings.js
    │ └── style
    │ ├── base.css
    │ ├── index.css
    │ ├── auth.css
    │ ├── seats.css
    │ └── bookings.css
    │
    └── README.md

```
---

## 🗄 Database Schema

Tables used in the project:
- `users`
- `bus`
- `seat`
- `booking`
- `route` (reserved for future enhancements)

---

## ⚙️ How to Run Locally

### 1️⃣ Clone the Repository
1. In terminal:
    ```bash
    git clone https://github.com/keerthiraj28/bus-reservation-system.git
    ```

### 2️⃣ Backend (Spring Boot)

1. Open the backend project in IntelliJ IDEA

2. Create the database:
   ```bash
   CREATE DATABASE bus_reservation;
   ```

3. Configure database credentials **(Environment Variables)**

   This project uses **environment variables** for database configuration.

   Required variables:
    - `DB_URL`
    - `DB_USERNAME`
    - `DB_PASSWORD`

   You can see the expected format in:

   `src/main/resources/application.properties.example`

   ### Option A: Using IntelliJ (Recommended)

    1. Go to Run → Edit Configurations
    2. Select `TicketingSystemApplication`
    3. Add environment variables:

    ```bash
    DB_URL=jdbc:mysql://localhost:3306/ticketing_system
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    ```
    4. Click Apply → OK

   ### Option B: Using Command Line (Windows)

    ```bash
    setx DB_URL jdbc:mysql://localhost:3306/ticketing_system
    setx DB_USERNAME your_db_username
    setx DB_PASSWORD your_db_password
    ```

   Restart **IntelliJ** after running these commands.


4. Run the **Spring Boot** application
5. Backend will start at:
    ```http
    http://localhost:8080
    ```


### 3️⃣ Frontend

1. Open the frontend folder in **VS Code**
2. Install **Live Server** extension
3. Right-click index.html → **Open with Live Server**
4. Frontend will run at:
    ```http
    http://127.0.0.1:5500
    ```
⚠️ **Backend must be running before using the frontend**

---

### 🚌 How Buses Are Added (Setup Phase)

Currently, buses are **not added via a UI**.

They are added **manually during setup** using either:
- REST APIs (Postman) – recommended
- Direct database insertion (optional)

This design keeps the project focused on user-side booking flow.

Admin features are planned as future enhancements.

---

### 🔗 Adding Buses Using API (Postman Way)

## Endpoint

```bash
POST http://localhost:8080/api/buses
```

## Headers
```bash
Content-Type: application/json
```

## Request Body (Example)
```json
{
  "busNumber": "TN01AB1234",
  "busName": "Express",
  "totalSeats": 40
}
```

## Response
```json
{
  "id": 1,
  "busNumber": "TN01AB1234",
  "busName": "Express",
  "totalSeats": 40
}
```

Once added:
- The bus appears automatically on the frontend
- Users can view seats and start booking

---

### 🔄 Application Flow

1. User registers or logs in
2. User views available buses
3. User selects a bus and views seat layout
4. User books an available seat
5. Booking is saved in the database
6. User views booking history
7. User cancels booking (if needed)
8. Seat availability updates automatically

---

### ❗ Important Notes

- Frontend and backend should run **separately**
- Backend exposes **REST APIs**
- Frontend consumes **APIs** using `fetch`
- Authentication is session-based using `localStorage`
- No **JWT** or **Spring Security** (intentionally kept simple)

---

### 🧪 Testing

- Backend **APIs** tested using **browser** and **Postman**
- Database verified using **MySQL** queries
- Frontend tested using browser **DevTools**

---

### 🚧 Future Enhancements

- Admin panel for adding buses and routes
- Route-based search (source, destination, date)
- AC / Non-AC bus type
- Seat types (Seater / Sleeper)
- JWT-based authentication
- Payment gateway integration
- React frontend

---