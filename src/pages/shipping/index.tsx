import { PageTransition } from '@/components/common/PageTransition';
import { Truck, Globe2, PackageSearch, AlertTriangle, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function ShippingPage() {
  return (
    <PageTransition>
      <div className="container py-12">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-lg bg-gray-900">
          <img
            src="/images/shipping-hero.jpg"
            alt="Shipping worldwide"
            className="h-[300px] w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
                Shipping Information
              </h1>
              <p className="mt-4 text-lg text-gray-200">
                Fast, secure, and reliable shipping worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Delivery Times & Costs */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Delivery Times & Costs</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-2 w-2 rounded-full bg-primary"></span>
                <span>Standard Shipping (5-7 business days): Free for orders over $100</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-2 w-2 rounded-full bg-primary"></span>
                <span>Express Shipping (2-3 business days): $15</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-2 w-2 rounded-full bg-primary"></span>
                <span>Next Day Delivery (where available): $25</span>
              </li>
            </ul>
          </Card>

          {/* International Shipping */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <Globe2 className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">International Shipping</h2>
            </div>
            <p className="text-muted-foreground">
              We ship to most countries worldwide. International shipping costs and
              delivery times vary by location. Customs duties and taxes may apply.
            </p>
          </Card>

          {/* Tracking Your Order */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <PackageSearch className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Track Your Order</h2>
            </div>
            <p className="text-muted-foreground">
              Once your order ships, you'll receive a confirmation email with tracking
              information. You can track your package's progress at any time through
              your account dashboard.
            </p>
          </Card>

          {/* Shipping Restrictions */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Shipping Restrictions</h2>
            </div>
            <p className="text-muted-foreground">
              Some products may have shipping restrictions to certain countries due to
              local regulations. We'll notify you during checkout if any items in
              your cart cannot be shipped to your location.
            </p>
          </Card>

          {/* Package Protection */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Package Protection</h2>
            </div>
            <p className="text-muted-foreground">
              All our vintage cameras are carefully packaged to ensure they arrive
              safely. We use premium packaging materials and include extra protection
              for delicate items.
            </p>
          </Card>

          {/* Image Card */}
          <Card className="overflow-hidden">
            <img
              src="/images/shipping-packaging.jpg"
              alt="Careful packaging"
              className="h-full w-full object-cover"
            />
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
