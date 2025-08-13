'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Button from '@/components/ui/Button'

export default function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    // If already signed in, redirect home
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/')
    })
  }, [router])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    if (!email || !password) {
      setMessage('Email and password are required.')
      return
    }
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    if (error) {
      // If the account isn't confirmed yet, guide the user to verify page
      if (error.message.toLowerCase().includes('confirm')) {
        const q = new URLSearchParams({ email })
        router.push(`/verify?${q.toString()}`)
        return
      }
      setMessage(error.message)
      return
    }
    if (data.session) {
      router.replace('/')
    }
  }

  // Removed unused oauth() handler to satisfy lint (was unused)

  return (
    <div className='flex-1'>
      <div className='text-center'>
        <div className='flex justify-center mx-auto'>
          {/* Logo is rendered by parent page */}
        </div>

        <p className='mt-3 text-text-secondary'>
          Sign in to access your account
        </p>
      </div>

      <div className='mt-8'>
        <form onSubmit={onSubmit}>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm text-text-secondary'
            >
              Email Address
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='example@example.com'
              className='block w-full px-4 py-2 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
              required
            />
          </div>

          <div className='mt-6'>
            <div className='flex justify-between mb-2'>
              <label htmlFor='password' className='text-sm text-text-secondary'>
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
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Your Password'
              className='block w-full px-4 py-2 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
              required
            />
          </div>

          <div className='mt-6'>
            <Button type='submit' fullWidth disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </div>
        </form>

        {message && (
          <p className='mt-4 text-sm text-accent-orange'>{message}</p>
        )}

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
  )
}
