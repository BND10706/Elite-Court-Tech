import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { PRODUCT_IMAGE_BUCKET } from '@/lib/constants'

export async function POST() {
  try {
    const storageAny = supabaseAdmin.storage as any
    const listFn = storageAny.listBuckets || storageAny.getBuckets
    const { data, error } = await listFn.call(storageAny)
    if (error) throw error
    const buckets: { name: string }[] = data || []
    if (!buckets.some((b) => b.name === PRODUCT_IMAGE_BUCKET)) {
      const { error: createErr } = await storageAny.createBucket?.(
        PRODUCT_IMAGE_BUCKET,
        { public: true }
      )
      if (createErr) throw createErr
      return NextResponse.json({ created: true })
    }
    return NextResponse.json({ created: false, message: 'Already exists' })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
