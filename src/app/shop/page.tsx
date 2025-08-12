import Link from 'next/link'
import { products } from '@/data/products'

export default function ShopPage() {
  return (
    <main className='relative min-h-screen text-text-primary'>
      {/* Half-hero with background image only in this section. The image will not shrink (bg-auto). */}
      <section
        className='relative grid place-items-center min-h-[40vh] md:min-h-[50vh] bg-no-repeat bg-auto'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1577416412292-747c6607f055?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundPosition: '10% 15%',
        }}
      >
        <h1 className='text-4xl md:text-5xl font-extrabold tracking-wider text-[var(--accent-orange)]'>
          Store
        </h1>
      </section>

      {/* Products grid (mock) */}
      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {products.map((p) => (
              <div key={p.id} className='w-full'>
                <Link
                  href={`/shop/${p.id}`}
                  className='block relative h-48 rounded-lg overflow-hidden ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)] focus:ring-offset-2 focus:ring-offset-[var(--background-primary)]'
                >
                  {/* using img to avoid remote domain restrictions; replace with next/image later if desired */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className='object-cover object-center w-full h-full block'
                  />
                </Link>
                <div className='mt-4'>
                  <h3 className='text-text-secondary text-xs tracking-widest mb-1'>
                    {p.category}
                  </h3>
                  <h2 className='text-text-primary text-lg font-medium'>
                    {p.name}
                  </h2>
                  <p className='mt-1 text-text-primary/80'>
                    ${p.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
