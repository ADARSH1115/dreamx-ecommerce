import { Shirt, Cpu, Home, Watch, BookOpen, HeartPulse, Dumbbell, Gamepad2 } from 'lucide-react'

/**
 * Single source of truth for product categories — must stay in sync with
 * the `category` enum on backend/src/models/Product.js.
 */
export const CATEGORIES = [
  { name: 'Fashion', icon: Shirt, description: 'Trendy clothing and accessories' },
  { name: 'Electronics', icon: Cpu, description: 'Gadgets and smart devices' },
  { name: 'Home & Garden', icon: Home, description: 'Beautiful home essentials' },
  { name: 'Accessories', icon: Watch, description: 'Watches, bags & more' },
  { name: 'Books', icon: BookOpen, description: 'Bestsellers and page-turners' },
  { name: 'Health & Beauty', icon: HeartPulse, description: 'Self-care essentials' },
  { name: 'Sports', icon: Dumbbell, description: 'Gear for an active life' },
  { name: 'Toys', icon: Gamepad2, description: 'Fun for every age' },
]
