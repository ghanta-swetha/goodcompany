"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useCart } from "../context/CartContext"

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRemoveItem = (productId) => {
    removeFromCart(productId)
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault()

    // Simple coupon code validation
    if (couponCode.toUpperCase() === "DISCOUNT20") {
      const discount = getCartTotal() * 0.2
      setCouponDiscount(discount)
      setCouponApplied(true)
    } else {
      setCouponApplied(false)
      setCouponDiscount(0)
    }
  }

  const subtotal = getCartTotal()
  const shipping = cart.length > 0 ? 200 : 0
  const total = subtotal + shipping - couponDiscount

  return (
    <div>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-6xl text-gray-300 mb-4">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link
              to="/shop"
              className="inline-block bg-accent hover:bg-primary text-white px-6 py-3 rounded-md transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cart.map((item) => {
                      const price = item.discountPrice || item.price
                      const itemTotal = price * item.quantity

                      return (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0">
                                <img
                                  className="h-16 w-16 rounded-md object-cover"
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                {item.discountPrice && (
                                  <div className="text-xs text-gray-500">
                                    <span className="line-through">₹{item.price}</span>
                                    <span className="ml-1 text-accent">Save {item.discountPercentage}%</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                                className="mx-2 w-12 text-center border border-gray-300 rounded-md"
                              />
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">₹{price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                            ₹{itemTotal}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-6">
                <Link to="/shop" className="inline-flex items-center text-accent hover:text-primary">
                  <i className="fas fa-arrow-left mr-2"></i>
                  Continue Shopping
                </Link>
                <button
                  onClick={() => clearCart()}
                  className="inline-flex items-center text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash-alt mr-2"></i>
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800 font-medium">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-800 font-medium">₹{shipping}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{couponDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-medium">Total</span>
                      <span className="text-accent font-bold text-xl">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <form onSubmit={handleApplyCoupon}>
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                      Coupon Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-accent focus:border-accent"
                      />
                      <button
                        type="submit"
                        className="bg-accent text-white px-4 py-2 rounded-r-md hover:bg-primary transition duration-300"
                      >
                        Apply
                      </button>
                    </div>
                    {couponApplied && <p className="text-green-600 text-sm mt-1">Coupon applied successfully!</p>}
                  </form>
                </div>

                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="block w-full bg-accent text-white text-center py-3 rounded-md hover:bg-primary transition duration-300"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default CartPage

