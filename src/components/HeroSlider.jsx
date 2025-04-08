"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/src/assets/first -image.png",
      title: "Natural Products for Your Wellbeing",
      description: "Discover our range of organic and natural products",
      buttonText: "Shop Now",
      buttonLink: "/shop",
    },
    {
      image: "/src/assets/first -image.png",
      title: "Pure & Organic Ingredients",
      description: "Carefully sourced ingredients for your health",
      buttonText: "Explore",
      buttonLink: "/shop",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className="relative overflow-hidden h-[400px] md:h-[500px]">
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">{slide.title}</h2>
                <p className="text-lg md:text-xl text-white mb-6">{slide.description}</p>
                <Link
                  to={slide.buttonLink}
                  className="inline-block bg-accent hover:bg-primary text-white px-6 py-3 rounded-md transition duration-300"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-gray-800"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-gray-800"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-accent" : "bg-white bg-opacity-50"}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSlider

