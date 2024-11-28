import { PageTransition } from '@/components/common/PageTransition';
import {
  RotateCcw,
  ClipboardList,
  Clock,
  CreditCard,
  PackageX,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function ReturnsPage() {
  return (
    <PageTransition>
      <div className="container py-12">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-lg bg-gray-900">
          <img
            src="/src/assets/images/returns-hero.jpg"
            alt="Returns and Refunds"
            className="h-[300px] w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
                Returns & Refunds
              </h1>
              <p className="mt-4 text-lg text-gray-200">
                Easy returns and hassle-free refunds
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Return Policy */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <RotateCcw className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Return Policy</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-2 w-2 rounded-full bg-primary"></span>
                <span>30-day return window for most items</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-2 w-2 rounded-full bg-primary"></span>
                <span>Item must be in original condition</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block h-2 w-2 rounded-full bg-primary"></span>
                <span>Original packaging required when possible</span>
              </li>
            </ul>
          </Card>

          {/* Return Process */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <ClipboardList className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Return Process</h2>
            </div>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  1
                </span>
                <span>Initiate return through your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  2
                </span>
                <span>Print return shipping label</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  3
                </span>
                <span>Pack item securely and attach label</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  4
                </span>
                <span>Drop off at shipping location</span>
              </li>
            </ol>
          </Card>

          {/* Processing Time */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Processing Time</h2>
            </div>
            <p className="text-muted-foreground">
              Once we receive your return, we'll inspect the item and process your
              refund within 3-5 business days. You'll receive an email notification
              at each step of the process.
            </p>
          </Card>

          {/* Refund Information */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Refund Information</h2>
            </div>
            <p className="text-muted-foreground">
              Refunds will be issued to the original payment method. Please allow
              5-10 business days for the refund to appear in your account after
              processing.
            </p>
          </Card>

          {/* Damaged Items */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <PackageX className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Damaged Items</h2>
            </div>
            <p className="text-muted-foreground">
              If you receive a damaged item, please contact us within 48 hours of
              delivery. Take photos of the damage and we'll help you process a
              return or replacement immediately.
            </p>
          </Card>

          {/* Satisfaction Guarantee */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Satisfaction Guarantee</h2>
            </div>
            <p className="text-muted-foreground">
              We stand behind the quality of our vintage cameras. If you're not
              completely satisfied with your purchase, we'll make it right.
            </p>
          </Card>
        </div>

        {/* Additional Image */}
        <div className="mt-8">
          <Card className="overflow-hidden">
            <img
              src="/src/assets/images/returns-vintage-cameras.jpg"
              alt="Vintage cameras collection"
              className="h-[300px] w-full object-cover"
            />
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
