import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/lib/types'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AddToCartButtonProps {
  product: Product
  className?: string
  size?: 'default' | 'sm' | 'lg'
}

const trackAddToCart = (product: Product) => {
  console.log('Tracking add to cart:', {
    event: 'add_to_cart',
    product_id: product.id,
    product_name: product.name,
    price: product.price
  })
}

export function AddToCartButton({ 
  product, 
  className,
  size = 'default' 
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      trackAddToCart(product)
      await addItem(product)
      setIsAdding(false)
      setAdded(true)
      setAdded(false)
    } catch (error) {
      setIsAdding(false)
    }
  }

  return (
    <Button
      size={size}
      className={cn('gap-2', className)}
      onClick={handleAddToCart}
      disabled={!product.inStock || isAdding}
    >
      <ShoppingCart className={cn(
        'h-4 w-4',
        size === 'lg' && 'h-5 w-5'
      )} />
      {!product.inStock
        ? 'Out of Stock'
        : isAdding
        ? 'Adding to Cart...'
        : added
        ? 'Added to Cart!'
        : 'Add to Cart'}
    </Button>
  )
}
