# 🛒 Product Listing App (Full Stack)

A full-stack product management application built using Next.js, Node.js, Express, Prisma, and PostgreSQL (Neon).

---

## 🌐 Live Links

- 🔗 Frontend: https://product-list-frontend-5m4m.vercel.app/
- 🔗 Backend API: https://product-list-backend-en8c.onrender.com  

---

## 🚀 Features

### ✅ Product Management (CRUD)
- Create product (via UI modal)
- View all products
- Update product 
- Delete product

### 🔍 Search
- Search products by name

### 🎨 UI/UX
- Modern responsive design (Tailwind CSS)
- Toast notifications
- Blur modal UI
- Product cards with hover effects
- Clean product detail page

---

## 🧱 Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- Prisma ORM

### Database
- PostgreSQL (Neon Cloud)

### Deployment
- Frontend → Vercel
- Backend → Render

---

## 📂 Project Structure

product-listing-app/
│
├── frontend/        # Next.js application
│   ├── app/
│   ├── services/
│
├── backend/         # Express + Prisma backend
│   ├── src/
│   ├── prisma/
│
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

git clone https:https://github.com/mhdinshadk/product-list-frontend
cd product-listing-app

---

### 2️⃣ Backend Setup

cd backend  
npm install  

Create `.env` file:

DATABASE_URL=your_neon_database_url  
PORT=5000  

Run database migration:

npx prisma db push  

Start server:

npm start  

---

### 3️⃣ Frontend Setup

cd frontend  
npm install  
npm run dev  

---

## 🌐 API Endpoints

GET     /api/products        → Get all products  
GET     /api/products/:id   → Get single product  
POST    /api/products       → Create product  
PUT     /api/products/:id   → Update product  
DELETE  /api/products/:id   → Delete product  

---

## 🗄️ Database Schema

model Product {
  id           String   @id @default(uuid())
  name         String
  description  String
  price        Float
  image        String
  sku          String   @unique
  availability Boolean  @default(true)
}

---

## 🚀 Deployment Details

Backend (Render)
- Set DATABASE_URL (Neon)
- Build: npm install
- Start: node server.js

Frontend (Vercel)
- Root directory: frontend
- Update API base URL

---

## ⚠️ Challenges Faced

- Fixing 500 error due to missing database tables
- Setting up Neon PostgreSQL connection
- Handling environment variables in deployment
- Fixing image loading issues in Next.js

---



## 👨‍💻 Author

Muhammed Inshad  
MERN Stack Developer  

---

## ⭐ Conclusion

This project demonstrates:
- Full-stack development
- REST API design
- Database integration
- Cloud deployment

👉 Ready for real-world applications 🚀
