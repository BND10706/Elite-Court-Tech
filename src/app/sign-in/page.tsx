import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div className='bg-background-primary text-text-primary'>
      <div className='flex justify-center h-screen'>
        <div
          className='hidden bg-cover lg:block lg:w-2/3'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1505666287802-931dc83948e9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          }}
        >
          <div className='flex items-center h-full px-20 bg-background-primary/40'>
            <div>
              <h2 className='text-2xl font-bold text-accent-orange sm:text-3xl'>
                Elite Court Tech
              </h2>

              <p className='max-w-xl mt-3 text-accent-orange'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis
                libero suscipit nam temporibus molestiae
              </p>
            </div>
          </div>
        </div>

        <div className='flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6'>
          <div className='flex-1'>
            <div className='text-center'>
              <div className='flex justify-center mx-auto'>
                <Image
                  src='/brand/Logo2.png'
                  alt='Elite Court Tech'
                  width={120}
                  height={80}
                  className='h-20 w-auto sm:h-20'
                  priority
                />
              </div>

              <p className='mt-3 text-text-secondary'>
                Sign in to access your account
              </p>
            </div>

            <div className='mt-8'>
              <form>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm text-text-secondary'
                  >
                    Email Address
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='example@example.com'
                    className='block w-full px-4 py-2 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>

                <div className='mt-6'>
                  <div className='flex justify-between mb-2'>
                    <label
                      htmlFor='password'
                      className='text-sm text-text-secondary'
                    >
                      Password
                    </label>
                    <a
                      href='#'
                      className='text-sm text-text-secondary focus:text-accent-orange hover:text-accent-orange hover:underline'
                    >
                      Forgot password?
                    </a>
                  </div>

                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Your Password'
                    className='block w-full px-4 py-2 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                </div>

                <div className='mt-6'>
                  <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-accent-orange rounded-lg hover:bg-accent-orange/90 focus:outline-none focus:bg-accent-orange/90 focus:ring focus:ring-accent-orange focus:ring-opacity-50'>
                    Sign in
                  </button>
                </div>
              </form>

              <p className='mt-6 text-sm text-center text-text-secondary'>
                Don&apos;t have an account yet?{' '}
                <Link
                  href='/sign-up'
                  className='text-accent-orange focus:outline-none focus:underline hover:underline'
                >
                  Sign up
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
