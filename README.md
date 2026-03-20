# 📚 Virtual Book Store

An elegant, full-stack web application designed for browsing, managing, and purchasing books. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this project demonstrates modern web development principles, responsive UI design, and secure backend architecture, making it an excellent showcase of comprehensive academic and professional software engineering practices.

---

## 📖 Overview

The **Virtual Book Store** is a sophisticated e-commerce platform that allows users to seamlessly discover and purchase books, while providing an administrative dashboard for inventory and order management. The application features a dynamic and modern user interface, robust state management, and a securely protected backend API.

Key objectives achieved in this project include:
- **Responsive UI/UX:** A mobile-first, fluid layout using Tailwind CSS.
- **Efficient State Management:** Redux Toolkit for cart handling and predictable data flow.
- **Secure Authentication:** Firebase for client-side user auth and JWT-based Role-Based Access Control (RBAC) for the admin dashboard.
- **Clean Architecture:** A modularized, MVC-inspired backend for clarity, maintainability, and academic adherence.

---

## ✨ Features

- **Advanced Book Browsing:** Browse books categorized by dynamic filters like "Top Sellers," "New Releases," and "Recommended".
- **Shopping Cart System:** Persistent and intuitive cart implementation integrated with a mock checkout flow.
- **Admin Dashboard (CMS):** A secure, hidden portal designated for administrators to perform CRUD (Create, Read, Update, Delete) operations on the bookstore's inventory and view order metrics.
- **Secure Access Control:** Regular users authenticate via Firebase; administrators use a highly secure, custom JWT authentication flow to access restricted endpoints.
- **Optimized Backend Logic:** Clean, camelCase-structured controllers and refined error handling for better readability and maintainability.

---

## 🛠 Technical Details

### Technology Stack
*   **Frontend:** React.js, Vite, Tailwind CSS, Redux Toolkit, React Router DOM
*   **Backend:** Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), bcrypt
*   **Authentication:** Firebase Auth (Users) & Custom JWT (Admin)

### Recent Code Optimizations
To ensure high academic and professional standards, the following optimizations were implemented:
1.  **Refactoring Controllers:** Structured backend controllers (`book.controller.js`, `order.controller.js`) with proper camelCase naming conventions, resulting in improved maintainability.
2.  **JSDoc Documentation:** Added inline documentation for core API logic, bridging the gap between code and functionality.
3.  **Code Consistency:** Updated router files to align perfectly with controller methodologies, ensuring error-free data routing.

---

## 🗂 Folder Structure

```text
Book-Store-MERN-Project/
├── backend/
│   ├── src/
│   │   ├── books/         # Book controllers, routes, and Mongoose models
│   │   ├── orders/        # Order management logic
│   │   ├── stats/         # Admin dashboard statistics
│   │   ├── users/         # Admin authentication handlers
│   │   └── middleware/    # JWT token verification for protected routes
│   ├── index.js           # Server entry point and database connection
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable modern UI components (Navbar, Footer)
│   │   ├── context/       # Firebase Auth Context provider
│   │   ├── pages/         # Primary views (Home, Books, Dashboard, Checkout)
│   │   ├── redux/         # Global state logic (features like cart action)
│   │   └── routers/       # React Router setup
│   ├── vite.config.js     # Vite bundler configuration
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

---

## 🚀 Installation

Ensure you have [Node.js](https://nodejs.org/) (v16+) and [MongoDB](https://www.mongodb.com/) installed on your local machine.

### 1. Clone the Repository
```bash
git clone <repository_url>
cd Book-Store-MERN-Project
```

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```properties
PORT=5000
DB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_secure_jwt_secret
```

**Frontend (`frontend/.env.local`):**
```properties
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 3. Install Dependencies

Open two separate terminals for the backend and frontend.

**Terminal 1: Backend**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2: Frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## 💻 Usage

1.  **Start the Application:** With both servers running, open your web browser and navigate to `http://localhost:5173`.
2.  **Explore as a Guest:** Browse the books carousel, read descriptions, and view reviews.
3.  **User Flow:** Sign up or log in to add items to your shopping cart and place orders.
4.  **Admin Flow:** 
    * Scroll to the application's footer and click the **Admin** button (or navigate to `/admin`).
    * Enter securely stored admin credentials to manage books (add, edit, delete) and review the platform’s statistics.

---

## 🔮 Future Work

While the Virtual Book Store serves as a solid foundation, several features are planned to expand its capabilities:
-   **Payment Gateway Integration:** Implement Stripe or PayPal to handle real transactions.
-   **Responsive Email Notifications:** Using NodeMailer for post-purchase confirmations and shipping updates.
-   **Pagination & Advanced Search:** For better performance as the virtual library scales up in volume.
-   **Enhanced Unit Testing:** Introduce Jest/Supertest to increase overall code coverage and robustness.

---
*Developed with academic rigor and passion for modern web technologies.*
