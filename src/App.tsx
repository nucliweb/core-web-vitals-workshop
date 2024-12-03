import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from '@/contexts/CartContext'
import { ModalProvider, useModal } from '@/contexts/ModalContext'
import { RootLayout } from '@/components/layout/RootLayout'
import { AnalyticsProvider } from '@/providers/analytics-provider'
import HomePage from '@/pages/home/HomePage'
import ProductsPage from '@/pages/products/ProductsPage'
import ProductPage from '@/pages/products/[id]/ProductPage'
import CollectionsPage from '@/pages/collections'
import About from '@/pages/about'
import ShippingPage from '@/pages/shipping'
import ReturnsPage from '@/pages/returns'
import ContactPage from '@/pages/contact'
import { GifModal } from '@/components/ui/gif-modal'
import { ConfirmationModal } from '@/components/ui/confirmation-modal'
import LongTasksPage from '@/pages/examples/long-tasks'
import YieldToMainPage from '@/pages/examples/yield-to-main'

function AppModals() {
  const { 
    showGifModal, 
    showConfirmationModal, 
    confirmationConfig,
    setShowGifModal,
    closeConfirmationModal 
  } = useModal();

  return (
    <>
      <GifModal 
        isOpen={showGifModal} 
        onClose={() => setShowGifModal(false)} 
      />
      {confirmationConfig && (
        <ConfirmationModal
          isOpen={showConfirmationModal}
          onClose={closeConfirmationModal}
          onConfirm={() => {
            confirmationConfig.onConfirm();
            closeConfirmationModal();
          }}
          title={confirmationConfig.title}
          message={confirmationConfig.message}
          confirmText="Clear Cart"
          cancelText="Cancel"
        />
      )}
    </>
  );
}

function App() {
  return (
    <ModalProvider>
      <CartProvider>
        <Router>
          <AnalyticsProvider>
            <>
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
                  <Route path="/examples/long-tasks" element={<LongTasksPage />} />
                  <Route path="/examples/yield-to-main" element={<YieldToMainPage />} />
                </Routes>
              </RootLayout>
              <AppModals />
            </>
          </AnalyticsProvider>
        </Router>
      </CartProvider>
    </ModalProvider>
  )
}

export default App
