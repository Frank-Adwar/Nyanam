/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useRouter } from './Router';
import { ShoppingBag, Menu, X, ArrowRight, Anchor } from 'lucide-react';
import { BRAND_NAME } from '../data';

interface NavbarProps {
  cartItemCount: number;
  onCartOpen: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  onCartOpen,
  activeSection,
  setActiveSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useRouter();

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Shop Products', id: 'shop' },
    { name: 'About Sourcing', id: 'about' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Link to="/fish" className="flex items-center gap-2 text-blue-800" onClick={() => setActiveSection('home')}>
            <Anchor className="h-6 w-6 stroke-[2.5] text-cyan-600 animate-pulse-subtle" />
            <span className="font-display text-xl font-bold tracking-tight text-gray-950">
              Victoria<span className="text-cyan-600">Fresh</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`font-sans text-sm font-medium transition-colors hover:text-cyan-600 cursor-pointer ${
                activeSection === link.id ? 'text-cyan-600 font-semibold' : 'text-gray-600'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={onCartOpen}
            className="relative p-2 text-gray-600 hover:text-cyan-600 transition-colors cursor-pointer"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-6 w-6 stroke-[1.8]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-[10px] font-bold text-white ring-2 ring-white">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* "Meet David" / Founder Link */}
          <button
            onClick={() => navigate('/portfolio')}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gray-950 px-4 py-2 font-display text-xs font-semibold text-white transition-all hover:bg-cyan-700 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
          >
            Meet the Founder
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 shadow-inner">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`flex w-full items-center py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-cyan-50 text-cyan-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/portfolio');
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 py-3 font-display text-sm font-semibold text-white transition-all hover:bg-cyan-700"
            >
              Meet Founder (David’s Profile)
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
