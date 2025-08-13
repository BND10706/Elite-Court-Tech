import { NextResponse } from 'next/server'
export const dynamic = 'force-static'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { PRODUCT_IMAGE_BUCKET } from '@/lib/constants'

export async function POST() {
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
      createBucket?: (
        name: string,
        opts: { public: boolean }
      ) => Promise<
        | { data?: unknown; error?: { message: string } | null }
        | { error?: { message: string } | null }
      >
    }
    const listFn = storage.listBuckets || storage.getBuckets
    if (!listFn) throw new Error('Bucket listing not supported in SDK.')
    const { data, error } = await listFn.call(storage)
    if (error) throw error
    const buckets: { name: string }[] = data || []
    if (!buckets.some((b) => b.name === PRODUCT_IMAGE_BUCKET)) {
      const createRes = await storage.createBucket?.(PRODUCT_IMAGE_BUCKET, {
        public: true,
      })
      const createErr =
        createRes && 'error' in createRes ? createRes.error : null
      if (createErr) throw createErr
      return NextResponse.json({ created: true })
    }
    return NextResponse.json({ created: false, message: 'Already exists' })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
