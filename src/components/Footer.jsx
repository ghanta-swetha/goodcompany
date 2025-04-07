import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className="bg-white pt-12 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo || "/placeholder.svg"} alt="The Good Company" className="h-12 w-12 mr-2" />
              <h3 className="text-lg font-medium text-gray-700">THE GOOD COMPANY</h3>
            </div>
            <p className="text-gray-600 mb-4">
              We provide natural and organic products that are good for you and the environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-accent">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-accent">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-accent">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-accent">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-accent">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-accent">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-accent">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-accent">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/track-order" className="text-gray-600 hover:text-accent">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-gray-600 hover:text-accent">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-600 hover:text-accent">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-accent">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter to get updates on our latest offers!</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-accent"
              />
              <button type="submit" className="bg-accent text-white px-4 py-2 hover:bg-primary transition duration-300">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-6">
          <p className="text-center text-gray-600">
            &copy; {new Date().getFullYear()} The Good Company. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

