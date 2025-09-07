'use client'
import Link from 'next/link'
import { FiShoppingBag, FiUsers, FiTruck, FiHeart, FiAward, FiShield } from 'react-icons/fi'

export default function AboutPage() {
  const features = [
    {
      icon: FiShoppingBag,
      title: "Premium Products",
      description: "Curated selection of high-quality products from trusted brands worldwide."
    },
    {
      icon: FiTruck,
      title: "Fast Delivery",
      description: "Quick and reliable shipping with tracking available for all orders."
    },
    {
      icon: FiShield,
      title: "Secure Shopping",
      description: "Your data and payments are protected with industry-standard security."
    },
    {
      icon: FiHeart,
      title: "Customer First",
      description: "Dedicated customer support team ready to help you with any questions."
    },
    {
      icon: FiAward,
      title: "Best Prices",
      description: "Competitive pricing with regular sales and exclusive member discounts."
    },
    {
      icon: FiUsers,
      title: "Community",
      description: "Join thousands of satisfied customers who trust DreamX for their needs."
    }
  ]

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "10K+", label: "Products Sold" },
    { number: "99%", label: "Customer Satisfaction" },
    { number: "24/7", label: "Support Available" }
  ]

  const team = [
    {
      name: "Adarsh Kumar",
      role: "Founder & CEO",
      image: "/api/placeholder/150/150",
      description: "Passionate about creating exceptional shopping experiences."
    },
    {
      name: "Sarah Johnson",
      role: "Head of Customer Experience",
      image: "/api/placeholder/150/150",
      description: "Ensuring every customer has an amazing journey with us."
    },
    {
      name: "Mike Chen",
      role: "Product Manager",
      image: "/api/placeholder/150/150",
      description: "Curating the best products for our valued customers."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About DreamX
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Your premier destination for quality products, exceptional service, and unbeatable shopping experiences.
          </p>
          <Link 
            href="/products"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2024, DreamX emerged from a simple vision: to create an online shopping platform 
                that puts customers first. We believe that shopping should be enjoyable, secure, and convenient.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Starting as a small team with big dreams, we've grown into a trusted platform serving thousands 
                of customers worldwide. Our commitment to quality, service, and innovation drives everything we do.
              </p>
              <p className="text-lg text-gray-600">
                Today, DreamX continues to evolve, always with our customers' needs at the heart of our decisions. 
                We're not just an ecommerce platform – we're your shopping partner.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-500 text-lg">Our Story Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose DreamX?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-primary-600 mb-4">
                    <IconComponent size={40} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind DreamX who work tirelessly to serve you better.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To democratize access to quality products by creating a platform that connects 
                customers with the best brands and sellers worldwide, while maintaining the 
                highest standards of service and security.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Provide exceptional customer service
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Offer competitive prices and exclusive deals
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Ensure secure and fast transactions
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  Build lasting relationships with our community
                </li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Customer First</h3>
                  <p className="text-gray-600">Every decision we make is guided by what's best for our customers.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
                  <p className="text-gray-600">We continuously improve our platform and services through innovation.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Integrity</h3>
                  <p className="text-gray-600">We operate with transparency, honesty, and ethical business practices.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Excellence</h3>
                  <p className="text-gray-600">We strive for excellence in everything we do, from products to service.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and discover amazing products today.
          </p>
          <div className="space-x-4">
            <Link 
              href="/products"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </Link>
            <Link 
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
