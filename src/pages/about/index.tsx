import { motion } from 'framer-motion'
import { Camera, Award, Heart, Clock } from 'lucide-react'

export default function About() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-8">About Vintage Len</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700">
              Vintage Len was born from a passion for photography and a deep appreciation for the craftsmanship 
              of classic cameras. We believe that every vintage camera carries within it countless stories and 
              the potential for many more to be told. Our mission is to preserve these mechanical masterpieces 
              and pass them on to a new generation of photographers and collectors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
            <ul className="grid md:grid-cols-3 gap-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-stone-50 rounded-lg"
              >
                <Award className="h-8 w-8 mb-3 text-amber-600" />
                <h3 className="font-semibold mb-2">Quality Assured</h3>
                <p className="text-sm text-gray-700">Every camera is thoroughly inspected and tested before being added to our collection</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-stone-50 rounded-lg"
              >
                <Heart className="h-8 w-8 mb-3 text-amber-600" />
                <h3 className="font-semibold mb-2">Carefully Curated</h3>
                <p className="text-sm text-gray-700">We hand-pick each piece to ensure it meets our high standards of quality and authenticity</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-stone-50 rounded-lg"
              >
                <Clock className="h-8 w-8 mb-3 text-amber-600" />
                <h3 className="font-semibold mb-2">Timeless Service</h3>
                <p className="text-sm text-gray-700">Expert advice and support for your vintage camera journey</p>
              </motion.div>
            </ul>
          </section>

          <section className="bg-stone-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Vintage Cameras?</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                In an age of digital perfection, vintage cameras offer something unique: a tangible connection 
                to photography's rich history. Each click of the shutter, each manual focus adjustment, brings 
                you closer to the art of photography in its purest form.
              </p>
              <p className="text-gray-700">
                Whether you're an experienced collector, a professional photographer seeking to expand your creative 
                toolkit, or someone just beginning to explore film photography, our collection has something special 
                for you.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Visit Our Store</h2>
            <p className="text-gray-700">
              We invite you to explore our carefully curated collection of vintage cameras. Each piece 
              has been selected not just for its functionality, but for its ability to inspire and create 
              beautiful moments. Start your vintage photography journey with us today.
            </p>
          </section>
        </div>
      </div>
    </motion.main>
  )
}
