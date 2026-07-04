const express = require('express')
const dbConnect = require('../config/db')
const Subscriber = require('../models/Subscriber')
const { isValidEmail, sanitize, apiError, apiSuccess } = require('../utils/validation')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { email } = req.body || {}

    if (!email) {
      return apiError(res, 'Please provide an email address', 400)
    }

    const cleanEmail = sanitize(email).toLowerCase()

    if (!isValidEmail(cleanEmail)) {
      return apiError(res, 'Please provide a valid email address', 400)
    }

    await dbConnect()

    const existing = await Subscriber.findOne({ email: cleanEmail })
    if (existing) {
      return apiSuccess(res, { message: 'You are already subscribed!' })
    }

    await Subscriber.create({ email: cleanEmail })

    return apiSuccess(res, { message: 'Successfully subscribed!' }, 201)
  } catch (error) {
    console.error('Subscribe error:', error)

    if (error.code === 11000) {
      return apiSuccess(res, { message: 'You are already subscribed!' })
    }

    return apiError(res, 'Failed to subscribe. Please try again.')
  }
})

module.exports = router
