# 📚 Simple Book API

Welcome to the **Simple Book API**, a RESTful service built with Node.js, Express, MongoDB Atlas, and deployed on Render. This API supports authentication, book management, email notifications, and includes seeded test data for development.

## 🌐 Live Deployment

🔗 **API Base URL**: [https://appdev2-mm2r.onrender.com](https://appdev2-mm2r.onrender.com)

---

## 📌 API Endpoints

| Method | Endpoint                  | Description                         |
|--------|---------------------------|-------------------------------------|
| GET    | `/`                       | Welcome message                     |
| POST   | `/api/auth/signup`        | Register a new user                 |
| POST   | `/api/auth/signin`        | Authenticate a user and get token   |
| GET    | `/api/books`              | Get all books      |
| GET    | `/api/books/:id`          | Get a single book by ID             |
| POST   | `/api/books`              | Add a new book     |
| PATCH  | `/api/books/:id`          | Update a book       |
| DELETE | `/api/books/:id`          | Delete a book       |

---

## ⚙️ How to Use (Thunder Client / Postman)
![image](https://github.com/user-attachments/assets/b5ec41bc-34eb-42af-a049-8be31d5e5352)

1. **Authentication:**
   - **POST `/api/auth/signup`**  
     Create a new account.
     ```json
     {
       "username": "john123",
       "email": "john@example.com",
       "password": "password123"
     }
     ```
![image](https://github.com/user-attachments/assets/3af2b240-6606-4748-816f-8761921580cf)

   - **POST `/api/auth/signin`**  
     Log in to get a JWT token.
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```

   - ⚠️ Copy the `token` from the response and **add it to your requests**:
     - In Thunder Client, go to **Auth tab > Bearer Token**.
     - Paste your token there for all protected endpoints (like books).

2. **Books CRUD:**
   - **GET `/api/books`**  
     View all books (token required)
   - **POST `/api/books`**  
     Create a book
     ```json
     {
       "title": "The Great Gatsby",
       "author": "F. Scott Fitzgerald",
       "year": 1925
     }
     ```
   - **GET `/api/books/:id`**, **PATCH**, or **DELETE**  
     Use the `_id` from the GET `/api/books` response.
