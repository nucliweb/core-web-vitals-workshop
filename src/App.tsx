import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import HomePage from '@/pages/home/HomePage';
import ProductsPage from '@/pages/products/ProductsPage';
import ProductPage from '@/pages/products/[id]/ProductPage';

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route
            path="/collections"
            element={<div>Collections Page (coming soon)</div>}
          />
          <Route path="/about" element={<div>About Page (coming soon)</div>} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
