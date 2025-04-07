"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const AdminLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "fa-tachometer-alt" },
    { name: "Products", path: "/admin/products", icon: "fa-box" },
    { name: "Orders", path: "/admin/orders", icon: "fa-shopping-cart" },
    { name: "Customers", path: "/admin/customers", icon: "fa-users" },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-medium text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-5 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                location.pathname === item.path
                  ? "bg-accent text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-accent"
              }`}
            >
              <i
                className={`fas ${item.icon} mr-3 ${
                  location.pathname === item.path ? "text-white" : "text-gray-400 group-hover:text-accent"
                }`}
              ></i>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top Navigation */}
        <div className="sticky top-0 z-10 bg-white md:flex-shrink-0 border-b">
          <div className="flex justify-between items-center h-16 px-4 md:px-8">
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className={`fas ${sidebarOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
            </button>

            <h1 className="text-lg font-medium text-gray-800 md:hidden">{title}</h1>
            <h1 className="text-lg font-medium text-gray-800 hidden md:block">{title}</h1>

            {/* User dropdown */}
            <div className="relative">
              <button onClick={handleLogout} className="flex items-center text-sm text-gray-600 hover:text-accent">
                <i className="fas fa-sign-out-alt mr-1"></i>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout

