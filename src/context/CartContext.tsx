"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  discountPrice?: number | null
  quantity: number
  image?: string
  discountPercentage?: number
  [key: string]: any
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: any, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartCount: () => 0,
})

export const useCart = () => useContext(CartContext)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: any, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id)

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += quantity
        return updatedCart
      } else {
        return [...prevCart, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return

    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discountPrice || item.price
      return total + price * item.quantity
    }, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

