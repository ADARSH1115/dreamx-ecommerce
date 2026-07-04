const express = require('express')
const dbConnect = require('../config/db')
const User = require('../models/User')
require('../models/Product')
const { authenticateUser } = require('../middleware/auth')
const { apiError, apiSuccess } = require('../utils/validation')

const router = express.Router()

router.get('/wishlist', authenticateUser, async (req, res) => {
  try {
    await dbConnect()

    const user = await User.findById(req.user._id).populate('wishlist').lean()

    return apiSuccess(res, { data: user.wishlist || [] })
  } catch (error) {
    console.error('Wishlist fetch error:', error)
    return apiError(res, 'Failed to fetch wishlist')
  }
})

router.post('/wishlist/:productId', authenticateUser, async (req, res) => {
  try {
    await dbConnect()

    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { wishlist: req.params.productId },
    })

    return apiSuccess(res, { message: 'Added to wishlist' })
  } catch (error) {
    console.error('Wishlist add error:', error)
    return apiError(res, 'Failed to add to wishlist')
  }
})

router.delete('/wishlist/:productId', authenticateUser, async (req, res) => {
  try {
    await dbConnect()

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { wishlist: req.params.productId },
    })

    return apiSuccess(res, { message: 'Removed from wishlist' })
  } catch (error) {
    console.error('Wishlist remove error:', error)
    return apiError(res, 'Failed to remove from wishlist')
  }
})

module.exports = router
