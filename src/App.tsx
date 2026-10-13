/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider } from './context/StoreContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { FeaturedCollection } from './components/FeaturedCollection.tsx';
import { AccessoriesSection } from './components/AccessoriesSection.tsx';
import { TrustAndOffers } from './components/TrustAndOffers.tsx';
import { Footer } from './components/Footer.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { OrderConfirmationModal } from './components/OrderConfirmationModal.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { AdminModal } from './components/AdminModal.tsx';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-black text-white selection:bg-purple-600 selection:text-white transition-colors duration-200">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          {/* 1. Cinematic 3D Hero Section */}
          <HeroSection />

          {/* 2. Featured iPhone Collection */}
          <FeaturedCollection />

          {/* 3. Apple Ecosystem Accessories */}
          <AccessoriesSection />

          {/* 4. Why Choose Us, Offers, Reviews, FAQ */}
          <TrustAndOffers />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <OrderConfirmationModal />
        <SearchModal />
        <AdminModal />
      </div>
    </StoreProvider>
  );
}
