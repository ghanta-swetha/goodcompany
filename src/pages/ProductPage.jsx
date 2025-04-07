"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { useCart } from "../context/CartContext"
import { fetchProductById, fetchRelatedProducts } from "../api/productApi"

const ProductPage = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const productData = await fetchProductById(id)
        setProduct(productData)

        if (productData) {
          const related = await fetchRelatedProducts(productData.category)
          setRelatedProducts(related.filter((p) => p.id !== productData.id).slice(0, 4))
        }
      } catch (error) {
        console.error("Error loading product data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
    // Reset state when product ID changes
    setQuantity(1)
    setActiveTab("description")
    setActiveImage(0)
  }, [id])

  const handleAddToCart = () => {
    if (product && !product.isOutOfStock) {
      addToCart(product, quantity)
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
          <Link
            to="/shop"
            className="bg-accent text-white px-6 py-3 rounded-md hover:bg-primary transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-accent">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-accent">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 border rounded-lg overflow-hidden">
              <img
                src={product.images?.[activeImage] || product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`border rounded-md overflow-hidden flex-shrink-0 ${
                      activeImage === index ? "border-accent" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-2">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center mb-4">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl font-medium text-accent">₹{product.discountPrice}</span>
                  <span className="text-gray-500 line-through ml-2">₹{product.price}</span>
                  <span className="ml-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                    Save {product.discountPercentage}%
                  </span>
                </>
              ) : (
                <span className="text-2xl font-medium text-accent">₹{product.price}</span>
              )}
            </div>

            {/* Availability */}
            <p className="text-gray-600 mb-4">
              Availability:
              <span className={product.isOutOfStock ? "text-red-500 ml-1" : "text-green-500 ml-1"}>
                {product.isOutOfStock ? "Out of Stock" : "In Stock"}
              </span>
            </p>

            {/* Short Description */}
            <div className="text-gray-600 mb-6">
              <p>{product.shortDescription}</p>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="border border-gray-300 px-3 py-1 rounded-l-md"
                  disabled={product.isOutOfStock}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="border-t border-b border-gray-300 px-3 py-1 w-16 text-center"
                  min="1"
                  disabled={product.isOutOfStock}
                />
                <button
                  onClick={incrementQuantity}
                  className="border border-gray-300 px-3 py-1 rounded-r-md"
                  disabled={product.isOutOfStock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.isOutOfStock}
                className={`px-6 py-3 rounded-md ${
                  product.isOutOfStock ? "bg-gray-300 cursor-not-allowed" : "bg-accent hover:bg-primary text-white"
                } transition duration-300`}
              >
                {product.isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
              <button className="border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 transition duration-300">
                <i className="far fa-heart"></i>
              </button>
            </div>

            {/* Categories */}
            <div className="text-gray-600">
              <p>
                <span className="font-medium">Category:</span>
                <Link to={`/shop?category=${product.categorySlug}`} className="ml-1 hover:text-accent">
                  {product.category}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-3 font-medium ${
                  activeTab === "description"
                    ? "text-accent border-b-2 border-accent"
                    : "text-gray-600 hover:text-accent"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("additional")}
                className={`py-3 font-medium ${
                  activeTab === "additional"
                    ? "text-accent border-b-2 border-accent"
                    : "text-gray-600 hover:text-accent"
                }`}
              >
                Additional Information
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-3 font-medium ${
                  activeTab === "reviews" ? "text-accent border-b-2 border-accent" : "text-gray-600 hover:text-accent"
                }`}
              >
                Reviews
              </button>
            </div>
          </div>

          <div className="py-6">
            {activeTab === "description" && (
              <div className="prose max-w-none text-gray-600">
                <p>{product.description}</p>
              </div>
            )}

            {activeTab === "additional" && (
              <div className="text-gray-600">
                <table className="w-full border-collapse">
                  <tbody>
                    {product.additionalInfo &&
                      Object.entries(product.additionalInfo).map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-200">
                          <th className="py-3 text-left font-medium w-1/4">{key}</th>
                          <td className="py-3">{value}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-gray-600">
                <p>There are no reviews yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-light text-gray-800 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default ProductPage

