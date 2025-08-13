'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { EditProductModal } from '@/components/admin/EditProductModal'
import { AdminNav } from '@/components/admin'
import Link from 'next/link'

interface ProductRow {
  id: string
  name: string
  price: number
  quantity: number
  slug: string
  cover_image: string | null
  category: string | null
}

export default function ProductsAdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [products, setProducts] = useState<ProductRow[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

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
      const isAdmin = Boolean(data?.admin)
      if (!cancelled) {
        setAuthorized(isAdmin)
        if (!isAdmin) router.replace('/')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [router])

  useEffect(() => {
    if (!authorized) return
    ;(async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id,name,price,quantity,slug,cover_image,category')
        .order('created_at', { ascending: false })
      if (error) setMessage(error.message)
      setProducts(data || [])
      setLoading(false)
    })()
  }, [authorized, refreshKey])

  function refresh() {
    setRefreshKey((k) => k + 1)
  }

  async function remove(id: string) {
    if (!confirm('Delete this product?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      setMessage(error.message)
      return
    }
    refresh()
  }

  if (loading)
    return (
      <main className='min-h-[50vh] flex items-center justify-center text-text-secondary'>
        Loading…
      </main>
    )
  if (!authorized) return null

  // Event listeners for modal events (avoid passing function props to modal)
  useEffect(() => {
    function handleSaved(e: Event) {
      const id = (e as CustomEvent).detail?.id as string | undefined
      if (id) refresh()
      setEditingId(null)
    }
    function handleCancel() {
      setEditingId(null)
    }
    window.addEventListener('product-saved', handleSaved as EventListener)
    window.addEventListener(
      'product-edit-cancel',
      handleCancel as EventListener
    )
    return () => {
      window.removeEventListener('product-saved', handleSaved as EventListener)
      window.removeEventListener(
        'product-edit-cancel',
        handleCancel as EventListener
      )
    }
  }, [])

  return (
    <main className='min-h-screen bg-background-primary text-text-primary px-6 py-10 container mx-auto'>
      <AdminNav />
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-semibold'>Products</h1>
        <Link
          href='/admin/products/add'
          className='px-4 py-2 text-sm rounded-md bg-[var(--accent-orange)] text-black font-medium hover:bg-[var(--accent-orange)]/90'
        >
          Add Product
        </Link>
      </div>
      {message && <p className='text-sm text-red-400 mb-4'>{message}</p>}
      <div className='overflow-x-auto rounded-lg ring-1 ring-white/10'>
        <table className='w-full text-sm'>
          <thead className='bg-background-secondary/70 text-text-secondary'>
            <tr>
              <th className='text-left px-3 py-2'>Name</th>
              <th className='text-left px-3 py-2'>Category</th>
              <th className='text-left px-3 py-2'>Price</th>
              <th className='text-left px-3 py-2'>Qty</th>
              <th className='text-left px-3 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className='border-t border-white/5 hover:bg-white/5'
              >
                <td className='px-3 py-2 flex items-center gap-2'>
                  {p.cover_image && (
                    // eslint-disable-next-line @next/next/no-img-element -- small thumbnail; acceptable
                    <img
                      src={p.cover_image}
                      alt=''
                      className='w-8 h-8 object-cover rounded'
                      loading='lazy'
                      decoding='async'
                    />
                  )}
                  <span>{p.name}</span>
                </td>
                <td className='px-3 py-2'>{p.category || '—'}</td>
                <td className='px-3 py-2'>${p.price.toFixed(2)}</td>
                <td className='px-3 py-2'>{p.quantity}</td>
                <td className='px-3 py-2 flex gap-2'>
                  <button
                    onClick={() => setEditingId(p.id)}
                    className='px-2 py-1 rounded bg-white/10 hover:bg-white/20'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(p.id)}
                    className='px-2 py-1 rounded bg-red-600/80 hover:bg-red-600 text-white'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className='px-3 py-6 text-center text-text-secondary'
                >
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {editingId && <EditProductModal id={editingId} />}
    </main>
  )
}
