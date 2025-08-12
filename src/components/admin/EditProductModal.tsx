'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Props {
  id: string
  onClose: () => void
  onSaved: () => void
}

export function EditProductModal({ id, onClose, onSaved }: Props) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<any>({})
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle()
      if (!cancelled) {
        if (error) setMessage(error.message)
        setForm(data)
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  function onChange(e: any) {
    const { name, value } = e.target
    setForm((f: any) => ({ ...f, [name]: value }))
  }

  async function save() {
    setSaving(true)
    setMessage(null)
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: form.name,
          price: Number(form.price),
          quantity: Number(form.quantity),
          category: form.category || null,
          brand: form.brand || null,
          color: form.color || null,
          size: form.size || null,
          description: form.description || null,
          details: form.details || null,
        })
        .eq('id', id)
      if (error) throw error
      onSaved()
      onClose()
    } catch (e: any) {
      setMessage(e.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading)
    return (
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
        Loading…
      </div>
    )
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50'>
      <div className='w-full max-w-lg bg-background-secondary rounded-lg p-6 space-y-4 ring-1 ring-white/10'>
        <h3 className='text-lg font-semibold'>Edit Product</h3>
        <div className='grid grid-cols-2 gap-3 text-sm'>
          <label className='flex flex-col gap-1'>
            Name
            <input
              name='name'
              value={form?.name || ''}
              onChange={onChange}
              className='input'
            />
          </label>
          <label className='flex flex-col gap-1'>
            Price
            <input
              name='price'
              value={form?.price || ''}
              onChange={onChange}
              className='input'
            />
          </label>
          <label className='flex flex-col gap-1'>
            Qty
            <input
              name='quantity'
              value={form?.quantity || ''}
              onChange={onChange}
              className='input'
            />
          </label>
          <label className='flex flex-col gap-1'>
            Category
            <input
              name='category'
              value={form?.category || ''}
              onChange={onChange}
              className='input'
            />
          </label>
          <label className='flex flex-col gap-1'>
            Brand
            <input
              name='brand'
              value={form?.brand || ''}
              onChange={onChange}
              className='input'
            />
          </label>
          <label className='flex flex-col gap-1'>
            Color
            <input
              name='color'
              value={form?.color || ''}
              onChange={onChange}
              className='input'
            />
          </label>
          <label className='flex flex-col gap-1'>
            Size
            <input
              name='size'
              value={form?.size || ''}
              onChange={onChange}
              className='input'
            />
          </label>
        </div>
        <label className='flex flex-col gap-1 text-sm'>
          Description
          <textarea
            name='description'
            value={form?.description || ''}
            onChange={onChange}
            className='input resize-y'
            rows={3}
          />
        </label>
        <label className='flex flex-col gap-1 text-sm'>
          Details
          <textarea
            name='details'
            value={form?.details || ''}
            onChange={onChange}
            className='input resize-y'
            rows={3}
          />
        </label>
        {message && <p className='text-xs text-red-400'>{message}</p>}
        <div className='flex justify-end gap-3 pt-2'>
          <button
            onClick={onClose}
            className='px-4 py-2 text-sm rounded-md bg-white/10 hover:bg-white/20'
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className='px-4 py-2 text-sm rounded-md bg-[var(--accent-orange)] text-black disabled:opacity-50'
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
        <style jsx>{`
          .input {
            @apply w-full px-3 py-1.5 rounded-md bg-background-primary border border-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--accent-orange)];
          }
        `}</style>
      </div>
    </div>
  )
}
