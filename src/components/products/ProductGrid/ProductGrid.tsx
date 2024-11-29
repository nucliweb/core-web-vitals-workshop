import { Product } from '@/lib/types';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton';
import { Advertisement } from '@/components/common/Advertisement';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            Loading...
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-12">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or search term
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* Top advertisement - visible immediately */}
      <div className="col-span-full w-full">
        <Advertisement width={728} height={90} />
      </div>

      {products.map((product, index) => (
        <div key={product.id}>
          <ProductCard product={product} />
          {/* Add advertisements after first and second products */}
          {(index === 0 || index === 1) && (
            <div className="col-span-full w-full">
              <Advertisement width={300} height={250} />
            </div>
          )}
          {/* Additional ads every 4 products after the initial ones */}
          {index > 1 && (index + 1) % 4 === 0 && (
            <div className="col-span-full w-full">
              {index % 2 === 0 ? (
                <Advertisement width={300} height={250} />
              ) : (
                <Advertisement width={728} height={90} />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
