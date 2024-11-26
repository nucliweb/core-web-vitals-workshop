import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight">
              All Cameras
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
                  <FiltersSidebar filters={filters} setFilters={setFilters} />
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-[220px_1fr]">
          {/* Desktop Filters */}
          <aside className="hidden md:block">
            <FiltersSidebar filters={filters} setFilters={setFilters} />
          </aside>

          {/* Product Grid */}
          <main>
            <ProductGrid products={mockProducts} />
          </main>
        </div>
      </div>
    </div>
  );
}

// Componente de Filtros
function FiltersSidebar({ filters, setFilters }: FiltersSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Type Filter */}
      <div>
        <h3 className="mb-4 font-medium">Type</h3>
        <div className="space-y-3">
          {['Vintage', 'Professional', 'Collector'].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <input type="checkbox" id={type} className="accent-primary" />
              <label htmlFor={type} className="text-sm">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="mb-4 font-medium">Brand</h3>
        <div className="space-y-3">
          {['Leica', 'Hasselblad', 'Rolleiflex', 'Nikon', 'Canon'].map(
            (brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <input type="checkbox" id={brand} className="accent-primary" />
                <label htmlFor={brand} className="text-sm">
                  {brand}
                </label>
              </div>
            )
          )}
        </div>
      </div>

      {/* Condition Filter */}
      <div>
        <h3 className="mb-4 font-medium">Condition</h3>
        <div className="space-y-3">
          {['Mint', 'Excellent', 'Good', 'Fair'].map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={condition}
                className="accent-primary"
              />
              <label htmlFor={condition} className="text-sm">
                {condition}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-4 font-medium">Price Range</h3>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Input type="number" placeholder="Min" className="h-8" />
            <Input type="number" placeholder="Max" className="h-8" />
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
