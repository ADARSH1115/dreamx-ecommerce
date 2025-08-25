import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

export async function GET(request) {
  try {
    await dbConnect()
    
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return Response.json(
        { message: 'No token provided' },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    
    // Find user
    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      return Response.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return Response.json(
      {
        message: 'Token verified',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Token verification error:', error)
    return Response.json(
      { message: 'Invalid token' },
      { status: 401 }
    )
  }
}
