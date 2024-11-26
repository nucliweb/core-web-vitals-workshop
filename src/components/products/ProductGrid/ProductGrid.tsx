import { Product } from '@/lib/types';
import { ProductCard } from '../ProductCard/ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-center">
        <div className="max-w-md space-y-2">
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search term.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
