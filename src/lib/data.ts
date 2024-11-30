import { Product } from './types'

export const products: Product[] = [
  {
    id: 1,
    name: 'Vintage Camera X-1000',
    description: 'A classic film camera from the golden age of photography',
    price: 299.99,
    brand: 'RetroTech',
    type: 'vintage',
    inStock: true,
    badge: 'Popular',
    condition: 'excellent',
    specs: {
      format: '35mm Film',
      lens: 'Standard 50mm f/1.8',
      shutter: '1/1000',
      viewfinder: 'Split Image'
    },
    images: [
      'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=300&h=300'
    ]
  },
  {
    id: 2,
    name: 'Professional Camera Pro',
    description: 'High-end camera for professional photographers',
    price: 1299.99,
    brand: 'TechPro',
    type: 'professional',
    inStock: true,
    condition: 'mint',
    specs: {
      format: 'Full Frame',
      lens: 'Interchangeable',
      shutter: '1/8000',
      viewfinder: 'Electronic'
    },
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=300&h=300',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=300&h=300'
    ]
  }
]
