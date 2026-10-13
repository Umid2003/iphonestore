import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import {
  ShieldCheck,
  Award,
  Truck,
  Sparkles,
  Gift,
  Copy,
  Check,
  Star,
  ChevronDown,
  Quote,
} from 'lucide-react';

export const TrustAndOffers: React.FC = () => {
  const { t } = useStore();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
  ];

  return (
    <div className="space-y-24 py-16">
      {/* 1. WHY CHOOSE US SECTION */}
      <section id="why-us" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Apple Excellence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              {t.trust.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              {t.trust.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl glass-panel p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">
                {t.trust.feature1Title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {t.trust.feature1Desc}
              </p>
            </div>

            <div className="rounded-3xl glass-panel p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-5 shadow-inner">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">
                {t.trust.feature2Title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {t.trust.feature2Desc}
              </p>
            </div>

            <div className="rounded-3xl glass-panel p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 shadow-inner">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">
                {t.trust.feature3Title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {t.trust.feature3Desc}
              </p>
            </div>

            <div className="rounded-3xl glass-panel p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 shadow-inner">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">
                {t.trust.feature4Title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {t.trust.feature4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIAL OFFERS SECTION */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
              <Gift className="w-4 h-4" />
              <span>Privileges</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              {t.offers.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              {t.offers.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Offer 1 */}
            <div className="relative rounded-3xl glass-panel p-8 border border-purple-500/30 overflow-hidden flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 tracking-wider uppercase block mb-1">
                  Exclusive Gift
                </span>
                <h3 className="text-2xl font-display font-bold text-white mb-3">
                  {t.offers.offer1Title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {t.offers.offer1Desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                  <span className="text-xs text-zinc-400 font-mono">CODE:</span>
                  <span className="font-mono font-bold text-sm text-purple-300">
                    {t.offers.offer1Code}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(t.offers.offer1Code)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all active:scale-95 shadow-md"
                >
                  {copiedCode === t.offers.offer1Code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.offers.codeCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.offers.copyCode}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Offer 2 */}
            <div className="relative rounded-3xl glass-panel p-8 border border-indigo-500/30 overflow-hidden flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider uppercase block mb-1">
                  Upgrade Privilege
                </span>
                <h3 className="text-2xl font-display font-bold text-white mb-3">
                  {t.offers.offer2Title}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {t.offers.offer2Desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                  <span className="text-xs text-zinc-400 font-mono">CODE:</span>
                  <span className="font-mono font-bold text-sm text-indigo-300">
                    {t.offers.offer2Code}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(t.offers.offer2Code)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all active:scale-95 shadow-md"
                >
                  {copiedCode === t.offers.offer2Code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.offers.codeCopied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.offers.copyCode}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CUSTOMER REVIEWS */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
              <Star className="w-3.5 h-3.5 fill-purple-400" />
              <span>Verified Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              {t.reviews.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              {t.reviews.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl glass-panel p-6 flex flex-col justify-between border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {t.reviews.verified}
                  </span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  "{t.reviews.sample1}"
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center font-bold text-xs text-white">
                  BM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.reviews.author1}</h4>
                  <p className="text-[11px] text-zinc-400">{t.reviews.city1}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl glass-panel p-6 flex flex-col justify-between border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {t.reviews.verified}
                  </span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  "{t.reviews.sample2}"
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-bold text-xs text-white">
                  NK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.reviews.author2}</h4>
                  <p className="text-[11px] text-zinc-400">{t.reviews.city2}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl glass-panel p-6 flex flex-col justify-between border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {t.reviews.verified}
                  </span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  "{t.reviews.sample3}"
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center font-bold text-xs text-white">
                  SY
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.reviews.author3}</h4>
                  <p className="text-[11px] text-zinc-400">{t.reviews.city3}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ ACCORDION SECTION */}
      <section className="relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              {t.faq.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-white hover:text-purple-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-purple-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
