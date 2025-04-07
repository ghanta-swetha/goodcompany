// This file contains dummy API functions for product-related operations

// Simulated delay to mimic API call
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Sample data
const categories = [
  {
    id: 1,
    name: "Good For Skin",
    slug: "skin-care",
    image: "/src/assets/productimage1.png",
  },
  {
    id: 2,
    name: "Good For Hair",
    slug: "hair-care",
    image: "/src/assets/productimage2.png",
  },
  {
    id: 3,
    name: "Body Care",
    slug: "body-care",
    image: "/src/assets/productimage3.png",
  },
 
]

const products = [
  {
    id: 1,
    name: "Natural Face Cleanser",
    price: 499,
    discountPrice: 399,
    discountPercentage: 20,
    image: "https://via.placeholder.com/400x400/f8f5f0/333333?text=Face+Cleanser",
    images: [
      "https://via.placeholder.com/400x400/f8f5f0/333333?text=Face+Cleanser",
      "https://via.placeholder.com/400x400/f8f5f0/333333?text=Face+Cleanser+2",
      "https://via.placeholder.com/400x400/f8f5f0/333333?text=Face+Cleanser+3",
    ],
    category: "Good For Skin",
    categorySlug: "skin-care",
    isOutOfStock: false,
    shortDescription: "A gentle, natural face cleanser that removes impurities without stripping the skin.",
    description:
      "Our Natural Face Cleanser is formulated with organic ingredients to gently cleanse your skin without harsh chemicals. It effectively removes dirt, oil, and makeup while maintaining your skin's natural moisture balance. Suitable for all skin types, this cleanser leaves your skin feeling fresh, clean, and revitalized.",
    additionalInfo: {
      Weight: "100g",
      Ingredients: "Aqua, Aloe Vera, Glycerin, Coconut Oil, Essential Oils",
      Directions: "Apply to damp skin, massage gently, and rinse thoroughly with water.",
      "Shelf Life": "12 months",
    },
    featured: true,
  },
  {
    id: 2,
    name: "Herbal Hair Oil",
    price: 599,
    discountPrice: 449,
    discountPercentage: 25,
    image: "https://via.placeholder.com/400x400/f8f5f0/333333?text=Hair+Oil",
    images: [
      "https://via.placeholder.com/400x400/f8f5f0/333333?text=Hair+Oil",
      "https://via.placeholder.com/400x400/f8f5f0/333333?text=Hair+Oil+2",
      "https://via.placeholder.com/400x400/f8f5f0/333333?text=Hair+Oil+3",
    ],
    category: "Good For Hair",
    categorySlug: "hair-care",
    isOutOfStock: false,
    shortDescription: "A nourishing blend of herbs and oils to strengthen and revitalize your hair.",
    description:
      "Our Herbal Hair Oil is a powerful blend of traditional herbs and natural oils that nourish your hair from root to tip. Regular use helps reduce hair fall, promotes growth, and adds natural shine. The unique formula penetrates deep into the scalp to strengthen hair follicles and improve overall hair health.",
    additionalInfo: {
      Weight: "200ml",
      Ingredients: "Coconut Oil, Sesame Oil, Amla Extract, Bhringraj, Brahmi",
      Directions: "Massage into scalp and hair, leave for at least 30 minutes before washing.",
      "Shelf Life": "18 months",
    },
    featured: true,
  },
  {
    id: 3,
    name: "Organic Body Scrub",
    price: 699,
    discountPrice: 419,
    discountPercentage: 40,
    image: "https://via.placeholder.com/400x400/f8f5f0/333333?text=Body+Scrub",
    images: [
      "https://via.placeholder.com/400x400/f8f5f0/333333?text=Body+Scrub",
      "https://via.placeholder.com/400x400/f8f5f0/333333?text=Body+Scrub+2",
    ],
    category: "Body Care",
    categorySlug: "body-care",
    isOutOfStock: false,
    shortDescription: "An exfoliating scrub made with natural ingredients to reveal smooth, glowing skin.",
    description:
      "Our Organic Body Scrub gently exfoliates dead skin cells to reveal smoother, more radiant skin. Made with natural exfoliants like coffee grounds and sugar, combined with nourishing oils, this scrub buffs away roughness while moisturizing your skin. Regular use helps improve skin texture, reduce the appearance of blemishes, and promote a healthy glow.",
    additionalInfo: {
      Weight: "250g",
      Ingredients: "Organic Sugar, Coffee Grounds, Coconut Oil, Shea Butter, Essential Oils",
      Directions: "Apply to damp skin in circular motions, then rinse thoroughly.",
      "Shelf Life": "12 months",
    },
    featured: true,
  },
  {
    id: 4,
    name: "Ayurvedic Wellness Tea",
    price: 349,
    discountPrice: null,
    discountPercentage: 0,
    image: "https://via.placeholder.com/400x400/f8f5f0/333333?text=Wellness+Tea",
    images: [
      "https://via.placeholder.com/400x400/f8f5f0/333333?text=Wellness+Tea",
      "https://via.placeholder.com/400x400/f8f5f0/333333?text=Wellness+Tea+2",
    ],
    category: "Wellness",
    categorySlug: "wellness",
    isOutOfStock: true,
    shortDescription: "A blend of traditional herbs to promote overall wellness and immunity.",
    description:
      "Our Ayurvedic Wellness Tea is a carefully crafted blend of traditional herbs known for their health benefits. This soothing tea helps boost immunity, improve digestion, and promote overall wellbeing. Enjoy a cup daily as part of your wellness routine to experience the ancient wisdom of Ayurveda in every sip.",
    additionalInfo: {
      Weight: "100g",
      Ingredients: "Tulsi, Ginger, Cinnamon, Cardamom, Cloves",
      Directions: "Steep one teaspoon in hot water for 3-5 minutes.",
      "Shelf Life": "24 months",
    },
    featured: false,
  },
  {
    id: 5,
    name: "Natural Lip Balm",
    price: 199,
    discountPrice: 149,
    discountPercentage: 25,
    image: "https://via.placeholder.com/400x400/f8f5f0/333333?text=Lip+Balm",
    images: ["https://via.placeholder.com/400x400/f8f5f0/333333?text=Lip+Balm"],
    category: "Good For Skin",
    categorySlug: "skin-care",
    isOutOfStock: false,
    shortDescription: "A moisturizing lip balm made with natural butters and oils.",
    description:
      "Our Natural Lip Balm is formulated with nourishing butters and oils to keep your lips soft, smooth, and hydrated. This non-sticky formula provides long-lasting moisture and protection against dryness. Free from petroleum, artificial colors, and fragrances, it's gentle enough for daily use and all skin types.",
    additionalInfo: {
      Weight: "5g",
      Ingredients: "Shea Butter, Cocoa Butter, Beeswax, Vitamin E, Essential Oils",
      Directions: "Apply to lips as needed throughout the day.",
      "Shelf Life": "12 months",
    },
    featured: true,
  },
  {
    id: 6,
    name: "Herbal Shampoo",
    price: 449,
    discountPrice: null,
    discountPercentage: 0,
    image: "https://via.placeholder.com/400x400/f8f5f0/333333?text=Herbal+Shampoo",
    images: ["https://via.placeholder.com/400x400/f8f5f0/333333?text=Herbal+Shampoo"],
    category: "Good For Hair",
    categorySlug: "hair-care",
    isOutOfStock: false,
    shortDescription: "A gentle shampoo formulated with natural herbs for healthy hair.",
    description:
      "Our Herbal Shampoo is crafted with a blend of natural herbs and plant extracts to cleanse your hair and scalp without harsh chemicals. It effectively removes dirt and excess oil while preserving your hair's natural moisture. Regular use helps strengthen hair, reduce breakage, and add natural shine.",
    additionalInfo: {
      Weight: "200ml",
      Ingredients: "Aqua, Aloe Vera, Shikakai, Reetha, Amla, Essential Oils",
      Directions: "Apply to wet hair, massage gently, and rinse thoroughly.",
      "Shelf Life": "18 months",
    },
    featured: false,
  },
]

