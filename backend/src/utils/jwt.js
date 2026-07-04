const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error(
    'Please define the JWT_SECRET environment variable inside .env. ' +
    'Generate one with: openssl rand -base64 32'
  )
}

function signToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = { signToken, verifyToken }
