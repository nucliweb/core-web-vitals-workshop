#!/bin/bash

# Crear proyecto base con Vite
npm create vite@latest vintage-len -- --template react-ts
cd vintage-len

# Crear estructura de carpetas
mkdir -p src/{assets/{fonts,icons},components/{common/{Badge,Button,Card},layout/{Footer,Header,Navigation},home/{FeaturedProducts,HeroSection,CollectionsGrid},products/{ProductCard,ProductGallery,ProductGrid,ProductInfo},cart/{CartDrawer,CartItem},ui/shadcn},config,hooks,lib,pages/{home,products,collections,about},providers,styles/themes,types}

# Crear archivos base
touch src/config/site.ts
touch src/hooks/{useCart,useFilter,useProducts}.ts
touch src/lib/{api,utils,types}.ts
touch src/providers/app-provider.tsx
touch src/styles/globals.css
touch src/types/index.ts

# Crear archivos README en carpetas principales para control de versiones
echo "# Assets" > src/assets/README.md
echo "# Components" > src/components/README.md
echo "# Config" > src/config/README.md
echo "# Hooks" > src/hooks/README.md
echo "# Lib" > src/lib/README.md
echo "# Pages" > src/pages/README.md
echo "# Providers" > src/providers/README.md
echo "# Styles" > src/styles/README.md
echo "# Types" > src/types/README.md

# Instalar dependencias
npm install @tanstack/react-query @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot class-variance-authority clsx framer-motion lucide-react react-router-dom tailwind-merge tailwindcss-animate zod

# Instalar dependencias de desarrollo
npm install -D @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser autoprefixer postcss prettier prettier-plugin-tailwindcss tailwindcss

# Inicializar Tailwind
npx tailwindcss init -p

echo "✅ Estructura del proyecto creada correctamente"
echo "📦 Dependencias instaladas"
echo "🚀 Listo para comenzar el desarrollo"

# Mostrar estructura creada
tree src/
