import { NextResponse } from 'next/server'
export const dynamic = 'force-static'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { PRODUCT_IMAGE_BUCKET } from '@/lib/constants'

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured' },
        { status: 500 }
      )
    }
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
