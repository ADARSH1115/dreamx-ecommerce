const express = require('express')
const bcrypt = require('bcryptjs')
const dbConnect = require('../config/db')
const User = require('../models/User')
const { signToken } = require('../utils/jwt')
const { isValidEmail, sanitize, validatePassword, apiError, apiSuccess } = require('../utils/validation')
const { authenticateUser } = require('../middleware/auth')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body || {}

    if (!name || !email || !password) {
      return apiError(res, 'Please provide name, email and password', 400)
    }

    const cleanName = sanitize(name)
    const cleanEmail = sanitize(email).toLowerCase()

    if (cleanName.length < 2 || cleanName.length > 50) {
      return apiError(res, 'Name must be between 2 and 50 characters', 400)
    }

    if (!isValidEmail(cleanEmail)) {
      return apiError(res, 'Please provide a valid email address', 400)
    }

    const passwordCheck = validatePassword(password)
    if (!passwordCheck.isValid) {
      return apiError(res, passwordCheck.errors.join('. '), 400)
    }

    await dbConnect()

    const existingUser = await User.findOne({ email: cleanEmail })
    if (existingUser) {
      return apiError(res, 'An account with this email already exists', 409)
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      provider: 'credentials',
    })

    const token = signToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    })

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    return apiSuccess(res, { message: 'Registration successful', token, user: userResponse }, 201)
  } catch (error) {
    console.error('Registration error:', error)

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return apiError(res, messages.join('. '), 400)
    }

    if (error.code === 11000) {
      return apiError(res, 'An account with this email already exists', 409)
    }

    return apiError(res, 'Internal server error')
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}

    if (!email || !password) {
      return apiError(res, 'Please provide email and password', 400)
    }

    const cleanEmail = sanitize(email).toLowerCase()

    if (!isValidEmail(cleanEmail)) {
      return apiError(res, 'Please provide a valid email address', 400)
    }

    await dbConnect()

    const user = await User.findOne({ email: cleanEmail }).select('+password')
    if (!user) {
      return apiError(res, 'Invalid email or password', 401)
    }

    if (!user.password) {
      return apiError(res, 'This account has no password set.', 400)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return apiError(res, 'Invalid email or password', 401)
    }

    const token = signToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    })

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || null,
    }

    return apiSuccess(res, { message: 'Login successful', token, user: userResponse })
  } catch (error) {
    console.error('Login error:', error)
    return apiError(res, 'Internal server error')
  }
})

router.get('/verify', authenticateUser, async (req, res) => {
  return apiSuccess(res, {
    message: 'Token verified',
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      avatar: req.user.avatar || null,
    },
  })
})

module.exports = router
