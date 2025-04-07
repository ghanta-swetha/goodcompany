"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { fetchProducts, fetchCategories } from "../api/productApi"

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([fetchProducts(filters), fetchCategories()])

        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error loading shop data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [filters])

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))

    if (name === "category") {
      setSearchParams({ category: value })
    }
  }

  const handlePriceFilter = (e) => {
    e.preventDefault()
    // The price filter is already applied through the filters state
  }

  return (
    <div>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-800">Shop</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 border rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Filters</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="text-gray-700 font-medium mb-2">Categories</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="all-categories"
                      name="category"
                      value=""
                      checked={filters.category === ""}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <label htmlFor="all-categories" className="text-gray-600">
                      All Categories
                    </label>
                  </div>

                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        value={category.slug}
                        checked={filters.category === category.slug}
                        onChange={handleFilterChange}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category.id}`} className="text-gray-600">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="text-gray-700 font-medium mb-2">Price Range</h4>
                <form onSubmit={handlePriceFilter} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="minPrice" className="text-xs text-gray-500">
                        Min
                      </label>
                      <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="₹"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="maxPrice" className="text-xs text-gray-500">
                        Max
                      </label>
                      <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="₹"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-accent text-white py-2 rounded-md hover:bg-primary transition duration-300"
                  >
                    Apply
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">Showing {products.length} products</p>
              <div className="flex items-center">
                <label htmlFor="sort" className="text-gray-600 mr-2">
                  Sort by:
                </label>
                <select
                  id="sort"
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                  products.map((product) => <ProductCard key={product.id} product={product} />)
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-600">No products found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ShopPage

