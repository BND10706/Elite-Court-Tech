'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import ProductForm from '@/components/admin/ProductForm'
import { AdminNav } from '@/components/admin'

export default function AddProductPage() {
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
        Loading…
      </main>
    )
  if (!authorized) return null

  return (
    <main className='min-h-screen bg-background-primary text-text-primary px-6 py-10 container mx-auto'>
      <AdminNav />
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Add Product</h1>
        <button
          onClick={() => router.push('/admin/products')}
          className='px-4 py-2 text-sm rounded-md bg-white/10 hover:bg-white/20'
        >
          Back to Products
        </button>
      </div>
      <div className='max-w-3xl'>
        <ProductForm onCreated={() => router.push('/admin/products')} />
      </div>
    </main>
  )
}
