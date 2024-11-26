export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  type: 'vintage' | 'professional' | 'collector';
  brand: string;
  year?: number;
  condition: 'mint' | 'excellent' | 'good' | 'fair';
  specs: {
    format?: string;
    lens?: string;
    shutter?: string;
    viewfinder?: string;
    [key: string]: string | undefined;
  };
  inStock: boolean;
  featured?: boolean;
  badge?: string;
}

export interface Filters {
  type?: string[];
  brand?: string[];
  priceRange?: [number, number];
  condition?: string[];
  inStock?: boolean;
  badge?: string[];
}

export interface SortOption {
  label: string;
  value: string;
}
