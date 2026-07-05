/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartItem, Product, OrderDetails } from '../types';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle2, MessageSquare, Truck, Heart, CreditCard } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [formData, setFormData] = useState<OrderDetails>({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    deliveryMethod: 'home',
    paymentMethod: 'mpesa',
    notes: '',
  });

  const [orderId, setOrderId] = useState<string>('');
  const [activeTrackingStep, setActiveTrackingStep] = useState<number>(0);

  // Generate order ID when entering success state
  useEffect(() => {
    if (checkoutStep === 'success') {
      const rand = Math.floor(1000 + Math.random() * 9000);
      setOrderId(`VF-2026-${rand}`);
      setActiveTrackingStep(0);

      // Simple active tracker simulation
      const interval = setInterval(() => {
        setActiveTrackingStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [checkoutStep]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = formData.deliveryMethod === 'home' && subtotal > 0 ? 250 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliveryChange = (method: 'home' | 'pickup') => {
    setFormData((prev) => ({ ...prev, deliveryMethod: method }));
  };

  const handlePaymentChange = (method: 'mpesa' | 'cash') => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  // Generate WhatsApp text invoice
  const generateWhatsAppUrl = () => {
    const itemsText = cartItems
      .map(
        (item) =>
          `• ${item.quantity}x ${item.product.name} (${item.product.unit}) = KSH ${(
            item.product.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const message = `*NEW ORDER FROM NYANAM FISHERIES* 🐠\n--------------------------------------\n*Order ID:* ${orderId}\n*Customer Name:* ${formData.customerName}\n*Phone Number:* ${formData.customerPhone}\n*Delivery Address:* ${formData.deliveryAddress}\n*Delivery Mode:* ${
      formData.deliveryMethod === 'home' ? 'Home Delivery (KSH 250)' : 'Self Pickup at Hub (Free)'
    }\n*Payment Mode:* ${formData.paymentMethod === 'mpesa' ? 'M-Pesa Prompt' : 'Cash on Delivery'}\n\n*ITEMS ORDERED:*\n${itemsText}\n\n*Subtotal:* KSH ${subtotal.toLocaleString()}\n*Delivery Fee:* KSH ${deliveryFee.toLocaleString()}\n*GRAND TOTAL:* KSH ${grandTotal.toLocaleString()}\n\n${
      formData.notes ? `*Prep Instructions:* ${formData.notes}\n` : ''
    }--------------------------------------\nPlease confirm my order and send the payment prompts. Asante!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone || !formData.deliveryAddress) {
      alert('Please fill out all required delivery fields.');
      return;
    }
    setCheckoutStep('success');
  };

  const handleDone = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-modal="true" role="dialog">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-full sm:w-auto sm:pl-10">
        <div className="w-screen max-w-md transform bg-white shadow-2xl transition-all duration-300 flex flex-col h-full">
          
          {/* Cart Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-5 sm:px-6">
            <h2 className="font-display text-lg font-bold text-gray-950 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-cyan-600" />
              {checkoutStep === 'cart' && 'Your Fresh Fish Cart'}
              {checkoutStep === 'form' && 'Delivery Details'}
              {checkoutStep === 'success' && 'Order Dispatched!'}
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-500 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Body Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            
            {/* STEP 1: REVIEW CART */}
            {checkoutStep === 'cart' && (
              <>
                {cartItems.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center py-12">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold text-gray-900">Your cart is empty</h3>
                    <p className="mt-2 text-xs text-gray-500 max-w-xs leading-relaxed">
                      Sourced daily, vacuum-packed, and shipped chilled. Browse our products and order your delicious tilapia now!
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 rounded-xl bg-cyan-600 px-6 py-2.5 font-display text-xs font-semibold text-white shadow-sm hover:bg-cyan-700 cursor-pointer"
                    >
                      Browse Tilapia Catalog
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs text-gray-500">Review your products before entering delivery coordinates:</p>
                    <div className="divide-y divide-gray-100">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex min-w-0 py-4 gap-3 sm:gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-16 w-16 rounded-xl object-cover border border-gray-100 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-display text-sm font-semibold text-gray-950 leading-tight">
                              {item.product.name}
                            </h4>
                            <p className="text-[10px] text-gray-400 font-medium">{item.product.unit}</p>
                            <div className="mt-2 flex items-center justify-between">
                              {/* Quantity selectors */}
                              <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-1.5 py-1">
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-0.5 text-gray-500 hover:bg-white hover:text-cyan-600 rounded cursor-pointer"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="font-mono text-xs font-semibold px-1 text-gray-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-0.5 text-gray-500 hover:bg-white hover:text-cyan-600 rounded cursor-pointer"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              {/* Price */}
                              <div className="flex items-center gap-3">
                                <span className="font-display text-sm font-bold text-gray-900">
                                  KSH {(item.product.price * item.quantity).toLocaleString()}
                                </span>
                                <button
                                  onClick={() => onRemoveItem(item.product.id)}
                                  className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                                  title="Remove item"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: FILL DELIVERY FORM */}
            {checkoutStep === 'form' && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100/50 mb-2">
                  <p className="text-xs font-semibold text-cyan-800">Direct From Lake Victoria</p>
                  <p className="text-[11px] text-cyan-600 leading-normal mt-0.5">
                    Orders are packaged under strict safety protocols and delivered in our refrigerator vehicles to ensure optimal freshness.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="e.g. David Omondi"
                    className="mt-1 block w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700">M-Pesa Registered Phone *</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    required
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    placeholder="e.g. 0712345678"
                    className="mt-1 block w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700">Delivery Address *</label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    required
                    value={formData.deliveryAddress}
                    onChange={handleInputChange}
                    placeholder="e.g. Apt 4B, Kilimani Gardens, Nairobi"
                    className="mt-1 block w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Delivery Mode Option */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Delivery Method</label>
                  <div className="mt-1.5 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleDeliveryChange('home')}
                      className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        formData.deliveryMethod === 'home'
                          ? 'border-cyan-600 bg-cyan-50/50 text-cyan-700'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <Truck className="h-5 w-5 mb-1" />
                      <span className="text-xs font-semibold">Home Delivery</span>
                      <span className="text-[10px] opacity-80">KSH 250 Flat</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeliveryChange('pickup')}
                      className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        formData.deliveryMethod === 'pickup'
                          ? 'border-cyan-600 bg-cyan-50/50 text-cyan-700'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <ShoppingBag className="h-5 w-5 mb-1" />
                      <span className="text-xs font-semibold">Hub Pickup</span>
                      <span className="text-[10px] opacity-80">Free (Kisumu Rd)</span>
                    </button>
                  </div>
                </div>

                {/* Payment Option */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Payment Preference</label>
                  <div className="mt-1.5 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handlePaymentChange('mpesa')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                        formData.paymentMethod === 'mpesa'
                          ? 'border-cyan-600 bg-cyan-50/50 text-cyan-700 font-semibold'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      <CreditCard className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs">M-Pesa Prompt</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePaymentChange('cash')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                        formData.paymentMethod === 'cash'
                          ? 'border-cyan-600 bg-cyan-50/50 text-cyan-700 font-semibold'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      <ShoppingBag className="h-4 w-4 text-gray-600" />
                      <span className="text-xs">Cash on Delivery</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700">Custom Preparation Instructions</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="e.g., Butterfly cut, leave heads on, deep fry extra crispy..."
                    className="mt-1 block w-full rounded-xl border border-gray-200 px-3 py-2 text-xs placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 rounded-xl bg-cyan-600 py-3.5 font-display text-sm font-bold text-white shadow-lg shadow-cyan-500/10 hover:bg-cyan-700 cursor-pointer flex items-center justify-center gap-2"
                >
                  Generate WhatsApp Invoice <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            {/* STEP 3: SUCCESS WITH REAL-TIME ORDER TRACKER */}
            {checkoutStep === 'success' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8 stroke-[2.2]" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-gray-950">Order Sent Successfully!</h3>
                  <p className="mt-1 text-xs text-gray-500 font-mono">Reference: {orderId}</p>
                </div>

                {/* CRITICAL ACTIONS: SUBMIT TO WHATSAPP */}
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 space-y-3">
                  <h4 className="font-display text-xs font-bold text-emerald-800">Action Required: Confirm via WhatsApp</h4>
                  <p className="text-[11px] text-emerald-700 leading-normal">
                    We have compiled your cart invoice. Click the button below to send this directly to David’s customer representative. This completes your reservation and initiates M-Pesa dispatch!
                  </p>
                  
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Open WhatsApp to Confirm
                  </a>
                </div>

                {/* TRUST-BUILDING LIVE DYNAMIC ORDER STATUS TRACKER */}
                <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
                  <h4 className="font-display text-xs font-bold text-gray-950 mb-4 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Live Sourcing & Delivery Tracking
                  </h4>

                  <div className="space-y-5 relative pl-4 border-l border-gray-200">
                    {/* Step 1 */}
                    <div className="relative">
                      <div className={`absolute -left-[21px] top-0.5 rounded-full h-3 w-3 border-2 ${
                        activeTrackingStep >= 0 ? 'bg-cyan-600 border-cyan-100' : 'bg-white border-gray-300'
                      }`} />
                      <p className={`text-xs font-semibold ${activeTrackingStep >= 0 ? 'text-cyan-700' : 'text-gray-400'}`}>
                        Order Received & Reference Registered
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Reference ID recorded in local logs. Waiting for client confirmation.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative">
                      <div className={`absolute -left-[21px] top-0.5 rounded-full h-3 w-3 border-2 ${
                        activeTrackingStep >= 1 ? 'bg-cyan-600 border-cyan-100' : 'bg-white border-gray-300'
                      }`} />
                      <p className={`text-xs font-semibold ${activeTrackingStep >= 1 ? 'text-cyan-700' : 'text-gray-400'}`}>
                        Sourcing Sourced daily from Lake Victoria
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Fishermen cooperatives alerted for selected catch sizes.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative">
                      <div className={`absolute -left-[21px] top-0.5 rounded-full h-3 w-3 border-2 ${
                        activeTrackingStep >= 2 ? 'bg-cyan-600 border-cyan-100' : 'bg-white border-gray-300'
                      }`} />
                      <p className={`text-xs font-semibold ${activeTrackingStep >= 2 ? 'text-cyan-700' : 'text-gray-400'}`}>
                        Hygienic Descaling & Packing
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Cleaned, vacuum-sealed, and loaded to chilled freight.</p>
                    </div>

                    {/* Step 4 */}
                    <div className="relative">
                      <div className={`absolute -left-[21px] top-0.5 rounded-full h-3 w-3 border-2 ${
                        activeTrackingStep >= 3 ? 'bg-cyan-600 border-cyan-100' : 'bg-white border-gray-300'
                      }`} />
                      <p className={`text-xs font-semibold ${activeTrackingStep >= 3 ? 'text-cyan-700' : 'text-gray-400'}`}>
                        En Route to {formData.deliveryAddress || 'Nairobi Hub'}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Chilled logistics truck in transit. Delivery expected tomorrow afternoon.</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDone}
                  className="w-full rounded-xl bg-gray-950 py-3 text-xs font-semibold text-white hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Return to Store & Finish
                </button>
              </div>
            )}

          </div>

          {/* Cart Footer Total Panel (Only shown in Step 1 & 2) */}
          {checkoutStep !== 'success' && cartItems.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-6 sm:px-6">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Sourced Subtotal</span>
                  <span>KSH {subtotal.toLocaleString()}</span>
                </div>
                {checkoutStep === 'form' && (
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Chilled Delivery Fee</span>
                    <span>{deliveryFee > 0 ? `KSH ${deliveryFee.toLocaleString()}` : 'Free'}</span>
                  </div>
                )}
                <div className="flex justify-between font-display text-base font-bold text-gray-950 pt-2 border-t border-gray-100">
                  <span>Grand Total</span>
                  <span>KSH {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {checkoutStep === 'cart' && (
                <button
                  onClick={() => setCheckoutStep('form')}
                  className="w-full mt-4 rounded-xl bg-cyan-600 py-3.5 font-display text-xs font-semibold text-white shadow-lg shadow-cyan-500/10 hover:bg-cyan-700 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  Enter Delivery Coordinates <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
