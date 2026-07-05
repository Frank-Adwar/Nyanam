/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useRouter } from './Router';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

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
  const { navigate, path } = useRouter();

  const navLinks = [
    { name: 'Home', id: 'home', to: '/fish' },
    { name: 'Shop Products', id: 'shop', to: '/products' },
    { name: 'About Sourcing', id: 'about', to: '/about' },
    { name: 'FAQ', id: 'faq', to: '/faq' },
    { name: 'Contact', id: 'contact', to: '/contact' },
  ];

  const handleLinkClick = (id: string, to: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    navigate(to);
  };

  const activeId = navLinks.find((link) => link.to === path)?.id ?? activeSection;

  return (
    <header className={`${path === '/fish' ? 'fixed bg-transparent' : 'sticky bg-[#10211b]'} top-0 z-40 w-full px-1.5 py-2.5 sm:px-4 sm:py-4`}>
      <div className={`mx-auto flex h-14 min-w-0 max-w-[1400px] items-center justify-between gap-1.5 rounded-[16px] px-2.5 sm:h-[72px] sm:gap-3 sm:px-5 lg:px-7 ${
        path === '/fish'
          ? 'border border-white/20 bg-[#123126]/65 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-[6px]'
          : 'bg-[#182c24] shadow-[0_2px_0_rgba(5,20,14,0.3)]'
      }`}>
        
        {/* Brand Logo */}
        <div className="flex shrink-0 items-center">
          <Link to="/fish" className="group flex items-center text-[#fcfaf8]" onClick={() => setActiveSection('home')}>
            <span className="font-serif text-[1.05rem] italic tracking-[-0.05em] min-[360px]:text-[1.2rem] sm:text-[1.65rem]">
              Nyanam <span className="font-semibold not-italic">Fisheries</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id, link.to)}
              className={`cursor-pointer rounded-full px-3 py-2 font-sans text-[13px] font-semibold transition-colors hover:bg-white/10 hover:text-white ${
                activeId === link.id ? 'bg-[#b58a52] text-[#231f20]' : 'text-[#fcfaf8]'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          {/* Cart Icon */}
          <button
            onClick={onCartOpen}
            className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-[#fcfaf8]/55 text-[#fcfaf8] transition-colors hover:bg-[#fcfaf8] hover:text-[#231f20] sm:h-10 sm:w-10"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5 stroke-[1.8] sm:h-6 sm:w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#b58a52] text-[10px] font-bold text-[#231f20] ring-2 ring-[#231f20]">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* "Meet David" / Founder Link */}
          <button
            onClick={() => navigate('/portfolio')}
            className="hidden h-10 cursor-pointer items-center gap-1.5 rounded-xl border border-[#fcfaf8]/70 px-4 font-display text-xs font-semibold text-[#fcfaf8] transition-all hover:bg-[#fcfaf8] hover:text-[#231f20] sm:inline-flex"
          >
            Meet the Founder
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-[#fcfaf8] text-[#231f20] transition-transform hover:scale-[1.03] sm:h-10 sm:w-10 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="mx-auto mt-2 max-h-[calc(100dvh-5rem)] max-w-[1400px] space-y-3 overflow-y-auto rounded-[18px] border-[3px] border-[#231f20] bg-[#fcfaf8] p-3 shadow-[0_8px_0_#231f20] lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id, link.to)}
                className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-bold transition-colors ${
                  activeId === link.id
                    ? 'bg-[#b58a52] text-[#231f20]'
                    : 'text-[#231f20] hover:bg-[#f1ece6]'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-[#231f20]/20 pt-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/portfolio');
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#231f20] py-3 font-display text-sm font-semibold text-[#fcfaf8] transition-all hover:bg-black"
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
