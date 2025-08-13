import { notFound } from 'next/navigation'
import ProductClient from './product-client'

export type Product = {
  id: string
  name: string
  slug: string | null
  category: string | null
  brand: string | null
  description: string | null
  details: string | null
  color: string | null
  size: string | null
  quantity: number | null
  price: number
  cover_image: string | null
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      apikey: supabaseAnonKey || '',
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    // Ensure fresh data for each build; during dev it's fine
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error(`Failed fetch ${res.status}`)
  return res.json() as Promise<T>
}

export async function generateStaticParams() {
  if (!supabaseUrl || !supabaseAnonKey) return []
  try {
    const data = await fetchJSON<{ id: string }[]>(
      `${supabaseUrl}/rest/v1/products?select=id`
    )
    return data.map((p) => ({ id: p.id }))
  } catch {
    return []
  }
}

// Use loose props typing to satisfy Next's internal PageProps constraint (params is expected as Promise|undefined internally)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductPage(props: any) {
  const params = await props?.params // awaiting plain object is safe (returns value)
  const id = params?.id as string | undefined
  if (!id) notFound()
  if (!supabaseUrl || !supabaseAnonKey) notFound()
  let product: Product | null = null
  try {
    const data = await fetchJSON<Product[]>(
      `${supabaseUrl}/rest/v1/products?select=id,name,slug,category,brand,description,details,color,size,quantity,price,cover_image&id=eq.${id}`
    )
    product = data[0] || null
  } catch {
    /* ignore */
  }
  if (!product) notFound()
  return <ProductClient product={product} />
}
