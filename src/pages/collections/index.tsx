import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const collections = [
  {
    id: 'rangefinder',
    title: 'Rangefinder Cameras',
    description: 'Precision and elegance in compact form',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd',
    featured: true,
  },
  {
    id: 'medium-format',
    title: 'Medium Format',
    description: 'Superior image quality and detail',
    image: 'https://images.unsplash.com/photo-1606986642222-8e84e1f72362',
    featured: true,
  },
  {
    id: 'tlr',
    title: 'Twin Lens Reflex',
    description: 'Classic twin lens design',
    image: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894',
    featured: false,
  },
  {
    id: 'slr',
    title: 'SLR Classics',
    description: 'Professional single lens reflex cameras',
    image: 'https://images.unsplash.com/photo-1530982011887-3cc11cc85693',
    featured: false,
  },
  {
    id: 'instant',
    title: 'Instant Cameras',
    description: 'Immediate memories, timeless charm',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    featured: false,
  },
  {
    id: 'accessories',
    title: 'Vintage Accessories',
    description: 'Essential tools for classic photography',
    image: 'https://images.unsplash.com/photo-1500634245200-e5245c7574ef',
    featured: false,
  },
]

export default function CollectionsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Our Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections of vintage cameras, each representing 
            a unique chapter in photography's rich history.
          </p>
        </header>

        {/* Featured Collections */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Featured Collections</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {collections
              .filter((collection) => collection.featured)
              .map((collection) => (
                <Link
                  key={collection.id}
                  to={`/products?collection=${collection.id}`}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <AspectRatio ratio={16 / 9}>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 z-10" />
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                      <h3 className="text-2xl font-bold text-white mb-2">{collection.title}</h3>
                      <p className="text-white/90">{collection.description}</p>
                    </div>
                  </AspectRatio>
                </Link>
              ))}
          </div>
        </section>

        {/* All Collections */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">All Collections</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections
              .filter((collection) => !collection.featured)
              .map((collection) => (
                <Link
                  key={collection.id}
                  to={`/products?collection=${collection.id}`}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <AspectRatio ratio={4 / 3}>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 z-10" />
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                      <h3 className="text-xl font-bold text-white mb-1">{collection.title}</h3>
                      <p className="text-white/90 text-sm">{collection.description}</p>
                    </div>
                  </AspectRatio>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </motion.div>
  )
}
