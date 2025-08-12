export type Product = {
  id: string
  name: string
  category: string
  price: number
  image: string
  brand?: string
  description?: string
  color?: string
  size?: string
  quantity?: number
  details?: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'The Catalyzer',
    category: 'TRAINING',
    price: 16.0,
    image: 'https://dummyimage.com/600x600',
    brand: 'Elite Court',
    description:
      'High-performance training aid designed to accelerate footwork and reaction speed during competitive drills.',
    color: 'Orange/Black',
    size: 'Standard',
    quantity: 12,
    details:
      'Durable composite shell, impact-diffusion core, moisture resistant surface. Wipes clean after sessions.',
  },
  {
    id: '2',
    name: 'Shooting Stars',
    category: 'APPAREL',
    price: 21.15,
    image: 'https://dummyimage.com/601x601',
    brand: 'Elite Court',
    description:
      'Lightweight performance tee engineered for ventilation and full‑range rotational movement.',
    color: 'Midnight',
    size: 'Medium',
    quantity: 48,
    details:
      'Poly blend, flat-lock seams, anti-odor treatment, reflective micro-print accents.',
  },
  {
    id: '3',
    name: 'Neptune',
    category: 'EQUIPMENT',
    price: 12.0,
    image: 'https://dummyimage.com/602x602',
    brand: 'Elite Court',
    description:
      'Balanced practice ball offering consistent bounce and enhanced grip texture for advanced drills.',
    color: 'Blue',
    size: 'Official',
    quantity: 120,
    details:
      'Composite microfiber cover, moisture channel grooves, reinforced bladder.',
  },
  {
    id: '4',
    name: 'The 400 Blows',
    category: 'ACCESSORY',
    price: 18.4,
    image: 'https://dummyimage.com/603x603',
    brand: 'Elite Court',
    description:
      'Multi-position resistance band suite targeting explosive first‑step mechanics and lateral stability.',
    color: 'Carbon',
    size: 'Set',
    quantity: 32,
    details:
      'Four tension levels, carabiner anchor system, anti-snap layered latex construction.',
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}
