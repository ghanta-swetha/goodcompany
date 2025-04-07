"use client"

import { useEffect, useState } from "react"
import AdminLayout from "./AdminLayout"
import { fetchOrders, updateOrderStatus } from "../api/adminApi"

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await fetchOrders()
      setOrders(data)
    } catch (error) {
      console.error("Error loading orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status)
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status } : order)))

      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status })
      }
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout title="Orders">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-800">Manage Orders</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-accent">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleViewDetails(order)} className="text-accent hover:text-primary">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Order #{selectedOrder.id}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Order Information</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Date:</span> {selectedOrder.date}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedOrder.status)}`}
                      >
                        {selectedOrder.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Payment Method:</span> {selectedOrder.paymentMethod}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Customer Information</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Name:</span> {selectedOrder.customer}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Email:</span> {selectedOrder.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span> {selectedOrder.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Shipping Address</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-600">{selectedOrder.shippingAddress}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Order Items</h4>
                <div className="bg-gray-50 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-md object-cover"
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                            ₹{item.price}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                            ₹{item.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                          Subtotal
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          ₹{selectedOrder.subtotal}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                          Shipping
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          ₹{selectedOrder.shipping}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                          Total
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                          ₹{selectedOrder.total}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Update Status</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, "Pending")}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      selectedOrder.status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, "Processing")}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      selectedOrder.status === "Processing"
                        ? "bg-blue-500 text-white"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    }`}
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, "Completed")}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      selectedOrder.status === "Completed"
                        ? "bg-green-500 text-white"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, "Cancelled")}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      selectedOrder.status === "Cancelled"
                        ? "bg-red-500 text-white"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    Cancelled
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminOrders

