const express = require('express')
const dbConnect = require('../config/db')
const User = require('../models/User')
const { requireAdmin } = require('../middleware/auth')
const { apiError, apiSuccess, parsePagination } = require('../utils/validation')

const router = express.Router()

router.get('/users', requireAdmin, async (req, res) => {
  try {
    await dbConnect()

    const { page, limit, skip } = parsePagination(req.query, { page: 1, limit: 20 })
    const search = req.query.search
    const role = req.query.role

    let query = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ]
    }

    if (role && ['user', 'admin'].includes(role)) {
      query.role = role
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await User.countDocuments(query)

    return apiSuccess(res, {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return apiError(res, 'Failed to fetch users')
  }
})

module.exports = router
