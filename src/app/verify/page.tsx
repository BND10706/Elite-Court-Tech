'use client'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { Suspense, useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function VerifyInner() {
  const params = useSearchParams()
  const email = useMemo(() => params.get('email') ?? '', [params])
  const [status, setStatus] = useState<string | null>(null)
  const resend = useCallback(async () => {
    if (!email) return
    setStatus('sending')
    const { error } = await supabase.auth.resend({ type: 'signup', email })
    setStatus(error ? `Error: ${error.message}` : 'Email sent')
  }, [email])

  return (
    <section className='bg-background-primary text-text-primary min-h-[60vh] flex items-center'>
      <div className='container mx-auto px-6'>
        <div className='max-w-xl bg-background-secondary/50 ring-1 ring-white/10 rounded-lg p-6'>
          <h1 className='text-2xl font-semibold mb-2'>Check your email</h1>
          <p className='text-text-secondary'>
            We sent a confirmation link to{' '}
            <span className='text-text-primary font-medium'>{email}</span>.
            Click the link to verify your account. After verifying, return here
            and sign in.
          </p>
          <div className='mt-6 flex gap-3'>
            <button
              onClick={resend}
              className='px-5 py-2 rounded-md border border-accent-orange text-accent-orange hover:bg-accent-orange hover:text-black transition'
              disabled={!email || status === 'sending'}
            >
              {status === 'sending' ? 'Resending…' : 'Resend email'}
            </button>
            <Link
              className='px-5 py-2 rounded-md bg-accent-orange text-black hover:bg-accent-orange/90 transition'
              href='/sign-in'
            >
              Go to sign in
            </Link>
          </div>
          {status && (
            <p className='mt-3 text-sm text-text-secondary'>Status: {status}</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<section className='min-h-[60vh]' />}>
      <VerifyInner />
    </Suspense>
  )
}
