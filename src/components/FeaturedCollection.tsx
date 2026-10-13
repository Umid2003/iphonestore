import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { Product, ProductColor } from '../types.ts';
import { ProductVisualizer } from './ProductVisualizer.tsx';
import { Heart, ShoppingBag, ArrowUpRight, Check, Sparkles } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  const {
    t,
    products,
    addToCart,
    isWishlisted,
    toggleWishlist,
    setSelectedProductForModal,
    formatUZS,
  } = useStore();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');

  // Track per-card chosen color
  const [cardColorMap, setCardColorMap] = useState<Record<string, ProductColor>>({});

  // Filter only iPhone devices
  const iphones = useMemo(() => {
    return products.filter((p) => p.category === 'iphone');
  }, [products]);

  const filteredIPhones = useMemo(() => {
    let result = [...iphones];

    // Filter by series tab
    if (activeCategory === 'pro-max') {
      result = result.filter((p) => p.series === 'Pro Max');
    } else if (activeCategory === 'pro') {
      result = result.filter((p) => p.series === 'Pro');
    } else if (activeCategory === 'air') {
      result = result.filter((p) => p.series === 'Air');
    } else if (activeCategory === 'standard') {
      result = result.filter((p) => p.series === 'Standard');
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.basePriceUZS - b.basePriceUZS);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.basePriceUZS - a.basePriceUZS);
    } else {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [iphones, activeCategory, sortBy]);

  const handleColorSelect = (productId: string, color: ProductColor, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardColorMap((prev) => ({ ...prev, [productId]: color }));
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const chosenColor = cardColorMap[product.id] || product.availableColors[0];
    const defaultStorage = product.storageOptions[0];
    addToCart(product, chosenColor, defaultStorage, 1);
  };

  return (
    <section id="collection" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apple Flagships</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              {t.catalog.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-lg">
              {t.catalog.subtitle}
            </p>
          </div>

          {/* Interactive Filter Tabs & Sorter */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
              {[
                { id: 'all', label: t.catalog.all },
                { id: 'pro-max', label: t.catalog.proMax },
                { id: 'pro', label: t.catalog.pro },
                { id: 'air', label: t.catalog.air },
                { id: 'standard', label: t.catalog.standard },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                    activeCategory === tab.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sorter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 rounded-xl px-3 py-2 outline-none cursor-pointer hover:border-white/20 transition-colors"
            >
              <option value="popular" className="bg-zinc-900 text-white">
                {t.catalog.sortPopular}
              </option>
              <option value="price-asc" className="bg-zinc-900 text-white">
                {t.catalog.sortPriceAsc}
              </option>
              <option value="price-desc" className="bg-zinc-900 text-white">
                {t.catalog.sortPriceDesc}
              </option>
            </select>
          </div>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIPhones.map((product) => {
            const activeColor = cardColorMap[product.id] || product.availableColors[0];
            const wishlisted = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductForModal(product)}
                className="group relative rounded-3xl glass-panel p-6 flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-purple-950/20"
              >
                {/* Top Card Bar: Model Tag + Wishlist */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="font-semibold uppercase tracking-wider">{product.series}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {t.catalog.inStock}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    aria-label="Wishlist"
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        wishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Center Visualizer */}
                <div className="py-6 flex items-center justify-center min-h-[300px]">
                  <ProductVisualizer
                    product={product}
                    selectedColor={activeColor}
                    size="md"
                    view="angled"
                  />
                </div>

                {/* Bottom Card Content */}
                <div className="space-y-4 pt-2 border-t border-white/5">
                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-purple-300 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                      {product.tagline[useStore().language] || product.tagline.en}
                    </p>
                  </div>

                  {/* Interactive Color Swatches */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {product.availableColors.map((color) => {
                        const isSelected = activeColor.name === color.name;
                        return (
                          <button
                            key={color.name}
                            type="button"
                            onClick={(e) => handleColorSelect(product.id, color, e)}
                            className={`w-5 h-5 rounded-full transition-all duration-150 relative ${
                              isSelected
                                ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-black scale-110'
                                : 'opacity-70 hover:opacity-100 hover:scale-105'
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        );
                      })}
                    </div>
                    <span className="text-[11px] text-zinc-400 font-medium">
                      {activeColor.name}
                    </span>
                  </div>

                  {/* Price & Primary Action Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[11px] text-zinc-500 block">
                        {t.catalog.fromPrice}
                      </span>
                      <span className="text-lg font-mono font-bold text-white tabular-nums tracking-tight">
                        {formatUZS(product.basePriceUZS)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(product, e)}
                        className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md active:scale-95"
                        title={t.catalog.addToCart}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedProductForModal(product)}
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1 transition-all active:scale-95"
                      >
                        <span>{t.catalog.viewDetails}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
