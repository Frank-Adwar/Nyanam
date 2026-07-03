/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS, FAQS, GALLERY, TESTIMONIALS, BRAND_NAME, CONTACT_EMAIL, CONTACT_PHONE, PHYSICAL_ADDRESS, WHATSAPP_NUMBER } from '../data';
import { ProductCard } from '../components/ProductCard';
import { useRouter } from '../components/Router';
import { 
  ArrowRight, Check, Anchor, Truck, ShieldCheck, Heart, 
  ChevronDown, ChevronUp, Star, Phone, Mail, MapPin, 
  Sparkles, Coffee, Award, HelpCircle, Image as ImageIcon,
  MessageSquare
} from 'lucide-react';

// Declare the generated high-quality images directly as static asset paths
const tilapiaHeroImg = '/src/assets/images/tilapia_hero_1783025847365.jpg';
const founderDavidImg = '/src/assets/images/founder_david_1783025860180.jpg';

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
  const { navigate } = useRouter();
  
  // Gallery states
  const [selectedGalleryTab, setSelectedGalleryTab] = useState<'all' | 'lake' | 'kitchen' | 'delivery' | 'community'>('all');
  
  // FAQ states
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

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

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white">
      
      {/* 1. HERO SECTION */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-cyan-50/70 via-white to-white py-16 sm:py-24">
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
              <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8 text-center sm:text-left">
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
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-600">Victoria Standards</span>
            <h2 className="font-display text-3xl font-extrabold text-gray-950 sm:text-4xl">
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
      <section id="shop" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-600">Premium Seafood Shop</span>
              <h2 className="font-display text-3xl font-extrabold text-gray-950 sm:text-4xl">
                Browse Our Fresh Tilapia Products
              </h2>
              <p className="max-w-2xl text-xs sm:text-sm text-gray-500">
                From raw clean fillets to woodfire-smoked traditional catches. Add to cart to prepare a dynamic WhatsApp custom delivery request.
              </p>
            </div>
            
            {/* Support guarantee badge */}
            <div className="rounded-xl border border-cyan-100 bg-cyan-50/50 p-3 flex items-center gap-2 shrink-0">
              <Heart className="h-5 w-5 text-cyan-600" />
              <div className="text-[10px] leading-tight">
                <p className="font-bold text-cyan-900">Direct-to-Fisher Profit</p>
                <p className="text-cyan-700">30% higher wages returned to fishers</p>
              </div>
            </div>
          </div>

          {/* Grid list of all products */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                cartQuantity={getCartQuantity(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT SECTION (SOURCING STORY) */}
      <section id="about" className="bg-gray-950 text-white py-16 sm:py-24 overflow-hidden relative">
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
                Victoria Fresh was founded to break this cycle. We partner directly with fishers on Lake Victoria, supply them with insulated ice-chests, run a state-of-the-art clean descaling warehouse in Kisumu, and transport the catch overnight. The result? Unmatched flavor, flawless sanitation, and a direct social impact.
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
      <section className="py-16 sm:py-24">
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
                  "Growing up on the shores of Lake Victoria in Kisumu, I watched local fishers harvest some of the world’s best tilapia, only to sell it for pennies because they lacked cold storage or market connections. At Victoria Fresh, we are changing the story. We utilize modern cold chain routing to link Kisumu nets directly to your plate, raising incomes for fishing families while giving you healthy, certified seafood."
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
      <section id="gallery" className="bg-gray-50 py-16 sm:py-24">
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
      <section id="faq" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
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
          <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
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
      <section className="bg-gray-50 py-16 sm:py-24">
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
      <section id="contact" className="py-16 sm:py-24">
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
                    <p className="text-xs text-gray-500 leading-normal mt-0.5">{CONTACT_PHONE}</p>
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
                    Thank you for contacting Victoria Fresh. David's customer logistics associate will get back to you shortly at the provided email.
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
      <section className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-12">
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
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Victoria%20Fresh!%20I%20want%20to%20order%20some%20fresh%20Tilapia%20delivered.`}
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
