# Social Authentication Setup Guide

## 🚀 You now have Google & Facebook login buttons on your website!

To make them functional, you need to create apps on Google and Facebook and get the required credentials.

## 📋 Setup Instructions

### 1. Google OAuth Setup

#### Step 1: Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Sign in with your Google account

#### Step 2: Create a New Project (if needed)
- Click "Select a Project" → "New Project"
- Name: "DreamX Ecommerce"
- Click "Create"

#### Step 3: Enable Google+ API
- Go to "APIs & Services" → "Library"
- Search for "Google+ API" and enable it

#### Step 4: Create OAuth Credentials
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "OAuth 2.0 Client IDs"
- Configure consent screen first if prompted:
  - User Type: External
  - App Name: DreamX Ecommerce
  - User support email: your email
  - Developer contact: your email
- Application type: Web application
- Name: DreamX Web Client
- Authorized redirect URIs:
  - http://localhost:3000/api/auth/callback/google
  - https://your-domain.vercel.app/api/auth/callback/google (for production)

#### Step 5: Get Your Credentials
- Copy the "Client ID" and "Client Secret"
- Add them to your `.env.local`:
```
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

### 2. Facebook OAuth Setup

#### Step 1: Go to Facebook Developers
- Visit: https://developers.facebook.com/
- Sign in with your Facebook account

#### Step 2: Create a New App
- Click "My Apps" → "Create App"
- App Type: "Consumer"
- App Name: "DreamX Ecommerce"
- Contact Email: your email

#### Step 3: Add Facebook Login
- In your app dashboard, click "Add a Product"
- Select "Facebook Login" → "Set Up"

#### Step 4: Configure OAuth Settings
- Go to "Facebook Login" → "Settings"
- Valid OAuth Redirect URIs:
  - http://localhost:3000/api/auth/callback/facebook
  - https://your-domain.vercel.app/api/auth/callback/facebook (for production)

#### Step 5: Get Your Credentials
- Go to "Settings" → "Basic"
- Copy the "App ID" and "App Secret"
- Add them to your `.env.local`:
```
FACEBOOK_CLIENT_ID=your_app_id_here
FACEBOOK_CLIENT_SECRET=your_app_secret_here
```

### 3. Final Environment Variables

Your `.env.local` should look like this:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Social Authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_app_id
FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
```

### 4. For Production Deployment

When deploying to Vercel, add all these environment variables:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable for Production, Preview, and Development environments
3. Update NEXTAUTH_URL to your production domain

## 🧪 Testing

1. Restart your development server: `npm run dev`
2. Go to: http://localhost:3000/login
3. Click the Google or Facebook buttons
4. You should see the OAuth flow (once credentials are configured)

## 🔒 Security Notes

- Never commit your `.env.local` file to GitHub
- Keep your client secrets private
- Use different credentials for development and production
- Regularly rotate your secrets

## 🎯 Features Added

✅ Google OAuth login/signup
✅ Facebook OAuth login/signup  
✅ Automatic user creation for social logins
✅ Social login integration with your existing auth system
✅ Beautiful UI with icons and loading states
✅ Error handling and success messages

Your social authentication is now ready! 🚀
