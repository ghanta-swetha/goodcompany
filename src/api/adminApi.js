// This file contains dummy API functions for admin-related operations

// Simulated delay to mimic API call
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Sample data for dashboard
const dashboardStats = {
  totalSales: 125750,
  totalOrders: 42,
  totalProducts: 24,
  totalCustomers: 38,
  recentOrders: [
    { id: 1042, customer: "Rahul Sharma", date: "2023-04-05", amount: 2499, status: "Completed" },
    { id: 1041, customer: "Priya Patel", date: "2023-04-04", amount: 1299, status: "Processing" },
    { id: 1040, customer: "Amit Kumar", date: "2023-04-03", amount: 3699, status: "Pending" },
    { id: 1039, customer: "Neha Singh", date: "2023-04-02", amount: 899, status: "Completed" },
    { id: 1038, customer: "Vikram Joshi", date: "2023-04-01", amount: 1499, status: "Cancelled" },
  ],
  topProducts: [
    {
      id: 1,
      name: "Natural Face Cleanser",
      category: "Skin Care",
      price: 399,
      sold: 28,
      revenue: 11172,
      image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=FC",
    },
    {
      id: 2,
      name: "Herbal Hair Oil",
      category: "Hair Care",
      price: 449,
      sold: 24,
      revenue: 10776,
      image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=HO",
    },
    {
      id: 3,
      name: "Organic Body Scrub",
      category: "Body Care",
      price: 419,
      sold: 19,
      revenue: 7961,
      image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=BS",
    },
    {
      id: 5,
      name: "Natural Lip Balm",
      category: "Skin Care",
      price: 149,
      sold: 18,
      revenue: 2682,
      image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=LB",
    },
  ],
}

// Sample orders data
const orders = [
  {
    id: 1042,
    customer: "Rahul Sharma",
    email: "rahul.s@example.com",
    phone: "+91 98765 43210",
    date: "2023-04-05",
    status: "Completed",
    total: 2499,
    subtotal: 2299,
    shipping: 200,
    paymentMethod: "Credit Card",
    shippingAddress: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001, India",
    items: [
      {
        name: "Natural Face Cleanser",
        price: 399,
        quantity: 2,
        total: 798,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=FC",
      },
      {
        name: "Herbal Hair Oil",
        price: 449,
        quantity: 1,
        total: 449,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=HO",
      },
      {
        name: "Organic Body Scrub",
        price: 419,
        quantity: 1,
        total: 419,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=BS",
      },
      {
        name: "Natural Lip Balm",
        price: 149,
        quantity: 1,
        total: 149,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=LB",
      },
    ],
  },
  {
    id: 1041,
    customer: "Priya Patel",
    email: "priya.p@example.com",
    phone: "+91 87654 32109",
    date: "2023-04-04",
    status: "Processing",
    total: 1299,
    subtotal: 1099,
    shipping: 200,
    paymentMethod: "UPI",
    shippingAddress: "456 Park Avenue, Bangalore, Karnataka 560001, India",
    items: [
      {
        name: "Herbal Hair Oil",
        price: 449,
        quantity: 1,
        total: 449,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=HO",
      },
      {
        name: "Herbal Shampoo",
        price: 449,
        quantity: 1,
        total: 449,
        image:
          "https://via.placeholder.com/50x50/f8f5f0/333333  price: 449, quantity: 1, total: 449, image: 'https://via.placeholder.com/50x50/f8f5f0/333333?text=HS",
      },
      {
        name: "Natural Lip Balm",
        price: 149,
        quantity: 1,
        total: 149,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=LB",
      },
    ],
  },
  {
    id: 1040,
    customer: "Amit Kumar",
    email: "amit.k@example.com",
    phone: "+91 76543 21098",
    date: "2023-04-03",
    status: "Pending",
    total: 3699,
    subtotal: 3499,
    shipping: 200,
    paymentMethod: "Cash on Delivery",
    shippingAddress: "789 Green Road, Delhi, 110001, India",
    items: [
      {
        name: "Natural Face Cleanser",
        price: 399,
        quantity: 3,
        total: 1197,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=FC",
      },
      {
        name: "Herbal Hair Oil",
        price: 449,
        quantity: 2,
        total: 898,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=HO",
      },
      {
        name: "Organic Body Scrub",
        price: 419,
        quantity: 2,
        total: 838,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=BS",
      },
      {
        name: "Ayurvedic Wellness Tea",
        price: 349,
        quantity: 1,
        total: 349,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=WT",
      },
    ],
  },
  {
    id: 1039,
    customer: "Neha Singh",
    email: "neha.s@example.com",
    phone: "+91 65432 10987",
    date: "2023-04-02",
    status: "Completed",
    total: 899,
    subtotal: 699,
    shipping: 200,
    paymentMethod: "Debit Card",
    shippingAddress: "321 Lake View, Chennai, Tamil Nadu 600001, India",
    items: [
      {
        name: "Natural Face Cleanser",
        price: 399,
        quantity: 1,
        total: 399,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=FC",
      },
      {
        name: "Natural Lip Balm",
        price: 149,
        quantity: 2,
        total: 298,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=LB",
      },
    ],
  },
  {
    id: 1038,
    customer: "Vikram Joshi",
    email: "vikram.j@example.com",
    phone: "+91 54321 09876",
    date: "2023-04-01",
    status: "Cancelled",
    total: 1499,
    subtotal: 1299,
    shipping: 200,
    paymentMethod: "Credit Card",
    shippingAddress: "567 Hill Road, Hyderabad, Telangana 500001, India",
    items: [
      {
        name: "Herbal Hair Oil",
        price: 449,
        quantity: 1,
        total: 449,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=HO",
      },
      {
        name: "Herbal Shampoo",
        price: 449,
        quantity: 1,
        total: 449,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=HS",
      },
      {
        name: "Organic Body Scrub",
        price: 419,
        quantity: 1,
        total: 419,
        image: "https://via.placeholder.com/50x50/f8f5f0/333333?text=BS",
      },
    ],
  },
]

