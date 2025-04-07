import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ShopPage from "./pages/ShopPage"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import ContactPage from "./pages/ContactPage "
import LoginPage from "./pages/LoginPage"
import TrackOrderPage from "./pages/TrackOrderPage"
import AdminDashboard from "./admin/AdminDashboard"
import AdminProducts from "./admin/AdminProducts"
import AdminOrders from "./admin/AdminOrders"
import AdminCustomers from "./admin/AdminCustomers"
import AdminLogin from "./admin/AdminLogin"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Website Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute>
              <AdminCustomers />
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App

