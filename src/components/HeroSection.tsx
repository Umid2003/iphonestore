import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { ThreeIPhone } from './ThreeIPhone.tsx';
import { ArrowRight, Sparkles, ShieldCheck, Cpu, Eye, Zap } from 'lucide-react';
import { ProductColor } from '../types.ts';

export const HeroSection: React.FC = () => {
  const { t, products, setSelectedProductForModal } = useStore();

  // Find the flagship iPhone 17 Pro Max
  const flagship = products.find((p) => p.id === 'iphone-17-pro-max') || products[0];

  const [activeColor, setActiveColor] = useState<ProductColor>(
    flagship.availableColors[0]
  );

  const handleExploreClick = () => {
    setSelectedProductForModal(flagship);
  };

  const handleViewCollection = () => {
    const el = document.getElementById('collection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-16">
      {/* Ambient Lighting & Futuristic Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Electric purple radial aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-700/15 rounded-full blur-[140px] pointer-events-none" />
        {/* Silver illumination highlight */}
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        {/* Subtle grid mesh */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT COLUMN: Editorial Typography & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            {/* Subtle editorial kicker without pills */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-purple-400">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>{t.hero.badge}</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-400">{flagship.name}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-extrabold text-white tracking-tight leading-[1.08] text-balance">
              {t.hero.headline}
            </h1>

            {/* Supporting description */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed text-pretty">
              {t.hero.subtitle}
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleExploreClick}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all duration-200 shadow-xl shadow-purple-950/20 active:scale-95"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleViewCollection}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all duration-200 active:scale-95"
              >
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>

            {/* Key Architectural Specs row (Anti-slop, clean unboxed metadata) */}
            <div className="pt-8 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  CHIP
                </span>
                <span className="text-sm font-semibold text-zinc-200 mt-1">A19 Pro (3nm)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-purple-400" />
                  DISPLAY
                </span>
                <span className="text-sm font-semibold text-zinc-200 mt-1">6.9" 120Hz</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  CHASSIS
                </span>
                <span className="text-sm font-semibold text-zinc-200 mt-1">Grade 5 Titan</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                  CAMERA
                </span>
                <span className="text-sm font-semibold text-zinc-200 mt-1">48MP 5x Zoom</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Realistic 3D Interactive Three.js iPhone */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="w-full relative rounded-3xl glass-panel p-2 md:p-6 shadow-2xl border border-white/10 overflow-hidden">
              <ThreeIPhone
                selectedColor={activeColor}
                onColorChange={setActiveColor}
                availableColors={flagship.availableColors}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
