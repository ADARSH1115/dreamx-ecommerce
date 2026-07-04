import { Compass } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-24 text-center">
        <div>
          <div className="flex justify-center mb-6">
            <div className="p-5 rounded-3xl bg-primary-50 text-primary-600 dark:bg-primary-500/10">
              <Compass size={40} />
            </div>
          </div>
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-xl font-semibold mt-4">Page not found</p>
          <p className="text-muted mt-2 max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Button href="/" className="mt-8">Back to Home</Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
