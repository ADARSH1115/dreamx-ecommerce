const express = require('express')
const dbConnect = require('../config/db')
const Product = require('../models/Product')
const Order = require('../models/Order')
const { requireAdmin } = require('../middleware/auth')
const { parsePagination, sanitize, apiError, apiSuccess } = require('../utils/validation')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    await dbConnect()

    const { category, search, sort } = req.query
    const minPrice = parseFloat(req.query.minPrice) || 0
    const maxPrice = parseFloat(req.query.maxPrice) || Infinity
    const { page, limit, skip } = parsePagination(req.query)

    let query = {}

    if (category && category !== 'all') {
      query.category = sanitize(category)
    }

    if (search) {
      const sanitizedSearch = sanitize(search)
      query.$or = [
        { name: { $regex: sanitizedSearch, $options: 'i' } },
        { description: { $regex: sanitizedSearch, $options: 'i' } },
        { category: { $regex: sanitizedSearch, $options: 'i' } },
      ]
    }

    if (minPrice > 0 || maxPrice < Infinity) {
      query.price = {}
      if (minPrice > 0) query.price.$gte = minPrice
      if (maxPrice < Infinity) query.price.$lte = maxPrice
    }

    if (req.query.exclude) {
      query._id = { $ne: req.query.exclude }
    }

    let sortOption = { createdAt: -1 }
    switch (sort) {
      case 'price_asc':
        sortOption = { price: 1 }
        break
      case 'price_desc':
        sortOption = { price: -1 }
        break
      case 'rating':
        sortOption = { 'rating.average': -1 }
        break
      case 'newest':
      default:
        sortOption = { createdAt: -1 }
    }

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Product.countDocuments(query)
    const totalPages = Math.ceil(total / limit)

    return apiSuccess(res, {
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    })
  } catch (error) {
    console.error('Products fetch error:', error)
    return apiError(res, 'Failed to fetch products')
  }
})

// Must stay above the /:id route below, or Express treats "categories" as an id.
router.get('/categories', async (req, res) => {
  try {
    await dbConnect()

    const counts = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ])

    const countsByCategory = Object.fromEntries(counts.map((c) => [c._id, c.count]))

    return apiSuccess(res, { data: countsByCategory })
  } catch (error) {
    console.error('Category counts error:', error)
    return apiError(res, 'Failed to fetch category counts')
  }
})

// Must stay above /:id.
router.get('/flash-sale', async (req, res) => {
  try {
    await dbConnect()

    const limit = Math.min(20, parseInt(req.query.limit) || 8)

    const deals = await Product.find({
      onSale: true,
      saleEndDate: { $gt: new Date() },
    })
      .sort({ saleEndDate: 1 })
      .limit(limit)
      .lean()

    return apiSuccess(res, { data: deals })
  } catch (error) {
    console.error('Flash sale fetch error:', error)
    return apiError(res, 'Failed to fetch flash sale products')
  }
})

// Must stay above /:id. Ranks products by real units sold (from Order
// history), not a guess — products with no sales yet simply don't appear.
router.get('/best-sellers', async (req, res) => {
  try {
    await dbConnect()

    const limit = Math.min(20, parseInt(req.query.limit) || 8)

    const ranked = await Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.product', unitsSold: { $sum: '$items.quantity' } } },
      { $sort: { unitsSold: -1 } },
      { $limit: limit },
    ])

    const productIds = ranked.map((r) => r._id)
    const products = await Product.find({ _id: { $in: productIds } }).lean()
    const unitsSoldById = Object.fromEntries(ranked.map((r) => [r._id.toString(), r.unitsSold]))

    // Preserve the sales-ranked order (Mongo $in doesn't guarantee it).
    const sorted = productIds
      .map((id) => products.find((p) => p._id.toString() === id.toString()))
      .filter(Boolean)
      .map((p) => ({ ...p, unitsSold: unitsSoldById[p._id.toString()] }))

    return apiSuccess(res, { data: sorted })
  } catch (error) {
    console.error('Best sellers fetch error:', error)
    return apiError(res, 'Failed to fetch best sellers')
  }
})

router.get('/:id', async (req, res) => {
  try {
    await dbConnect()

    const product = await Product.findById(req.params.id).populate('reviews.user', 'name')

    if (!product) {
      return apiError(res, 'Product not found', 404)
    }

    return apiSuccess(res, { data: product })
  } catch (error) {
    console.error('Product fetch error:', error)
    return apiError(res, 'Failed to fetch product')
  }
})

router.post('/', requireAdmin, async (req, res) => {
  try {
    await dbConnect()

    const productData = req.body || {}

    if (!productData.sku) {
      productData.sku = `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    const product = await Product.create(productData)

    return apiSuccess(res, { data: product }, 201)
  } catch (error) {
    console.error('Product creation error:', error)

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return apiError(res, messages.join(', '), 400)
    }

    return apiError(res, 'Failed to create product')
  }
})

module.exports = router
