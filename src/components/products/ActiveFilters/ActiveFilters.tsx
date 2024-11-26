import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Filters } from '@/lib/types';

interface ActiveFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  totalResults: number;
  searchTerm?: string;
  onClearSearch?: () => void;
}

export function ActiveFilters({
  filters,
  setFilters,
  totalResults,
  searchTerm,
  onClearSearch,
}: ActiveFiltersProps) {
  const hasActiveFilters = Object.values(filters).some((value) =>
    Array.isArray(value) ? value.length > 0 : value !== undefined
  );

  const removeFilter = (type: keyof Filters, value: string) => {
    const newFilters = { ...filters };
    if (Array.isArray(newFilters[type])) {
      newFilters[type] = newFilters[type]?.filter((v) => v !== value);
      if (newFilters[type]?.length === 0) {
        delete newFilters[type];
      }
    }
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    onClearSearch?.();
  };

  if (!hasActiveFilters && !searchTerm) return null;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Contenedor izquierdo para filtros y botón clear */}
        <div className="flex flex-wrap items-center gap-2">
          {searchTerm && (
            <Badge
              variant="secondary"
              className="inline-flex h-7 items-center gap-1 px-3 text-sm"
            >
              Search: {searchTerm}
              <button
                onClick={onClearSearch}
                className="ml-1 rounded-full hover:text-primary"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove search term</span>
              </button>
            </Badge>
          )}

          {filters.type?.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="inline-flex h-7 items-center gap-1 px-3 text-sm"
            >
              Type: {type}
              <button
                onClick={() => removeFilter('type', type)}
                className="ml-1 rounded-full hover:text-primary"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {type} filter</span>
              </button>
            </Badge>
          ))}

          {filters.brand?.map((brand) => (
            <Badge
              key={brand}
              variant="secondary"
              className="inline-flex h-7 items-center gap-1 px-3 text-sm"
            >
              Brand: {brand}
              <button
                onClick={() => removeFilter('brand', brand)}
                className="ml-1 rounded-full hover:text-primary"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {brand} filter</span>
              </button>
            </Badge>
          ))}

          {filters.condition?.map((condition) => (
            <Badge
              key={condition}
              variant="secondary"
              className="inline-flex h-7 items-center gap-1 px-3 text-sm"
            >
              Condition: {condition}
              <button
                onClick={() => removeFilter('condition', condition)}
                className="ml-1 rounded-full hover:text-primary"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {condition} filter</span>
              </button>
            </Badge>
          ))}

          {filters.priceRange && (
            <Badge
              variant="secondary"
              className="inline-flex h-7 items-center gap-1 px-3 text-sm"
            >
              Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              <button
                onClick={() =>
                  setFilters({ ...filters, priceRange: undefined })
                }
                className="ml-1 rounded-full hover:text-primary"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove price filter</span>
              </button>
            </Badge>
          )}

          {(hasActiveFilters || searchTerm) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-7 px-3 text-sm font-normal hover:text-primary"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Contador de resultados */}
        <span className="flex h-7 items-center text-sm text-muted-foreground">
          {totalResults} {totalResults === 1 ? 'result' : 'results'}
        </span>
      </div>
    </div>
  );
}
