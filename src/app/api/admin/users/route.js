import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

export async function GET(request) {
  try {
    await dbConnect()
    
    // Get all users (excluding passwords for security)
    const users = await User.find({}, {
      password: 0, // Exclude password field
    }).sort({ createdAt: -1 })

    return Response.json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return Response.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
