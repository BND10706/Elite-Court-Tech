import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function SignUpPage() {
  return (
    <section className='bg-background-primary text-text-primary'>
      <div className='flex justify-center min-h-screen'>
        <div
          className='hidden bg-cover lg:block lg:w-2/5'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1590227632180-80a3bf110871?q=80&w=2115&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />

        <div className='flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5'>
          <div className='w-full'>
            <h1 className='text-2xl font-semibold tracking-wider text-text-primary capitalize'>
              Get your free account now.
            </h1>

            <p className='mt-4 text-text-secondary'>
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            {/* Removed account type selection as requested */}

            <form className='grid grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  First Name
                </label>
                <input
                  type='text'
                  placeholder='John'
                  className='block w-full px-5 py-3 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </div>

              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  Last name
                </label>
                <input
                  type='text'
                  placeholder='Snow'
                  className='block w-full px-5 py-3 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </div>

              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  Phone number
                </label>
                <input
                  type='text'
                  placeholder='XXX-XX-XXXX-XXX'
                  className='block w-full px-5 py-3 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </div>

              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  Email address
                </label>
                <input
                  type='email'
                  placeholder='johnsnow@example.com'
                  className='block w-full px-5 py-3 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </div>

              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  Password
                </label>
                <input
                  type='password'
                  placeholder='Enter your password'
                  className='block w-full px-5 py-3 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </div>

              <div>
                <label className='block mb-2 text-sm text-text-secondary'>
                  Confirm password
                </label>
                <input
                  type='password'
                  placeholder='Enter your password'
                  className='block w-full px-5 py-3 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </div>

              <button className='flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-accent-orange rounded-lg hover:bg-accent-orange/90 focus:outline-none focus:ring focus:ring-accent-orange focus:ring-opacity-50'>
                <span>Sign Up</span>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 rtl:-scale-x-100'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </form>

            <p className='mt-6 text-sm text-text-secondary'>
              Already have an account?{' '}
              <Link className='text-accent-orange hover:underline' href='/sign-in'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
