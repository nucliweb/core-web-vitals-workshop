import { Link } from 'react-router-dom';

const menuItems = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/collections', label: 'Collections' },
  { path: '/about', label: 'About' },
  { path: '/shipping', label: 'Shipping' },
  { path: '/returns', label: 'Returns' },
  { path: '/contact', label: 'Contact' },
];

export function Navigation() {
  return (
    <nav data-section="main-navigation" className="flex gap-4">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="text-sm font-medium transition-colors hover:text-primary"
          data-analytics="menu-item"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
