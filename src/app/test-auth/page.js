'use client'
import { useState } from 'react'

export default function TestUsersPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const createTestUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/create-test-users', {
        method: 'POST'
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ success: false, message: 'Network error: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  const registerTestUser = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Demo User',
          email: 'demo@dreamx.com',
          password: 'demo123'
        })
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ success: false, message: 'Network error: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">User Authentication Testing</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Test User Registration & Data Storage</h2>
              <p className="text-blue-700 mb-4">
                Click the buttons below to test user registration and see how emails and login data are stored in MongoDB.
              </p>
              
              <div className="space-x-4">
                <button
                  onClick={createTestUsers}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                  {loading ? 'Creating...' : 'Create 3 Test Users'}
                </button>
                
                <button
                  onClick={registerTestUser}
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                >
                  {loading ? 'Registering...' : 'Register Demo User'}
                </button>
              </div>
            </div>

            {result && (
              <div className={`border rounded-lg p-6 ${
                result.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-3 ${
                  result.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.success ? 'Success!' : 'Error'}
                </h3>
                
                <p className={`mb-3 ${
                  result.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.message}
                </p>

                {result.users && (
                  <div className="mt-4">
                    <h4 className="font-medium text-green-800 mb-2">Created Users:</h4>
                    <ul className="space-y-2">
                      {result.users.map((user, index) => (
                        <li key={index} className="bg-green-100 p-3 rounded">
                          <strong>{user.name}</strong> - {user.email} ({user.role})
                          {user.isVerified && <span className="text-green-600 ml-2">✓ Verified</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.existingUsers && (
                  <div className="mt-4">
                    <h4 className="font-medium text-green-800 mb-2">Existing Users:</h4>
                    <ul className="space-y-1">
                      {result.existingUsers.map((email, index) => (
                        <li key={index} className="text-green-700">• {email}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <pre className="mt-4 bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Next Steps:</h3>
              <ol className="list-decimal list-inside space-y-2 text-yellow-700">
                <li>Click "Create 3 Test Users" or "Register Demo User" above</li>
                <li>
                  <a 
                    href="/admin/users" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    View all registered users →
                  </a>
                </li>
                <li>
                  <a 
                    href="/register" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Test manual registration →
                  </a>
                </li>
                <li>
                  <a 
                    href="/login" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Test user login →
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
