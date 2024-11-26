import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Camera, ShoppingBag } from 'lucide-react';

export function ImageHero() {
  return (
    <div className="relative min-h-[80vh] w-full">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1510127034890-ba27508e9f1c")`,
        }}
      />

      {/* Gradiente multicapa para mejor contraste */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-32 md:px-6 lg:min-h-[80vh]">
        <div className="flex max-w-xl flex-col justify-center">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur">
            <Camera className="h-4 w-4" />
            Limited Time Collection
          </div>

          {/* Títulos con sombra sutil para mayor legibilidad */}
          <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
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
              className="gap-2 border-white bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <Link to="/collections">
                <Camera className="h-5 w-5" />
                Our Collections
              </Link>
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
