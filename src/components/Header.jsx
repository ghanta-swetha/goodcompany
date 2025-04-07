import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import logo from "../assets/logo.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [animationStage, setAnimationStage] = useState(0)
  const { cart } = useCart()
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Animation sequence
  useEffect(() => {
    if (isLoading) {
      // Stage 1: Initial loading with logo in center (1s)
      setTimeout(() => {
        setAnimationStage(1)
      }, 1000)

      // Stage 2: Start spinning (2s)
      setTimeout(() => {
        setAnimationStage(2)
      }, 3000)

      // Stage 3: Move to header position (0.5s)
      setTimeout(() => {
        setAnimationStage(3)
      }, 1500)

      // Stage 4: Complete animation and show full header
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }
  }, [isLoading])

  // If still in loading animation, show only the logo animation
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div
          className={`transition-all duration-500 ease-in-out ${
            animationStage === 0 ? "scale-100 opacity-100" : 
            animationStage === 1 ? "scale-100 opacity-100" : 
            animationStage === 2 ? "scale-100 opacity-100" : 
            "scale-75 opacity-100 -translate-y-40"
          }`}
        >
          <img 
            src={logo || "/placeholder.svg"} 
            alt="The Good Company" 
            className={`h-24 w-24 mx-auto ${animationStage === 1 || animationStage === 2 ? "animate-spin" : ""}`} 
          />
          <h1 className={`text-2xl font-light text-gray-500 text-center mt-2 transition-opacity ${
            animationStage < 2 ? "opacity-0" : "opacity-100"
          }`}>
            THE GOOD COMPANY
          </h1>
        </div>
      </div>
    )
  }

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <i className="fas fa-truck-fast mr-2"></i>
            <Link to="/track-order" className="text-sm hover:underline">
              Track Order
            </Link>
          </div>
          <div>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout()
                  navigate("/")
                }}
                className="text-sm hover:underline"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-sm hover:underline">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo || "/placeholder.svg"} alt="The Good Company" className="h-16 w-16 mr-3" />
          <h1 className="text-2xl font-light text-gray-500">THE GOOD COMPANY</h1>
        </Link>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Link to="/wishlist" className="relative">
            <i className="far fa-heart text-xl text-gray-500"></i>
            <span className="text-xs text-gray-500 block text-center mt-1">Wishlist</span>
          </Link>
          <Link to="/cart" className="relative">
            <i className="fas fa-shopping-cart text-xl text-gray-500"></i>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
            <span className="text-xs text-gray-500 block text-center mt-1">Cart</span>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Categories Button */}
            <button
              className="bg-primary text-white px-4 py-3 flex items-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className="fas fa-bars mr-2"></i>
              Categories
            </button>

            {/* Main Menu */}
            <ul className="hidden md:flex space-x-8">
              <li>
                <Link to="/" className="py-3 inline-block text-gray-600 hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="py-3 inline-block text-gray-600 hover:text-accent">
                  Shop
                </Link>
              </li>
              <li className="relative group">
                <Link to="#" className="py-3 inline-block text-gray-600 hover:text-accent">
                  Pages <i className="fas fa-chevron-down text-xs ml-1"></i>
                </Link>
                <ul className="absolute hidden group-hover:block bg-white shadow-md w-48 z-10">
                  <li>
                    <Link to="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/contact" className="py-3 inline-block text-gray-600 hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <ul className="py-2">
              <li>
                <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header