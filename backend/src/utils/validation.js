const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(email) {
  return EMAIL_REGEX.test(email)
}

function sanitize(str) {
  if (typeof str !== 'string') return ''
  return str.trim().replace(/<[^>]*>/g, '')
}

function validatePassword(password) {
  const errors = []

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (password.length > 128) {
    errors.push('Password must be less than 128 characters')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

function parsePagination(query, defaults = { page: 1, limit: 12 }) {
  const page = Math.max(1, parseInt(query.page) || defaults.page)
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || defaults.limit))
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

function apiError(res, message, status = 500) {
  return res.status(status).json({ success: false, message })
}

function apiSuccess(res, data, status = 200) {
  return res.status(status).json({ success: true, ...data })
}

module.exports = {
  isValidEmail,
  sanitize,
  validatePassword,
  parsePagination,
  apiError,
  apiSuccess,
}
