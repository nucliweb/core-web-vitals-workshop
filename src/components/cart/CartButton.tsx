import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCart } from '@/contexts/CartContext'
import { CartItems } from './CartItems'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'

export function CartButton() {
  const { totalItems, totalPrice } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-2xl">Shopping Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 pr-6">
          <CartItems onClose={() => setOpen(false)} />
        </ScrollArea>
        {totalItems > 0 && (
          <div className="space-y-4 pr-6">
            <div className="space-y-1.5 text-sm">
              <div className="flex">
                <span className="flex-1">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex">
                <span className="flex-1">Total</span>
                <span className="font-semibold">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
