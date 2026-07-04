import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const COLLECTIONS = [
  {
    name: 'Summer Fashion',
    href: '/products?category=Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
  },
  {
    name: 'Gaming & Electronics',
    href: '/products?category=Electronics',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
  },
  {
    name: 'Luxury Accessories',
    href: '/products?category=Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
  },
  {
    name: 'Sports Collection',
    href: '/products?category=Sports',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
  },
]

export default function FeaturedCollections() {
  return (
    <section className="py-24 sm:py-28 bg-card dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Curated edits built around how you actually shop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group relative block h-64 rounded-3xl overflow-hidden"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{collection.name}</h3>
                <span className="flex items-center gap-1 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all">
                  Shop Now <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
