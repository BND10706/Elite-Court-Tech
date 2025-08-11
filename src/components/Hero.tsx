'use client'
import Image from 'next/image'
import Button from './ui/Button'

export default function Hero() {
  return (
    <section className='text-text-secondary body-font bg-background-hero min-h-[100svh] md:min-h-[100dvh] flex items-center mx-[-1rem] border-b border-white/10'>
      <div className='container mx-auto flex px-5 pt-8 pb-10 md:pt-12 md:pb-14 md:flex-row flex-col items-center gap-8 md:gap-12'>
        {/* Left: Copy + CTAs */}
        <div className='lg:flex-grow md:w-1/2 lg:pr-10 md:pr-6 flex flex-col md:items-start md:text-left mb-10 md:mb-0 items-center text-center'>
          <div className='mb-4 flex items-center gap-2'>
            <span className='hidden sm:inline-flex text-xs text-text-secondary'>
              Elite Court Tech • Pro Gear • Pro Results
            </span>
          </div>
          <h1 className='title-font text-4xl sm:text-5xl lg:text-6xl tracking-tight font-extrabold text-text-primary'>
            Elevate Your Game
            <span className='block text-3xl sm:text-4xl font-semibold text-accent-orange mt-2'>
              Performance Basketball Gear
            </span>
          </h1>
          <p className='mt-5 max-w-xl leading-relaxed text-base sm:text-lg'>
            From indoor courts to street runs, our pro-level balls, grips, and
            training accessories deliver control, comfort, and durability—built
            for athletes who want an edge.
          </p>

          {/* Feature bullets */}
          <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl text-left'>
            <li className='flex items-start gap-3'>
              <svg
                className='h-5 w-5 mt-0.5 text-accent-orange flex-shrink-0'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M16.704 5.29a1 1 0 0 1 0 1.415l-7.2 7.2a1 1 0 0 1-1.415 0l-3-3A1 1 0 1 1 6.504 9.79l2.293 2.293 6.494-6.494a1 1 0 0 1 1.414 0Z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-sm sm:text-base'>
                Game-ready materials for elite grip and feel
              </span>
            </li>
            <li className='flex items-start gap-3'>
              <svg
                className='h-5 w-5 mt-0.5 text-accent-orange flex-shrink-0'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M16.704 5.29a1 1 0 0 1 0 1.415l-7.2 7.2a1 1 0 0 1-1.415 0l-3-3A1 1 0 1 1 6.504 9.79l2.293 2.293 6.494-6.494a1 1 0 0 1 1.414 0Z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-sm sm:text-base'>
                Durable construction for indoor/outdoor play
              </span>
            </li>
            <li className='flex items-start gap-3'>
              <svg
                className='h-5 w-5 mt-0.5 text-accent-orange flex-shrink-0'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M16.704 5.29a1 1 0 0 1 0 1.415l-7.2 7.2a1 1 0 0 1-1.415 0l-3-3A1 1 0 1 1 6.504 9.79l2.293 2.293 6.494-6.494a1 1 0 0 1 1.414 0Z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-sm sm:text-base'>
                Athlete-tested accessories and training tools
              </span>
            </li>
            <li className='flex items-start gap-3'>
              <svg
                className='h-5 w-5 mt-0.5 text-accent-orange flex-shrink-0'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M16.704 5.29a1 1 0 0 1 0 1.415l-7.2 7.2a1 1 0 0 1-1.415 0l-3-3A1 1 0 1 1 6.504 9.79l2.293 2.293 6.494-6.494a1 1 0 0 1 1.414 0Z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='text-sm sm:text-base'>
                Fast shipping and easy 30‑day returns
              </span>
            </li>
          </ul>

          {/* CTAs */}
          <div className='mt-7 flex w-full flex-col sm:flex-row items-center gap-4 sm:gap-3'>
            <Button variant='solid' size='md' fullWidth type='button'>
              Shop the Store
            </Button>
            <Button
              variant='outline'
              size='md'
              fullWidth
              className='bg-background-secondary/80 hover:bg-[var(--accent-orange)] hover:text-black ring-1 ring-white/10'
              type='button'
            >
              Explore Gear
            </Button>
          </div>

          {/* Trust bar */}
          <div className='mt-6 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 text-xs text-text-secondary'>
            <div className='inline-flex items-center gap-2 whitespace-nowrap'>
              <span className='h-1.5 w-1.5 rounded-full bg-accent-orange'></span>
              Free shipping
            </div>
            <div className='inline-flex items-center gap-2 whitespace-nowrap'>
              <span className='h-1.5 w-1.5 rounded-full bg-accent-orange'></span>
              30‑day returns
            </div>
            <div className='inline-flex items-center gap-2 whitespace-nowrap'>
              <span className='h-1.5 w-1.5 rounded-full bg-accent-orange'></span>
              Secure checkout
            </div>
          </div>
        </div>

        {/* Right: Large image placeholder */}
        <div className='lg:max-w-xl lg:w-[46%] md:w-1/2 w-full'>
          <div className='relative aspect-[5/4] w-full overflow-hidden rounded-xl ring-1 ring-white/10 bg-background-secondary/60'>
            <Image
              alt='Elite Court Tech hero placeholder'
              src='https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              fill
              priority
              className='object-cover'
            />
            {/* Optional gradient overlay for readability */}
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-tr from-background-hero/0 via-transparent to-background-hero/0'></div>
          </div>
        </div>
      </div>
    </section>
  )
}
