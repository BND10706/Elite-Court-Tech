import Button from './ui/Button'
export default function Footer() {
  return (
    <footer className='text-text-secondary body-font border-t border-white/10 bg-background-secondary/60'>
      <div className='container px-5 py-16 md:py-20 mx-auto'>
        <div className='flex flex-wrap md:text-left text-center order-first'>
          {/* Column 1 */}
          <div className='lg:w-1/4 md:w-1/2 w-full px-4 mb-10 md:mb-0'>
            <h2 className='title-font font-medium tracking-widest text-sm mb-3 text-text-primary'>
              CATEGORIES
            </h2>
            <nav className='list-none space-y-2'>
              <li>
                <a className='cursor-pointer transition-colors duration-200 hover:text-accent-orange'>
                  Balls
                </a>
              </li>
              <li>
                <a className='cursor-pointer transition-colors duration-200 hover:text-accent-orange'>
                  Training
                </a>
              </li>
              <li>
                <a className='cursor-pointer transition-colors duration-200 hover:text-accent-orange'>
                  Essentials
                </a>
              </li>
            </nav>
          </div>
          {/* Column 2 */}
          <div className='lg:w-1/4 md:w-1/2 w-full px-4 mb-10 md:mb-0'>
            <h2 className='title-font font-medium tracking-widest text-sm mb-3 text-text-primary'>
              SUPPORT
            </h2>
            <nav className='list-none space-y-2'>
              <li>
                <a className='cursor-pointer transition-colors duration-200 hover:text-accent-orange'>
                  Shipping
                </a>
              </li>
              <li>
                <a className='cursor-pointer transition-colors duration-200 hover:text-accent-orange'>
                  Returns
                </a>
              </li>
              <li>
                <a className='cursor-pointer transition-colors duration-200 hover:text-accent-orange'>
                  Contact
                </a>
              </li>
            </nav>
          </div>
          {/* Column 3 */}
          <div className='lg:w-1/4 md:w-1/2 w-full px-4 mb-10 md:mb-0'>
            <h2 className='title-font font-medium tracking-widest text-sm mb-3 text-text-primary'>
              COMPANY
            </h2>
            <nav className='list-none space-y-2'>
              <li>
                <a className='cursor-pointer transition-colors duration-200 hover:text-accent-orange'>
                  About
                </a>
              </li>
            </nav>
          </div>
          {/* Column 4 */}
          <div className='lg:w-1/4 md:w-1/2 w-full px-4'>
            <h2 className='title-font font-medium tracking-widest text-sm mb-3 text-text-primary'>
              SUBSCRIBE
            </h2>
            <div className='flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start gap-3'>
              <div className='relative w-40 sm:w-auto'>
                <label htmlFor='footer-email' className='leading-7 text-sm'>
                  Email
                </label>
                <input
                  id='footer-email'
                  type='email'
                  className='w-full bg-background-primary/80 rounded border border-white/10 focus:bg-transparent focus:ring-2 focus:ring-[color:rgb(255_107_0_/_0.35)] focus:border-[var(--accent-orange)] text-base outline-none text-text-primary py-1.5 px-3 transition-colors duration-200'
                  placeholder='you@example.com'
                />
              </div>
              <Button
                variant='solid'
                size='sm'
                className='flex-shrink-0'
                type='button'
              >
                Join
              </Button>
            </div>
            <p className='text-xs text-text-secondary mt-3 md:text-left text-center'>
              Get product news and drops. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      <div className='bg-background-secondary/80 border-t border-white/10'>
        <div className='container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col gap-4 sm:gap-0'>
          <a className='flex title-font font-medium items-center md:justify-start justify-center text-text-primary'>
            <span className='inline-flex items-center justify-center w-9 h-9 text-black bg-[var(--accent-orange)] rounded-full font-extrabold'>
              ECT
            </span>
            <span className='ml-3 text-lg'>Elite Court Tech</span>
          </a>
          <p className='text-sm text-text-secondary sm:ml-6 sm:mt-0 mt-4'>
            © {new Date().getFullYear()} Elite Court Tech — All rights reserved.
          </p>
          <span className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start text-text-secondary'>
            <a
              className='transition-colors duration-200 hover:text-accent-orange'
              aria-label='Facebook'
            >
              <svg fill='currentColor' className='w-5 h-5' viewBox='0 0 24 24'>
                <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
              </svg>
            </a>
            <a
              className='ml-3 transition-colors duration-200 hover:text-accent-orange'
              aria-label='Twitter'
            >
              <svg fill='currentColor' className='w-5 h-5' viewBox='0 0 24 24'>
                <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
              </svg>
            </a>
            <a
              className='ml-3 transition-colors duration-200 hover:text-accent-orange'
              aria-label='Instagram'
            >
              <svg
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <rect width='20' height='20' x='2' y='2' rx='5' ry='5'></rect>
                <path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01'></path>
              </svg>
            </a>
            <a
              className='ml-3 transition-colors duration-200 hover:text-accent-orange'
              aria-label='LinkedIn'
            >
              <svg
                fill='currentColor'
                stroke='currentColor'
                strokeWidth='0'
                className='w-5 h-5'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='none'
                  d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z'
                ></path>
                <circle cx='4' cy='4' r='2' stroke='none'></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
