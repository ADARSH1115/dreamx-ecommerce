const express = require('express')
const dbConnect = require('../config/db')
const Order = require('../models/Order')
const Product = require('../models/Product')
const { authenticateUser, requireAdmin } = require('../middleware/auth')
const { apiError, apiSuccess, parsePagination } = require('../utils/validation')

const router = express.Router()

/**
 * GET /api/orders
 * Get orders for the authenticated user
 * Admin: can see all orders with ?all=true
 */
router.get('/', authenticateUser, async (req, res) => {
  try {
    await dbConnect()

    const { page, limit, skip } = parsePagination(req.query)
    const status = req.query.status
    const showAll = req.query.all === 'true'

    let query = {}

    if (!showAll || req.user.role !== 'admin') {
      query.user = req.user._id
    }

    if (status && ['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      query.status = status
    }

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.product', 'name images price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Order.countDocuments(query)

    return apiSuccess(res, {
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Orders fetch error:', error)
    return apiError(res, 'Failed to fetch orders')
  }
})

/**
 * POST /api/orders
 * Create a new order for the authenticated user
 */
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body || {}

    if (!items || !Array.isArray(items) || items.length === 0) {
      return apiError(res, 'Order must contain at least one item', 400)
    }

    if (!shippingAddress) {
      return apiError(res, 'Shipping address is required', 400)
    }

    const requiredAddressFields = ['name', 'street', 'city', 'state', 'zipCode', 'country']
    const missingAddress = requiredAddressFields.filter((f) => !shippingAddress[f])
    if (missingAddress.length > 0) {
      return apiError(res, `Missing shipping address fields: ${missingAddress.join(', ')}`, 400)
    }

    if (!paymentMethod) {
      return apiError(res, 'Payment method is required', 400)
    }

    await dbConnect()

    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      if (!item.product || !item.quantity || item.quantity < 1) {
        return apiError(res, 'Each item must have a product ID and valid quantity', 400)
      }

      const product = await Product.findById(item.product)
      if (!product) {
        return apiError(res, `Product not found: ${item.product}`, 404)
      }

      if (!product.inStock || product.stockQuantity < item.quantity) {
        return apiError(res, `${product.name} is out of stock or insufficient quantity`, 400)
      }

      const itemTotal = product.price * item.quantity
      subtotal += itemTotal

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal,
      })
    }

    const tax = Math.round(subtotal * 0.08 * 100) / 100
    const shipping = subtotal >= 100 ? 0 : 9.99
    const total = Math.round((subtotal + tax + shipping) * 100) / 100

    const orderNumber = `DX-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    const order = await Order.create({
      user: req.user._id,
      orderNumber,
      items: orderItems,
      subtotal,
      tax,
      shipping,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod,
      shippingAddress,
    })

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stockQuantity: -item.quantity },
      })
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('items.product', 'name images price')
      .lean()

    return apiSuccess(res, { message: 'Order placed successfully', data: populatedOrder }, 201)
  } catch (error) {
    console.error('Order creation error:', error)

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return apiError(res, messages.join('. '), 400)
    }

    return apiError(res, 'Failed to create order')
  }
})

/**
 * GET /api/orders/:id
 * Get a specific order by ID
 */
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    await dbConnect()

    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name images price')
      .lean()

    if (!order) {
      return apiError(res, 'Order not found', 404)
    }

    if (
      req.user.role !== 'admin' &&
      order.user._id.toString() !== req.user._id.toString()
    ) {
      return apiError(res, 'Not authorized to view this order', 403)
    }

    return apiSuccess(res, { data: order })
  } catch (error) {
    console.error('Order fetch error:', error)
    return apiError(res, 'Failed to fetch order')
  }
})

/**
 * PATCH /api/orders/:id
 * Update order status (admin only)
 */
router.patch('/:id', requireAdmin, async (req, res) => {
  try {
    const { status, paymentStatus, trackingNumber } = req.body || {}

    await dbConnect()

    const order = await Order.findById(req.params.id)
    if (!order) {
      return apiError(res, 'Order not found', 404)
    }

    if (status) {
      const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
      if (!validStatuses.includes(status)) {
        return apiError(res, `Invalid status. Must be one of: ${validStatuses.join(', ')}`, 400)
      }
      order.status = status
    }

    if (paymentStatus) {
      const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded']
      if (!validPaymentStatuses.includes(paymentStatus)) {
        return apiError(res, `Invalid payment status. Must be one of: ${validPaymentStatuses.join(', ')}`, 400)
      }
      order.paymentStatus = paymentStatus
    }

    if (trackingNumber !== undefined) {
      order.trackingNumber = trackingNumber
    }

    await order.save()

    const updated = await Order.findById(order._id)
      .populate('user', 'name email')
      .populate('items.product', 'name images price')
      .lean()

    return apiSuccess(res, { message: 'Order updated successfully', data: updated })
  } catch (error) {
    console.error('Order update error:', error)
    return apiError(res, 'Failed to update order')
  }
})

module.exports = router
