"use client"

import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true)
      setLoading(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 1000)
  }

  return (
    <div>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Have questions about our products or services? We're here to help! Fill out the form and we'll get back
                to you as soon as possible.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary bg-opacity-20 text-accent">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-800">Our Location</h3>
                    <p className="text-gray-600">123 Main Street, Mumbai, Maharashtra 400001, India</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary bg-opacity-20 text-accent">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-800">Phone Number</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary bg-opacity-20 text-accent">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-800">Email Address</h3>
                    <p className="text-gray-600">info@thegoodcompany.co.in</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary bg-opacity-20 text-accent">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-800">Working Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Follow Us</h2>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-primary bg-opacity-20 text-accent hover:bg-accent hover:text-white transition duration-300"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-primary bg-opacity-20 text-accent hover:bg-accent hover:text-white transition duration-300"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-primary bg-opacity-20 text-accent hover:bg-accent hover:text-white transition duration-300"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-primary bg-opacity-20 text-accent hover:bg-accent hover:text-white transition duration-300"
                >
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Send Us a Message</h2>

            {formSubmitted ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <i className="fas fa-check-circle text-green-500"></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Thank you for your message! We'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-primary transition duration-300 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Our Location</h2>
            <div className="h-96 bg-gray-200 rounded-md">
              {/* Replace with actual map */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <p>Google Map would be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage

