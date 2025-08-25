import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'

export async function GET(request, { params }) {
  try {
    await dbConnect()
    
    const product = await Product.findById(params.id).populate('reviews.user', 'name')
    
    if (!product) {
      return Response.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      )
    }

    return Response.json({
      success: true,
      data: product
    })

  } catch (error) {
    console.error('Product fetch error:', error)
    return Response.json(
      { success: false, message: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
