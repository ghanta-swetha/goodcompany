"use client"

import { useEffect, useState } from "react"
import AdminLayout from "./AdminLayout"
import { fetchCustomers } from "../api/adminApi"

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    try {
      setLoading(true)
      const data = await fetchCustomers()
      setCustomers(data)
    } catch (error) {
      console.error("Error loading customers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer)
    setIsModalOpen(true)
  }

  return (
    <AdminLayout title="Customers">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-800">Manage Customers</h2>
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
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              customer.avatar ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=random`
                            }
                            alt={customer.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">Since {customer.joinDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.orderCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{customer.totalSpent}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleViewDetails(customer)} className="text-accent hover:text-primary">
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

      {/* Customer Details Modal */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Customer Details</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 flex-shrink-0">
                  <img
                    className="h-16 w-16 rounded-full object-cover"
                    src={
                      selectedCustomer.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCustomer.name)}&background=random&size=64`
                    }
                    alt={selectedCustomer.name}
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-medium text-gray-900">{selectedCustomer.name}</h4>
                  <p className="text-sm text-gray-500">Customer since {selectedCustomer.joinDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Contact Information</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Email:</span> {selectedCustomer.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span> {selectedCustomer.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Shipping Address</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">{selectedCustomer.address}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Order History</h4>
                <div className="bg-gray-50 rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedCustomer.orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-accent">#{order.id}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Processing"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                            ₹{order.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminCustomers

