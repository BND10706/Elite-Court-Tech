'use client'
import React from 'react'
import { useCart } from '@/components/cart/CartProvider'
import Link from 'next/link'

export default function CartPage() {
  const {
    items,
    totalCount,
    totalPrice,
    increment,
    decrement,
    removeItem,
    clearCart,
  } = useCart()

  return (
    <main className='min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]'>
      <div className='container mx-auto px-6 py-16 md:py-20'>
        <h1 className='text-3xl md:text-4xl font-bold tracking-wide'>Cart</h1>
        {items.length === 0 ? (
          <div className='mt-12 text-[var(--text-secondary)]'>
            <p>Your cart is empty.</p>
            <Link
              href='/shop'
              className='inline-block mt-4 text-[var(--accent-orange)] hover:underline'
            >
              Continue shopping →
            </Link>
          </div>
        ) : (
          <div className='mt-10 grid lg:grid-cols-3 gap-10'>
            <div className='lg:col-span-2 space-y-6'>
              {items.map((item) => (
                <div
                  key={item.id}
                  className='flex gap-6 p-4 rounded-lg bg-[var(--background-secondary)] ring-1 ring-white/10'
                >
                  <div className='w-28 h-28 rounded-md overflow-hidden bg-black/30 flex items-center justify-center'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex-1'>
                    <h2 className='font-semibold text-lg'>{item.name}</h2>
                    <p className='text-sm text-[var(--text-secondary)] mt-1'>
                      ${item.price.toFixed(2)}
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                      <div className='flex items-center border border-white/10 rounded-md overflow-hidden'>
                        <button
                          aria-label='Decrease'
                          onClick={() => decrement(item.id)}
                          className='px-3 py-1 text-sm hover:bg-white/5'
                        >
                          −
                        </button>
                        <span className='px-3 py-1 text-sm'>
                          {item.quantity}
                        </span>
                        <button
                          aria-label='Increase'
                          onClick={() => increment(item.id)}
                          className='px-3 py-1 text-sm hover:bg-white/5'
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className='text-xs text-[var(--text-secondary)] hover:text-[var(--accent-orange)]'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className='min-w-[70px] text-right font-medium text-[var(--accent-orange)]'>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className='space-y-6'>
              <div className='p-6 rounded-lg bg-[var(--background-secondary)] ring-1 ring-white/10'>
                <h2 className='font-semibold mb-4'>Summary</h2>
                <div className='flex text-sm py-2'>
                  <span className='text-[var(--text-secondary)]'>Items</span>
                  <span className='ml-auto font-medium'>{totalCount}</span>
                </div>
                <div className='flex text-sm py-2 border-b border-white/10'>
                  <span className='text-[var(--text-secondary)]'>Subtotal</span>
                  <span className='ml-auto font-medium'>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className='flex text-base font-semibold py-4'>
                  <span>Total</span>
                  <span className='ml-auto text-[var(--accent-orange)]'>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <Link
                  href='/checkout'
                  className='block text-center w-full mt-2 px-5 py-3 rounded-md bg-[var(--accent-orange)] text-black font-medium hover:bg-[var(--accent-orange)]/90'
                >
                  Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className='w-full mt-3 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-orange)]'
                >
                  Clear Cart
                </button>
              </div>
              <Link
                href='/shop'
                className='block text-sm text-[var(--text-secondary)] hover:text-[var(--accent-orange)] text-center'
              >
                ← Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
