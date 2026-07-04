import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import FeaturedProducts from '@/components/FeaturedProducts'
import Footer from '@/components/Footer'

// Below-the-fold sections: code-split so they don't add to the initial bundle.
const FlashSale = dynamic(() => import('@/components/FlashSale'))
const WhyShopWithUs = dynamic(() => import('@/components/WhyShopWithUs'))
const BestSellers = dynamic(() => import('@/components/BestSellers'))
const FeaturedCollections = dynamic(() => import('@/components/FeaturedCollections'))
const TrendingBrands = dynamic(() => import('@/components/TrendingBrands'))
const Newsletter = dynamic(() => import('@/components/Newsletter'))

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <FlashSale />
      <WhyShopWithUs />
      <BestSellers />
      <FeaturedCollections />
      <TrendingBrands />
      <Newsletter />
      <Footer />
    </main>
  )
}
