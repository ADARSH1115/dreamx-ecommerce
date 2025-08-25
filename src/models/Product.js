import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Fashion', 'Electronics', 'Home & Garden', 'Accessories', 'Books', 'Health & Beauty', 'Sports', 'Toys']
  },
  subcategory: {
    type: String,
    default: ''
  },
  brand: {
    type: String,
    default: ''
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0,
    min: [0, 'Stock quantity cannot be negative']
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  specifications: [{
    name: String,
    value: String
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: [500, 'Review comment cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  onSale: {
    type: Boolean,
    default: false
  },
  saleEndDate: {
    type: Date
  },
  tags: [String],
  weight: {
    type: Number,
    default: 0
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  }
}, {
  timestamps: true
})

// Index for better search performance
ProductSchema.index({ name: 'text', description: 'text', category: 'text' })
ProductSchema.index({ category: 1, price: 1 })
ProductSchema.index({ featured: 1, createdAt: -1 })

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
