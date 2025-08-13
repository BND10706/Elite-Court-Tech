'use client'
import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

type ProductCard = {
  id: string
  name: string
  category: string | null
  price: number
  cover_image: string | null
}

function ShopPageInner() {
  const [products, setProducts] = useState<ProductCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useSearchParams()
  const router = useRouter()
  const categoryFilter = params.get('category') || ''

  useEffect(() => {
    setLoading(true)
    setError(null)
    ;(async () => {
      let query = supabase
        .from('products')
        .select('id,name,category,price,cover_image')
        .order('created_at', { ascending: false })
        .limit(60)
      if (categoryFilter) {
        if (categoryFilter === 'Other') {
          query = query.is('category', null)
        } else {
          query = query.eq('category', categoryFilter)
        }
      }
      const { data, error } = await query
      if (error) setError(error.message)
      setProducts(data || [])
      setLoading(false)
    })()
  }, [categoryFilter])

  return (
    <main className='relative min-h-screen text-text-primary'>
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
      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-6'>
          {categoryFilter && (
            <div className='flex items-center justify-between mb-6'>
              <p className='text-sm text-text-secondary'>
                Filtering by category:{' '}
                <span className='text-text-primary font-medium'>
                  {categoryFilter}
                </span>
              </p>
              <button
                onClick={() => router.push('/shop')}
                className='text-xs px-3 py-1 rounded-md bg-white/10 hover:bg-white/20'
              >
                Clear Filter
              </button>
            </div>
          )}
          {error && (
            <p className='text-sm text-red-400 mb-6'>
              Failed to load products: {error}
            </p>
          )}
          {loading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className='h-60 rounded-lg bg-background-secondary/40 animate-pulse'
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className='text-text-secondary'>
              No products yet. Check back later.
            </p>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {products.map((p) => (
                <div key={p.id} className='w-full'>
                  <Link
                    href={`/shop/${p.id}`}
                    className='block relative h-48 rounded-lg overflow-hidden ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)] focus:ring-offset-2 focus:ring-offset-[var(--background-primary)]'
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        p.cover_image ||
                        'https://placehold.co/600x600/0f0f0f/ffffff?text=No+Image'
                      }
                      alt={p.name}
                      className='object-cover object-center w-full h-full block'
                      loading='lazy'
                      decoding='async'
                    />
                  </Link>
                  <div className='mt-4'>
                    <h3 className='text-text-secondary text-xs tracking-widest mb-1'>
                      {p.category || '—'}
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
          )}
        </div>
      </section>
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <main className='relative min-h-screen text-text-primary'>
          <section className='py-12 md:py-16'>
            <div className='container mx-auto px-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className='h-60 rounded-lg bg-background-secondary/40 animate-pulse'
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      }
    >
      <ShopPageInner />
    </Suspense>
  )
}
