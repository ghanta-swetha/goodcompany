import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const NotFoundPage = () => {
  return (
    <div>
      <Header />

      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-block bg-accent hover:bg-primary text-white px-6 py-3 rounded-md transition duration-300"
        >
          Back to Homepage
        </Link>
      </main>

      <Footer />
    </div>
  )
}

export default NotFoundPage

