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
import { products as mockProducts } from '@/lib/data/products';

// Interfaces
interface Filters {
  type?: string[];
  brand?: string[];
  priceRange?: [number, number];
  condition?: string[];
}

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

      // Filtrar por badge
      if (
        filters.badge?.length &&
        !filters.badge.includes(product.badge || '')
      ) {
        return false;
      }

      // Filtrar por stock
      if (filters.inStock && !product.inStock) {
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
