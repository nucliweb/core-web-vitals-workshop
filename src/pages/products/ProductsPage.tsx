import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ProductGrid } from '@/components/products/ProductGrid/ProductGrid';
import { FiltersSidebar } from '@/components/products/FiltersSidebar/FiltersSidebar';
import { ActiveFilters } from '@/components/products/ActiveFilters/ActiveFilters';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { Product } from '@/lib/types';

// Interfaces
interface Filters {
  type?: string[];
  brand?: string[];
  priceRange?: [number, number];
  condition?: string[];
}

interface FiltersSidebarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

// Mock data - Luego vendrá de una API
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Leica M6',
    description: 'Classic rangefinder camera, newly remastered',
    price: 2999,
    images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd'],
    type: 'vintage',
    brand: 'Leica',
    year: 1984,
    condition: 'excellent',
    specs: {
      format: '35mm',
      lens: 'Interchangeable M-mount',
      shutter: 'Horizontal cloth focal plane',
      viewfinder: '0.72x magnification',
    },
    inStock: true,
    featured: true,
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Hasselblad 500C/M',
    description: 'Medium format film camera with waist-level finder',
    price: 3499,
    images: ['https://images.unsplash.com/photo-1606986642222-8e84e1f72362'],
    type: 'vintage',
    brand: 'Hasselblad',
    year: 1970,
    condition: 'mint',
    specs: {
      format: '120 film',
      lens: 'Carl Zeiss 80mm f/2.8',
      shutter: 'Leaf shutter',
      viewfinder: 'Waist-level finder',
    },
    inStock: true,
    badge: 'Limited',
  },
  {
    id: 3,
    name: 'Rolleiflex 2.8F',
    description: 'Twin-lens reflex camera in pristine condition',
    price: 2499,
    images: ['https://images.unsplash.com/photo-1495121553079-4c61bcce1894'],
    type: 'vintage',
    brand: 'Rolleiflex',
    year: 1960,
    condition: 'excellent',
    specs: {
      format: '120 film',
      lens: 'Zeiss Planar 80mm f/2.8',
      shutter: 'Synchro-Compur',
      viewfinder: 'Waist-level finder',
    },
    inStock: true,
    badge: 'Rare',
  },
  {
    id: 4,
    name: 'Canon AE-1',
    description: 'Iconic 35mm SLR camera from the late 70s',
    price: 499,
    images: ['https://images.unsplash.com/photo-1494048224544-ad28721c6b0c'],
    type: 'vintage',
    brand: 'Canon',
    year: 1976,
    condition: 'good',
    specs: {
      format: '35mm',
      lens: 'Canon FD 50mm f/1.8',
      shutter: 'Electronically controlled cloth focal plane',
      viewfinder: 'Fixed eye-level pentaprism',
    },
    inStock: true,
    featured: true,
  },
  {
    id: 5,
    name: 'Nikon F3',
    description: 'Professional 35mm SLR camera',
    price: 799,
    images: ['https://images.unsplash.com/photo-1451339695756-b4265b334584'],
    type: 'vintage',
    brand: 'Nikon',
    year: 1980,
    condition: 'excellent',
    specs: {
      format: '35mm',
      lens: 'Nikkor 50mm f/1.4',
      shutter: 'Electronically controlled titanium shutter',
      viewfinder: 'DE-2 prism finder',
    },
    inStock: true,
  },
  {
    id: 6,
    name: 'Mamiya RB67',
    description: 'Professional medium format camera',
    price: 1499,
    images: ['https://images.unsplash.com/photo-1496231372132-545be5dae5f5'],
    type: 'vintage',
    brand: 'Mamiya',
    year: 1970,
    condition: 'good',
    specs: {
      format: '120/220 film',
      lens: 'Mamiya-Sekor 90mm f/3.8',
      shutter: 'Seiko #1',
      viewfinder: 'Waist-level finder',
    },
    inStock: true,
    badge: 'Popular',
  },
  {
    id: 7,
    name: 'Pentax 67',
    description: 'Medium format SLR camera',
    price: 1299,
    images: ['https://images.unsplash.com/photo-1496285705189-c290050257f1'],
    type: 'vintage',
    brand: 'Pentax',
    year: 1969,
    condition: 'excellent',
    specs: {
      format: '120/220 film',
      lens: 'SMC Takumar 105mm f/2.4',
      shutter: 'Focal plane',
      viewfinder: 'Pentaprism',
    },
    inStock: true,
  },
  {
    id: 8,
    name: 'Olympus OM-1',
    description: 'Compact 35mm SLR camera',
    price: 599,
    images: ['https://images.unsplash.com/photo-1471206577725-043203b9f500'],
    type: 'vintage',
    brand: 'Olympus',
    year: 1972,
    condition: 'good',
    specs: {
      format: '35mm',
      lens: 'Zuiko 50mm f/1.8',
      shutter: 'Mechanical focal plane',
      viewfinder: 'Fixed pentaprism',
    },
    inStock: true,
  },
  {
    id: 9,
    name: 'Minolta X-700',
    description: 'Advanced 35mm SLR camera',
    price: 399,
    images: ['https://images.unsplash.com/photo-1473876637954-4b493d59f84c'],
    type: 'vintage',
    brand: 'Minolta',
    year: 1981,
    condition: 'excellent',
    specs: {
      format: '35mm',
      lens: 'MD Rokkor 50mm f/1.7',
      shutter: 'Electronically controlled',
      viewfinder: 'Fixed pentaprism',
    },
    inStock: true,
  },
  {
    id: 10,
    name: 'Yashica Mat-124G',
    description: 'Twin-lens reflex medium format camera',
    price: 699,
    images: ['https://images.unsplash.com/photo-1484264121943-78dd345bd494'],
    type: 'vintage',
    brand: 'Yashica',
    year: 1970,
    condition: 'good',
    specs: {
      format: '120 film',
      lens: 'Yashinon 80mm f/3.5',
      shutter: 'Copal-SV',
      viewfinder: 'Waist-level finder',
    },
    inStock: true,
  },
];

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to high', value: 'price_asc' },
  { label: 'Price: High to low', value: 'price_desc' },
];

