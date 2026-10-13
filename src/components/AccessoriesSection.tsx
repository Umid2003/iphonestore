import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { ProductVisualizer } from './ProductVisualizer.tsx';
import { ShoppingBag, ArrowUpRight, Sparkles, Check } from 'lucide-react';
import { Product } from '../types.ts';

export const AccessoriesSection: React.FC = () => {
  const {
    t,
    products,
    addToCart,
    setSelectedProductForModal,
    formatUZS,
    language,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'Audio' | 'Watch' | 'Power' | 'Cases'>('all');

  const accessories = useMemo(() => {
    return products.filter((p) => p.category === 'accessory');
  }, [products]);

  const filteredAccessories = useMemo(() => {
    if (activeTab === 'all') return accessories;
    return accessories.filter((a) => a.series === activeTab);
  }, [accessories, activeTab]);

  const handleQuickAdd = (accessory: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = accessory.availableColors[0];
    const defaultStorage = accessory.storageOptions[0];
    addToCart(accessory, defaultColor, defaultStorage, 1);
  };

  return (
    <section id="accessories" className="py-20 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apple Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              {t.accessories.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-lg">
              {t.accessories.subtitle}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
            {[
              { id: 'all', label: t.accessories.all },
              { id: 'Audio', label: t.accessories.audio },
              { id: 'Watch', label: t.accessories.watch },
              { id: 'Power', label: t.accessories.power },
              { id: 'Cases', label: t.accessories.cases },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accessories Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAccessories.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProductForModal(item)}
              className="group rounded-3xl glass-panel p-5 flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
            >
              {/* Top Series indicator */}
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold uppercase tracking-wider">{item.series}</span>
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" />
                  {t.catalog.inStock}
                </span>
              </div>

              {/* Graphic visualizer */}
              <div className="py-6 flex items-center justify-center min-h-[180px]">
                <ProductVisualizer
                  product={item}
                  selectedColor={item.availableColors[0]}
                  size="md"
                />
              </div>

              {/* Content */}
              <div className="space-y-3 pt-2 border-t border-white/5">
                <div>
                  <h3 className="text-base font-display font-bold text-white group-hover:text-purple-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                    {item.tagline[language] || item.tagline.en}
                  </p>
                </div>

                {/* Price & Add */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-xs text-zinc-500 block">{t.catalog.fromPrice}</span>
                    <span className="text-base font-mono font-bold text-white tabular-nums">
                      {formatUZS(item.basePriceUZS)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(item, e)}
                      className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md active:scale-95"
                      title={t.catalog.addToCart}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedProductForModal(item)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-all"
                      title={t.catalog.viewDetails}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
