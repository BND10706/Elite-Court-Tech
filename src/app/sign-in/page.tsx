import type { Metadata } from 'next'
import Image from 'next/image'
import SignInForm from '@/components/auth/SignInForm'

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
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  )
}
