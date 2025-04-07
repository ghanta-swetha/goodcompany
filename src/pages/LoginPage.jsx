"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // In a real app, this would call an API endpoint
      // For demo purposes, we'll simulate a successful login
      setTimeout(() => {
        const userData = {
          id: 1,
          name: "John Doe",
          email: email,
        }
        login(userData)
        navigate("/")
      }, 1000)
    } catch (error) {
      setError("Invalid email or password")
      setLoading(false)
    }
  }

  return (
    <div>
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-medium text-gray-800 mb-6 text-center">Login to Your Account</h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="fas fa-exclamation-circle text-red-500"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="text-accent hover:text-primary">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-primary transition duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-accent hover:text-primary">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default LoginPage

