import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Datos de ejemplo - Luego podrían venir de una API
const featuredProducts = [
  {
    id: 1,
    name: 'Leica M6',
    description: 'Classic rangefinder camera, newly remastered',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd',
    badge: 'Bestseller',
    type: 'vintage',
  },
  {
    id: 2,
    name: 'Hasselblad 500C/M',
    description: 'Medium format film camera with waist-level finder',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1641414074870-78b70bb32369',
    badge: 'Limited',
    type: 'vintage', // Corregido a vintage
  },
  {
    id: 3,
    name: 'Rolleiflex 2.8F',
    description: 'Twin-lens reflex camera in pristine condition',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894',
    badge: 'Rare',
    type: 'vintage',
  },
];

export function FeaturedProducts() {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Featured Cameras
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Discover our handpicked selection of exceptional cameras, each one
            carefully restored and tested.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group relative overflow-hidden">
              {/* Product Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.type === 'vintage' && (
                  <div className="absolute left-4 top-4">
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

              {/* Product Info */}
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-serif text-xl font-semibold">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.badge && (
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary"
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Quick Add Button - Appears on Hover */}
              <div className="absolute -bottom-12 left-0 right-0 flex justify-center bg-gradient-to-t from-background to-background/80 p-4 opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100">
                <Button className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/products" className="gap-2">
              View All Products
              <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
