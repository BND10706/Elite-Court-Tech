'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from './ui/Button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='relative bg-[var(--background-secondary)] text-[var(--text-primary)] border-b border-white/10'>
      <div className='container px-6 py-4 mx-auto md:flex md:justify-between md:items-center'>
        <div className='flex items-center justify-between'>
          <Link href='/' aria-label='Home' className='flex items-center'>
            <span className='text-[var(--accent-orange)] font-extrabold text-lg sm:text-xl tracking-widest'>
              Elite Court Tech
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className='flex lg:hidden'>
            <button
              type='button'
              className='text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none focus:text-[var(--text-primary)]'
              aria-label='toggle menu'
              onClick={() => setIsOpen((v) => !v)}
            >
              {!isOpen ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 8h16M4 16h16'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div
          className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-[var(--background-secondary)] md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
            isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'
          }`}
        >
          <div className='flex flex-col md:flex-row md:mx-6'>
            <Link
              className='my-2 transition-colors duration-300 transform text-[var(--text-secondary)] hover:text-[var(--accent-orange)] md:mx-4 md:my-0'
              href='#'
            >
              Home
            </Link>
            <Link
              className='my-2 transition-colors duration-300 transform text-[var(--text-secondary)] hover:text-[var(--accent-orange)] md:mx-4 md:my-0'
              href='#'
            >
              Shop
            </Link>
            <Link
              className='my-2 transition-colors duration-300 transform text-[var(--text-secondary)] hover:text-[var(--accent-orange)] md:mx-4 md:my-0'
              href='#'
            >
              Contact
            </Link>
            <Link
              className='my-2 transition-colors duration-300 transform text-[var(--text-secondary)] hover:text-[var(--accent-orange)] md:mx-4 md:my-0'
              href='#'
            >
              About
            </Link>
          </div>

          <div className='flex items-center justify-center gap-4'>
            <Link
              className='relative transition-colors duration-300 transform text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              href='#'
              aria-label='Cart'
            >
              <svg
                className='w-5 h-5'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>

              {/* <span className='absolute top-0 left-0 p-1 text-xs rounded-full bg-[var(--accent-orange)] text-[var(--background-primary)]'></span> */}
            </Link>

            <Button
              href='/sign-in'
              variant='outline'
              size='sm'
              as='link'
              aria-label='Login'
              className='md:ml-2'
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
