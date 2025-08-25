import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

export async function POST(request) {
  try {
    await dbConnect()
    
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return Response.json(
        { message: 'Please provide all required fields' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return Response.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json(
        { message: 'User already exists with this email' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

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
        message: 'User registered successfully',
        token,
        user: userResponse
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