// Sample customers data
const customers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.s@example.com",
    phone: "+91 98765 43210",
    joinDate: "Jan 15, 2023",
    orderCount: 5,
    totalSpent: 12450,
    address: "123 Main Street, Apartment 4B, Mumbai, Maharashtra 400001, India",
    orders: [
      { id: 1042, date: "2023-04-05", status: "Completed", total: 2499 },
      { id: 1035, date: "2023-03-22", status: "Completed", total: 3199 },
      { id: 1028, date: "2023-03-10", status: "Completed", total: 1899 },
      { id: 1020, date: "2023-02-25", status: "Completed", total: 2599 },
      { id: 1012, date: "2023-02-08", status: "Completed", total: 2254 },
    ],
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.p@example.com",
    phone: "+91 87654 32109",
    joinDate: "Feb 3, 2023",
    orderCount: 3,
    totalSpent: 4299,
    address: "456 Park Avenue, Bangalore, Karnataka 560001, India",
    orders: [
      { id: 1041, date: "2023-04-04", status: "Processing", total: 1299 },
      { id: 1030, date: "2023-03-15", status: "Completed", total: 1499 },
      { id: 1022, date: "2023-02-28", status: "Completed", total: 1501 },
    ],
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.k@example.com",
    phone: "+91 76543 21098",
    joinDate: "Jan 22, 2023",
    orderCount: 4,
    totalSpent: 9899,
    address: "789 Green Road, Delhi, 110001, India",
    orders: [
      { id: 1040, date: "2023-04-03", status: "Pending", total: 3699 },
      { id: 1032, date: "2023-03-18", status: "Completed", total: 2199 },
      { id: 1025, date: "2023-03-05", status: "Completed", total: 1899 },
      { id: 1018, date: "2023-02-20", status: "Completed", total: 2102 },
    ],
  },
  {
    id: 4,
    name: "Neha Singh",
    email: "neha.s@example.com",
    phone: "+91 65432 10987",
    joinDate: "Feb 10, 2023",
    orderCount: 2,
    totalSpent: 2399,
    address: "321 Lake View, Chennai, Tamil Nadu 600001, India",
    orders: [
      { id: 1039, date: "2023-04-02", status: "Completed", total: 899 },
      { id: 1027, date: "2023-03-08", status: "Completed", total: 1500 },
    ],
  },
  {
    id: 5,
    name: "Vikram Joshi",
    email: "vikram.j@example.com",
    phone: "+91 54321 09876",
    joinDate: "Jan 5, 2023",
    orderCount: 3,
    totalSpent: 4799,
    address: "567 Hill Road, Hyderabad, Telangana 500001, India",
    orders: [
      { id: 1038, date: "2023-04-01", status: "Cancelled", total: 1499 },
      { id: 1029, date: "2023-03-12", status: "Completed", total: 1899 },
      { id: 1015, date: "2023-02-15", status: "Completed", total: 1401 },
    ],
  },
]

// API functions
export const fetchDashboardStats = async () => {
  await delay(800)
  return { ...dashboardStats }
}

export const fetchOrders = async () => {
  await delay(800)
  return [...orders]
}

export const updateOrderStatus = async (orderId, status) => {
  await delay(500)
  // In a real app, this would update the database
  return { success: true, orderId, status }
}

export const fetchCustomers = async () => {
  await delay(800)
  return [...customers]
}

export const fetchProducts = async () => {
  await delay(800)
  // This would typically fetch from the database
  // For this example, we'll reuse the product data from productApi.js
  const products = (await import("./productApi")).products
  return [...products]
}

export const deleteProduct = async (id) => {
  await delay(500)
  // In a real app, this would delete from the database
  return { success: true, id }
}

export const updateProduct = async (id, productData) => {
  await delay(600)
  // In a real app, this would update the database
  return { id, ...productData, image: "https://via.placeholder.com/400x400/f8f5f0/333333?text=Updated+Product" }
}

export const createProduct = async (productData) => {
  await delay(600)
  // In a real app, this would create in the database and return the new product with an ID
  const newId = Math.floor(Math.random() * 1000) + 10 // Generate a random ID
  return {
    id: newId,
    ...productData,
    image: "https://via.placeholder.com/400x400/f8f5f0/333333?text=New+Product",
    categorySlug: productData.category.toLowerCase().replace(/\s+/g, "-"),
  }
}

export const adminLogin = async (email, password) => {
  await delay(1000)
  // In a real app, this would verify credentials against the database
  if (email === "admin@example.com" && password === "password") {
    return {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
    }
  }
  throw new Error("Invalid credentials")
}

