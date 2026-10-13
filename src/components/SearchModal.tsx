import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { ProductVisualizer } from './ProductVisualizer.tsx';
import { Search, X, ArrowUpRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    t,
    isSearchOpen,
    setIsSearchOpen,
    products,
    setSelectedProductForModal,
    formatUZS,
    language,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');

  const matchingProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return products;
    return products.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(q);
      const seriesMatch = p.series?.toLowerCase().includes(q);
      const taglineMatch = (p.tagline[language] || p.tagline.en).toLowerCase().includes(q);
      const colorsMatch = p.availableColors.some((c) => c.name.toLowerCase().includes(q));
      return nameMatch || seriesMatch || taglineMatch || colorsMatch;
    });
  }, [products, searchQuery, language]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl glass-dropdown border border-white/10 shadow-2xl overflow-hidden p-6 space-y-5">
        {/* Search Input Box */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
          <Search className="w-5 h-5 text-purple-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.nav.searchPlaceholder}
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="p-1 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1">
          <div className="text-xs text-zinc-400 px-2 flex justify-between">
            <span>{matchingProducts.length} {t.catalog.searchFound}</span>
          </div>

          {matchingProducts.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 text-xs">
              {t.catalog.noProducts}
            </div>
          ) : (
            matchingProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProductForModal(p);
                  setIsSearchOpen(false);
                }}
                className="p-3 rounded-2xl glass-panel border border-white/5 hover:border-purple-500/30 flex items-center justify-between gap-4 cursor-pointer transition-all hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                    <ProductVisualizer
                      product={p}
                      selectedColor={p.availableColors[0]}
                      size="sm"
                      view="angled"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{p.name}</h4>
                    <p className="text-[11px] text-zinc-400 line-clamp-1">
                      {p.tagline[language] || p.tagline.en}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono font-bold text-white tabular-nums">
                    {formatUZS(p.basePriceUZS)}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
