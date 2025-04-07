"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  user: any | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (userData: any, admin?: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any | null>(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true"
  })

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("isAdmin") === "true"
  })

  useEffect(() => {
    localStorage.setItem("user", user ? JSON.stringify(user) : "")
    localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false")
    localStorage.setItem("isAdmin", isAdmin ? "true" : "false")
  }, [user, isAuthenticated, isAdmin])

  const login = (userData: any, admin = false) => {
    setUser(userData)
    setIsAuthenticated(true)
    setIsAdmin(admin)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

