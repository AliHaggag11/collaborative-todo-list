'use client'

import { useAuth } from '../hooks/useAuth'

export const AuthButton: React.FC = () => {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return (
      <div>
        <span>Welcome, {user?.name}!</span>
        <button onClick={logout} className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Logout
        </button>
      </div>
    )
  }

  return (
    <button onClick={login} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Login with GitHub
    </button>
  )
}