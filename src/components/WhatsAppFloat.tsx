/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data';

export const WhatsAppFloat: React.FC = () => {
  const message = encodeURIComponent(
    "Hello Nyanam Fisheries! I am visiting your website and would like to make an inquiry about your fresh Lake Victoria Tilapia."
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end sm:bottom-6 sm:right-6">
      
      {/* Tooltip bubble */}
      <div className="mb-2 hidden sm:block max-w-xs rounded-xl bg-gray-900 px-3.5 py-2 text-xs font-medium text-white shadow-lg animate-pulse-subtle">
        <p className="leading-tight">Need help? 🐠 Order directly via **WhatsApp**!</p>
        {/* Little downward arrow */}
        <div className="absolute right-5 bottom-[-4px] h-2 w-2 rotate-45 bg-gray-900"></div>
      </div>

      {/* Floating Green WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-emerald-600 active:scale-95 cursor-pointer sm:h-14 sm:w-14"
        aria-label="Order on WhatsApp"
      >
        {/* Pulse radar rings */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30"></span>
        
        {/* Modern WhatsApp custom icon representing Chat */}
        <MessageSquareText className="h-6 w-6 stroke-[2.2]" />
      </a>
    </div>
  );
};
