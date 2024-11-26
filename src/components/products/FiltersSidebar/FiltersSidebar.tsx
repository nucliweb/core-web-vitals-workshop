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
  inStock?: boolean;
  badge?: string[];
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
  const badges = Array.from(
    new Set(products.map((p) => p.badge).filter(Boolean))
  ) as string[];

  // Obtener rango de precios
  const prices = products.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

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
                onChange={(e) => {
                  const currentTypes = filters.type || [];
                  const newTypes = e.target.checked
                    ? [...currentTypes, type]
                    : currentTypes.filter((t) => t !== type);
                  setFilters({ ...filters, type: newTypes });
                }}
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
                onChange={(e) => {
                  const currentBrands = filters.brand || [];
                  const newBrands = e.target.checked
                    ? [...currentBrands, brand]
                    : currentBrands.filter((b) => b !== brand);
                  setFilters({ ...filters, brand: newBrands });
                }}
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
                onChange={(e) => {
                  const currentConditions = filters.condition || [];
                  const newConditions = e.target.checked
                    ? [...currentConditions, condition]
                    : currentConditions.filter((c) => c !== condition);
                  setFilters({ ...filters, condition: newConditions });
                }}
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

      {/* Badge Filter */}
      {badges.length > 0 && (
        <div>
          <h3 className="mb-4 font-medium">Special Offers</h3>
          <div className="space-y-3">
            {badges.map((badge) => (
              <div key={badge} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`badge-${badge}`}
                  className="accent-primary"
                  checked={filters.badge?.includes(badge) || false}
                  onChange={(e) => {
                    const currentBadges = filters.badge || [];
                    const newBadges = e.target.checked
                      ? [...currentBadges, badge]
                      : currentBadges.filter((b) => b !== badge);
                    setFilters({ ...filters, badge: newBadges });
                  }}
                />
                <label htmlFor={`badge-${badge}`} className="text-sm">
                  {badge}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stock Filter */}
      <div>
        <h3 className="mb-4 font-medium">Availability</h3>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="inStock"
            className="accent-primary"
            checked={filters.inStock || false}
            onChange={(e) => {
              setFilters({ ...filters, inStock: e.target.checked });
            }}
          />
          <label htmlFor="inStock" className="text-sm">
            In Stock Only
          </label>
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
