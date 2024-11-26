import { Product } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Camera, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
      <div className="absolute -bottom-12 left-0 right-0 flex justify-center bg-gradient-to-t from-background to-background/80 p-4 opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100">
        <Button className="w-full gap-2">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
