/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RouterProvider, useRouter } from './components/Router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { FishWebsite } from './pages/FishWebsite';
import { Portfolio } from './pages/Portfolio';
import { CartItem, Product } from './types';

function MainAppContent() {
  const { path } = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Optional: Open cart drawer instantly to prompt action, or just increment
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // If path is David's portfolio, render the separate, high-contrast dark profile
  if (path === '/portfolio') {
    return <Portfolio />;
  }

  // Otherwise, render the main fresh tilapia e-commerce experience
  return (
    <div className="flex min-h-screen flex-col">
      {/* Premium Header/Navigation */}
      <Navbar
        cartItemCount={totalCartCount}
        onCartOpen={() => setIsCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Page Sections */}
      <main className="flex-grow">
        <FishWebsite
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
          setActiveSection={setActiveSection}
        />
      </main>

      {/* Persistent floating help desk button */}
      <WhatsAppFloat />

      {/* Slide-over cart drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Premium Footer with integrated SEO */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <MainAppContent />
    </RouterProvider>
  );
}
