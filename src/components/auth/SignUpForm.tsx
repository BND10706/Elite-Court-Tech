'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Button from '@/components/ui/Button'

export default function SignUpForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // helpers for phone formatting
  const digitsOnly = (v: string) => v.replace(/\D/g, '')
  const formatPhone = (digits: string) => {
    const d = digits.slice(0, 10)
    if (d.length <= 3) return d ? `(${d}` : ''
    if (d.length <= 6) return `(${d.slice(0, 3)})${d.slice(3)}`
    return `(${d.slice(0, 3)})${d.slice(3, 6)}-${d.slice(6)}`
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const only = digitsOnly(value)
      setForm((f) => ({ ...f, phone: formatPhone(only) }))
      return
    }
    setForm((f) => ({ ...f, [name]: value }))
  }

  function validate(): string | null {
    const { firstName, lastName, phone, email, password, confirm } = form
    const phoneDigits = digitsOnly(phone)
    if (!firstName.trim()) return 'First name is required.'
    if (!lastName.trim()) return 'Last name is required.'
    if (!phoneDigits) return 'Phone number is required.'
    if (phoneDigits.length !== 10) return 'Enter a valid 10-digit phone number.'
    if (!email.trim()) return 'Email is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email.'
    if (!password) return 'Password is required.'
    if (password.length < 6) return 'Password must be at least 6 characters.'
    if (confirm !== password) return 'Passwords do not match.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    const err = validate()
    if (err) {
      setMessage(err)
      return
    }
    try {
      setLoading(true)
      const phoneDigits = digitsOnly(form.phone)
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
            phone: phoneDigits,
          },
          emailRedirectTo:
            typeof window !== 'undefined'
              ? `${window.location.origin}${
                  process.env.NEXT_PUBLIC_BASE_PATH ?? ''
                }/sign-in`
              : undefined,
        },
      })
      if (error) throw error
      if (data.session) {
        // Email confirmation not required; user is signed in
        router.push('/')
        return
      }
      if (data.user) {
        try {
          const { error: profileErr } = await supabase.from('profiles').insert({
            id: data.user.id,
            full_name: `${form.firstName} ${form.lastName}`.trim(),
            phone: phoneDigits,
            // address fields remain empty at signup; user can fill on profile page
            address: '',
            city: '',
            state: '',
            zip_code: '',
            country: '',
            admin: false,
          })
          if (profileErr)
            console.warn('Profile insert skipped:', profileErr.message)
        } catch {}
        // Navigate to verification page (limbo state)
        const q = new URLSearchParams({ email: form.email })
        router.push(`/verify?${q.toString()}`)
        return
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Sign up failed.'
      setMessage(msg)
    } finally {
      setLoading(false)
    }
  }

  // OAuth signup is available on the sign-in page; kept minimal here to reduce surface area.

  return (
    <div className='w-full'>
      <h1 className='text-2xl font-semibold tracking-wider text-text-primary capitalize'>
        Get your free account now.
      </h1>

      <p className='mt-4 text-text-secondary'>
        Let’s get you all set up so you can verify your personal account and
        begin setting up your profile.
      </p>

      <form
        className='grid grid-cols-1 gap-6 mt-8 md:grid-cols-2'
        onSubmit={handleSubmit}
      >
        <div>
          <label className='block mb-2 text-sm text-text-secondary'>
            First Name
          </label>
          <input
            type='text'
            name='firstName'
            placeholder='John'
            value={form.firstName}
            onChange={onChange}
            required
            className='block w-full px-5 py-3 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

        <div>
          <label className='block mb-2 text-sm text-text-secondary'>
            Last name
          </label>
          <input
            type='text'
            name='lastName'
            placeholder='Snow'
            value={form.lastName}
            onChange={onChange}
            required
            className='block w-full px-5 py-3 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

        <div>
          <label className='block mb-2 text-sm text-text-secondary'>
            Phone number
          </label>
          <input
            type='tel'
            name='phone'
            placeholder='(555) 555-5555'
            value={form.phone}
            onChange={onChange}
            required
            className='block w-full px-5 py-3 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

        <div>
          <label className='block mb-2 text-sm text-text-secondary'>
            Email address
          </label>
          <input
            type='email'
            name='email'
            placeholder='johnsnow@example.com'
            value={form.email}
            onChange={onChange}
            required
            className='block w-full px-5 py-3 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

        <div>
          <label className='block mb-2 text-sm text-text-secondary'>
            Password
          </label>
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            value={form.password}
            onChange={onChange}
            required
            className='block w-full px-5 py-3 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

        <div>
          <label className='block mb-2 text-sm text-text-secondary'>
            Confirm password
          </label>
          <input
            type='password'
            name='confirm'
            placeholder='Enter your password again'
            value={form.confirm}
            onChange={onChange}
            required
            className='block w-full px-5 py-3 mt-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-accent-orange focus:ring-accent-orange focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

        <Button
          type='submit'
          disabled={loading}
          className='col-span-1 md:col-span-2'
        >
          {loading ? 'Signing up…' : 'Sign Up'}
        </Button>
      </form>

      {message && <p className='mt-4 text-sm text-accent-orange'>{message}</p>}

      <p className='mt-6 text-sm text-text-secondary'>
        Already have an account?{' '}
        <Link className='text-accent-orange hover:underline' href='/sign-in'>
          Sign in
        </Link>
      </p>
    </div>
  )
}
