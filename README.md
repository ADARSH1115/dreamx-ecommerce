# 🛍️ DreamX - Modern Ecommerce Website

A full-stack ecommerce platform built with Next.js, Express, MongoDB, and Tailwind CSS. Features a premium, animated storefront, shopping cart with a slide-out drawer, wishlist, product comparison, flash sales, and JWT authentication.

![DreamX Ecommerce](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Express](https://img.shields.io/badge/Express-Node.js-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

- ✨ **Premium UI/UX** — glassmorphism navbar, animated hero, dark mode, page transitions (Framer Motion)
- 🛒 **Shopping Cart** — persistent cart with a slide-out drawer and a dedicated cart page
- ❤️ **Wishlist** — save products to your account, synced to the database
- ⚖️ **Compare Products** — compare up to 4 products side by side by specification
- 🔐 **User Authentication** — secure login/register with JWT
- 🏷️ **Product Categories** — mega menu + category grid with live product counts
- 🔍 **Product Search** — live search-as-you-type, recent searches, popular products
- ⚡ **Flash Sales** — live countdown on time-limited deals
- 🔥 **Best Sellers** — ranked from real order history, not guesses
- 🎯 **Recommended & Recently Viewed** — per-product suggestions and browsing history
- 📧 **Newsletter** — real subscriber capture (backend-persisted)
- 💳 **Payment Ready** — Stripe dependency wired into the backend for future checkout integration
- 📱 **Responsive Design** — works on desktop, tablet, and mobile
- 🚀 **Fast Performance** — Next.js 14 App Router, code-split below-the-fold sections

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS, Framer Motion, Lucide React — standalone app in `frontend/`
- **Backend:** Node.js, Express — standalone API server in `backend/`
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcryptjs
- **State Management:** React Context (Auth, Cart, Wishlist)
- **Icons:** Lucide React (UI), React Icons (brand/social icons only)

## 📁 Project Structure

This is a monorepo with two independent projects that talk to each other over
HTTP — there is no shared server-side code between them.

```
backend/                     Express API server
├── server.js                Entry point
├── src/
│   ├── config/db.js         MongoDB connection
│   ├── middleware/auth.js   authenticateUser / requireAdmin
│   ├── models/               User, Product, Order, Subscriber (Mongoose)
│   └── routes/               auth, products, orders, admin, users (wishlist), subscribers
└── scripts/seed.js          Dev-only product seeder

frontend/                    Next.js app
└── src/
    ├── app/                 Pages (App Router) — products, cart, wishlist, compare, admin...
    ├── components/
    │   └── ui/              Shared primitives: Button, Card, Badge, Modal, Skeleton
    ├── context/             AuthContext, CartContext (incl. cart drawer state), WishlistContext
    ├── hooks/               useRequireAuth (client-side route guard)
    └── lib/                 apiClient (backend URL), categories, compare, recentSearches, recentlyViewed
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (Atlas or local)
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
   # fill in MONGODB_URI (Atlas connection string, or mongodb://localhost:27017/dreamx
   # for a local instance) and JWT_SECRET
   ```

4. **Configure the frontend**
   ```bash
   cp frontend/.env.local.example frontend/.env.local
   # NEXT_PUBLIC_API_URL defaults to http://localhost:4000
   ```

5. **Seed sample products**
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
- Slide-out cart drawer (opens automatically when you add an item) plus a full `/cart` page
- Quantity controls and live cart counter in the header

### Wishlist & Compare
- Wishlist is tied to your account and persisted server-side (`User.wishlist`)
- Compare list is device-local (localStorage); compare up to 4 products by spec on `/compare`

### Authentication
- JWT-based authentication with bcrypt password hashing
- Protected routes (client-side guard) and protected API endpoints (`requireAdmin`/`authenticateUser`)

### Product Discovery
- Category mega menu and grid with live counts from the database
- Live search-as-you-type, recent searches, and popular products
- Flash sales (countdown to `saleEndDate`), best sellers (ranked from real `Order` history),
  recommended products (same category), and recently viewed (localStorage)

### Dark Mode
- Toggle in the header, persisted to localStorage, respects system preference by default,
  applied before first paint to avoid a flash of the wrong theme

## 🎨 Design System

- **Colors:** primary blue (`#2563EB`), accent violet (`#7C3AED`), plus dedicated
  success/warning/danger tokens — see `frontend/tailwind.config.js`
- **Typography:** Inter, loaded via `next/font`
- **Components:** shared primitives in `frontend/src/components/ui/` (Button, Card,
  Badge, Modal, Skeleton) instead of copy-pasted classes per page
- **Motion:** Framer Motion for hover/lift, page transitions, and the cart drawer/modals
- **Responsive:** mobile-first; dark mode via Tailwind's `class` strategy

## 📚 API Documentation

All endpoints below are served by `backend/`, at `NEXT_PUBLIC_API_URL`.

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Products
- `GET /api/products` - List products (supports `category`, `search`, `sort`, `minPrice`,
  `maxPrice`, `exclude`, `page`, `limit`)
- `POST /api/products` - Create product (admin)
- `GET /api/products/categories` - Product counts grouped by category
- `GET /api/products/flash-sale` - Active on-sale products with a live `saleEndDate`
- `GET /api/products/best-sellers` - Top products ranked by real units sold
- `GET /api/products/:id` - Get single product

### Orders (requires auth)
- `GET /api/orders` - List the current user's orders (admins: `?all=true` for every order)
- `POST /api/orders` - Place an order
- `GET /api/orders/:id` - Get a single order
- `PATCH /api/orders/:id` - Update order status (admin)

### Users
- `GET /api/users/wishlist` - Get the current user's wishlist
- `POST /api/users/wishlist/:productId` - Add a product to the wishlist
- `DELETE /api/users/wishlist/:productId` - Remove a product from the wishlist

### Admin
- `GET /api/admin/users` - List users (admin)

### Subscribers
- `POST /api/subscribers` - Subscribe an email to the newsletter

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

- [Next.js](https://nextjs.org/) for the React framework
- [Express](https://expressjs.com/) for the API server
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for animation
- [MongoDB](https://www.mongodb.com/) for the database solution
