# DreamX - Modern Ecommerce Platform

A full-stack ecommerce website built with Next.js, MongoDB, and modern web technologies.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Authentication**: Secure user registration and login with JWT
- **Shopping Cart**: Add, remove, and manage cart items with React Context
- **Product Management**: Browse products with categories and search
- **Database**: MongoDB with Mongoose for data persistence
- **API Routes**: RESTful API endpoints with Next.js App Router
- **State Management**: React Context for global state management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animation**: Smooth animations with Framer Motion
- **Toast Notifications**: User feedback with react-hot-toast

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Hot Toast** - Toast notifications

### Backend
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Additional Features Ready for Integration
- **Stripe** - Payment processing
- **NextAuth.js** - Authentication providers
- **Cloudinary** - Image upload and management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dreamx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/dreamx-ecommerce
   
   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Stripe (optional - for payments)
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   ```

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── cart/              # Shopping cart page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Homepage
├── components/            # Reusable components
│   ├── Header.js          # Navigation header
│   ├── Hero.js            # Hero section
│   ├── Categories.js      # Product categories
│   ├── FeaturedProducts.js # Product showcase
│   ├── Newsletter.js      # Newsletter signup
│   └── Footer.js          # Site footer
├── context/               # React Context
│   ├── AuthContext.js     # Authentication state
│   └── CartContext.js     # Shopping cart state
├── lib/                   # Utility libraries
│   └── dbConnect.js       # MongoDB connection
└── models/                # Database models
    ├── User.js            # User schema
    ├── Product.js         # Product schema
    └── Order.js           # Order schema
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Secondary**: Gray (#64748b)
- **Success**: Green
- **Error**: Red
- **Warning**: Yellow

### Components
- **Buttons**: Primary, secondary styles with hover effects
- **Cards**: Elevated cards with shadows and borders
- **Forms**: Consistent input styling with validation
- **Navigation**: Responsive header with mobile menu

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Products (Ready to implement)
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders (Ready to implement)
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get single order

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### Environment Variables for Production
```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-domain.com
```

## 🔐 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Secure authentication with JSON Web Tokens
- **Input Validation**: Server-side validation for all endpoints
- **CORS Protection**: Built-in Next.js security
- **Environment Variables**: Sensitive data protection

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Grid**: CSS Grid and Flexbox for layouts
- **Touch Friendly**: Large touch targets for mobile

## 🔄 State Management

### Cart Context
- Add/remove items
- Update quantities
- Calculate totals
- Persist state

### Auth Context
- User authentication
- Login/logout
- Token management
- Route protection

## 🎯 Next Steps

1. **Add Product Management**
   - Admin dashboard
   - Product CRUD operations
   - Image upload with Cloudinary

2. **Implement Payment Processing**
   - Stripe integration
   - Checkout flow
   - Order confirmation

3. **Add Search & Filtering**
   - Product search
   - Category filtering
   - Price range filters

4. **User Dashboard**
   - Order history
   - Profile management
   - Wishlist functionality

5. **Email Notifications**
   - Order confirmations
   - Shipping updates
   - Newsletter

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@dreamx.com or create an issue in the repository.

---

Built with ❤️ using Next.js and modern web technologies.
