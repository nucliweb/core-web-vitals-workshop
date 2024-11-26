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
        <div className="flex flex-wrap items-center gap-2">
          {searchTerm && (
            <Badge
              variant="secondary"
              className="animate-slide-in inline-flex h-7 items-center gap-1 px-3 text-sm"
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
              className="animate-slide-in inline-flex h-7 items-center gap-1 px-3 text-sm"
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

          {/* Repetir el mismo patrón para brand, condition, etc. */}
          {/* ... otros filtros ... */}

          {(hasActiveFilters || searchTerm) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="animate-fade-in h-7 px-3 text-sm font-normal hover:text-primary"
            >
              Clear all
            </Button>
          )}
        </div>

        <span className="flex h-7 items-center text-sm text-muted-foreground">
          {totalResults} {totalResults === 1 ? 'result' : 'results'}
        </span>
      </div>
    </div>
  );
}