// API functions
export const fetchCategories = async () => {
  await delay(500)
  return [...categories]
}

export const fetchProducts = async (filters = {}) => {
  await delay(800)

  let filteredProducts = [...products]

  // Apply category filter
  if (filters.category) {
    filteredProducts = filteredProducts.filter((product) => product.categorySlug === filters.category)
  }

  // Apply price filter
  if (filters.minPrice) {
    filteredProducts = filteredProducts.filter((product) => {
      const price = product.discountPrice || product.price
      return price >= Number(filters.minPrice)
    })
  }

  if (filters.maxPrice) {
    filteredProducts = filteredProducts.filter((product) => {
      const price = product.discountPrice || product.price
      return price <= Number(filters.maxPrice)
    })
  }

  // Apply sorting
  if (filters.sort) {
    switch (filters.sort) {
      case "price-low-high":
        filteredProducts.sort((a, b) => {
          const priceA = a.discountPrice || a.price
          const priceB = b.discountPrice || b.price
          return priceA - priceB
        })
        break
      case "price-high-low":
        filteredProducts.sort((a, b) => {
          const priceA = a.discountPrice || a.price
          const priceB = b.discountPrice || b.price
          return priceB - priceA
        })
        break
      case "newest":
      default:
        // Assuming id represents the order of addition (higher id = newer)
        filteredProducts.sort((a, b) => b.id - a.id)
        break
    }
  }

  return filteredProducts
}

export const fetchFeaturedProducts = async () => {
  await delay(600)
  return products.filter((product) => product.featured)
}

export const fetchProductById = async (id) => {
  await delay(500)
  const product = products.find((p) => p.id === Number(id))
  return product || null
}

export const fetchRelatedProducts = async (category) => {
  await delay(600)
  return products.filter((product) => product.category === category)
}