export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // Aplicar filtros y búsqueda
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Aplicar término de búsqueda
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Filtrar por tipo
      if (filters.type?.length && !filters.type.includes(product.type)) {
        return false;
      }

      // Filtrar por marca
      if (filters.brand?.length && !filters.brand.includes(product.brand)) {
        return false;
      }

      // Filtrar por condición
      if (
        filters.condition?.length &&
        !filters.condition.includes(product.condition)
      ) {
        return false;
      }

      // Filtrar por rango de precio
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (product.price < min || product.price > max) {
          return false;
        }
      }

      return true;
    });
  }, [mockProducts, filters, searchTerm]);

  // Ordenar productos
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sort) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'newest':
          // Si el año no está definido, tratar como el más antiguo
          const yearA = a.year || 0;
          const yearB = b.year || 0;
          return yearB - yearA;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sort]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header con contador de resultados */}
        <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight">
              All Cameras
              {sortedProducts.length > 0 && (
                <span className="ml-2 text-lg font-normal text-muted-foreground">
                  ({sortedProducts.length} items)
                </span>
              )}
            </h1>
            <p className="mt-1 text-muted-foreground">
              Browse our collection of vintage and professional cameras
            </p>
          </div>

          {/* Sort and Search */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Search cameras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sm:w-[250px]"
            />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-8rem)]">
                  <FiltersSidebar
                    products={mockProducts}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-[220px_1fr]">
          {/* Desktop Filters */}
          <aside className="hidden md:block">
            <FiltersSidebar
              products={mockProducts}
              filters={filters}
              setFilters={setFilters}
            />
          </aside>

          {/* Product Grid con ActiveFilters */}
          <main>
            <ActiveFilters
              filters={filters}
              setFilters={setFilters}
              totalResults={sortedProducts.length}
              searchTerm={searchTerm}
              onClearSearch={() => setSearchTerm('')}
            />

            {sortedProducts.length > 0 ? (
              <ProductGrid products={sortedProducts} />
            ) : (
              <div className="flex min-h-[400px] items-center justify-center text-center">
                <div className="max-w-md space-y-2">
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or search term.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setFilters({});
                      setSearchTerm('');
                      setSort('newest');
                    }}
                  >
                    Reset all filters
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
