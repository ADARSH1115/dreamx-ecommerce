import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import Categories from '@/components/Categories'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
      <Footer />
    </main>
  )
}
