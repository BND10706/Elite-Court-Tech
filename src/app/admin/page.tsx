'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { AdminNav } from '@/components/admin'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData.session?.user
      if (!user) {
        router.replace('/sign-in')
        return
      }
      const { data } = await supabase
        .from('profiles')
        .select('admin')
        .eq('id', user.id)
        .maybeSingle()
      if (!cancelled) {
        const isAdmin = Boolean(data?.admin)
        setAuthorized(isAdmin)
        setLoading(false)
        if (!isAdmin) router.replace('/')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [router])

  if (loading)
    return (
      <main className='min-h-[50vh] flex items-center justify-center text-text-secondary'>
        Loading admin…
      </main>
    )
  if (!authorized) return null

  return (
    <main className='min-h-screen bg-background-primary text-text-primary'>
      <div className='container mx-auto px-6 py-12'>
        <AdminNav />
        <h1 className='text-3xl font-bold tracking-wide'>Admin Dashboard</h1>
        <p className='mt-4 text-text-secondary max-w-prose'>
          Restricted administrative area. Expose management widgets, stats, and
          moderation tools here.
        </p>
        <section className='mt-10 grid gap-6 md:grid-cols-3'>
          <div className='p-6 rounded-lg bg-background-secondary ring-1 ring-white/10'>
            <h2 className='text-sm font-semibold tracking-wide text-accent-orange mb-2'>
              Quick Stats
            </h2>
            <ul className='text-sm text-text-secondary space-y-1'>
              <li>Total Users: —</li>
              <li>Active Sessions: —</li>
              <li>Orders Today: —</li>
            </ul>
          </div>
          <div className='p-6 rounded-lg bg-background-secondary ring-1 ring-white/10'>
            <h2 className='text-sm font-semibold tracking-wide text-accent-orange mb-2'>
              Moderation
            </h2>
            <p className='text-sm text-text-secondary'>
              Placeholder for content moderation queue.
            </p>
          </div>
          <div className='p-6 rounded-lg bg-background-secondary ring-1 ring-white/10'>
            <h2 className='text-sm font-semibold tracking-wide text-accent-orange mb-2'>
              System Health
            </h2>
            <p className='text-sm text-text-secondary'>
              Add uptime, latency and error rate panels.
            </p>
          </div>
        </section>
        {/* Removed inline ProductForm; product creation moved to /admin/products/add */}
      </div>
    </main>
  )
}
