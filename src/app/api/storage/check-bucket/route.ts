import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { PRODUCT_IMAGE_BUCKET } from '@/lib/constants'

export async function GET() {
  try {
    const storageAny = supabaseAdmin.storage as any
    const listFn = storageAny.listBuckets || storageAny.getBuckets
    if (!listFn) throw new Error('Bucket listing not supported in SDK.')
    const { data, error } = await listFn.call(storageAny)
    if (error) throw error
    const buckets: { name: string }[] = data || []
    const exists = buckets.some((b) => b.name === PRODUCT_IMAGE_BUCKET)
    return NextResponse.json({ exists })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
