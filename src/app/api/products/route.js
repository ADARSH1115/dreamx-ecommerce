import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'

export async function GET(request) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 12
    const skip = (page - 1) * limit

    // Build query
    let query = {}
    
    if (category && category !== 'all') {
      query.category = category
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ]
    }

    // Get products with pagination
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get total count for pagination
    const total = await Product.countDocuments(query)
    const totalPages = Math.ceil(total / limit)

    return Response.json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    })

  } catch (error) {
    console.error('Products fetch error:', error)
    return Response.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    await dbConnect()
    
    const productData = await request.json()
    
    // Generate SKU if not provided
    if (!productData.sku) {
      productData.sku = `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    const product = await Product.create(productData)
    
    return Response.json({
      success: true,
      data: product
    }, { status: 201 })

  } catch (error) {
    console.error('Product creation error:', error)
    return Response.json(
      { success: false, message: 'Failed to create product' },
      { status: 500 }
    )
  }
}
