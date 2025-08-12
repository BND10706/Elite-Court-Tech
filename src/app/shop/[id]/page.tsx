import { notFound } from 'next/navigation'
import { products, getProduct } from '@/data/products'
import type { Metadata } from 'next'
import React from 'react'
import { ProductClient } from '@/components/product/ProductClient'

type Props = { params: { id: string } }

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.id)
  if (!product) return { title: 'Product Not Found | Elite Court Tech' }
  return {
    title: `${product.name} | Elite Court Tech`,
    description: product.description,
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.id)
  if (!product) notFound()
  return <ProductClient product={product} />
}
