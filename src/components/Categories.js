import Link from 'next/link'
import { FiUser, FiMonitor, FiHome, FiWatch, FiBook, FiHeart } from 'react-icons/fi'
import{MdPets} from 'react-icons/md'

const categories = [
  {
    id: 1,
    name: 'Fashion',
    icon: FiUser,
    color: 'bg-pink-500',
    description: 'Trendy clothing and accessories',
    count: '250+ items'
  },
  
  {
    id: 2,
    name: 'Home & Garden',
    icon: FiHome,
    color: 'bg-green-500',
    description: 'Beautiful home essentials',
    count: '320+ items'
  },
  {
    id: 3,
    name: 'Pet Accessories',
    icon: MdPets,
    color: 'bg-purple-500',
    description: 'Watches, jewelry & more',
    count: '150+ items'
  },
  
  {
    id: 4,
    name: 'Health & Beauty',
    icon: FiHeart,
    color: 'bg-red-500',
    description: 'Self-care essentials',
    count: '120+ items'
  }
]

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of product categories and find exactly what you're looking for
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <div
                key={category.id}
              >
                <Link href={`/categories/${category.name.toLowerCase().replace(' & ', '-')}`}>
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group cursor-pointer border border-gray-100 hover:border-primary-200">
                    <div className="flex items-center space-x-4">
                      <div className={`${category.color} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="text-white" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {category.description}
                        </p>
                        <span className="text-primary-600 font-medium text-sm">
                          {category.count}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/categories"
            className="btn-primary inline-flex items-center"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  )
}
