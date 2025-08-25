import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Discover Your
              <span className="block text-yellow-300">Dream Products</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Shop the latest trends and exclusive deals. Premium quality products 
              delivered right to your doorstep with unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/products"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-center"
              >
                Shop Now
              </Link>
              <Link 
                href="/categories"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 text-center"
              >
                Browse Categories
              </Link>
            </div>
          </div>
          
          <div
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-sm text-blue-100">Products</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-blue-100">Categories</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-blue-100">Support</div>
                </div>
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">Free</div>
                  <div className="text-sm text-blue-100">Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}>
        </div>
      </div>
    </section>
  )
}
