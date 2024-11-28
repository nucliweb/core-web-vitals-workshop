import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } =
    useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs"
            >
              {totalItems}
            </Badge>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? 'Your cart is empty'
              : `You have ${totalItems} item${totalItems === 1 ? '' : 's'} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {items.length > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-4 overflow-auto py-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <div className="h-16 w-16 overflow-hidden rounded-md">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(product.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeItem(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">{formatPrice(totalPrice)}</span>
                </div>
                <Button className="w-full">Checkout</Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-medium">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Add some products to your cart
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}