'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Button from './ui/Button'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { useCart } from './cart/CartProvider'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { totalCount } = useCart()

  // Load current user and subscribe to auth changes
  useEffect(() => {
    let isMounted = true
    supabase.auth.getUser().then(({ data }) => {
      if (isMounted) setUser(data.user ?? null)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => {
      isMounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  // Load admin flag when user changes
  useEffect(() => {
    if (!user) {
      setIsAdmin(false)
      return
    }
    let cancelled = false
    ;(async () => {
      const { data } = await supabase
        .from('profiles')
        .select('admin')
        .eq('id', user.id)
        .maybeSingle()
      if (!cancelled) setIsAdmin(Boolean(data?.admin))
    })()
    return () => {
      cancelled = true
    }
  }, [user])

  // Close dropdown on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    if (menuOpen) document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [menuOpen])

  const displayName = (() => {
    if (!user) return ''
    const meta = (user.user_metadata || {}) as Record<string, unknown>
    const getStr = (key: string) =>
      typeof meta[key] === 'string' ? (meta[key] as string) : ''
    const first = getStr('first_name') || getStr('given_name')
    const last = getStr('last_name') || getStr('family_name')
    const full = `${first} ${last}`.trim()
    return full || getStr('name') || (user.email ?? 'Account')
  })()

  async function signOut() {
    await supabase.auth.signOut()
    setMenuOpen(false)
    router.replace('/')
  }

  return (
    <nav className='relative bg-[var(--background-secondary)] text-[var(--text-primary)] border-b border-white/10'>
      <div className='container px-6 py-4 mx-auto md:flex md:justify-between md:items-center'>
        <div className='flex items-center justify-between'>
          <Link
            href='/'
            aria-label='Home'
            className='flex items-center'
            onClick={() => setIsOpen(false)}
          >
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
              href='/'
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              className='my-2 transition-colors duration-300 transform text-[var(--text-secondary)] hover:text-[var(--accent-orange)] md:mx-4 md:my-0'
              href='/shop'
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              className='my-2 transition-colors duration-300 transform text-[var(--text-secondary)] hover:text-[var(--accent-orange)] md:mx-4 md:my-0'
              href='/contact'
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              className='my-2 transition-colors duration-300 transform text-[var(--text-secondary)] hover:text-[var(--accent-orange)] md:mx-4 md:my-0'
              href='/about'
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </div>

          <div className='flex items-center justify-center gap-4'>
            <Link
              className='relative transition-colors duration-300 transform text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              href='/cart'
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

              {totalCount > 0 && (
                <span className='absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--accent-orange)] shadow-[0_0_0_2px_var(--background-secondary)]'></span>
              )}
            </Link>

            {!user ? (
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
            ) : (
              <div className='relative inline-block md:ml-2' ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-haspopup='menu'
                  aria-expanded={menuOpen}
                  className='relative z-10 flex items-center px-3 py-2 text-sm text-[var(--text-secondary)] bg-[var(--background-secondary)] border border-transparent rounded-md focus:outline-none focus:ring focus:ring-[var(--accent-orange)] focus:ring-opacity-40 hover:text-[var(--text-primary)]'
                >
                  <span className='mx-1 text-[var(--accent-orange)] font-semibold truncate max-w-[10rem]'>
                    {displayName}
                  </span>
                  <svg
                    className='w-5 h-5 mx-1'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                </button>

                <div
                  className={`absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-[var(--background-primary)] rounded-md shadow-xl border border-white/10 transition transform ${
                    menuOpen
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                  role='menu'
                >
                  <div className='flex items-center p-3 -mt-2 text-sm text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[var(--accent-orange)] hover:text-[var(--background-primary)]'>
                    <div className='flex-shrink-0 mx-1 rounded-full w-9 h-9 bg-[var(--accent-orange)]/20 text-[var(--accent-orange)] grid place-items-center font-semibold'>
                      {displayName
                        .split(' ')
                        .map((p: string) => p[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className='mx-1'>
                      <h1 className='text-sm font-semibold text-[var(--text-primary)]'>
                        {displayName}
                      </h1>
                      <p className='text-xs text-[var(--text-secondary)]'>
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <hr className='border-white/10' />

                  <Link
                    href='/profile'
                    className='flex items-center p-3 text-sm capitalize transition-colors duration-200 text-[var(--text-secondary)] hover:bg-[var(--accent-orange)] hover:text-[var(--background-primary)]'
                    role='menuitem'
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg
                      className='w-5 h-5 mx-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z'
                        fill='currentColor'
                      ></path>
                      <path
                        d='M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z'
                        fill='currentColor'
                      ></path>
                    </svg>
                    <span className='mx-1'>View profile</span>
                  </Link>
                  {isAdmin && (
                    <Link
                      href='/admin'
                      className='flex items-center p-3 text-sm capitalize transition-colors duration-200 text-[var(--text-secondary)] hover:bg-[var(--accent-orange)] hover:text-[var(--background-primary)]'
                      role='menuitem'
                      onClick={() => setMenuOpen(false)}
                    >
                      <svg
                        className='w-5 h-5 mx-1'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M12 2L3 7v10l9 5 9-5V7l-9-5Zm0 2.18L19 8l-7 3.89L5 8l7-3.82ZM5 9.97l6 3.34v6.72l-6-3.33V9.97Zm8 10.06v-6.72l6-3.34v6.73l-6 3.33Z'
                          fill='currentColor'
                        />
                      </svg>
                      <span className='mx-1'>Admin Dashboard</span>
                    </Link>
                  )}

                  <Link
                    href='#'
                    className='flex items-center p-3 text-sm capitalize transition-colors duration-200 text-[var(--text-secondary)] hover:bg-[var(--accent-orange)] hover:text-[var(--background-primary)]'
                    role='menuitem'
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg
                      className='w-5 h-5 mx-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M13.8199 22H10.1799C9.71003 22 9.30347 21.673 9.20292 21.214L8.79592 19.33C8.25297 19.0921 7.73814 18.7946 7.26092 18.443L5.42392 19.028C4.97592 19.1709 4.48891 18.9823 4.25392 18.575L2.42992 15.424C2.19751 15.0165 2.27758 14.5025 2.62292 14.185L4.04792 12.885C3.98312 12.2961 3.98312 11.7019 4.04792 11.113L2.62292 9.816C2.27707 9.49837 2.19697 8.98372 2.42992 8.576L4.24992 5.423C4.48491 5.0157 4.97192 4.82714 5.41992 4.97L7.25692 5.555C7.50098 5.37416 7.75505 5.20722 8.01792 5.055C8.27026 4.91269 8.52995 4.78385 8.79592 4.669L9.20392 2.787C9.30399 2.32797 9.71011 2.00049 10.1799 2H13.8199C14.2897 2.00049 14.6958 2.32797 14.7959 2.787L15.2079 4.67C15.4887 4.79352 15.7622 4.93308 16.0269 5.088C16.2739 5.23081 16.5126 5.38739 16.7419 5.557L18.5799 4.972C19.0276 4.82967 19.514 5.01816 19.7489 5.425L21.5689 8.578C21.8013 8.98548 21.7213 9.49951 21.3759 9.817L19.9509 11.117C20.0157 11.7059 20.0157 12.3001 19.9509 12.889L21.3759 14.189C21.7213 14.5065 21.8013 15.0205 21.5689 15.428L19.7489 18.581C19.514 18.9878 19.0276 19.1763 18.5799 19.034L16.7419 18.449C16.5093 18.6203 16.2677 18.7789 16.0179 18.924C15.7557 19.0759 15.4853 19.2131 15.2079 19.335L14.7959 21.214C14.6954 21.6726 14.2894 21.9996 13.8199 22ZM7.61992 16.229L8.43992 16.829C8.62477 16.9652 8.81743 17.0904 9.01692 17.204C9.20462 17.3127 9.39788 17.4115 9.59592 17.5L10.5289 17.909L10.9859 20H13.0159L13.4729 17.908L14.4059 17.499C14.8132 17.3194 15.1998 17.0961 15.5589 16.833L16.3799 16.233L18.4209 16.883L19.4359 15.125L17.8529 13.682L17.9649 12.67C18.0141 12.2274 18.0141 11.7806 17.9649 11.338L17.8529 10.326L19.4369 8.88L18.4209 7.121L16.3799 7.771L15.5589 7.171C15.1997 6.90671 14.8132 6.68175 14.4059 6.5L13.4729 6.091L13.0159 4H10.9859L10.5269 6.092L9.59592 6.5C9.39772 6.58704 9.20444 6.68486 9.01692 6.793C8.81866 6.90633 8.62701 7.03086 8.44292 7.166L7.62192 7.766L5.58192 7.116L4.56492 8.88L6.14792 10.321L6.03592 11.334C5.98672 11.7766 5.98672 12.2234 6.03592 12.666L6.14792 13.678L4.56492 15.121L5.57992 16.879L7.61992 16.229ZM11.9959 16C9.78678 16 7.99592 14.2091 7.99592 12C7.99592 9.79086 9.78678 8 11.9959 8C14.2051 8 15.9959 9.79086 15.9959 12C15.9932 14.208 14.2039 15.9972 11.9959 16ZM11.9959 10C10.9033 10.0011 10.0138 10.8788 9.99815 11.9713C9.98249 13.0638 10.8465 13.9667 11.9386 13.9991C13.0307 14.0315 13.9468 13.1815 13.9959 12.09V12.49V12C13.9959 10.8954 13.1005 10 11.9959 10Z'
                        fill='currentColor'
                      ></path>
                    </svg>
                    <span className='mx-1'>Settings</span>
                  </Link>

                  <hr className='border-white/10' />

                  <button
                    onClick={signOut}
                    className='w-full text-left flex items-center p-3 text-sm capitalize transition-colors duration-200 text-[var(--text-secondary)] hover:bg-[var(--accent-orange)] hover:text-[var(--background-primary)]'
                    role='menuitem'
                  >
                    <svg
                      className='w-5 h-5 mx-1'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z'
                        fill='currentColor'
                      ></path>
                    </svg>
                    <span className='mx-1'>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
