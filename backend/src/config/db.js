const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

/**
 * Cached across invocations on serverless platforms (Vercel reuses warm
 * containers), and prevents concurrent requests from opening duplicate
 * connections while the first connection attempt is still in flight.
 */
let cached = global.__dreamxMongoose
if (!cached) {
  cached = global.__dreamxMongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      .then((m) => m.connection)
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  return cached.conn
}

module.exports = dbConnect
