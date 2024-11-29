import { Product } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden transform-gpu motion-safe:transition-[transform,filter] motion-safe:duration-300 hover:translate-y-[-2px] hover:filter-[drop-shadow(0_8px_16px_rgb(0_0_0_/0.1))]">
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transform-gpu transition-transform duration-300 group-hover:scale-105"
          />
          {product.type === 'vintage' && (
            <div className="absolute left-3 top-3">
              <Badge
                variant="secondary"
                className="gap-1 bg-black/70 text-white"
              >
                <Camera className="h-3 w-3" />
                Vintage
              </Badge>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-1.5 p-4">
          <h3 className="font-serif text-lg font-medium leading-none">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-semibold">
              ${product.price.toLocaleString()}
            </span>
            {product.badge && (
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {product.badge}
              </Badge>
            )}
          </div>
        </div>
      </Link>
      <div className="absolute inset-x-0 bottom-0 flex justify-center translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-background to-background/80 p-4 opacity-0 motion-safe:transition-[transform,opacity] motion-safe:duration-200 group-hover:opacity-100">
        <AddToCartButton product={product} />
      </div>
    </Card>
  );
}
