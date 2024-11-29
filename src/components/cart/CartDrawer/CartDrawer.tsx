import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { GifModal } from '@/components/ui/gif-modal';

export function CartDrawer() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } =
    useCart();
  const [showGif, setShowGif] = useState(false);

  const handleCheckout = () => {
    console.log('Checkout clicked, setting showGif to true');
    setShowGif(true);
  };

  console.log('CartDrawer rendered, showGif:', showGif); // Debug log

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button variant="ghost" size="icon" className="relative">
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
          </button>
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
                        <button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{quantity}</span>
                        <button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeItem(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
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
                  <div>
                    <button
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      onClick={() => {
                        console.log('Native button clicked');
                        handleCheckout();
                      }}
                    >
                      Checkout 💰
                    </button>
                  </div>
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
      <GifModal isOpen={showGif} onClose={() => setShowGif(false)} />
    </>
  );
}
