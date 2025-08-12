'use client'
import React from 'react'
import { useCart } from '@/components/cart/CartProvider'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, totalPrice } = useCart()

  return (
    <main className='min-h-screen bg-[var(--background-primary)] text-[var(--text-primary)]'>
      <div className='container mx-auto px-6 py-16 md:py-20 max-w-3xl'>
        <h1 className='text-3xl md:text-4xl font-bold tracking-wide'>
          Checkout
        </h1>
        {items.length === 0 ? (
          <div className='mt-12 text-[var(--text-secondary)]'>
            <p>Your cart is empty.</p>
            <Link
              href='/shop'
              className='inline-block mt-4 text-[var(--accent-orange)] hover:underline'
            >
              Go to shop →
            </Link>
          </div>
        ) : (
          <div className='mt-10 space-y-8'>
            <section className='p-6 rounded-lg bg-[var(--background-secondary)] ring-1 ring-white/10'>
              <h2 className='font-semibold mb-4'>Order Summary</h2>
              <ul className='divide-y divide-white/10 text-sm'>
                {items.map((i) => (
                  <li key={i.id} className='flex py-3'>
                    <span className='text-[var(--text-secondary)]'>
                      {i.name} × {i.quantity}
                    </span>
                    <span className='ml-auto font-medium'>
                      ${(i.price * i.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className='flex text-base font-semibold pt-4'>
                <span>Total</span>
                <span className='ml-auto text-[var(--accent-orange)]'>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </section>
            <section className='p-6 rounded-lg bg-[var(--background-secondary)] ring-1 ring-white/10'>
              <h2 className='font-semibold mb-4'>Payment (Placeholder)</h2>
              <p className='text-sm text-[var(--text-secondary)] leading-relaxed'>
                This is a placeholder checkout page. Integrate a real payment
                provider (Stripe, etc.) later. Clicking the button below just
                clears the cart in a real implementation.
              </p>
              <button
                disabled
                className='mt-6 w-full px-6 py-4 rounded-md bg-[var(--accent-orange)]/60 text-black font-medium cursor-not-allowed'
              >
                Place Order (Disabled)
              </button>
              <Link
                href='/cart'
                className='block text-xs text-center mt-4 text-[var(--text-secondary)] hover:text-[var(--accent-orange)]'
              >
                ← Back to cart
              </Link>
            </section>
          </div>
        )}
      </div>
    </main>
  )
}
