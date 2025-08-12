'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/lib/supabaseClient'

type ProductLite = {
  id: string
  name: string
  category: string | null
  cover_image: string | null
}

export default function FeaturedGrid() {
  const [items, setItems] = useState<ProductLite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id,name,category,cover_image')
        .order('created_at', { ascending: false })
        .limit(24)
      if (error) setError(error.message)
      setItems(data || [])
      setLoading(false)
    })()
  }, [])

  // Derive featured collections: top 4 categories by product count
  const featured = useMemo(() => {
    const byCat: Record<string, ProductLite[]> = {}
    items.forEach((p) => {
      const key = p.category || 'Other'
      byCat[key] = byCat[key] || []
      byCat[key].push(p)
    })
    const ranked = Object.entries(byCat)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 4)
      .map(([category, list]) => ({
        category,
        count: list.length,
        sample: list[0],
      }))
    return ranked
  }, [items])

  return (
    <section
      id='collections'
      className='text-text-secondary body-font bg-background-primary'
    >
      <div className='container px-5 py-16 md:py-20 mx-auto'>
        <div className='flex flex-wrap w-full mb-10 md:mb-16 items-end'>
          <div className='lg:w-1/2 w-full mb-6 lg:mb-0'>
            <h2 className='sm:text-3xl text-2xl font-semibold title-font mb-2 text-text-primary'>
              Shop Featured Collections
            </h2>
            <div className='h-1 w-20 bg-accent-orange rounded'></div>
          </div>
          <p className='lg:w-1/2 w-full leading-relaxed'>
            Curated categories based on the latest products you added.
          </p>
        </div>
        {error && (
          <p className='text-sm text-red-400 mb-6'>
            Failed to load featured collections: {error}
          </p>
        )}
        {loading && !error && (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className='h-48 rounded-lg bg-background-secondary/40 animate-pulse'
              ></div>
            ))}
          </div>
        )}
        {!loading && !error && (
          <div className='flex flex-wrap -m-4'>
            {featured.map((block) => {
              const img =
                block.sample?.cover_image ||
                'https://placehold.co/600x400/0f0f0f/ffffff?text=No+Image'
              return (
                <div className='xl:w-1/4 md:w-1/2 p-4' key={block.category}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(
                      block.category
                    )}`}
                    className='group bg-background-secondary/60 p-6 rounded-lg ring-1 ring-white/10 h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-accent-orange/80 focus:ring-offset-2 focus:ring-offset-background-primary transition-colors hover:bg-background-secondary/80'
                  >
                    <div className='relative h-40 w-full mb-6 overflow-hidden rounded'>
                      <Image
                        src={img}
                        alt={block.category}
                        fill
                        className='object-cover object-center transition-transform duration-300 group-hover:scale-105'
                      />
                    </div>
                    <h3 className='tracking-widest text-accent-orange text-xs font-medium title-font'>
                      COLLECTION
                    </h3>
                    <h4 className='text-lg text-text-primary font-medium title-font mb-2'>
                      {block.category}
                    </h4>
                    <p className='leading-relaxed text-sm'>
                      {block.count} product{block.count === 1 ? '' : 's'} in
                      this category →
                    </p>
                  </Link>
                </div>
              )
            })}
            {featured.length === 0 && (
              <p className='text-sm text-text-secondary px-4'>
                No products yet. Add some in the admin panel.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
