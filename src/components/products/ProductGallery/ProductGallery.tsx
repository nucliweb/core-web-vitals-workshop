import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { Maximize2 } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="grid gap-4">
      {/* Imagen Principal */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="group relative cursor-zoom-in overflow-hidden rounded-lg border bg-background">
            <AspectRatio ratio={1}>
              <img
                src={images[selectedImage]}
                alt={`${name} - View ${selectedImage + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </AspectRatio>
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Maximize2 className="h-8 w-8 text-white" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={1}>
                    <img
                      src={image}
                      alt={`${name} - Full View ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>

      {/* Miniaturas */}
      <div className="relative">
        <Carousel
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2">
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-1/4 pl-2">
                <button
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'relative overflow-hidden rounded-md border',
                    selectedImage === index && 'ring-2 ring-primary'
                  )}
                >
                  <AspectRatio ratio={1}>
                    <img
                      src={image}
                      alt={`${name} - Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </AspectRatio>
                  <div
                    className={cn(
                      'absolute inset-0 bg-black/50 transition-opacity',
                      selectedImage === index ? 'opacity-0' : 'opacity-40'
                    )}
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </div>
  );
}
