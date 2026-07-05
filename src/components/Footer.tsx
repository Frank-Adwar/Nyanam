/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useRouter } from './Router';
import { Anchor, Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_SECONDARY, PHYSICAL_ADDRESS } from '../data';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Top Value Bar */}
      <div className="border-b border-gray-900 bg-gray-900/40 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-white">100% Quality Assurance</p>
                <p className="text-xs text-gray-500">Hygiene-certified from lake harvest to delivery.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-white">Cold-Chain logistics</p>
                <p className="text-xs text-gray-500">Stored at 2°C to lock in original taste & nutrition.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-white">Ethically Sourced</p>
                <p className="text-xs text-gray-500">Supporting Kisumu BMU fishing cooperatives directly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Logo and Brand Bio */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Anchor className="h-6 w-6 stroke-[2.5] text-cyan-400" />
              <span className="font-display text-xl font-bold tracking-tight">
                Nyanam <span className="text-cyan-400">Fisheries</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-gray-500">
              The premier online destination for **fresh tilapia in Kenya**. Offering premium wild-caught and organic-aquacultured fish from **Lake Victoria fish delivery** networks straight to your kitchen.
            </p>
            <div className="pt-2 text-[11px] leading-relaxed text-gray-600">
              <p className="font-semibold text-gray-500">SEO Keywords:</p>
              <p>Buy tilapia online Kenya • Fresh tilapia in Nairobi • Lake Victoria fish delivery • Order fish WhatsApp Kisumu • Fish supplier Kenya • Deep fried Tilapia delivery</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('/fish')} className="hover:text-cyan-400 transition-colors text-left">Home Base</button>
              </li>
              <li>
                <button onClick={() => navigate('/products')} className="hover:text-cyan-400 transition-colors text-left">Products Catalog</button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-cyan-400 transition-colors text-left">About Our Sourcing</button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-cyan-400 transition-colors text-left">Help & FAQs</button>
              </li>
            </ul>
          </div>

          {/* Sourcing & Regions */}
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-white">Delivery Regions</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Nairobi (Westlands, Kilimani, Karen, Langata, Eastlands)</li>
              <li>Kiambu & Ruiru Outskirts</li>
              <li>Kisumu City & Lakeshore Hub</li>
              <li>Nakuru CBD & Environs</li>
              <li className="pt-2">
                <button
                  onClick={() => navigate('/portfolio')}
                  className="inline-flex items-center gap-1.5 font-display text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Meet Founder David
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-white">Contact Sales</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-cyan-400" />
                <span className="text-xs leading-tight">{PHYSICAL_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-cyan-400" />
                <span className="text-xs">{CONTACT_PHONE}<br />{CONTACT_PHONE_SECONDARY}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-cyan-400" />
                <span className="text-xs">{CONTACT_EMAIL}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 border-t border-gray-900 pt-6 text-center text-xs text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} Nyanam Fisheries. All Rights Reserved. Sourced sustainably from Lake Victoria.</p>
          <p className="flex items-center justify-center gap-1">
            Empowering Kisumu communities with <Heart className="h-3 w-3 fill-red-500 text-red-500" /> and sustainable trade.
          </p>
        </div>
      </div>
    </footer>
  );
};
