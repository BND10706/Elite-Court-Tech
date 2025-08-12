'use client'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { PRODUCT_IMAGE_BUCKET } from '@/lib/constants'

type FormState = {
  name: string
  category: string
  brand: string
  price: string
  quantity: string
  color: string
  size: string
  description: string
  details: string
}

const initial: FormState = {
  name: '',
  category: '',
  brand: '',
  price: '',
  quantity: '',
  color: '',
  size: '',
  description: '',
  details: '',
}

function slugify(v: string) {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export default function ProductForm({
  onCreated,
}: { onCreated?: () => void } = {}) {
  const [form, setForm] = useState<FormState>(initial)
  const [files, setFiles] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [createdId, setCreatedId] = useState<string | null>(null)
  const [stage, setStage] = useState<string>('idle')

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    setCreatedId(null)
    if (!form.name.trim()) return setMessage('Name required')
    if (!form.price || isNaN(Number(form.price)))
      return setMessage('Valid price required')
    const priceNum = Number(form.price)
    const quantityNum = form.quantity ? Number(form.quantity) : 0
    if (isNaN(quantityNum)) return setMessage('Quantity must be a number')
    setSubmitting(true)
    try {
      const id = crypto.randomUUID()
      const slug = slugify(form.name)

      setStage('uploading-images')
      // 1. Upload images (if any)
      const imageUrls: string[] = []
      for (let i = 0; i < files.length; i++) {
        const f = files[i]
        const path = `${id}/${i}-${f.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
        const { error: upErr } = await supabase.storage
          .from(PRODUCT_IMAGE_BUCKET)
          .upload(path, f, { upsert: false })
        if (upErr) throw upErr
        const { data: pub } = supabase.storage
          .from(PRODUCT_IMAGE_BUCKET)
          .getPublicUrl(path)
        imageUrls.push(pub.publicUrl)
      }

      setStage('inserting-product')
      // 2. Insert product
      const { data: productData, error: prodErr } = await supabase
        .from('products')
        .insert({
          id,
          name: form.name.trim(),
          slug,
          category: form.category || null,
          brand: form.brand || null,
          description: form.description || null,
          details: form.details || null,
          color: form.color || null,
          size: form.size || null,
          price: priceNum,
          quantity: quantityNum,
          cover_image: imageUrls[0] || null,
        })
        .select('id')
        .maybeSingle()
      if (prodErr) throw prodErr

      setStage('inserting-images')
      // 3. Insert images
      if (imageUrls.length) {
        const rows = imageUrls.map((url, idx) => ({
          product_id: id,
          url,
          position: idx,
        }))
        const { error: imgErr } = await supabase
          .from('product_images')
          .insert(rows)
        if (imgErr) throw imgErr
      }

      setCreatedId(productData?.id || id)
      setStage('done')
      setMessage('Product created successfully.')
      setForm(initial)
      setFiles([])
      onCreated?.()
    } catch (err: unknown) {
      let msg = err instanceof Error ? err.message : 'Create failed'
      if (/bucket/i.test(msg) && /not.*found/i.test(msg)) {
        msg = `Bucket not found. Create a public bucket named "${PRODUCT_IMAGE_BUCKET}" in Supabase Storage.`
      }
      setMessage(`${msg} (stage: ${stage})`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='p-6 rounded-lg bg-[var(--background-secondary)] ring-1 ring-white/10'>
      <h2 className='text-sm font-semibold tracking-wide text-[var(--accent-orange)] mb-4'>
        Add Product
      </h2>
      <form onSubmit={onSubmit} className='space-y-4'>
        <div className='grid md:grid-cols-2 gap-4'>
          <Field label='Name'>
            <input
              name='name'
              value={form.name}
              onChange={onChange}
              required
              className='input'
            />
          </Field>
          <Field label='Category'>
            <input
              name='category'
              value={form.category}
              onChange={onChange}
              className='input'
            />
          </Field>
          <Field label='Brand'>
            <input
              name='brand'
              value={form.brand}
              onChange={onChange}
              className='input'
            />
          </Field>
          <Field label='Price (USD)'>
            <input
              name='price'
              value={form.price}
              onChange={onChange}
              required
              inputMode='decimal'
              className='input'
            />
          </Field>
          <Field label='Quantity'>
            <input
              name='quantity'
              value={form.quantity}
              onChange={onChange}
              inputMode='numeric'
              className='input'
            />
          </Field>
          <Field label='Color'>
            <input
              name='color'
              value={form.color}
              onChange={onChange}
              className='input'
            />
          </Field>
          <Field label='Size'>
            <input
              name='size'
              value={form.size}
              onChange={onChange}
              className='input'
            />
          </Field>
          <Field label='Images'>
            <input
              type='file'
              multiple
              onChange={onFiles}
              className='block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-[var(--accent-orange)] file:text-black file:text-sm hover:file:bg-[var(--accent-orange)]/90'
            />
            {files.length > 0 && (
              <p className='mt-1 text-xs text-text-secondary'>
                {files.length} image(s) selected
              </p>
            )}
          </Field>
        </div>
        <Field label='Description'>
          <textarea
            name='description'
            value={form.description}
            onChange={onChange}
            rows={3}
            className='input resize-y'
          />
        </Field>
        <Field label='Details'>
          <textarea
            name='details'
            value={form.details}
            onChange={onChange}
            rows={4}
            className='input resize-y'
          />
        </Field>
        <div className='flex items-center gap-4 pt-2'>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-2 rounded-md bg-[var(--accent-orange)] text-black font-medium hover:bg-[var(--accent-orange)]/90 disabled:opacity-60'
          >
            {submitting ? 'Saving…' : 'Create Product'}
          </button>
          {message && (
            <span className='text-sm text-[var(--accent-orange)]'>
              {message}
            </span>
          )}
        </div>
        {createdId && (
          <p className='text-xs text-text-secondary'>
            New product id: {createdId}
          </p>
        )}
        {stage !== 'idle' && stage !== 'done' && (
          <p className='text-[10px] text-text-secondary/60'>Stage: {stage}</p>
        )}
      </form>
      <style jsx>{`
        .input {
          @apply block w-full px-4 py-2 text-text-primary placeholder-text-secondary bg-background-secondary border border-text-secondary/20 rounded-lg focus:border-[var(--accent-orange)] focus:ring-[var(--accent-orange)] focus:outline-none focus:ring focus:ring-opacity-40;
        }
      `}</style>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className='text-sm text-text-secondary flex flex-col gap-1'>
      <span className='font-medium text-text-secondary'>{label}</span>
      {children}
    </label>
  )
}
