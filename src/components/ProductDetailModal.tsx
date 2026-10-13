import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { ProductColor, StorageOption } from '../types.ts';
import { ProductVisualizer } from './ProductVisualizer.tsx';
import { ThreeIPhone } from './ThreeIPhone.tsx';
import {
  X,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  Heart,
  MessageCircle,
  Plus,
  Minus,
  Box,
  Eye,
  Check,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    t,
    language,
    selectedProductForModal,
    setSelectedProductForModal,
    addToCart,
    isWishlisted,
    toggleWishlist,
    setIsCheckoutOpen,
    formatUZS,
    storeConfig,
  } = useStore();

  const product = selectedProductForModal;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(() =>
    product ? product.availableColors[0] : ({} as ProductColor)
  );
  const [selectedStorage, setSelectedStorage] = useState<StorageOption>(() =>
    product ? product.storageOptions[0] : ({} as StorageOption)
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'overview'>('specs');
  const [viewMode, setViewMode] = useState<'3d' | 'angled' | 'back' | 'front'>('3d');

  if (!product) return null;

  const isIPhone = product.category === 'iphone';
  const calculatedUnitPrice = product.basePriceUZS + (selectedStorage.priceModifier || 0);
  const calculatedTotal = calculatedUnitPrice * quantity;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedStorage, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedStorage, quantity);
    setSelectedProductForModal(null);
    setIsCheckoutOpen(true);
  };

  // WhatsApp 1-Click Consultation / Order
  const handleWhatsAppOrder = () => {
    const phone = storeConfig.whatsAppPhone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Assalomu alaykum! iSTUDIO do'koningizdan buyurtma bermoqchiman:\n\n` +
      `📱 Mahsulot: ${product.name}\n` +
      `🎨 Rang: ${selectedColor.name}\n` +
      `💾 Xotira: ${selectedStorage.capacity}\n` +
      `🔢 Miqdor: ${quantity} dona\n` +
      `💰 Narxi: ${formatUZS(calculatedTotal)}\n\n` +
      `Mavjudligini tasdiqlab bersangiz!`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl glass-dropdown border border-white/10 shadow-2xl overflow-hidden my-8">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label={t.pdp.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          {/* LEFT COLUMN: Gallery & 3D Interactive Inspector */}
          <div className="lg:col-span-7 bg-zinc-950/60 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative">
            {/* View Mode Switcher */}
            <div className="flex items-center justify-between z-20 mb-4">
              <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
                {isIPhone && (
                  <button
                    type="button"
                    onClick={() => setViewMode('3d')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      viewMode === '3d'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>{t.pdp.view3D}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setViewMode('angled')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'angled'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>3D Angle</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('back')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'back'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>Rear Lens</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('front')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === 'front'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>Front OLED</span>
                </button>
              </div>

              {/* Wishlist toggle */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                title={t.nav.wishlist}
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-400'
                  }`}
                />
              </button>
            </div>

            {/* Visualizer Area */}
            <div className="flex-1 flex items-center justify-center my-auto min-h-[380px]">
              {viewMode === '3d' && isIPhone ? (
                <ThreeIPhone
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                  availableColors={product.availableColors}
                  compact={true}
                />
              ) : (
                <ProductVisualizer
                  product={product}
                  selectedColor={selectedColor}
                  size="hero"
                  view={viewMode === '3d' ? 'angled' : viewMode}
                />
              )}
            </div>

            {/* Delivery & Authenticity Highlights at bottom of left column */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{t.pdp.authenticityNotice}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{t.pdp.deliveryNotice}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contiguous Purchase Module */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Product Title & Series */}
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
                  {product.series || 'Apple Flagship'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  {product.name}
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  {product.tagline[language] || product.tagline.en}
                </p>
              </div>

              {/* Price display */}
              <div className="mt-4 pb-4 border-b border-white/10 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-zinc-500 block">Jami narx</span>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                    {formatUZS(calculatedTotal)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 justify-end">
                    <Check className="w-3.5 h-3.5" />
                    {t.catalog.inStock}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">IMEI 100% Tozalangan</span>
                </div>
              </div>

              {/* Finish / Color Selection */}
              <div className="mt-5 space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400 font-medium">{t.pdp.selectColor}:</span>
                  <span className="text-white font-semibold">{selectedColor.name}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.availableColors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all ${
                          isSelected
                            ? 'bg-white/15 border-purple-500 text-white font-bold ring-1 ring-purple-500'
                            : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Storage Capacity Selection */}
              {product.storageOptions.length > 0 && (
                <div className="mt-5 space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400 font-medium">{t.pdp.selectStorage}:</span>
                    <span className="text-white font-semibold">{selectedStorage.capacity}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {product.storageOptions.map((storage) => {
                      const isSelected = selectedStorage.capacity === storage.capacity;
                      const priceWithStorage = product.basePriceUZS + storage.priceModifier;
                      return (
                        <button
                          key={storage.capacity}
                          type="button"
                          onClick={() => setSelectedStorage(storage)}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-purple-600/20 border-purple-500 ring-1 ring-purple-500 text-white'
                              : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="font-bold text-xs">{storage.capacity}</div>
                          <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                            {formatUZS(priceWithStorage)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mt-5 flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">{t.pdp.quantity}:</span>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono font-bold text-sm text-white px-2 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Specifications Accordion / Quick Specs */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('specs')}
                  className={`pb-1 font-semibold transition-colors border-b-2 ${
                    activeTab === 'specs'
                      ? 'border-purple-500 text-white'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {t.pdp.specifications}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`pb-1 font-semibold transition-colors border-b-2 ${
                    activeTab === 'overview'
                      ? 'border-purple-500 text-white'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {t.pdp.overview}
                </button>
              </div>

              {activeTab === 'specs' ? (
                <div className="space-y-1.5 text-[11px] text-zinc-400 font-mono">
                  <div>
                    <span className="text-zinc-200 font-bold">Display: </span>
                    {product.specs.display[language] || product.specs.display.en}
                  </div>
                  <div>
                    <span className="text-zinc-200 font-bold">Chip: </span>
                    {product.specs.chip[language] || product.specs.chip.en}
                  </div>
                  <div>
                    <span className="text-zinc-200 font-bold">Camera: </span>
                    {product.specs.camera[language] || product.specs.camera.en}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {product.description[language] || product.description.en}
                </p>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10"
                >
                  <ShoppingBag className="w-4 h-4 text-purple-400" />
                  <span>{t.pdp.addToCart}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-600/30"
                >
                  <Zap className="w-4 h-4" />
                  <span>{t.pdp.buyNow}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{t.pdp.orderViaWhatsApp}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
