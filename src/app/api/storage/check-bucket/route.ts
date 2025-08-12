import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { PRODUCT_IMAGE_BUCKET } from '@/lib/constants'

export async function GET() {
  try {
    const storage = supabaseAdmin.storage as unknown as {
      listBuckets?: () => Promise<{
        data: { name: string }[] | null
        error: { message: string } | null
      }>
      getBuckets?: () => Promise<{
        data: { name: string }[] | null
        error: { message: string } | null
      }>
    }
    const listFn = storage.listBuckets || storage.getBuckets
    if (!listFn) throw new Error('Bucket listing not supported in SDK.')
    const { data, error } = await listFn.call(storage)
    if (error) throw error
    const buckets: { name: string }[] = data || []
    const exists = buckets.some((b) => b.name === PRODUCT_IMAGE_BUCKET)
    return NextResponse.json({ exists })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
