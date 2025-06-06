import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  username: string
  email?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken')
    if (token) {
      // Simulate getting user data from token
      setUser({
        id: '1',
        username: 'demo',
        email: 'demo@example.com'
      })
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<void> => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (username === 'demo' && password === 'demo') {
        const userData = {
          id: '1',
          username: 'demo',
          email: 'demo@example.com'
        }
        
        localStorage.setItem('authToken', 'demo-token')
        setUser(userData)
      } else {
        throw new Error('Invalid credentials')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider