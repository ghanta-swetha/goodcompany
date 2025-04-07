"use client"

import { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import HeroSlider from "../components/HeroSlider"
import ServiceFeatures from "../components/ServiceFeatures"
import CategorySection from "../components/CategorySection"
import ProductCard from "../components/ProductCard"
import { fetchFeaturedProducts, fetchCategories } from "../api/productApi"

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([fetchFeaturedProducts(), fetchCategories()])

        setFeaturedProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error loading homepage data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div>
      <Header />

      <main>
        {/* Hero Slider */}
        <HeroSlider />

        {/* Service Features */}
        <ServiceFeatures />

        {/* Categories Section */}
        {!loading && <CategorySection title="Popular Categories" categories={categories} />}

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light text-gray-800 inline-block relative">
              Featured Products
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage

