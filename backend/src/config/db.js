const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

let connected = false

async function dbConnect() {
  if (connected) return mongoose.connection

  await mongoose.connect(MONGODB_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })

  connected = true
  console.log('MongoDB connected successfully')
  return mongoose.connection
}

module.exports = dbConnect
