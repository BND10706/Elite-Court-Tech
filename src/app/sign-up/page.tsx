import type { Metadata } from 'next'
import SignUpForm from '@/components/auth/SignUpForm'

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
          <SignUpForm />
        </div>
      </div>
    </section>
  )
}
