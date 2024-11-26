import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<div>Home Page (coming soon)</div>} />
          <Route
            path="/products"
            element={<div>Products Page (coming soon)</div>}
          />
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
