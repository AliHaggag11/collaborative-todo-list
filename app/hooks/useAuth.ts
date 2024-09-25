import { useSession, signIn, signOut } from 'next-auth/react'

export const useAuth = () => {
  const { data: session, status } = useSession()

  const login = () => signIn('github')
  const logout = () => signOut()

  return {
    user: session?.user,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
    login,
    logout,
  }
}