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

- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Backend:** Node.js, Next.js API Routes
- **Database:** MongoDB Atlas with Mongoose
- **Authentication:** JWT, bcryptjs
- **State Management:** React Context
- **Icons:** React Icons
- **Deployment:** Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ADARSH1115/dreamx-ecommerce.git
   cd dreamx-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                # Next.js 14 App Router
│   ├── api/           # API routes
│   ├── auth/          # Authentication pages
│   ├── cart/          # Shopping cart page
│   ├── products/      # Product pages
│   └── layout.js      # Root layout
├── components/        # React components
│   ├── Header.js      # Navigation header
│   ├── Footer.js      # Site footer
│   ├── Hero.js        # Homepage hero
│   └── ...
├── context/          # React Context providers
│   ├── AuthContext.js # Authentication state
│   └── CartContext.js # Shopping cart state
├── lib/             # Utility functions
└── models/          # MongoDB schemas
```

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

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
- `GET /api/products/[id]` - Get single product

### Database Seeding
- `POST /api/seed/products` - Seed sample products

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

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
