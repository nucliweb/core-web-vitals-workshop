import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      <Link
        to="/products"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Products
      </Link>
      <Link
        to="/collections"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Collections
      </Link>
      <Link
        to="/about"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        About
      </Link>
    </nav>
  );
}
