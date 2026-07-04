const mongoose = require('mongoose')

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema)
