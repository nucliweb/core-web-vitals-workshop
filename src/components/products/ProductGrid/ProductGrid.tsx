import { Product } from '@/lib/types';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton';
import { Advertisement } from '@/components/common/Advertisement';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
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
        <ErrorBoundary 
          errorType="info"
          autoReset={true}
          resetTimeout={3000}
          onError={(error, errorInfo) => {
            // Aquí podrías enviar el error a un servicio de tracking
            console.log('Ad error:', error, errorInfo);
          }}
        >
          <Advertisement width={728} height={90} />
        </ErrorBoundary>
      </div>

      {products.map((product, index) => (
        <div key={product.id}>
          <ProductCard product={product} />
          {/* Add advertisements after first and second products */}
          {(index === 0 || index === 1) && (
            <div className="col-span-full w-full">
              <ErrorBoundary
                errorType="warning"
                autoReset={true}
                resetTimeout={5000}
              >
                <Advertisement width={300} height={250} />
              </ErrorBoundary>
            </div>
          )}
          {/* Additional ads every 4 products after the initial ones */}
          {index > 1 && (index + 1) % 4 === 0 && (
            <div className="col-span-full w-full">
              {index % 2 === 0 ? (
                <ErrorBoundary
                  errorType="warning"
                  autoReset={true}
                  resetTimeout={5000}
                >
                  <Advertisement width={300} height={250} />
                </ErrorBoundary>
              ) : (
                <ErrorBoundary
                  errorType="warning"
                  autoReset={true}
                  resetTimeout={5000}
                >
                  <Advertisement width={728} height={90} />
                </ErrorBoundary>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
