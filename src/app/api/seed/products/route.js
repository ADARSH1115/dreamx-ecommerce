import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'

const sampleProducts = [
  {
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding. Perfect for music lovers, professionals, and travelers.",
    price: 299.99,
    originalPrice: 399.99,
    category: "Electronics",
    subcategory: "Audio",
    brand: "AudioTech",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
        alt: "Premium Wireless Headphones"
      }
    ],
    inStock: true,
    stockQuantity: 50,
    sku: "AUDIO-001",
    specifications: [
      { name: "Battery Life", value: "30 hours" },
      { name: "Connectivity", value: "Bluetooth 5.0" },
      { name: "Noise Cancellation", value: "Active" },
      { name: "Weight", value: "250g" }
    ],
    rating: { average: 4.8, count: 124 },
    featured: true,
    onSale: true,
    tags: ["wireless", "noise-cancelling", "premium"],
    weight: 0.25
  },
  {
    name: "Stylish Leather Jacket",
    description: "Premium genuine leather jacket with modern styling. Crafted from high-quality cowhide leather with attention to detail. Features include multiple pockets, adjustable cuffs, and a comfortable inner lining.",
    price: 189.99,
    originalPrice: 249.99,
    category: "Fashion",
    subcategory: "Outerwear",
    brand: "StyleCraft",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
        alt: "Stylish Leather Jacket"
      }
    ],
    inStock: true,
    stockQuantity: 25,
    sku: "FASHION-001",
    specifications: [
      { name: "Material", value: "Genuine Leather" },
      { name: "Care", value: "Dry Clean Only" },
      { name: "Fit", value: "Regular" },
      { name: "Origin", value: "Italy" }
    ],
    rating: { average: 4.6, count: 89 },
    featured: true,
    onSale: true,
    tags: ["leather", "jacket", "fashion"],
    weight: 1.2
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking watch with heart rate monitoring, GPS, and smart notifications. Water-resistant design with 7-day battery life. Track your workouts, monitor your health, and stay connected.",
    price: 199.99,
    originalPrice: 299.99,
    category: "Accessories",
    subcategory: "Watches",
    brand: "FitTech",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
        alt: "Smart Fitness Watch"
      }
    ],
    inStock: true,
    stockQuantity: 75,
    sku: "WATCH-001",
    specifications: [
      { name: "Display", value: "1.4 inch AMOLED" },
      { name: "Battery", value: "7 days" },
      { name: "Water Resistance", value: "5ATM" },
      { name: "GPS", value: "Built-in" }
    ],
    rating: { average: 4.7, count: 156 },
    featured: true,
    onSale: true,
    tags: ["smartwatch", "fitness", "gps"],
    weight: 0.05
  },
  {
    name: "Modern Table Lamp",
    description: "Elegant modern table lamp with adjustable brightness and warm LED lighting. Perfect for reading, working, or creating ambiance. Features touch controls and energy-efficient LED technology.",
    price: 79.99,
    originalPrice: 119.99,
    category: "Home & Garden",
    subcategory: "Lighting",
    brand: "LuxLight",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        alt: "Modern Table Lamp"
      }
    ],
    inStock: true,
    stockQuantity: 30,
    sku: "HOME-001",
    specifications: [
      { name: "Power", value: "12W LED" },
      { name: "Brightness", value: "Adjustable" },
      { name: "Material", value: "Aluminum & Wood" },
      { name: "Height", value: "45cm" }
    ],
    rating: { average: 4.5, count: 67 },
    featured: true,
    onSale: true,
    tags: ["lamp", "led", "modern"],
    weight: 0.8
  },
  {
    name: "Professional Camera",
    description: "High-end digital camera with 24.2MP sensor, 4K video recording, and professional-grade features. Perfect for photographers and content creators who demand the best image quality.",
    price: 899.99,
    originalPrice: 1199.99,
    category: "Electronics",
    subcategory: "Cameras",
    brand: "PhotoPro",
    images: [
      {
        url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
        alt: "Professional Camera"
      }
    ],
    inStock: false,
    stockQuantity: 0,
    sku: "CAMERA-001",
    specifications: [
      { name: "Sensor", value: "24.2MP APS-C" },
      { name: "Video", value: "4K 30fps" },
      { name: "ISO Range", value: "100-25600" },
      { name: "Battery Life", value: "500 shots" }
    ],
    rating: { average: 4.9, count: 203 },
    featured: true,
    onSale: true,
    tags: ["camera", "photography", "4k"],
    weight: 0.6
  },
  {
    name: "Organic Skincare Set",
    description: "Complete organic skincare routine with cleanser, toner, serum, and moisturizer. Made with natural ingredients and essential oils. Suitable for all skin types and cruelty-free.",
    price: 49.99,
    originalPrice: 79.99,
    category: "Health & Beauty",
    subcategory: "Skincare",
    brand: "NaturalGlow",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
        alt: "Organic Skincare Set"
      }
    ],
    inStock: true,
    stockQuantity: 40,
    sku: "BEAUTY-001",
    specifications: [
      { name: "Type", value: "Organic" },
      { name: "Skin Type", value: "All Types" },
      { name: "Cruelty Free", value: "Yes" },
      { name: "Includes", value: "4 Products" }
    ],
    rating: { average: 4.4, count: 98 },
    featured: true,
    onSale: true,
    tags: ["organic", "skincare", "natural"],
    weight: 0.3
  },
  {
    name: "Ergonomic Office Chair",
    description: "Professional ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Designed for long hours of comfortable working with premium materials.",
    price: 349.99,
    originalPrice: 449.99,
    category: "Home & Garden",
    subcategory: "Furniture",
    brand: "ErgoComfort",
    images: [
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        alt: "Ergonomic Office Chair"
      }
    ],
    inStock: true,
    stockQuantity: 15,
    sku: "FURNITURE-001",
    specifications: [
      { name: "Material", value: "Mesh & Foam" },
      { name: "Weight Capacity", value: "150kg" },
      { name: "Adjustable", value: "Height & Lumbar" },
      { name: "Warranty", value: "5 Years" }
    ],
    rating: { average: 4.7, count: 145 },
    featured: true,
    onSale: true,
    tags: ["chair", "office", "ergonomic"],
    weight: 18.5
  },
  {
    name: "Wireless Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360-degree sound, waterproof design, and 24-hour battery life. Perfect for outdoor adventures, parties, and everyday listening.",
    price: 89.99,
    originalPrice: 129.99,
    category: "Electronics",
    subcategory: "Audio",
    brand: "SoundWave",
    images: [
      {
        url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
        alt: "Wireless Bluetooth Speaker"
      }
    ],
    inStock: true,
    stockQuantity: 60,
    sku: "AUDIO-002",
    specifications: [
      { name: "Battery", value: "24 hours" },
      { name: "Waterproof", value: "IPX7" },
      { name: "Range", value: "30 meters" },
      { name: "Sound", value: "360-degree" }
    ],
    rating: { average: 4.6, count: 112 },
    featured: false,
    onSale: true,
    tags: ["speaker", "bluetooth", "waterproof"],
    weight: 0.5
  }
]

export async function POST(request) {
  try {
    await dbConnect()
    
    // Clear existing products
    await Product.deleteMany({})
    
    // Insert sample products
    const products = await Product.insertMany(sampleProducts)
    
    return Response.json({
      success: true,
      message: `Successfully seeded ${products.length} products`,
      data: products
    }, { status: 201 })

  } catch (error) {
    console.error('Seed products error:', error)
    return Response.json(
      { success: false, message: 'Failed to seed products', error: error.message },
      { status: 500 }
    )
  }
}
