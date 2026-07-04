import { Truck, ShieldCheck, Zap, RefreshCw, Headphones, Award } from 'lucide-react'
import Card from '@/components/ui/Card'

const REASONS = [
  { icon: Truck, title: 'Free Shipping', description: 'On all orders over $100, no exceptions.' },
  { icon: ShieldCheck, title: 'Secure Payments', description: 'Your transactions are encrypted end-to-end.' },
  { icon: Zap, title: 'Fast Delivery', description: 'Most orders arrive within 2-4 business days.' },
  { icon: RefreshCw, title: 'Easy Returns', description: '30-day hassle-free return policy.' },
  { icon: Headphones, title: '24/7 Support', description: "We're here whenever you need us." },
  { icon: Award, title: 'Premium Quality', description: 'Every product is vetted for quality.' },
]

export default function WhyShopWithUs() {
  return (
    <section className="py-24 sm:py-28 bg-surface dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
            Why Shop With Us
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            We&apos;re committed to making every part of your shopping experience effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <Card key={title} hover className="p-6">
              <div className="p-3 rounded-2xl bg-primary-50 text-primary-600 w-fit dark:bg-primary-500/10">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-semibold mt-4">{title}</h3>
              <p className="text-sm text-muted mt-1">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
