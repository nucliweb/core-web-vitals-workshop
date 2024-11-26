import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

interface MobileNavProps {
  onNavigate?: () => void;
}

export function MobileNav({ onNavigate }: MobileNavProps) {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <Link to="/" className="flex items-center space-x-2" onClick={onNavigate}>
        <Camera className="h-6 w-6" />
        <span className="font-bold">VintageLen</span>
      </Link>
      <div className="flex flex-col space-y-3">
        <Link
          to="/products"
          className="text-muted-foreground transition-colors hover:text-primary"
          onClick={onNavigate}
        >
          Products
        </Link>
        <Link
          to="/collections"
          className="text-muted-foreground transition-colors hover:text-primary"
          onClick={onNavigate}
        >
          Collections
        </Link>
        <Link
          to="/about"
          className="text-muted-foreground transition-colors hover:text-primary"
          onClick={onNavigate}
        >
          About
        </Link>
      </div>
    </div>
  );
}
