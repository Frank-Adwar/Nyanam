/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Testimonial, FAQItem, GalleryItem } from './types';

export const BRAND_NAME = 'Victoria Fresh Tilapia';
export const WHATSAPP_NUMBER = '254712345678'; // Kenyan format without plus sign
export const CONTACT_EMAIL = 'orders@victoriafresh.co.ke';
export const CONTACT_PHONE = '+254 712 345 678';
export const PHYSICAL_ADDRESS = 'Victoria Fresh Hub, Kisumu Road & Nairobi Junction, Nairobi, Kenya';

export const PRODUCTS: Product[] = [
  {
    id: 'raw-fresh-tilapia',
    name: 'Raw Fresh Tilapia (Medium-Large)',
    description: 'Whole, descaled, and gutted fresh tilapia sourced daily from Dunga Beach. Perfect for home grilling or baking.',
    price: 650,
    originalPrice: 720,
    category: 'Fresh Catch',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80',
    unit: 'per kg (approx. 2-3 pcs)',
    available: true,
    featured: true,
    prepTime: 'Freshly cleaned, 10 mins prep'
  },
  {
    id: 'tilapia-fillets',
    name: 'Boneless Tilapia Fillets',
    description: 'De-boned, skinless prime fillets. Highly versatile, ideal for pan-searing, fish tacos, or healthy steaming.',
    price: 700,
    category: 'Fillets & Steaks',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    unit: 'per 500g pack',
    available: true,
    featured: true,
    prepTime: 'Ready-to-cook'
  },
  {
    id: 'fried-tilapia-pack',
    name: 'Crispy Fried Tilapia Family Pack',
    description: 'Locally seasoned, deep-fried whole tilapia pack. Golden, crispy on the outside, and incredibly tender inside.',
    price: 3250,
    originalPrice: 3500,
    category: 'Ready-to-Eat',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    unit: 'Family Pack (5 Large Whole Fish)',
    available: true,
    featured: true,
    prepTime: 'Prepared warm, ready to serve'
  },
  {
    id: 'smoked-tilapia',
    name: 'Traditional Smoked Tilapia',
    description: 'Slow-smoked over organic hardwood using traditional Kisumu methods. Imparts a rich, deep woodfire aroma.',
    price: 350,
    category: 'Smoked & Marinated',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80',
    unit: 'per piece',
    available: true,
    featured: false,
    prepTime: 'Smoked, long shelf-life'
  },
  {
    id: 'marinated-tilapia',
    name: 'Garlic Herb Marinated Tilapia',
    description: 'Whole tilapia infused with our secret blend of fresh garlic, ginger, coriander, and freshly squeezed lemon juice.',
    price: 350,
    originalPrice: 400,
    category: 'Smoked & Marinated',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
    unit: 'per single fish (cleaned & marinated)',
    available: true,
    featured: false,
    prepTime: 'Marinated 12+ hours'
  },
  {
    id: 'tilapia-steaks',
    name: 'Premium Tilapia Steaks',
    description: 'Thick, center-cut bone-in bone-out tilapia cross sections. Holds shape excellently in rich stews or wet fries.',
    price: 650,
    category: 'Fillets & Steaks',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80',
    unit: 'per 1kg pack',
    available: true,
    featured: false,
    prepTime: 'Prepared on order'
  },
  {
    id: 'tilapia-nuggets',
    name: 'Golden Tilapia Nuggets',
    description: 'Crispy, panko-breaded tilapia breast nuggets. A nutritious, high-protein snack that kids and families love.',
    price: 350,
    category: 'Ready-to-Eat',
    image: 'https://images.unsplash.com/photo-1560684352-8497838a2229?auto=format&fit=crop&w=600&q=80',
    unit: 'per 400g pack (approx. 15 nuggets)',
    available: true,
    featured: false,
    prepTime: 'Frozen/Chilled, cook in 5 mins'
  },
  {
    id: 'tilapia-burgers',
    name: 'Victoria Fish Burger Patties',
    description: 'Succulent spiced tilapia mince patties, mixed with fresh herbs. High in protein, low in fat, ready to grill.',
    price: 700,
    category: 'Ready-to-Eat',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=600&q=80',
    unit: 'Pack of 4 patties',
    available: true,
    featured: false,
    prepTime: 'Grill or pan-fry 4 mins per side'
  },
  {
    id: 'tilapia-soup-base',
    name: 'Rich Tilapia Soup & Broth Base',
    description: 'Slow-simmered Tilapia head and bone concentrate, seasoned with local herbs. Loaded with natural collagen and minerals.',
    price: 350,
    category: 'Ready-to-Eat',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
    unit: '500ml tub (frozen)',
    available: true,
    featured: false,
    prepTime: 'Just thaw and simmer'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Aminah Omondi',
    role: 'Nairobi Home Cook',
    review: 'This is the absolute freshest tilapia I have had outside of Kisumu. The gutting and scaling is done perfectly, so I just pop it straight into my pan. Fast delivery too!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '2',
    name: 'Chef Richard Kamau',
    role: 'Executive Chef, Lake Breeze Eatery',
    review: 'Our restaurant depends on high-quality fillets. Victoria Fresh provides consistent size and exceptional taste. David’s team has never let us down on timely morning deliveries.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: '3',
    name: 'Grace Mutua',
    role: 'Mother of Two, Kilimani',
    review: 'The Tilapia Nuggets are an absolute lifesaver. My kids get highly nutritious fish and they enjoy every bite. Love knowing that the fish is caught sustainably and ethically.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do you guarantee the freshness of the tilapia?',
    answer: 'Our fish is harvested daily by local fishers on Lake Victoria. Within hours, it is transferred to cold storage, cleaned, packaged, and transported in temperature-controlled reefers to Nairobi and surrounding areas. It never sits in storage for days.',
    category: 'Sourcing & Freshness'
  },
  {
    id: 'faq-2',
    question: 'What is your delivery schedule and coverage area?',
    answer: 'We deliver daily across Nairobi, Kiambu, Kisumu, and Nakuru. Orders placed before 10:00 PM are processed and delivered the following afternoon between 1:00 PM and 5:00 PM. We charge a small flat delivery fee depending on your exact location.',
    category: 'Delivery'
  },
  {
    id: 'faq-3',
    question: 'Can I choose how my fish is prepared?',
    answer: 'Yes! When placing your order (either through our cart checkout or via WhatsApp), you can request specific preparations like deep scaled, butterfly-cut, head-on/head-off, or skinless filleting at no extra cost.',
    category: 'Customization'
  },
  {
    id: 'faq-4',
    question: 'How does the WhatsApp order process work?',
    answer: 'You can browse our shop, add items to the cart, and click "Order via WhatsApp" or click the WhatsApp float. It will automatically generate a clean, pre-formatted order message with your selected items, prices, and address details, sending it directly to our customer care team to confirm dispatch.',
    category: 'Ordering'
  },
  {
    id: 'faq-5',
    question: 'Are your tilapia wild-caught or farmed?',
    answer: 'We source wild-caught tilapia caught using sustainable hook-and-line or traditional drift nets, as well as premium organic deep-water cage aquaculture tilapia in Lake Victoria. Both methods support Kisumu beach management communities and are ecological.',
    category: 'Sourcing & Freshness'
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Sunrise Catch on Lake Victoria',
    description: 'Local fishers gathering the morning catch under clear Kisumu skies.',
    category: 'lake',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g-2',
    title: 'Professional Cleaning Station',
    description: 'Our hygienic, temperature-controlled facility where fish are gutted and scaled.',
    category: 'kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g-3',
    title: 'Golden Deep Fried Tilapia',
    description: 'Perfectly fried whole fish ready to be packed and dispatched.',
    category: 'kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g-4',
    title: 'Next-Day Delivery Reefer',
    description: 'Our chilled delivery vans maintaining premium freshness to your doorstep.',
    category: 'delivery',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g-5',
    title: 'Empowering Lake Communities',
    description: 'Founder David with local Beach Management leaders in Kisumu.',
    category: 'community',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g-6',
    title: 'Freshness on Ice',
    description: 'Fresh whole tilapia on ice display at our distribution hub.',
    category: 'lake',
    imageUrl: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80'
  }
];
