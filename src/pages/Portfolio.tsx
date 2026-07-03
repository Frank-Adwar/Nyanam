/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useRouter } from '../components/Router';
import { 
  ArrowLeft, Anchor, FileText, Globe, Code2, Heart, Award, 
  Send, ShieldCheck, Mail, Phone, MapPin, Plus, UserCheck, Sparkles, MessageSquare
} from 'lucide-react';

// Use David's generated portrait as a static asset path
const founderDavidImg = '/src/assets/images/founder_david_1783025860180.jpg';

// Types for the interactive Beach-Ledger Demo
interface CatchRecord {
  id: string;
  fisherName: string;
  beach: string;
  species: string;
  weight: number; // in kg
  rate: number; // KSH per kg
  payout: number; // calculated KSH
  timestamp: string;
}

export const Portfolio: React.FC = () => {
  const { navigate } = useRouter();

  // Contact form state
  const [portfolioContact, setPortfolioContact] = useState({ name: '', email: '', note: '' });
  const [isPortfolioSubmitted, setIsPortfolioSubmitted] = useState(false);

  // Beach-Ledger Interactive Demo State
  const [ledgerRecords, setLedgerRecords] = useState<CatchRecord[]>([
    {
      id: 'REC-001',
      fisherName: 'George Ochieng',
      beach: 'Dunga Beach (Kisumu)',
      species: 'Tilapia (Gega)',
      weight: 18,
      rate: 350,
      payout: 6300,
      timestamp: 'Today, 08:14 AM'
    },
    {
      id: 'REC-002',
      fisherName: 'Amina Nekesa',
      beach: 'Kendu Bay',
      species: 'Nile Perch (Mbuta)',
      weight: 42,
      rate: 400,
      payout: 16800,
      timestamp: 'Today, 09:32 AM'
    }
  ]);

  // Catch Ledger inputs
  const [newCatch, setNewCatch] = useState({
    fisherName: '',
    beach: 'Dunga Beach (Kisumu)',
    species: 'Tilapia (Gega)',
    weight: ''
  });

  const getSpeciesRate = (species: string) => {
    switch(species) {
      case 'Tilapia (Gega)': return 350;
      case 'Nile Perch (Mbuta)': return 400;
      case 'Lungfish (Kamongo)': return 280;
      default: return 300;
    }
  };

  const handleAddCatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatch.fisherName || !newCatch.weight || isNaN(Number(newCatch.weight))) {
      alert('Please fill out a valid fisher name and numerical weight.');
      return;
    }

    const weightNum = Math.abs(Number(newCatch.weight));
    const rate = getSpeciesRate(newCatch.species);
    const payout = weightNum * rate;
    
    const record: CatchRecord = {
      id: `REC-00${ledgerRecords.length + 1}`,
      fisherName: newCatch.fisherName,
      beach: newCatch.beach,
      species: newCatch.species,
      weight: weightNum,
      rate: rate,
      payout: payout,
      timestamp: 'Just now'
    };

    setLedgerRecords([record, ...ledgerRecords]);
    setNewCatch({
      fisherName: '',
      beach: 'Dunga Beach (Kisumu)',
      species: 'Tilapia (Gega)',
      weight: ''
    });
  };

  const handlePortfolioContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (portfolioContact.name && portfolioContact.email && portfolioContact.note) {
      setIsPortfolioSubmitted(true);
      setTimeout(() => {
        setIsPortfolioSubmitted(false);
        setPortfolioContact({ name: '', email: '', note: '' });
      }, 5000);
    }
  };

  // Calculations for Beach Ledger
  const totalWeightLogged = ledgerRecords.reduce((sum, r) => sum + r.weight, 0);
  const totalPayoutGiven = ledgerRecords.reduce((sum, r) => sum + r.payout, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiasedSelection">
      
      {/* Upper Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/fish')}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-3.5 py-2 font-display text-xs font-semibold text-cyan-400 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Victoria Fresh Shop
          </button>
          
          <div className="flex items-center gap-2">
            <Anchor className="h-5 w-5 text-cyan-400" />
            <span className="font-display text-sm font-bold tracking-tight text-white">
              David Omondi <span className="text-cyan-400">Portfolio</span>
            </span>
          </div>
        </div>
      </header>

      {/* Hero / About me block */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-800 bg-radial-gradient from-slate-950/80 via-slate-900 to-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            
            {/* Left bio card */}
            <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left space-y-4">
              <div className="relative group">
                <div className="absolute -inset-1.5 rounded-3xl bg-cyan-500/20 blur-xl opacity-75 group-hover:bg-cyan-500/30 transition-all" />
                <img
                  src={founderDavidImg}
                  alt="David Omondi Kenyan Entrepreneur"
                  className="relative h-72 w-72 rounded-3xl object-cover border-4 border-slate-800 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="pt-2">
                <h1 className="font-display text-3xl font-black text-white">David Omondi</h1>
                <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest mt-0.5">Social Supply Chain Engineer</p>
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 justify-center lg:justify-start">
                  <MapPin className="h-3.5 w-3.5 text-cyan-500" /> Kisumu & Nairobi, Kenya
                </p>
              </div>

              {/* Social micro links */}
              <div className="flex items-center gap-3 pt-2 text-slate-400">
                <a href="#projects" className="hover:text-cyan-400 transition-colors text-xs font-semibold">Initiatives</a>
                <span>•</span>
                <a href="#ledger" className="hover:text-cyan-400 transition-colors text-xs font-semibold">Beach Ledger Demo</a>
                <span>•</span>
                <a href="#contact" className="hover:text-cyan-400 transition-colors text-xs font-semibold">Collaborate</a>
              </div>
            </div>

            {/* Right details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-950/80 px-3 py-1 font-mono text-xs font-bold text-cyan-400 border border-cyan-800/50">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Empowering Lake Victoria Cooperatives with Code</span>
              </div>

              <h2 className="font-display text-3xl font-extrabold sm:text-4xl text-white leading-tight">
                Bridging the Gap Between Artisan Fisheries & Modern Digital Supply Chains
              </h2>

              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                Hello, I am David Omondi. I am a software developer and social logistics entrepreneur based in Kisumu, Kenya. Growing up near Dunga Beach, I saw first-hand how the hard work of fishermen was undervalued due to lack of cold storage and direct market channels. 
              </p>

              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                By blending my background in **React, TypeScript, and logistics engineering**, I designed **Victoria Fresh**—an integrated cold-chain distribution network. We buy seafood at premium fair rates directly from beach cooperatives, pack it hygienically, and deliver it overnight to Nairobi kitchens.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <div className="text-cyan-400 font-bold text-lg">30% High</div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Fisher Payout Increase</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <div className="text-cyan-400 font-bold text-lg">Cold-Chain</div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Logistics Integration</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <div className="text-cyan-400 font-bold text-lg">TypeScript</div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Ledger Tech Developer</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects and Initiatives section */}
      <section id="projects" className="py-16 sm:py-24 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 mb-12 text-center sm:text-left">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">Active Ventures</span>
            <h3 className="font-display text-2xl font-black text-white sm:text-3xl">Projects & Social Impact Campaigns</h3>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Project 1 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400">
                  <Anchor className="h-5 w-5" />
                </div>
                <h4 className="font-display text-base font-bold text-white">Victoria Fresh Shop & Logistics</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The primary digital storefront linking fishermen in Kisumu to households and diners in Nairobi. Implements custom shopping carts, automated WhatsApp invoice generators, and thermal packing tracking.
                </p>
              </div>
              <button onClick={() => navigate('/fish')} className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300">
                Browse Shop Portal <span>→</span>
              </button>
            </div>

            {/* Project 2 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400">
                  <Code2 className="h-5 w-5" />
                </div>
                <h4 className="font-display text-base font-bold text-white">Beach-Ledger BMU Software</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A simplified lightweight React app designed for Beach Management Units (BMUs) on the shores of Lake Victoria. Assists beach record-keepers in logging catch weight and automatically calculating payouts to fisher folk.
                </p>
              </div>
              <a href="#ledger" className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300">
                Jump to Live Demo Below <span>↓</span>
              </a>
            </div>

            {/* Project 3 */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400">
                  <Heart className="h-5 w-5" />
                </div>
                <h4 className="font-display text-base font-bold text-white">Blue Economy Sustainable Fishing</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Campaign funding traditional hook-and-line fishermen. We actively distribute biodegradable drift nets and lead monthly beach garbage cleanup drives at Dunga and Hippo Points.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Award className="h-4 w-4 text-emerald-500" /> Active NGO Campaign
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO: BEACH-LEDGER BMU TOOL */}
      <section id="ledger" className="py-16 sm:py-24 border-b border-slate-800 bg-slate-950/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center justify-center gap-1">
              <Code2 className="h-4 w-4" /> Interactive Tech Prototype
            </span>
            <h3 className="font-display text-2xl font-black text-white sm:text-3xl">
              Beach-Ledger BMU Log System
            </h3>
            <p className="mx-auto max-w-2xl text-xs text-slate-400">
              I built this lightweight ledger prototype to demonstrate how cooperative beaches log their catch transparently. Test it out! Register a new fisher's weight to calculate fair local payouts.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            
            {/* Input Form Column */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:p-6 space-y-5">
              <h4 className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                <Plus className="h-4 w-4 text-cyan-400" /> Log Shoreline Catch
              </h4>
              
              <form onSubmit={handleAddCatch} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Fisherman Name *</label>
                  <input
                    type="text"
                    required
                    value={newCatch.fisherName}
                    onChange={(e) => setNewCatch({ ...newCatch, fisherName: e.target.value })}
                    placeholder="e.g. Ochieng Otieno"
                    className="mt-1 block w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Harvest Beach</label>
                    <select
                      value={newCatch.beach}
                      onChange={(e) => setNewCatch({ ...newCatch, beach: e.target.value })}
                      className="mt-1 block w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option>Dunga Beach (Kisumu)</option>
                      <option>Kendu Bay</option>
                      <option>Homa Bay</option>
                      <option>Seme Beach</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Species type</label>
                    <select
                      value={newCatch.species}
                      onChange={(e) => setNewCatch({ ...newCatch, species: e.target.value })}
                      className="mt-1 block w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    >
                      <option>Tilapia (Gega)</option>
                      <option>Nile Perch (Mbuta)</option>
                      <option>Lungfish (Kamongo)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Weight (kg) *</label>
                  <input
                    type="number"
                    required
                    value={newCatch.weight}
                    onChange={(e) => setNewCatch({ ...newCatch, weight: e.target.value })}
                    placeholder="e.g. 24"
                    className="mt-1 block w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-cyan-600 py-2.5 font-display text-xs font-bold text-white shadow-lg hover:bg-cyan-700 cursor-pointer"
                >
                  Record Catch to Ledger
                </button>
              </form>

              {/* Formula detail */}
              <div className="rounded-xl bg-slate-900 p-3.5 border border-slate-800/60 text-[10px] leading-relaxed text-slate-400 space-y-1">
                <p className="font-semibold text-slate-300">Payout Rates Used:</p>
                <p>• Tilapia (Gega): KSH 350 / kg</p>
                <p>• Nile Perch (Mbuta): KSH 400 / kg</p>
                <p>• Lungfish (Kamongo): KSH 280 / kg</p>
                <p className="text-cyan-400 mt-1 font-mono">Formula: Weight * Fair Cooperate Rate</p>
              </div>
            </div>

            {/* Live Ledger Output Column */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Summary Stats cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-[10px] uppercase font-mono text-slate-500">Total Weight Logged</p>
                  <p className="font-display text-xl font-bold text-white mt-1">{totalWeightLogged} kg</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <p className="text-[10px] uppercase font-mono text-slate-500">Cooperative Payout</p>
                  <p className="font-display text-xl font-bold text-cyan-400 mt-1">KSH {totalPayoutGiven.toLocaleString()}</p>
                </div>
              </div>

              {/* Catch log table */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
                <div className="border-b border-slate-800 bg-slate-900/60 px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider font-semibold text-slate-400">Secure Shoreline Ledger Records (Local State)</p>
                </div>

                <div className="overflow-x-auto max-h-[295px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-slate-800 text-xs">
                    <thead className="bg-slate-950 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-2.5 text-left">ID</th>
                        <th className="px-4 py-2.5 text-left">Fisherman</th>
                        <th className="px-4 py-2.5 text-left">Beach</th>
                        <th className="px-4 py-2.5 text-right">Qty</th>
                        <th className="px-4 py-2.5 text-right">Fair payout</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-950/40 font-mono">
                      {ledgerRecords.map((rec) => (
                        <tr key={rec.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="px-4 py-3 text-cyan-400 font-semibold text-[10px]">{rec.id}</td>
                          <td className="px-4 py-3 text-slate-200">{rec.fisherName}</td>
                          <td className="px-4 py-3 text-slate-400 text-[10px]">{rec.beach.replace(' (Kisumu)', '')}</td>
                          <td className="px-4 py-3 text-right text-slate-300">{rec.weight} kg <span className="text-[9px] text-slate-500">({rec.species.split(' ')[0]})</span></td>
                          <td className="px-4 py-3 text-right font-semibold text-emerald-400">KSH {rec.payout.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="py-16 sm:py-24 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">Capabilities</span>
            <h3 className="font-display text-2xl font-black text-white sm:text-3xl">Professional Skill Matrix</h3>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-2">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">Frontend Tech Stack</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                React, TypeScript, Vite, Tailwind CSS, motion animations, responsive layout architectures.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-2">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">Logistics & Supply</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Cold-chain transportation routes, storage temp maintenance, inventory control, and cooperative supply integrations.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-2">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">Business Mechanics</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Fair-trade purchasing models, Beach Cooperative liaison, cashflow tracking, customer support funnels.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-2">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">Sustainable Development</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Aquaculture ecosystems, marine conservation nets, beach cleanups, and local fishermen social microfinance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO CONTACT FORM */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-10 space-y-6">
            
            <div className="text-center space-y-2">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center justify-center gap-1">
                <UserCheck className="h-4 w-4" /> Let's Connect!
              </span>
              <h3 className="font-display text-xl font-bold text-white">Let’s Collaborate or Consultation</h3>
              <p className="text-xs text-slate-400">
                Are you interested in our cooperative logistics, sustainable seafood advocacy, or custom software solutions? Drop me a message.
              </p>
            </div>

            {isPortfolioSubmitted ? (
              <div className="rounded-2xl border border-emerald-900 bg-emerald-950/40 p-6 text-center space-y-3">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900 text-emerald-400">
                  <UserCheck className="h-5 w-5" />
                </div>
                <h4 className="font-display text-xs font-bold text-emerald-300">Message Received by David!</h4>
                <p className="text-[11px] text-emerald-400 leading-relaxed">
                  Thank you for reaching out. I’ll review your details and respond over email within 24 hours. Asante sana!
                </p>
              </div>
            ) : (
              <form onSubmit={handlePortfolioContact} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Your Name</label>
                    <input
                      type="text"
                      required
                      value={portfolioContact.name}
                      onChange={(e) => setPortfolioContact({ ...portfolioContact, name: e.target.value })}
                      placeholder="e.g. Richard"
                      className="mt-1 block w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={portfolioContact.email}
                      onChange={(e) => setPortfolioContact({ ...portfolioContact, email: e.target.value })}
                      placeholder="e.g. richard@gmail.com"
                      className="mt-1 block w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-slate-400">Cooperation Note / Message</label>
                  <textarea
                    required
                    rows={3}
                    value={portfolioContact.note}
                    onChange={(e) => setPortfolioContact({ ...portfolioContact, note: e.target.value })}
                    placeholder="Write a message about investing, consulting, tech partnerships, or fisheries conservation..."
                    className="mt-1 block w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-cyan-600 py-2.5 font-display text-xs font-bold text-white shadow-lg hover:bg-cyan-700 cursor-pointer"
                >
                  Send Message to David
                </button>
              </form>
            )}

            {/* Cross-linking back button */}
            <div className="border-t border-slate-800 pt-6 text-center">
              <button
                onClick={() => navigate('/fish')}
                className="inline-flex items-center gap-1.5 font-display text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                ← Back to Victoria Fresh Tilapia Shop
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
