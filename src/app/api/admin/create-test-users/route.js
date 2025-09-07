import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    await dbConnect()
    
    // Create test users
    const testUsers = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: await bcrypt.hash("password123", 12),
        role: "user",
        phone: "+1234567890",
        isVerified: true
      },
      {
        name: "Jane Smith", 
        email: "jane@example.com",
        password: await bcrypt.hash("password123", 12),
        role: "user",
        phone: "+1987654321",
        isVerified: false
      },
      {
        name: "Admin User",
        email: "admin@dreamx.com",
        password: await bcrypt.hash("admin123", 12),
        role: "admin",
        phone: "+1555000111",
        isVerified: true
      }
    ]

    // Check if users already exist
    const existingEmails = await User.find({
      email: { $in: testUsers.map(user => user.email) }
    }).select('email')
    
    const existingEmailList = existingEmails.map(user => user.email)
    const newUsers = testUsers.filter(user => !existingEmailList.includes(user.email))

    if (newUsers.length === 0) {
      return Response.json({
        success: true,
        message: 'Test users already exist',
        existingUsers: existingEmailList
      })
    }

    // Create new users
    const createdUsers = await User.insertMany(newUsers)

    return Response.json({
      success: true,
      message: `${createdUsers.length} test users created successfully`,
      users: createdUsers.map(user => ({
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }))
    })
  } catch (error) {
    console.error('Error creating test users:', error)
    return Response.json(
      { success: false, message: 'Failed to create test users', error: error.message },
      { status: 500 }
    )
  }
}
