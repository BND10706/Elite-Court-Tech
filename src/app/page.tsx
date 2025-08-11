import Hero from '@/components/Hero'
import FeaturedGrid from '@/components/FeaturedGrid'

export default function LandingPage() {
  return (
    <main className='min-h-screen flex flex-col font-sans px-4'>
      <Hero />
      <FeaturedGrid />
      <div className='flex flex-col items-center justify-center py-16 bg-background-hero'>
        <h1 className='text-4xl font-bold mb-4'>Elite Court Tech</h1>
        <p className='mb-8 text-center max-w-md'>
          Premium basketball gear designed for champions. Explore our products
          crafted for performance and durability.
        </p>
        <a
          href='#products'
          className='px-6 py-3 rounded font-semibold'
          style={{
            backgroundColor: 'var(--accent-orange)',
            color: 'var(--background-primary)',
          }}
        >
          Shop Now
        </a>
      </div>
    </main>
  )
}
