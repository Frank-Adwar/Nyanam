/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS, FAQS, GALLERY, TESTIMONIALS, BRAND_NAME, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_SECONDARY, PHYSICAL_ADDRESS, WHATSAPP_NUMBER } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useRouter } from '../components/Router';
import { 
  ArrowRight, Check, Anchor, Truck, ShieldCheck, Heart, 
  ChevronDown, ChevronUp, Star, Phone, Mail, MapPin, 
  Sparkles, Coffee, Award, HelpCircle, Image as ImageIcon,
  MessageSquare
} from 'lucide-react';
import tilapiaHeroImg from '../assets/images/tilapia_hero_1783025847365.jpg';
import tilapiaHomeHeroImg from '../assets/images/tilapia_home_hero.png';
import founderDavidImg from '../assets/images/portfolio_portrait_editorial.png';
import faqLakePatternImg from '../assets/images/faq_lake_pattern.png';


interface FishWebsiteProps {
  onAddToCart: (product: Product) => void;
  cartItems: CartItem[];
  setActiveSection: (section: string) => void;
}

export const FishWebsite: React.FC<FishWebsiteProps> = ({
  onAddToCart,
  cartItems,
  setActiveSection,
}) => {
  const { navigate, path } = useRouter();
  const currentPage = ({
    '/fish': 'home',
    '/products': 'products',
    '/about': 'about',
    '/faq': 'faq',
    '/contact': 'contact',
  } as Record<string, string>)[path] ?? 'home';
  
  // Gallery states
  const [selectedGalleryTab, setSelectedGalleryTab] = useState<'all' | 'lake' | 'kitchen' | 'delivery' | 'community'>('all');
  
  // FAQ states
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [productView, setProductView] = useState<'raw' | 'ready'>('raw');

  // Contact form submission state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  const getCartQuantity = (productId: string) => {
    const item = cartItems.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setIsContactSubmitted(true);
      setTimeout(() => {
        setIsContactSubmitted(false);
        setContactForm({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  const filteredGallery = selectedGalleryTab === 'all'
    ? GALLERY
    : GALLERY.filter(item => item.category === selectedGalleryTab);

  const readyMadeProductIds = new Set([
    'fried-tilapia-pack',
    'smoked-tilapia',
    'tilapia-nuggets',
    'tilapia-burgers',
    'tilapia-soup-base',
  ]);
  const rawProducts = PRODUCTS.filter((product) => !readyMadeProductIds.has(product.id));
  const readyMadeProducts = PRODUCTS.filter((product) => readyMadeProductIds.has(product.id));

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const routes: Record<string, string> = { shop: '/products', contact: '/contact' };
    navigate(routes[id] ?? '/fish');
  };

  return (
    <div className="page-sections bg-white" data-page={currentPage}>

      {/* SINGLE-VIEWPORT HOME: trust first, then a clear buying choice */}
      <section data-route="home" className="relative h-[100svh] min-h-[600px] max-h-[760px] overflow-hidden bg-[#0d1512] text-white sm:h-[100dvh] sm:min-h-[520px] sm:max-h-[680px]">
        <img
          src={tilapiaHomeHeroImg}
          alt="Premium whole Lake Victoria tilapia on clean ice"
          className="absolute inset-0 h-full w-full object-cover object-[61%_center] sm:object-[68%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,11,0.96)_0%,rgba(12,13,12,0.86)_58%,rgba(8,8,8,0.28)_100%)] sm:bg-[linear-gradient(90deg,rgba(10,12,11,0.97)_0%,rgba(12,13,12,0.88)_38%,rgba(10,10,10,0.34)_64%,rgba(8,8,8,0.08)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_bottom,transparent_0%,rgba(13,21,18,0.08)_28%,rgba(45,51,43,0.2)_58%,rgba(244,239,228,0.72)_86%,#f4efe4_100%)] sm:h-40" />

        <div className="relative mx-auto flex h-full max-w-[1400px] items-center px-4 pb-5 pt-20 min-[360px]:px-5 sm:px-8 sm:pb-5 sm:pt-28 lg:px-12">
          <div className="max-w-lg xl:max-w-[590px]">
            <div className="mb-3 inline-flex items-center gap-2 border-l-2 border-[#bd9462] pl-3 text-[8px] font-bold uppercase tracking-[0.18em] text-[#d9c4a9] sm:text-[9px]">
              17 years of fisheries experience
            </div>

            <h1 className="font-display text-[2.05rem] font-black leading-[0.94] tracking-[-0.045em] min-[360px]:text-[2.35rem] sm:text-5xl lg:text-[3.65rem] xl:text-[4rem]">
              Lake Victoria tilapia.<br /><span className="font-serif font-medium italic text-[#f0b45c]">Freshness you can trust.</span>
            </h1>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-white/72 sm:mt-4 sm:text-sm">
              Responsibly sourced, cleaned to order and kept cold from shore to door.
            </p>

            <div className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row">
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#b44932] px-5 py-3 text-xs font-bold text-white shadow-xl shadow-black/20 transition-colors hover:bg-[#963722] sm:px-5 sm:py-3"
              >
                Shop fresh tilapia <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/45 bg-black/20 px-5 py-3 text-xs font-bold text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#231f20] sm:px-5 sm:py-3"
              >
                Request bulk pricing
              </button>
            </div>

          </div>
        </div>
      </section>

      <section data-route="home" className="bg-[#f4efe4] text-[#1d2922]">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:px-12 lg:py-20">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#a04430]">Trust is the first ingredient</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.02] text-[#1d2922] sm:text-5xl">Good fish needs<br /><em className="text-[#a84430]">nothing to hide.</em></h2>
            <p className="mt-5 text-sm leading-7 text-[#655d55]">
              We buy directly from Lake Victoria fishing communities, clean each order hygienically, keep it cold, and confirm the exact weight before dispatch. Simple food. Clear provenance. Fair value.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-[#d9cdbd] bg-[#d9cdbd] sm:grid-cols-2">
            <button onClick={() => navigate('/products')} className="group bg-[#faf7f1] p-6 text-left transition-colors hover:bg-white sm:p-8">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4f6b55]">For your table</span>
              <h3 className="mt-5 font-serif text-3xl">Choose a bundle</h3>
              <p className="mt-3 text-xs leading-5 text-[#766d64]">Select the preparation, size and quantity that suits your home.</p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-[#a84430]">View products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </button>
            <button onClick={() => navigate('/contact')} className="group bg-[#faf7f1] p-6 text-left transition-colors hover:bg-white sm:p-8">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4f6b55]">For your business</span>
              <h3 className="mt-5 font-serif text-3xl">Order in bulk</h3>
              <p className="mt-3 text-xs leading-5 text-[#766d64]">Reliable supply and volume pricing for restaurants, hotels and retailers.</p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-[#a84430]">Discuss supply <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </button>
          </div>
        </div>
        <div className="border-t border-[#d9cdbd] px-5 py-4 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-[#777065]">
          Dunga & Kendu Bay sourcing · Kisumu preparation · Nairobi delivery
        </div>
      </section>
      
      {/* 1. HERO SECTION */}
      <section id="home" data-route="legacy-home" className="relative overflow-hidden bg-gradient-to-b from-cyan-50/70 via-white to-white py-16 sm:py-24">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Premium Label */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100/80 px-3 py-1 font-mono text-xs font-bold text-cyan-800 backdrop-blur-xs">
                <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
                <span>Premium Lake-to-Table Cold Chain</span>
              </div>

              <h1 className="font-display text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl leading-[1.1]">
                Fresh Lake Victoria <span className="relative inline-block text-cyan-600">Tilapia</span>, Delivered to Your Table
              </h1>

              <p className="max-w-2xl font-sans text-base sm:text-lg text-gray-600 leading-relaxed">
                Order fresh, fried, smoked, marinated, or filleted tilapia prepared with hygienic care by Kisumu experts and delivered reliably in under 24 hours. Sourced directly, supporting local cooperative beaches.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3.5">
                <button
                  onClick={() => scrollToSection('shop')}
                  className="rounded-xl bg-cyan-600 px-6 py-4 font-display text-sm font-bold text-white shadow-xl shadow-cyan-500/10 hover:bg-cyan-700 hover:shadow-cyan-500/20 transition-all cursor-pointer text-center"
                >
                  Order Fresh Now
                </button>
                <button
                  onClick={() => navigate('/portfolio')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-4 font-display text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Meet David (Founder Profile)
                  <ArrowRight className="h-4 w-4 text-cyan-600" />
                </button>
              </div>

              {/* Trust highlights */}
              <div className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-8 text-left min-[420px]:grid-cols-3 min-[420px]:text-center sm:text-left">
                <div>
                  <p className="font-display text-2xl font-black text-gray-950">24h</p>
                  <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">Lake-to-Nairobi Transit</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-gray-950">100%</p>
                  <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">Scale-to-Weight Cleaned</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-gray-950">KSH 350+</p>
                  <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">Accessible Pricing</p>
                </div>
              </div>
            </div>

            {/* Right Column Image Platter */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                {/* Visual back glow */}
                <div className="absolute -inset-2 rounded-3xl bg-cyan-500/10 blur-xl" />
                
                {/* Main Platter Hero */}
                <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white shadow-2xl shadow-cyan-900/10">
                  <img
                    src={tilapiaHeroImg}
                    alt="Delicious fried tilapia platter"
                    className="aspect-4/3 w-full object-cover sm:aspect-16/9 md:aspect-4/3"
                    referrerPolicy="no-referrer"
                  />
                  {/* Image Overlay Label */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-gray-950/80 p-3 text-white backdrop-blur-md flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-cyan-400">Authentic Taste</p>
                      <p className="font-display text-xs font-semibold">Fried Tilapia Family Pack</p>
                    </div>
                    <span className="font-display text-xs font-black text-cyan-400">KSH 3,250</span>
                  </div>
                </div>

                {/* Micro floating accent 1 */}
                <div className="absolute -top-4 -left-4 rounded-2xl bg-white p-3 shadow-lg border border-gray-50 flex items-center gap-2 max-w-[180px]">
                  <div className="rounded-full bg-emerald-50 p-1.5 text-emerald-600">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-950">Zero Muddy Taste</p>
                    <p className="text-[9px] text-gray-400">Deep water sourcing</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY BUY FROM US (BENEFITS) */}
      <section data-route="legacy-home" className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-600">Victoria Standards</span>
            <h2 className="font-display text-2xl font-extrabold text-gray-950 min-[380px]:text-3xl sm:text-4xl">
              Why Discerning Kenyan Homes Choose Us
            </h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base text-gray-600">
              Unlike traditional open-air markets or middlemen storage, we oversee the entire process from the fisher’s net to your frying pan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Sourced on Net */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 mb-5">
                <Anchor className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-gray-950">Ethically & Sustainably Harvested</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                Sourced from cooperative Beach Management Units (BMUs) on Dunga and Kendu bays. We buy directly at premium fair-trade prices, ensuring higher incomes for fishers.
              </p>
            </div>

            {/* Cold Chain Logistics */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 mb-5">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-gray-950">Strict Cold-Chain Logistics</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                Immediately iced upon harvest, cleaned and vacuum-packaged in Kisumu, then shipped inside 2°C refrigerated trucks overnight to Nairobi. Freshness locked in.
              </p>
            </div>

            {/* Culinary Quality */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 mb-5">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-bold text-gray-950">Hygienic Cleaning & Preparation</h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-500">
                Our staff scales, guts, and packs fish inside a clean, modern facility under strict safety protocols. No flies, no open exposure, and no messy kitchen prep for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT SHOP SECTION */}
      <section id="shop" data-route="products" className="py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#a84430]">From Lake Victoria to your table</span>
              <h2 className="font-display text-2xl font-extrabold text-gray-950 min-[380px]:text-3xl sm:text-4xl">
                Choose how you want your fish
              </h2>
              <p className="max-w-2xl text-xs sm:text-sm text-gray-500">
                Fresh and cleaned for your own recipe, or prepared by us and ready for the table. Every order is confirmed by weight before dispatch.
              </p>
            </div>
            
            {/* Support guarantee badge */}
            <div className="rounded-xl border border-[#d7dfd5] bg-[#f2f6f1] p-3 flex items-center gap-2 shrink-0">
              <Heart className="h-5 w-5 text-[#4f6b55]" />
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-[#263c2d]">Bought closer to the source</p>
                <p className="text-[#58705e]">More value returned to fishing families</p>
              </div>
            </div>
          </div>

          <div className="mb-12 grid overflow-hidden rounded-2xl border border-[#ded4c5] bg-[#f4efe4] md:grid-cols-2">
            <button
              onClick={() => setProductView('raw')}
              className={`border-b border-[#ded4c5] p-5 text-left transition-colors md:border-b-0 md:border-r sm:p-6 ${productView === 'raw' ? 'bg-[#183329] text-white' : 'bg-[#f4efe4] hover:bg-white'}`}
            >
              <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${productView === 'raw' ? 'text-[#dfb778]' : 'text-[#4f6b55]'}`}>Cook it your way</span>
              <h3 className={`mt-2 font-serif text-2xl min-[380px]:text-3xl ${productView === 'raw' ? 'text-white' : 'text-[#1d2922]'}`}>Raw & ready to cook</h3>
              <p className={`mt-2 max-w-md text-xs leading-5 ${productView === 'raw' ? 'text-white/65' : 'text-[#716960]'}`}>Whole cleaned fish, steaks, fillets and marinated choices—cold-packed for your kitchen.</p>
              <span className={`mt-4 inline-block text-[9px] font-bold uppercase tracking-[0.18em] ${productView === 'raw' ? 'text-[#dfb778]' : 'text-[#4f6b55]'}`}>{productView === 'raw' ? 'Showing now' : 'View collection'} →</span>
            </button>
            <button
              onClick={() => setProductView('ready')}
              className={`p-5 text-left transition-colors sm:p-6 ${productView === 'ready' ? 'bg-[#8f3c2d] text-white' : 'bg-[#f4efe4] hover:bg-white'}`}
            >
              <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${productView === 'ready' ? 'text-[#f1c58b]' : 'text-[#a84430]'}`}>We cook, you serve</span>
              <h3 className={`mt-2 font-serif text-2xl min-[380px]:text-3xl ${productView === 'ready' ? 'text-white' : 'text-[#1d2922]'}`}>Cooked & ready to eat</h3>
              <p className={`mt-2 max-w-md text-xs leading-5 ${productView === 'ready' ? 'text-white/70' : 'text-[#716960]'}`}>Fried, smoked and convenient prepared options for quick meals, families and gatherings.</p>
              <span className={`mt-4 inline-block text-[9px] font-bold uppercase tracking-[0.18em] ${productView === 'ready' ? 'text-[#f1c58b]' : 'text-[#a84430]'}`}>{productView === 'ready' ? 'Showing now' : 'View collection'} →</span>
            </button>
          </div>

          {productView === 'raw' && <div className="mb-14">
            <div className="mb-5 flex items-end justify-between border-b border-[#d9d5cf] pb-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4f6b55]">Raw collection</p>
                <h3 className="mt-1 font-serif text-3xl text-gray-950">For the pan, grill or stew</h3>
              </div>
              <span className="hidden text-xs text-gray-400 sm:block">{rawProducts.length} choices</span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rawProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} cartQuantity={getCartQuantity(product.id)} />
              ))}
            </div>
          </div>}

          {productView === 'ready' && <div>
            <div className="mb-5 flex items-end justify-between border-b border-[#d9d5cf] pb-3">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a84430]">Prepared collection</p>
                <h3 className="mt-1 font-serif text-3xl text-gray-950">Ready when hunger arrives</h3>
              </div>
              <span className="hidden text-xs text-gray-400 sm:block">{readyMadeProducts.length} choices</span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {readyMadeProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} cartQuantity={getCartQuantity(product.id)} />
              ))}
            </div>
          </div>}

          <div className="mt-14 flex flex-col justify-between gap-6 rounded-2xl bg-[#183329] px-6 py-7 text-white sm:flex-row sm:items-center sm:px-8">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#dfb778]">Restaurants · Hotels · Retailers · Events</p>
              <h3 className="mt-2 font-serif text-3xl">Need fish in serious volume?</h3>
              <p className="mt-2 text-xs text-white/65">Ask for weekly supply, custom preparation and volume pricing from 20kg.</p>
            </div>
            <button onClick={() => navigate('/contact')} className="shrink-0 rounded-lg bg-[#b44932] px-5 py-3 text-xs font-bold transition-colors hover:bg-[#963722]">
              Request a bulk quote
            </button>
          </div>
          <p className="mt-5 text-center text-[9px] leading-4 text-gray-400">
            Documentary Kenyan and Lake Victoria photography sourced from Wikimedia Commons under Creative Commons licences; individual creator details remain available on each source file page.
          </p>
        </div>
      </section>

      {/* 4. ABOUT SECTION (SOURCING STORY) */}
      <section id="about" data-route="about" className="bg-[#f4efe4] text-[#1d2922]">
        <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#a04430]">How we source</p>
              <h1 className="mt-5 font-serif text-4xl leading-[0.95] tracking-[-0.035em] sm:text-6xl">
                From the lake,<br /><em>without the long story.</em>
              </h1>
              <p className="mt-7 max-w-lg text-sm leading-7 text-[#665f57]">
                Good tilapia does not need clever language. It needs clean water, careful hands, cold storage and an honest route to market. We work directly with fishing communities around Lake Victoria and keep that route short.
              </p>
              <p className="mt-5 max-w-lg text-sm leading-7 text-[#665f57]">
                Fish is collected in the morning, weighed openly, iced immediately, cleaned in Kisumu and dispatched in temperature-controlled packaging. You know what you are buying and where it came from.
              </p>
            </div>

            <div className="border-t border-[#cfc2af]">
              {[
                ['01', 'Sourced from Lake Victoria', 'Our fresh tilapia comes directly from the world’s second-largest freshwater lake, ensuring top quality and unmatched freshness in every order.'],
                ['02', 'Fresh and Natural', 'We pride ourselves on offering sustainably sourced fish with no additives—just pure, organic goodness straight to your table.'],
                ['03', 'Reliable and Fast Delivery', 'Enjoy weekly or fortnightly deliveries, tailored to your schedule. We ensure your tilapia arrives fresh, every time.'],
              ].map(([number, title, copy]) => (
                <div key={number} className="grid grid-cols-[42px_1fr] gap-x-3 gap-y-2 border-b border-[#cfc2af] py-6 sm:grid-cols-[55px_210px_1fr] sm:py-8">
                  <span className="font-mono text-[10px] text-[#a04430]">{number}</span>
                  <h2 className="font-serif text-2xl leading-tight">{title}</h2>
                  <p className="col-start-2 text-xs leading-6 text-[#716960] sm:col-start-3">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid border-y border-[#cfc2af] sm:grid-cols-3">
            <div className="py-5 sm:pr-6"><strong className="block font-serif text-2xl">17 years</strong><span className="text-[10px] uppercase tracking-[0.16em] text-[#746c62]">Experience in fisheries and supply</span></div>
            <div className="border-y border-[#cfc2af] py-5 sm:border-x sm:border-y-0 sm:px-6"><strong className="block font-serif text-2xl">Confirmed weight</strong><span className="text-[10px] uppercase tracking-[0.16em] text-[#746c62]">Clear quantity before dispatch</span></div>
            <div className="py-5 sm:pl-6"><strong className="block font-serif text-2xl">Fair buying</strong><span className="text-[10px] uppercase tracking-[0.16em] text-[#746c62]">Direct value for fishing families</span></div>
          </div>
        </div>
      </section>

      <section data-route="about" className="bg-white text-[#1d2922]">
        <div className="mx-auto grid max-w-[1400px] items-stretch lg:grid-cols-2">
          <img src={founderDavidImg} alt="David Ndolo" className="aspect-[4/5] h-full max-h-[620px] w-full object-cover object-top sm:aspect-auto sm:min-h-[460px] lg:max-h-none" />
          <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#4f6b55]">The person behind the work</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">David Ndolo</h2>
            <p className="mt-6 text-sm leading-7 text-[#665f57]">
              David’s work in fish farming and entrepreneurship is grounded in practical experience: understanding production, market demand and the discipline required to build a dependable food business.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#665f57]">
              His approach is simple—share useful knowledge, build sustainable supply relationships and help more people see aquaculture as a serious enterprise.
            </p>
            <button onClick={() => navigate('/portfolio')} className="mt-9 inline-flex w-fit items-center gap-2 border-b border-[#1d2922] pb-2 text-xs font-bold uppercase tracking-[0.12em]">
              Read David’s profile <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="legacy-about" data-route="removed-about" className="hidden">
        <div className="absolute inset-0 bg-radial-gradient from-cyan-950/40 via-transparent to-transparent opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            
            {/* Video / Graphic mockup representing Lake Victoria */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 shadow-2xl aspect-16/10">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                  alt="Sunrise on Lake Victoria"
                  className="h-full w-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-cyan-400">Kisumu Shoreline Sourcing</p>
                  <p className="font-display text-base font-bold text-white mt-1">Ethical Sourcing, Healthier Families</p>
                  <p className="text-xs text-gray-400 mt-1 leading-normal">Our fishermen leave at 4 AM and return with fresh tilapia by 8 AM. We lock in flavor under medical-grade icing instantly.</p>
                </div>
              </div>

              {/* Sourcing credentials */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-4">
                  <p className="font-display text-lg font-bold text-cyan-400">30+ Families</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Fisher cooperatives supported directly on the lake shore.</p>
                </div>
                <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-4">
                  <p className="font-display text-lg font-bold text-cyan-400">100% Certified</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">State food-safety certificate checked by KeBS & Kisumu officers.</p>
                </div>
              </div>
            </div>

            {/* Sourcing copy text */}
            <div className="space-y-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-400">The Journey From Lake to Plate</span>
              
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl text-white">
                Eliminating the Middleware to Keep Fish Truly Fresh
              </h2>
              
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                For years, Tilapia in cities like Nairobi went through up to four middlemen, stored in outdated, unhygienic open baskets without ice. By the time it arrived, it had lost its sweet, natural lake flavor and developed a muddy, stale taste.
              </p>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Nyanam Fisheries was founded to break this cycle. We partner directly with fishers on Lake Victoria, supply them with insulated ice-chests, run a state-of-the-art clean descaling warehouse in Kisumu, and transport the catch overnight. The result? Unmatched flavor, flawless sanitation, and a direct social impact.
              </p>

              {/* Core Values list */}
              <ul className="space-y-3.5 pt-4">
                <li className="flex items-center gap-3 text-xs text-gray-300">
                  <div className="rounded-full bg-cyan-950 p-1 text-cyan-400"><Check className="h-3.5 w-3.5" /></div>
                  <span><strong>Wild & Cage-Grown Sourcing</strong>: Pure clean waters, no hormones or heavy-metal feeds.</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-gray-300">
                  <div className="rounded-full bg-cyan-950 p-1 text-cyan-400"><Check className="h-3.5 w-3.5" /></div>
                  <span><strong>Surgical Hygiene</strong>: Staff trained in international food preparation safety standards.</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-gray-300">
                  <div className="rounded-full bg-cyan-950 p-1 text-cyan-400"><Check className="h-3.5 w-3.5" /></div>
                  <span><strong>Sustainable Economics</strong>: Sourced sustainably to preserve Lake Victoria’s blue ecosystem.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FOUNDER PREVIEW (MEET DAVID) */}
      <section data-route="removed-about" className="hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-100 bg-white p-8 sm:p-12 shadow-xl shadow-gray-200/40 relative overflow-hidden">
            
            {/* Visual background accents */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-cyan-50 rounded-full blur-3xl opacity-60" />
            
            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
              
              {/* Founder Avatar */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-1.5 rounded-2xl bg-cyan-600/10 blur-md" />
                  <img
                    src={founderDavidImg}
                    alt="Founder David Omondi"
                    className="relative h-64 w-64 rounded-2xl object-cover border-4 border-white shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                  {/* Small founder badge */}
                  <div className="absolute -bottom-3 -right-3 rounded-full bg-gray-950 px-3 py-1 font-mono text-[10px] font-bold text-white shadow">
                    CEO & Founder
                  </div>
                </div>
              </div>

              {/* Founder Preview Copy */}
              <div className="md:col-span-8 space-y-5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-cyan-600">The Visionary Behind the Freshness</span>
                <h3 className="font-display text-2xl font-black text-gray-950 sm:text-3xl">Meet David Omondi</h3>
                
                <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                  "Growing up on the shores of Lake Victoria in Kisumu, I watched local fishers harvest some of the world’s best tilapia, only to sell it for pennies because they lacked cold storage or market connections. At Nyanam Fisheries, we are changing the story. We utilize modern cold chain routing to link Kisumu nets directly to your plate, raising incomes for fishing families while giving you healthy, certified seafood."
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                  <button
                    onClick={() => navigate('/portfolio')}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gray-950 px-5 py-3 font-display text-xs font-semibold text-white transition-all hover:bg-cyan-700 hover:shadow-lg cursor-pointer"
                  >
                    View David’s Full Story & Tech Portfolio
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <p className="text-[11px] text-gray-400 italic text-center sm:text-left">
                    "Sourcing with integrity. Delivering with excellence."
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. MEDIA GALLERY SECTION */}
      <section id="gallery" data-route="removed-gallery" className="hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 flex items-center justify-center gap-1.5">
              <ImageIcon className="h-4 w-4" /> Lakeside & kitchen Chronicles
            </span>
            <h2 className="font-display text-3xl font-extrabold text-gray-950 sm:text-4xl">
              Our Sourcing & Packing Gallery
            </h2>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm text-gray-500">
              Take a visual tour of our ethical supply chain—from fresh harvests on the lake to hygienic sorting, custom deep frying, and chilled delivery trucks.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {(['all', 'lake', 'kitchen', 'delivery', 'community'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedGalleryTab(tab)}
                className={`rounded-full px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedGalleryTab === tab
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                {tab === 'all' ? 'All Images' : `${tab} Life`}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGallery.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm transition-all hover:shadow-lg">
                <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="font-display text-xs font-bold text-white">{item.title}</p>
                      <p className="text-[10px] text-cyan-300 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2 sm:p-3">
                  <h4 className="font-display text-xs font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section
        id="faq"
        data-route="faq"
        className="py-12 sm:py-20"
        style={{
          backgroundImage: `linear-gradient(rgba(250,249,246,0.72), rgba(250,249,246,0.78)), url(${faqLakePatternImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/80 bg-[#faf9f6]/95 px-5 py-8 shadow-[0_24px_70px_rgba(20,18,15,0.14)] backdrop-blur-[2px] sm:px-10 sm:py-12">
          
          <div className="text-center space-y-3 mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 flex items-center justify-center gap-1">
              <HelpCircle className="h-4 w-4" /> Got Questions?
            </span>
            <h2 className="font-display text-3xl font-extrabold text-gray-950">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Everything you need to know about our Lake Victoria sourcing, hygiene standards, deliveries, and custom prep options.
            </p>
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-[#d9d0c4] border-y border-[#d9d0c4]">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="py-4 sm:py-5">
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between text-left font-display text-sm font-bold text-gray-950 sm:text-base cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-cyan-600 shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  
                  {isOpen && (
                    <div className="mt-3 font-sans text-xs sm:text-sm text-gray-600 leading-relaxed pr-6">
                      <p>{faq.answer}</p>
                      <span className="mt-2 inline-block font-mono text-[9px] uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">
                        Category: {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section data-route="faq" className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-600">Verified Reviews</span>
            <h2 className="font-display text-3xl font-extrabold text-gray-950 sm:text-4xl">
              Trusted by Home Cooks & Professional Chefs
            </h2>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm text-gray-500">
              Read authentic feedback from Kenyan families, busy parents, and culinary experts who value consistent fish freshness.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-0.5 text-amber-500 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="font-sans text-xs sm:text-sm italic text-gray-600 leading-relaxed">
                    "{t.review}"
                  </p>
                </div>

                {/* Testimonial Author */}
                <div className="mt-6 flex items-center gap-3 border-t border-gray-50 pt-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display text-xs font-bold text-gray-950 leading-tight">{t.name}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTACT SECTION */}
      <section id="contact" data-route="contact" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-600">Get In Touch</span>
                <h2 className="font-display text-3xl font-extrabold text-gray-950 sm:text-4xl">
                  Contact Our Sourcing & Logistics Hub
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Have questions about bulk/wholesale orders for restaurants, private catering, custom preparation options, or logistics transit times? Send us a message or call our support lines.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-cyan-50 p-2.5 text-cyan-600 shrink-0"><MapPin className="h-5 w-5" /></div>
                  <div>
                    <p className="font-display text-xs font-bold text-gray-950">Primary Depot & Hub</p>
                    <p className="text-xs text-gray-500 leading-normal mt-0.5">{PHYSICAL_ADDRESS}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-cyan-50 p-2.5 text-cyan-600 shrink-0"><Phone className="h-5 w-5" /></div>
                  <div>
                    <p className="font-display text-xs font-bold text-gray-950">Call or SMS Sales</p>
                    <p className="text-xs text-gray-500 leading-normal mt-0.5">{CONTACT_PHONE}<br />{CONTACT_PHONE_SECONDARY}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-cyan-50 p-2.5 text-cyan-600 shrink-0"><Mail className="h-5 w-5" /></div>
                  <div>
                    <p className="font-display text-xs font-bold text-gray-950">Email Orders team</p>
                    <p className="text-xs text-gray-500 leading-normal mt-0.5">{CONTACT_EMAIL}</p>
                  </div>
                </div>
              </div>

              {/* Beautiful local Map placeholder with premium visual coordinates */}
              <div className="rounded-2xl border border-gray-100 bg-cyan-50/30 p-4 border-dashed relative overflow-hidden">
                <p className="font-mono text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-1">Cold Chain Logistics Route Map</p>
                <p className="text-xs font-bold text-gray-900">Lake Victoria (Kisumu Hub) ──✈── Nairobi Logistics Depot</p>
                <div className="mt-3 h-24 rounded-xl bg-cyan-100/50 flex items-center justify-center text-center p-2">
                  <p className="text-[10px] text-cyan-800 font-medium leading-relaxed italic">
                    "Departing Kisumu Depot daily at 10 PM. Arriving Nairobi Terminal junction by 4 AM. Out for neighborhood delivery by noon."
                  </p>
                </div>
              </div>
            </div>

            {/* Message form */}
            <div className="lg:col-span-7 rounded-3xl border border-gray-100 bg-white p-6 sm:p-10 shadow-lg">
              <h3 className="font-display text-lg font-bold text-gray-950 mb-2">Send us a Direct Message</h3>
              <p className="text-xs text-gray-400 mb-6">Fill out your details and we will respond within 2 business hours.</p>

              {isContactSubmitted ? (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-6 w-6 stroke-[2.2]" />
                  </div>
                  <h4 className="font-display text-sm font-bold text-emerald-900">Message Received!</h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Thank you for contacting Nyanam Fisheries. David's customer logistics associate will get back to you shortly at the provided email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Aminah Omondi"
                      className="mt-1 block w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. aminah@gmail.com"
                      className="mt-1 block w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700">Detailed Message</label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Ask about bulk/restaurant pricing, customized preparation orders, or franchise interest..."
                      className="mt-1 block w-full rounded-xl border border-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-cyan-600 py-3.5 font-display text-xs font-bold text-white shadow-lg shadow-cyan-500/10 hover:bg-cyan-700 cursor-pointer transition-all"
                  >
                    Submit Message Inquiry
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 10. WHATSAPP ORDER CTA CARD */}
      <section data-route="contact" className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-xs">
            <Anchor className="h-6 w-6 text-white animate-pulse-subtle" />
          </div>
          <h2 className="font-display text-2xl font-black sm:text-3xl">
            Want Fresh Tilapia Sourced Today for Tomorrow’s Stew?
          </h2>
          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-cyan-100">
            Skip the delay! Fill your cart and click checkout to instantly submit your customized order details over WhatsApp directly to David’s distribution dispatch team. Fast, transparent, and direct.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('shop')}
              className="rounded-xl bg-white px-6 py-3 font-display text-xs font-bold text-cyan-800 hover:bg-cyan-50 transition-colors shadow-lg cursor-pointer"
            >
              Order Online From Shop Catalog
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Nyanam%20Fisheries!%20I%20want%20to%20order%20some%20fresh%20Tilapia%20delivered.`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-500 px-6 py-3 font-display text-xs font-bold text-white hover:bg-emerald-600 transition-colors shadow-lg flex items-center gap-1.5"
            >
              <MessageSquare className="h-4 w-4" /> Message Direct WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
