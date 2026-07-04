const { verifyToken } = require('../utils/jwt')
const User = require('../models/User')

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

/**
 * Express middleware: authenticate user from JWT token, attach to req.user
 */
async function authenticateUser(req, res, next) {
  const token = getTokenFromRequest(req)

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please login.',
    })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please login again.',
    })
  }

  const user = await User.findById(decoded.userId).select('-password')
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'User no longer exists.',
    })
  }

  req.user = user
  next()
}

/**
 * Express middleware: require admin role. Must run after authenticateUser,
 * or be used standalone (it performs the same authentication check first).
 */
async function requireAdmin(req, res, next) {
  await authenticateUser(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required.',
      })
    }
    next()
  })
}

module.exports = { authenticateUser, requireAdmin }
