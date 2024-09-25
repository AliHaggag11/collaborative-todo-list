'use client'

import React from 'react'
import { useAuth } from '../hooks/useAuth'

interface AuthWrapperProps {
  children: React.ReactNode
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}