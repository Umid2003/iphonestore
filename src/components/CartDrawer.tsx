import React from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { ProductVisualizer } from './ProductVisualizer.tsx';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    t,
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotalUZS,
    setIsCheckoutOpen,
    formatUZS,
  } = useStore();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-zinc-950 border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-display font-bold text-white">
              {t.cart.title}
            </h2>
            <span className="text-xs font-mono text-zinc-400">
              ({cart.length})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-zinc-400 hover:text-red-400 transition-colors px-2 py-1"
                title={t.cart.clearCart}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  {t.cart.emptyTitle}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                  {t.cart.emptySubtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
              >
                {t.cart.continueShopping}
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl glass-panel p-3.5 border border-white/10 flex items-center gap-3 relative group"
              >
                {/* Visualizer Thumbnail */}
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                  <ProductVisualizer
                    product={item.product}
                    selectedColor={item.selectedColor}
                    size="sm"
                    view="angled"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      {item.selectedColor.name}
                    </span>
                    {item.selectedStorage?.capacity && (
                      <>
                        <span>·</span>
                        <span>{item.selectedStorage.capacity}</span>
                      </>
                    )}
                  </div>
                  <div className="text-xs font-mono font-bold text-white mt-1 tabular-nums">
                    {formatUZS(item.unitPriceUZS * item.quantity)}
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg p-0.5">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-bold text-white px-1.5">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-black/60 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>{t.cart.subtotal}</span>
                <span className="font-mono text-zinc-200 tabular-nums">
                  {formatUZS(cartSubtotalUZS)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>{t.cart.delivery}</span>
                <span className="text-emerald-400 font-semibold">
                  {t.cart.freeDelivery}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>{t.cart.total}</span>
                <span className="font-mono text-purple-300 tabular-nums">
                  {formatUZS(cartSubtotalUZS)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-600/30"
            >
              <span>{t.cart.checkoutButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Kafolatlangan xavfsiz to'lov va tekshiruv</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
