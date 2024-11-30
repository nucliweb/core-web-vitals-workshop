import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Camera, ShoppingBag } from 'lucide-react';

export function ImageHero() {
  return (
    <div className="relative min-h-[80vh] w-full">
      {/* Hero Image con optimizaciones para LCP */}
      <img
        src="https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=2000&q=80"
        srcSet="
          https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=800&q=80 800w,
          https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1200&q=80 1200w,
          https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=2000&q=80 2000w
        "
        sizes="100vw"
        alt="Vintage camera collection hero image"
        className="absolute inset-0 h-full w-full object-cover"
        decoding="sync"
        loading="eager"
      />

      {/* Gradientes para contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-32 md:px-6 lg:min-h-[80vh]">
        <div className="flex max-w-xl flex-col justify-center">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur">
            <Camera className="h-4 w-4" />
            Limited Time Collection
          </div>

          {/* Títulos optimizados para LCP */}
          <h1
            className="mt-6 font-serif text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl"
            style={{ contentVisibility: 'auto' }}
          >
            Capture Moments,
            <span className="block text-white opacity-80">
              Preserve History
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-gray-200 drop-shadow-sm">
            Discover our curated collection of vintage and professional cameras,
            where classic craftsmanship meets modern innovation.
          </p>

          {/* Botones */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-white text-black hover:bg-white/90"
            >
              <Link to="/products">
                <ShoppingBag className="h-5 w-5" />
                Shop Now
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/5 text-white backdrop-blur hover:bg-white/10"
            >
              <Link to="/collections">View Collections</Link>
            </Button>
          </div>

          {/* Why choose us link */}
          <button
            onClick={() => {}}
            className="mt-12 flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            Why choose VintageLen?
          </button>
        </div>
      </div>
    </div>
  );
}
