/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in KSH
  originalPrice?: number; // for discount display
  category: string;
  image: string;
  unit: string; // e.g., "per kg", "per piece", "per pack"
  available: boolean;
  featured?: boolean;
  prepTime?: string; // e.g., "15-20 mins"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'lake' | 'kitchen' | 'delivery' | 'community';
  imageUrl: string;
}

export interface OrderDetails {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryMethod: 'home' | 'pickup';
  paymentMethod: 'mpesa' | 'cash';
  notes?: string;
}
