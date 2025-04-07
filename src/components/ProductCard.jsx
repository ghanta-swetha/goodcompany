"use client"

import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const { id, name, price, discountPrice, image, category, discountPercentage, isOutOfStock } = product

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (!isOutOfStock) {
      addToCart(product)
    }
  }

  return (
    <div className="group relative">
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-2 px-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex justify-between">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`text-sm font-medium ${isOutOfStock ? "text-gray-400" : "text-accent hover:text-primary"}`}
              >
                <i className="fas fa-shopping-cart mr-1"></i> Add to Cart
              </button>
              <button className="text-sm font-medium text-gray-600 hover:text-accent">
                <i className="far fa-heart"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-xs text-gray-500 uppercase">{category}</p>
          <h3 className="text-gray-800 font-medium mt-1">{name}</h3>
          <div className="flex items-center mt-1">
            {discountPrice ? (
              <>
                <span className="text-accent font-medium">₹{discountPrice}</span>
                <span className="text-gray-500 line-through ml-2 text-sm">₹{price}</span>
              </>
            ) : (
              <span className="text-accent font-medium">₹{price}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard

