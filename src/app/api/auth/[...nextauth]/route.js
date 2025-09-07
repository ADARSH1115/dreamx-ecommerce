import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import User from '@/models/User'
import dbConnect from '@/lib/dbConnect'

const client = new MongoClient(process.env.MONGODB_URI)
const clientPromise = client.connect()

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          await dbConnect()
          
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          const user = await User.findOne({ email: credentials.email })
          if (!user) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
          if (!isPasswordValid) {
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.avatar || null
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role || 'user'
      }
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          await dbConnect()
          
          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email })
          
          if (!existingUser) {
            // Create new user for social login
            await User.create({
              name: user.name,
              email: user.email,
              avatar: user.image,
              role: 'user',
              isVerified: true, // Social logins are considered verified
              provider: account.provider
            })
          }
          
          return true
        } catch (error) {
          console.error('Social sign-in error:', error)
          return false
        }
      }
      return true
    }
  },
  pages: {
    signIn: '/login',
    signUp: '/register',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
