import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/lib/types';

interface FiltersSidebarProps {
  products: Product[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

interface Filters {
  type?: string[];
  brand?: string[];
  priceRange?: [number, number];
  condition?: string[];
}

export function FiltersSidebar({
  products,
  filters,
  setFilters,
}: FiltersSidebarProps) {
  // Obtener valores únicos de los productos
  const types = Array.from(new Set(products.map((p) => p.type)));
  const brands = Array.from(new Set(products.map((p) => p.brand)));
  const conditions = Array.from(new Set(products.map((p) => p.condition)));

  // Obtener rango de precios
  const prices = products.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const handleTypeChange = (type: string, checked: boolean) => {
    const currentTypes = filters.type || [];
    const newTypes = checked
      ? [...currentTypes, type]
      : currentTypes.filter((t) => t !== type);
    setFilters({ ...filters, type: newTypes });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const currentBrands = filters.brand || [];
    const newBrands = checked
      ? [...currentBrands, brand]
      : currentBrands.filter((b) => b !== brand);
    setFilters({ ...filters, brand: newBrands });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    const currentConditions = filters.condition || [];
    const newConditions = checked
      ? [...currentConditions, condition]
      : currentConditions.filter((c) => c !== condition);
    setFilters({ ...filters, condition: newConditions });
  };

  return (
    <div className="space-y-6">
      {/* Type Filter */}
      <div>
        <h3 className="mb-4 font-medium">Type</h3>
        <div className="space-y-3">
          {types.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`type-${type}`}
                className="accent-primary"
                checked={filters.type?.includes(type) || false}
                onChange={(e) => handleTypeChange(type, e.target.checked)}
              />
              <label htmlFor={`type-${type}`} className="text-sm capitalize">
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
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                className="accent-primary"
                checked={filters.brand?.includes(brand) || false}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
              />
              <label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Condition Filter */}
      <div>
        <h3 className="mb-4 font-medium">Condition</h3>
        <div className="space-y-3">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`condition-${condition}`}
                className="accent-primary"
                checked={filters.condition?.includes(condition) || false}
                onChange={(e) =>
                  handleConditionChange(condition, e.target.checked)
                }
              />
              <label
                htmlFor={`condition-${condition}`}
                className="text-sm capitalize"
              >
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
            <Input
              type="number"
              placeholder={`Min (${minPrice})`}
              className="h-8"
              value={filters.priceRange?.[0] || ''}
              onChange={(e) => {
                const min = Number(e.target.value);
                setFilters({
                  ...filters,
                  priceRange: [min, filters.priceRange?.[1] || maxPrice],
                });
              }}
            />
            <Input
              type="number"
              placeholder={`Max (${maxPrice})`}
              className="h-8"
              value={filters.priceRange?.[1] || ''}
              onChange={(e) => {
                const max = Number(e.target.value);
                setFilters({
                  ...filters,
                  priceRange: [filters.priceRange?.[0] || minPrice, max],
                });
              }}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setFilters({ ...filters, priceRange: undefined })}
          >
            Reset Price
          </Button>
        </div>
      </div>
    </div>
  );
}
