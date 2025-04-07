"use client"

import { useEffect, useState } from "react"
import AdminLayout from "./AdminLayout"
import { fetchProducts, deleteProduct, updateProduct, createProduct } from "../api/adminApi"

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    category: "",
    description: "",
    shortDescription: "",
    isOutOfStock: false,
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await fetchProducts()
      setProducts(data)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id)
        setProducts(products.filter((product) => product.id !== id))
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  const handleEdit = (product) => {
    setCurrentProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice || "",
      category: product.category,
      description: product.description,
      shortDescription: product.shortDescription,
      isOutOfStock: product.isOutOfStock,
    })
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setCurrentProduct(null)
    setFormData({
      name: "",
      price: "",
      discountPrice: "",
      category: "",
      description: "",
      shortDescription: "",
      isOutOfStock: false,
    })
    setIsModalOpen(true)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (currentProduct) {
        // Update existing product
        const updatedProduct = await updateProduct(currentProduct.id, formData)
        setProducts(products.map((p) => (p.id === currentProduct.id ? updatedProduct : p)))
      } else {
        // Create new product
        const newProduct = await createProduct(formData)
        setProducts([...products, newProduct])
      }
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error saving product:", error)
    }
  }

  return (
    <AdminLayout title="Products">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-medium text-gray-800">Manage Products</h2>
        <button
          onClick={handleAdd}
          className="bg-accent hover:bg-primary text-white px-4 py-2 rounded-md transition duration-300"
        >
          <i className="fas fa-plus mr-2"></i>
          Add Product
        </button>
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
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
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
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.discountPrice ? (
                        <div>
                          <div className="text-sm font-medium text-gray-900">₹{product.discountPrice}</div>
                          <div className="text-sm text-gray-500 line-through">₹{product.price}</div>
                        </div>
                      ) : (
                        <div className="text-sm font-medium text-gray-900">₹{product.price}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.isOutOfStock ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {product.isOutOfStock ? "Out of Stock" : "In Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(product)} className="text-accent hover:text-primary mr-3">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-800">
                {currentProduct ? "Edit Product" : "Add New Product"}
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price (optional)</label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      name="isOutOfStock"
                      checked={formData.isOutOfStock}
                      onChange={handleChange}
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">Out of Stock</label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md mr-2 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-accent text-white rounded-md hover:bg-primary">
                  {currentProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default AdminProducts

