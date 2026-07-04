require('dotenv').config()

const express = require('express')
const cors = require('cors')
const dbConnect = require('./src/config/db')

const authRoutes = require('./src/routes/auth.routes')
const productsRoutes = require('./src/routes/products.routes')
const ordersRoutes = require('./src/routes/orders.routes')
const adminRoutes = require('./src/routes/admin.routes')
const usersRoutes = require('./src/routes/users.routes')
const subscribersRoutes = require('./src/routes/subscribers.routes')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }))
app.use(express.json())

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/subscribers', subscribersRoutes)

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DreamX backend listening on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error)
    process.exit(1)
  })
