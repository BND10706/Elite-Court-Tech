'use client'

import Link from 'next/link'

type Product = {
  id: string
  name: string
  category: string
  price: string
  image: string
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'The Catalyzer',
    category: 'CATEGORY',
    price: '$16.00',
    image: 'https://dummyimage.com/420x260',
  },
  {
    id: '2',
    name: 'Shooting Stars',
    category: 'CATEGORY',
    price: '$21.15',
    image: 'https://dummyimage.com/421x261',
  },
  {
    id: '3',
    name: 'Neptune',
    category: 'CATEGORY',
    price: '$12.00',
    image: 'https://dummyimage.com/422x262',
  },
  {
    id: '4',
    name: 'The 400 Blows',
    category: 'CATEGORY',
    price: '$18.40',
    image: 'https://dummyimage.com/423x263',
  },
  {
    id: '5',
    name: 'The Catalyzer',
    category: 'CATEGORY',
    price: '$16.00',
    image: 'https://dummyimage.com/424x264',
  },
  {
    id: '6',
    name: 'Shooting Stars',
    category: 'CATEGORY',
    price: '$21.15',
    image: 'https://dummyimage.com/425x265',
  },
  {
    id: '7',
    name: 'Neptune',
    category: 'CATEGORY',
    price: '$12.00',
    image: 'https://dummyimage.com/427x267',
  },
  {
    id: '8',
    name: 'The 400 Blows',
    category: 'CATEGORY',
    price: '$18.40',
    image: 'https://dummyimage.com/428x268',
  },
]

export default function ShopPage() {
  return (
    <main className='relative min-h-screen text-text-primary'>
      {/* Half-hero with background image only in this section. The image will not shrink (bg-auto). */}
      <section
        className='relative grid place-items-center min-h-[40vh] md:min-h-[50vh] bg-no-repeat bg-center bg-auto'
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1577416412292-747c6607f055?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
            {mockProducts.map((p) => (
              <div key={p.id} className='w-full'>
                <Link
                  href='#'
                  className='block relative h-48 rounded-lg overflow-hidden ring-1 ring-white/10'
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
                  <p className='mt-1 text-text-primary/80'>{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
