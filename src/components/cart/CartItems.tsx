import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

interface CartItemsProps {
  onClose?: () => void
}

export function CartItems({ onClose }: CartItemsProps) {
  const { items, removeItem, updateQuantity } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="mb-6 text-center text-sm text-gray-500">
          Your cart is empty
        </p>
        <Button asChild variant="outline" onClick={onClose}>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <ul className="divide-y">
      {items.map((item) => (
        <li key={item.product.id} className="flex gap-4 py-4">
          <div className="h-24 w-24 flex-none overflow-hidden rounded-md bg-gray-100">
            <img
              src={item.product.images[0]}
              alt={item.product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium">{item.product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  ${item.product.price.toLocaleString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => removeItem(item.product.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-auto flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  updateQuantity(item.product.id, Math.max(0, item.quantity - 1))
                }
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
