import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

export async function POST(request) {
  try {
    await dbConnect()
    
    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return Response.json(
        { message: 'Please provide email and password' },
        { status: 400 }
      )
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return Response.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return Response.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    // Remove password from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }

    return Response.json(
      {
        message: 'Login successful',
        token,
        user: userResponse
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Login error:', error)
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
