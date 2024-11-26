import { Link } from 'react-router-dom';
import { Camera, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Branding */}
          <div className="flex flex-col space-y-3">
            <Link to="/" className="flex items-center space-x-2">
              <Camera className="h-6 w-6" />
              <span className="font-bold">VintageLen</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Capturing moments through vintage lenses since 2024
            </p>
          </div>

          {/* Shop Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium">Shop</h4>
            <Link
              to="/products"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              All Products
            </Link>
            <Link
              to="/collections"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Collections
            </Link>
            <Link
              to="/about"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              About Us
            </Link>
          </div>

          {/* Support Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-medium">Support</h4>
            <Link
              to="/shipping"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Shipping Info
            </Link>
            <Link
              to="/returns"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Returns
            </Link>
            <Link
              to="/contact"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Contact Us
            </Link>
          </div>

          {/* Social & Newsletter */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-medium">Connect</h4>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 VintageLen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
