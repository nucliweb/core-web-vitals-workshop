import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import HomePage from '@/pages/home/HomePage';
import ProductsPage from '@/pages/products/ProductsPage';
import ProductPage from '@/pages/products/[id]/ProductPage';
import { CartProvider } from '@/contexts/CartContext';
import About from '@/pages/about';
import CollectionsPage from '@/pages/collections';
import ShippingPage from '@/pages/shipping';
import ReturnsPage from '@/pages/returns';
import ContactPage from '@/pages/contact';

function App() {
  return (
    <CartProvider>
      <Router>
        <RootLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </RootLayout>
      </Router>
    </CartProvider>
  );
}

export default App;
