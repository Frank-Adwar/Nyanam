/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { ShoppingBag, Clock, ShieldCheck, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  cartQuantity: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  cartQuantity,
}) => {
  const isDiscounted = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = isDiscounted 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100) 
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50">
      
      {/* Product Image and Badges */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        
        {/* Discount Tag */}
        {isDiscounted && (
          <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 font-display text-[11px] font-bold text-white shadow-sm">
            Save {discountPercent}%
          </span>
        )}

        {/* Sourcing/Fresh Tag */}
        {product.featured && (
          <span className="absolute top-3 right-3 rounded-full bg-cyan-600 px-2.5 py-1 font-display text-[10px] font-semibold text-white shadow-sm flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Best Seller
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-600">
          {product.category}
        </span>
        
        <h3 className="mt-1 font-display text-base font-semibold text-gray-950 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="mt-1 flex-1 font-sans text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Preparation time & Unit info */}
        <div className="mt-3 flex items-center justify-between border-t border-b border-gray-50 py-2 text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-cyan-600" /> {product.prepTime || 'Freshly prepared'}
          </span>
          <span className="font-medium text-gray-600">{product.unit}</span>
        </div>

        {/* Pricing and CTAs */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-lg font-bold text-gray-950">
                KSH {product.price.toLocaleString()}
              </span>
              {isDiscounted && (
                <span className="font-sans text-xs text-gray-400 line-through">
                  KSH {product.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-400 font-medium">VAT Inclusive</p>
          </div>

          {/* Add / Quantity indicator */}
          <button
            onClick={() => onAddToCart(product)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 font-display text-xs font-semibold shadow-sm transition-all cursor-pointer ${
              cartQuantity > 0
                ? 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
                : 'bg-cyan-600 text-white hover:bg-cyan-700'
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {cartQuantity > 0 ? `Added (${cartQuantity})` : 'Order Fresh'}
          </button>
        </div>

      </div>
    </div>
  );
};
