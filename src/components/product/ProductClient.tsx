'use client'
import React, { useState } from 'react'
import { useCart } from '@/components/cart/CartProvider'
import Image from 'next/image'

export type Product = {
  id: string
  name: string
  category?: string | null
  brand?: string | null
  description?: string | null
  details?: string | null
  color?: string | null
  size?: string | null
  quantity?: number | null
  price: number
  cover_image?: string | null
}

export function ProductClient({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const [tab, setTab] = useState<'description' | 'details'>('description')

  function handleAdd() {
    if (adding) return
    setAdding(true)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.cover_image || '',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    setAdding(false)
  }

  return (
    <main className='min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]'>
      <section className='py-16 md:py-20'>
        <div className='container px-6 mx-auto'>
          <div className='lg:w-4/5 mx-auto flex flex-col lg:flex-row lg:gap-10'>
            <div className='lg:w-1/2 w-full order-2 lg:order-1 lg:pr-10 lg:py-4 mb-10 lg:mb-0'>
              <h2 className='text-xs font-semibold tracking-widest text-[var(--accent-orange)]/80 uppercase'>
                {product.brand || 'Elite Court'}
              </h2>
              <h1 className='text-3xl md:text-4xl font-bold tracking-wide mt-2 text-[var(--text-primary)]'>
                {product.name}
              </h1>
              <div className='flex mt-6 border-b border-white/10 text-sm'>
                <button
                  onClick={() => setTab('description')}
                  className={`flex-1 py-2 px-1 font-medium transition-colors border-b-2 ${
                    tab === 'description'
                      ? 'text-[var(--accent-orange)] border-[var(--accent-orange)]'
                      : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setTab('details')}
                  className={`flex-1 py-2 px-1 font-medium transition-colors border-b-2 ${
                    tab === 'details'
                      ? 'text-[var(--accent-orange)] border-[var(--accent-orange)]'
                      : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
                  }`}
                >
                  Details
                </button>
              </div>
              {tab === 'description' && (
                <p className='leading-relaxed mt-6 text-[var(--text-secondary)]'>
                  {product.description}
                </p>
              )}
              {tab === 'details' && (
                <div className='mt-6 text-sm text-[var(--text-secondary)] space-y-6'>
                  <div>
                    <h3 className='text-[var(--text-primary)] font-semibold mb-2'>
                      Product Details
                    </h3>
                    <p className='whitespace-pre-line leading-relaxed'>
                      {product.details || 'No additional details provided.'}
                    </p>
                  </div>
                  <div>
                    <h4 className='text-[var(--text-primary)]/90 font-medium mb-2'>
                      Attributes
                    </h4>
                    <ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2'>
                      {[
                        ['Brand', product.brand],
                        ['Category', product.category],
                        ['Color', product.color],
                        ['Size', product.size],
                        [
                          'Quantity',
                          product.quantity != null
                            ? String(product.quantity)
                            : undefined,
                        ],
                        ['Price', `$${product.price.toFixed(2)}`],
                      ]
                        .filter(([, v]) => v && v !== '—')
                        .map(([k, v]) => (
                          <li key={k} className='flex justify-between'>
                            <span className='text-[var(--text-secondary)]'>
                              {k}
                            </span>
                            <span className='text-[var(--text-primary)]'>
                              {v}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
              <div className='mt-8 divide-y divide-white/10 border-y border-white/10'>
                <InfoRow label='Color' value={product.color || '—'} />
                <InfoRow label='Size' value={product.size || '—'} />
                <InfoRow
                  label='In Stock'
                  value={String(product.quantity ?? '—')}
                />
              </div>
              <div className='flex items-center mt-8 gap-4'>
                <span className='font-semibold text-2xl text-[var(--accent-orange)]'>
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={handleAdd}
                  disabled={adding}
                  className='ml-auto px-6 py-3 rounded-md bg-[var(--accent-orange)] text-black font-medium tracking-wide hover:bg-[var(--accent-orange)]/90 focus:outline-none focus:ring focus:ring-[var(--accent-orange)] focus:ring-opacity-40 disabled:opacity-60'
                >
                  {added ? 'Added!' : adding ? 'Adding...' : 'Add to Cart'}
                </button>
                <button
                  aria-label='Add to favorites'
                  className='rounded-full w-12 h-12 bg-[var(--background-secondary)] border border-white/10 inline-flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-orange)] hover:border-[var(--accent-orange)] transition-colors'
                >
                  <svg
                    fill='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
                  </svg>
                </button>
              </div>
              {product.details && tab === 'details' && (
                <div className='mt-10'>
                  <h3 className='text-sm font-semibold tracking-wide text-[var(--text-primary)] mb-2'>
                    Additional Notes
                  </h3>
                  <p className='text-[var(--text-secondary)] text-sm leading-relaxed whitespace-pre-line'>
                    {product.details}
                  </p>
                </div>
              )}
            </div>
            <div className='lg:w-1/2 w-full order-1 lg:order-2 mb-8 lg:mb-0'>
              <div className='relative rounded-lg overflow-hidden ring-1 ring-white/10 bg-[var(--background-secondary)]'>
                <div className='relative w-full aspect-square'>
                  <Image
                    alt={product.name}
                    src={
                      product.cover_image ||
                      'https://placehold.co/800x800/0f0f0f/ffffff?text=No+Image'
                    }
                    fill
                    className='object-cover object-center'
                    sizes='(max-width:768px) 100vw, 50vw'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex py-3 text-sm'>
      <span className='text-[var(--text-secondary)]'>{label}</span>
      <span className='ml-auto text-[var(--text-primary)] font-medium'>
        {value}
      </span>
    </div>
  )
}
