# 🛍️ DreamX - Modern Ecommerce Website

A full-stack ecommerce platform built with Next.js, React, Tailwind CSS, and MongoDB. Features modern UI, shopping cart, user authentication, and responsive design.

![DreamX Ecommerce](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

- ✨ **Modern UI/UX** - Beautiful design with Tailwind CSS
- 🛒 **Shopping Cart** - Add/remove products with persistent cart
- 🔐 **User Authentication** - Secure login/register with JWT
- 📱 **Responsive Design** - Works perfectly on all devices  
- 🏷️ **Product Categories** - Browse products by categories
- 🔍 **Product Search** - Find products easily
- 💳 **Payment Ready** - Stripe integration prepared
- 📧 **Newsletter** - Email subscription with validation
- 🚀 **Fast Performance** - Next.js 14 with App Router

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS — standalone app in `frontend/`
- **Backend:** Node.js, Express — standalone API server in `backend/`
- **Database:** MongoDB Atlas with Mongoose
- **Authentication:** JWT, bcryptjs
- **State Management:** React Context
- **Icons:** React Icons

## 📁 Project Structure

This is a monorepo with two independent projects that talk to each other over
HTTP — there is no shared server-side code between them.

```
backend/                 Express API server
├── server.js            Entry point
├── src/
│   ├── config/db.js     MongoDB connection
│   ├── middleware/auth.js
│   ├── models/          User, Product, Order (Mongoose)
│   └── routes/          auth, products, orders, admin
└── scripts/seed.js      Dev-only product seeder

frontend/                Next.js app
└── src/
    ├── app/             Pages (App Router)
    ├── components/
    ├── context/         AuthContext, CartContext
    ├── hooks/           useRequireAuth (client-side route guard)
    └── lib/apiClient.js Backend base URL
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ADARSH1115/dreamx-ecommerce.git
   cd dreamx-ecommerce
   ```

2. **Install dependencies** (installs both `frontend/` and `backend/` via npm workspaces)
   ```bash
   npm install
   ```

3. **Configure the backend**
   ```bash
   cp backend/.env.example backend/.env
   # fill in MONGODB_URI and JWT_SECRET
   ```

4. **Configure the frontend**
   ```bash
   cp frontend/.env.local.example frontend/.env.local
   # NEXT_PUBLIC_API_URL defaults to http://localhost:4000
   ```

5. **(Optional) seed sample products**
   ```bash
   npm run seed
   ```

6. **Run both apps**
   ```bash
   npm run dev
   ```
   This starts the backend on [http://localhost:4000](http://localhost:4000) and the
   frontend on [http://localhost:3000](http://localhost:3000). To run them separately,
   use `npm run dev -w backend` / `npm run dev -w frontend` in two terminals.

## 🌐 Deployment

Deploy `frontend/` and `backend/` as two separate services (e.g. frontend on
Vercel, backend on Render/Railway/Fly). Set `NEXT_PUBLIC_API_URL` on the
frontend to the backend's public URL, and `FRONTEND_URL` on the backend to
the frontend's public URL (used for CORS).

## 🛒 Key Features Explained

### Shopping Cart
- Persistent cart using localStorage
- Add/remove items with quantity control
- Real-time cart counter in header
- Cart page with item management

### Authentication
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected routes and API endpoints
- User registration and login

### Product Management
- Dynamic product listing
- Category-based filtering
- Product search functionality
- Image optimization with Next.js

## 🎨 Design System

- **Primary Colors:** Blue gradient themes
- **Typography:** Clean, modern fonts
- **Components:** Reusable Tailwind components
- **Responsive:** Mobile-first design approach
- **Animations:** Smooth transitions and hover effects

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin)
- `GET /api/products/:id` - Get single product

### Orders (requires auth)
- `GET /api/orders` - List the current user's orders (admins: `?all=true` for every order)
- `POST /api/orders` - Place an order
- `GET /api/orders/:id` - Get a single order
- `PATCH /api/orders/:id` - Update order status (admin)

### Admin
- `GET /api/admin/users` - List users (admin)

All endpoints above are served by `backend/`, at `NEXT_PUBLIC_API_URL`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

**Developer:** Adarsh Kumar  
**Email:** adarshaadhikumar024@gmail.com  
**GitHub:** [@ADARSH1115](https://github.com/ADARSH1115)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repository if you found it helpful!**

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) for the database solution
- [Vercel](https://vercel.com/) for deployment platform
