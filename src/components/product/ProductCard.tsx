import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '@/lib/data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card
      data-product-id={product.id}
      data-product-name={product.name}
      data-product-price={product.price}
    >
      <CardHeader>
        <Link 
          to={`/products/${product.id}`}
          data-analytics="product-link"
        >
          <CardTitle>{product.name}</CardTitle>
        </Link>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-square relative">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-lg font-semibold">${product.price}</div>
        <Button
          onClick={() => onAddToCart(product)}
          data-analytics="buy-button"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
