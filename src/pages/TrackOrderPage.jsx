"use client"

import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState("")
  const [email, setEmail] = useState("")
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate API call to track order
    setTimeout(() => {
      if (orderId === "1042" && email === "rahul.s@example.com") {
        setOrderDetails({
          id: 1042,
          date: "2023-04-05",
          status: "Completed",
          statusSteps: [
            { name: "Order Placed", completed: true, date: "2023-04-05" },
            { name: "Processing", completed: true, date: "2023-04-05" },
            { name: "Shipped", completed: true, date: "2023-04-06" },
            { name: "Delivered", completed: true, date: "2023-04-08" },
          ],
          items: [
            { name: "Natural Face Cleanser", quantity: 2, price: 399 },
            { name: "Herbal Hair Oil", quantity: 1, price: 449 },
            { name: "Organic Body Scrub", quantity: 1, price: 419 },
            { name: "Natural Lip Balm", quantity: 1, price: 149 },
          ],
          total: 2499,
          shipping: 200,
          customer: "Rahul Sharma",
          shippingAddress: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001, India",
          trackingNumber: "TGC1042IN",
        })
      } else if (orderId === "1041" && email === "priya.p@example.com") {
        setOrderDetails({
          id: 1041,
          date: "2023-04-04",
          status: "Processing",
          statusSteps: [
            { name: "Order Placed", completed: true, date: "2023-04-04" },
            { name: "Processing", completed: true, date: "2023-04-05" },
            { name: "Shipped", completed: false, date: null },
            { name: "Delivered", completed: false, date: null },
          ],
          items: [
            { name: "Herbal Hair Oil", quantity: 1, price: 449 },
            { name: "Herbal Shampoo", quantity: 1, price: 449 },
            { name: "Natural Lip Balm", quantity: 1, price: 149 },
          ],
          total: 1299,
          shipping: 200,
          customer: "Priya Patel",
          shippingAddress: "456 Park Avenue, Bangalore, Karnataka 560001, India",
          trackingNumber: null,
        })
      } else {
        setError("No order found with the provided details. Please check and try again.")
        setOrderDetails(null)
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 text-center">Track Your Order</h1>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <p className="text-gray-600 mb-4 text-center">
              Enter your order ID and email address to track your order status.
            </p>

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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="order-id" className="block text-sm font-medium text-gray-700 mb-1">
                  Order ID
                </label>
                <input
                  id="order-id"
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  placeholder="Enter your order ID (e.g., 1042)"
                />
              </div>

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
                  placeholder="Enter your email address (e.g., rahul.s@example.com)"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-primary transition duration-300 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Tracking..." : "Track Order"}
                </button>
              </div>
            </form>
          </div>

          {orderDetails && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-medium text-gray-800 mb-2">Order #{orderDetails.id}</h2>
                <p className="text-sm text-gray-600">
                  Placed on {orderDetails.date} | Status:
                  <span
                    className={`ml-1 font-medium ${
                      orderDetails.status === "Completed"
                        ? "text-green-600"
                        : orderDetails.status === "Processing"
                          ? "text-blue-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {orderDetails.status}
                  </span>
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Order Status</h3>
                <div className="relative">
                  <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
                  <ul className="space-y-6">
                    {orderDetails.statusSteps.map((step, index) => (
                      <li key={index} className="relative pl-10">
                        <div
                          className={`absolute left-0 top-1 h-10 w-10 rounded-full flex items-center justify-center ${
                            step.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {step.completed ? <i className="fas fa-check"></i> : <i className="fas fa-clock"></i>}
                        </div>
                        <div>
                          <h4 className={`text-base font-medium ${step.completed ? "text-gray-800" : "text-gray-500"}`}>
                            {step.name}
                          </h4>
                          <p className="text-sm text-gray-500">{step.date || "Pending"}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {orderDetails.trackingNumber && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Tracking Information</h3>
                  <p className="text-gray-600">
                    Tracking Number: <span className="font-medium">{orderDetails.trackingNumber}</span>
                  </p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Order Details</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orderDetails.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{item.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                            ₹{item.price}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 text-right">
                            ₹{item.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-800 text-right">
                          Subtotal
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 text-right">
                          ₹{orderDetails.total - orderDetails.shipping}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-800 text-right">
                          Shipping
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 text-right">
                          ₹{orderDetails.shipping}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-800 text-right">
                          Total
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 text-right">
                          ₹{orderDetails.total}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Shipping Address</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-600">{orderDetails.customer}</p>
                    <p className="text-gray-600">{orderDetails.shippingAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default TrackOrderPage

