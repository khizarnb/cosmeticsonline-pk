import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreDataProvider } from './context/StoreDataContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BrandsPage } from './pages/BrandsPage';
import { BrandDetailPage } from './pages/BrandDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { JournalPage } from './pages/JournalPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { FaqPage } from './pages/FaqPage';
import { ShippingReturnsPage } from './pages/ShippingReturnsPage';
import { PrivacyTermsPage } from './pages/PrivacyTermsPage';
import { AuthenticityPage } from './pages/AuthenticityPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout with header, footer, drawer
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F7F4] text-[#000000]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreDataProvider>
      <CartProvider>
        <WishlistProvider>
          <AuthProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/collection/:categorySlug" element={<CollectionPage />} />
                  <Route path="/product/:productId" element={<ProductDetailPage />} />
                  <Route path="/brands" element={<BrandsPage />} />
                  <Route path="/brand/:brandSlug" element={<BrandDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/account/orders" element={<AccountPage />} />
                  <Route path="/track-order" element={<OrderTrackingPage />} />
                  <Route path="/journal" element={<JournalPage />} />
                  <Route path="/journal/:slug" element={<BlogPostPage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  <Route path="/contact" element={<ContactUsPage />} />
                  <Route path="/faqs" element={<FaqPage />} />
                  <Route path="/shipping" element={<ShippingReturnsPage />} />
                  <Route path="/returns" element={<ShippingReturnsPage />} />
                  <Route path="/privacy" element={<PrivacyTermsPage />} />
                  <Route path="/terms" element={<PrivacyTermsPage />} />
                  <Route path="/authenticity" element={<AuthenticityPage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </AuthProvider>
        </WishlistProvider>
      </CartProvider>
    </StoreDataProvider>
  );
};

export default App;
