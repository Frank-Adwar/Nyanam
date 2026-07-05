/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from '../components/Router';
import { ArrowLeft, ArrowUpRight, Menu, X, MapPin, Mail, Volume2, VolumeX } from 'lucide-react';
import founderDavidImg from '../assets/images/portfolio_portrait_editorial.png';

const projects = [
  {
    no: '01',
    title: 'Nyanam Fisheries',
    discipline: 'Venture Design · Cold Chain · Commerce',
    description: 'A direct-to-kitchen fish platform connecting Lake Victoria cooperatives with discerning homes across Nairobi.',
    color: '#d7a9aa',
    action: 'Visit the venture',
    route: '/fish',
  },
  {
    no: '02',
    title: 'Beach Ledger',
    discipline: 'Product Strategy · TypeScript · Fintech',
    description: 'A transparent catch and payout ledger designed for Beach Management Units and the people who keep the lake economy moving.',
    color: '#d8cbb7',
  },
  {
    no: '03',
    title: 'Blue Economy Lab',
    discipline: 'Systems Thinking · Community · Climate',
    description: 'Field-led experiments in responsible fishing, fair purchasing, cleaner beaches and stronger cooperative livelihoods.',
    color: '#aeb6a2',
  },
];

export const Portfolio: React.FC = () => {
  const { navigate } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const jazzAudioRef = useRef<HTMLAudioElement | null>(null);

  const startJazz = () => {
    const audio = jazzAudioRef.current;
    if (audio) {
      if (audio.readyState > 0 && audio.currentTime < 10) audio.currentTime = 10;
      void audio.play().catch(() => undefined);
    }
  };

  useEffect(() => {
    const audio = new Audio('https://upload.wikimedia.org/wikipedia/commons/0/03/Jazz_at_the_park.ogg');
    audio.loop = false;
    audio.volume = 0.62;
    audio.preload = 'auto';
    const skipIntro = () => { audio.currentTime = 10; };
    const loopWithoutVoices = () => {
      audio.currentTime = 10;
      void audio.play().catch(() => undefined);
    };
    audio.addEventListener('loadedmetadata', skipIntro, { once: true });
    audio.addEventListener('ended', loopWithoutVoices);
    jazzAudioRef.current = audio;
    startJazz();
    const unlockAudio = () => startJazz();
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      audio.removeEventListener('ended', loopWithoutVoices);
      audio.pause();
      audio.src = '';
      jazzAudioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    if (next) startJazz();
    else jazzAudioRef.current?.pause();
  };

  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="portfolio-page min-h-screen bg-[#0b0909] text-[#f4efe8]">
      <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center border-b border-white/10 bg-[#0b0909]/80 backdrop-blur-md lg:h-24">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-full w-16 shrink-0 items-center justify-center border-r border-white/10 transition-colors hover:bg-[#6f1d1b] sm:w-20 lg:w-[8vw]"
          aria-label="Open portfolio menu"
        >
          {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-3 px-4 sm:px-8 lg:px-12">
          <button onClick={() => goTo('top')} className="portfolio-wordmark text-2xl sm:text-3xl">
            D<span className="font-sans text-[0.72em] font-light not-italic">/O</span>
          </button>
          <div className="hidden items-center gap-8 text-[10px] font-bold uppercase tracking-[0.24em] md:flex">
            <button onClick={() => goTo('work')} className="hover:text-[#d7a9aa]">Selected work</button>
            <button onClick={() => goTo('practice')} className="hover:text-[#d7a9aa]">Practice</button>
            <button onClick={() => goTo('contact')} className="hover:text-[#d7a9aa]">Contact</button>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <button onClick={toggleMusic} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] hover:text-[#d7a9aa]" aria-label={musicEnabled ? 'Mute jazz' : 'Play jazz'} title={musicEnabled ? 'Mute jazz' : 'Play jazz'}>
              {musicEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              <span className="hidden md:inline">Jazz {musicEnabled ? 'on' : 'off'}</span>
            </button>
            <button
              onClick={() => navigate('/fish')}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] hover:text-[#d7a9aa]"
            >
              <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Nyanam Fisheries</span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 grid bg-[#6f1d1b] pt-20 lg:grid-cols-[8vw_1fr] lg:pt-24">
          <div className="hidden border-r border-white/15 lg:block" />
          <nav className="flex flex-col justify-center px-8 sm:px-16 lg:px-[8vw]">
            <p className="mb-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/55">Index / David Ndolo</p>
            {['top', 'work', 'practice', 'contact'].map((id, index) => (
              <button key={id} onClick={() => goTo(id)} className="group flex items-baseline gap-6 border-t border-white/20 py-4 text-left">
                <span className="text-xs text-white/45">0{index + 1}</span>
                <span className="portfolio-display text-4xl capitalize min-[380px]:text-5xl sm:text-7xl group-hover:italic">{id === 'top' ? 'Portrait' : id}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      <main id="top" className="pt-20 lg:pt-24">
        <section className="grid min-h-[calc(100vh-5rem)] border-b border-white/10 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[8vw_42vw_1fr]">
          <aside className="hidden flex-col items-center justify-between border-r border-white/10 py-10 lg:flex">
            <span className="[writing-mode:vertical-rl] text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">Kisumu · Nairobi · 2026</span>
            <span className="portfolio-display text-5xl italic text-[#d7a9aa]">D</span>
          </aside>

          <div className="relative overflow-hidden border-b border-white/10 bg-[#090707] lg:min-h-0 lg:border-b-0 lg:border-r">
            <img src={founderDavidImg} alt="David Ndolo" className="relative block h-auto w-full object-contain object-center grayscale-[18%] contrast-[1.06] lg:absolute lg:inset-0 lg:h-full" style={{ objectFit: 'contain' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between sm:bottom-10 sm:left-10 sm:right-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">Portrait No. 01</p>
                <p className="portfolio-display mt-1 text-4xl">David Ndolo</p>
              </div>
              <p className="hidden text-right text-[9px] uppercase tracking-[0.22em] text-white/60 sm:block">Founder<br />Technologist<br />Systems builder</p>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-[#140b0b] px-7 py-10 sm:px-12 sm:py-14 lg:px-[5vw] lg:py-[7vh]">
            <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.28em] text-white/45">
              <span>Independent Practice</span><span>Est. 2024</span>
            </div>
            <div className="my-16 lg:my-8">
              <p className="portfolio-display max-w-3xl text-3xl leading-[1.12] sm:text-4xl xl:text-[2.85rem]">
                “I build ventures where <em className="text-[#d7a9aa]">business meets dignity</em>—turning local knowledge into elegant systems that move value, not just products.”
              </p>
              <div className="mt-9 flex items-start gap-4">
                <span className="mt-2 h-px w-12 bg-[#d7a9aa]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em]">David Ndolo</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/45">Founder & Social Supply Chain Engineer</p>
                </div>
              </div>
            </div>
            <button onClick={() => goTo('work')} className="group flex w-fit items-center gap-3 border-b border-white pb-2 text-xs font-bold uppercase tracking-[0.16em]">
              View selected works <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
          </div>
        </section>

        <section id="work" className="bg-[#eee8df] text-[#171212]">
          <div className="grid border-b border-black/15 lg:grid-cols-[8vw_1fr]">
            <div className="hidden border-r border-black/15 lg:block" />
            <div className="px-6 py-20 sm:px-12 lg:px-[6vw] lg:py-28">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6f1d1b]">Selected work / 2024—2026</p>
              <h2 className="portfolio-display mt-5 max-w-5xl text-[2.65rem] leading-[0.92] min-[380px]:text-5xl sm:text-8xl lg:text-[9rem]">Ideas with<br /><em>consequence.</em></h2>
            </div>
          </div>

          {projects.map((project) => (
            <article key={project.no} className="grid border-b border-black/15 lg:grid-cols-[8vw_34vw_1fr]">
              <div className="hidden border-r border-black/15 px-5 py-10 text-center text-xs lg:block">{project.no}</div>
              <div className="relative flex min-h-[360px] items-end overflow-hidden border-b border-black/15 p-7 lg:min-h-[520px] lg:border-b-0 lg:border-r lg:p-10" style={{ backgroundColor: project.color }}>
                <span className="portfolio-display absolute -right-4 -top-12 text-[17rem] italic leading-none text-black/10">{project.no}</span>
                <div className="relative">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.24em]">Case study {project.no}</p>
                  <h3 className="portfolio-display text-4xl min-[380px]:text-5xl sm:text-6xl">{project.title}</h3>
                </div>
              </div>
              <div className="flex flex-col justify-between px-7 py-10 sm:px-12 lg:px-[5vw] lg:py-16">
                <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-black/45">{project.discipline}</p>
                <p className="portfolio-display my-16 max-w-2xl text-3xl leading-tight sm:text-4xl">{project.description}</p>
                <button onClick={() => project.route && navigate(project.route)} className="flex w-fit items-center gap-3 border-b border-black pb-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                  {project.action ?? 'Project dossier'} <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </section>

        <section id="practice" className="grid bg-[#6f1d1b] lg:grid-cols-[8vw_1fr]">
          <div className="hidden border-r border-white/15 lg:block" />
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-white/15 px-7 py-20 sm:px-12 lg:border-b-0 lg:border-r lg:px-[6vw] lg:py-28">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/55">The practice</p>
              <h2 className="portfolio-display mt-6 text-[2.65rem] leading-[0.92] min-[380px]:text-5xl sm:text-8xl">Code.<br />Commerce.<br /><em>Community.</em></h2>
            </div>
            <div className="flex flex-col justify-center px-7 py-20 sm:px-12 lg:px-[6vw]">
              <p className="portfolio-display text-3xl leading-snug sm:text-4xl">A multidisciplinary practice shaped on the shores of Lake Victoria and built for a connected African economy.</p>
              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-white/20 pt-8 text-[10px] uppercase tracking-[0.18em]">
                <span>Digital products</span><span>Venture strategy</span><span>Supply systems</span><span>Social impact</span>
              </div>
            </div>
          </div>
        </section>

        <footer id="contact" className="grid bg-[#0b0909] lg:grid-cols-[8vw_1fr]">
          <div className="hidden border-r border-white/10 lg:block" />
          <div className="px-7 py-20 sm:px-12 lg:px-[6vw] lg:py-28">
            <div className="flex flex-col justify-between gap-14 lg:flex-row lg:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d7a9aa]">An invitation</p>
                <h2 className="portfolio-display mt-5 text-[2.65rem] leading-[0.92] min-[380px]:text-5xl sm:text-8xl lg:text-[8rem]">Let’s make<br /><em>something matter.</em></h2>
              </div>
              <div className="space-y-5 text-sm">
                <a href="mailto:info@nyanam-fish.com" className="flex min-w-0 items-center gap-3 border-b border-white/20 pb-3 hover:text-[#d7a9aa]"><Mail className="h-4 w-4 shrink-0" /> <span className="min-w-0 break-all">info@nyanam-fish.com</span></a>
                <p className="flex items-center gap-3 text-white/55"><MapPin className="h-4 w-4 shrink-0" /> Kisumu & Nairobi, Kenya</p>
              </div>
            </div>
            <div className="mt-24 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-[9px] uppercase tracking-[0.22em] text-white/40 sm:flex-row">
              <span>© 2026 David Ndolo</span><span>Technology with texture · Enterprise with soul</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
