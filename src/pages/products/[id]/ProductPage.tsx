import { useParams } from 'react-router-dom';
import { products } from '@/lib/data/products';
import { ProductGallery } from '@/components/products/ProductGallery/ProductGallery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, ShoppingCart } from 'lucide-react';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container py-32 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4 text-muted-foreground">
          The product you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Galería de imágenes */}
        <div>
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Información del producto */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {product.brand}
              </p>
            </div>
            <div className="flex gap-2">
              {product.type === 'vintage' && (
                <Badge variant="secondary" className="gap-1">
                  <Camera className="h-3 w-3" />
                  Vintage
                </Badge>
              )}
              {product.badge && (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {product.badge}
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-6">
            <span className="text-3xl font-bold">
              ${product.price.toLocaleString()}
            </span>
          </div>

          <p className="mt-6 text-muted-foreground">{product.description}</p>

          <div className="mt-6">
            <Button size="lg" className="w-full gap-2 md:w-auto">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          {/* Aquí irá el Accordion con las especificaciones */}
        </div>
      </div>
    </div>
  );
}
