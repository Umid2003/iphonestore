import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { X, Save, Check, Settings, Package, ShoppingCart } from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    t,
    isAdminOpen,
    setIsAdminOpen,
    storeConfig,
    updateStoreConfig,
    products,
    updateProduct,
    orders,
    formatUZS,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'settings' | 'products' | 'orders'>('settings');

  // Form states
  const [storeName, setStoreName] = useState(storeConfig.storeName);
  const [whatsAppPhone, setWhatsAppPhone] = useState(storeConfig.whatsAppPhone);
  const [supportPhone, setSupportPhone] = useState(storeConfig.supportPhone);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Product price local changes
  const [editedPrices, setEditedPrices] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      map[p.id] = p.basePriceUZS;
    });
    return map;
  });

  if (!isAdminOpen) return null;

  const handleSaveStoreConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreConfig({
      storeName,
      whatsAppPhone,
      supportPhone,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handlePriceChange = (productId: string, newPriceStr: string) => {
    const val = parseInt(newPriceStr.replace(/\D/g, ''), 10) || 0;
    setEditedPrices((prev) => ({ ...prev, [productId]: val }));
  };

  const handleSaveProductPrice = (productId: string) => {
    const price = editedPrices[productId];
    if (price) {
      updateProduct(productId, { basePriceUZS: price });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const handleToggleStock = (productId: string, currentStock: boolean) => {
    updateProduct(productId, { inStock: !currentStock });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl glass-dropdown border border-white/10 shadow-2xl overflow-hidden my-8 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-white">
                {t.admin.title}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {t.admin.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-purple-600 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Do'kon Sozlamalari</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'products'
                ? 'bg-purple-600 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{t.admin.productsTab}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-purple-600 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{t.admin.ordersTab} ({orders.length})</span>
          </button>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{t.admin.savedNotice}</span>
          </div>
        )}

        {/* TAB 1: General Brand & Phone Settings */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveStoreConfig} className="space-y-4 max-w-xl">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {t.admin.storeName}
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {t.admin.whatsAppNumber}
              </label>
              <input
                type="text"
                value={whatsAppPhone}
                onChange={(e) => setWhatsAppPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {t.admin.supportPhone}
              </label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2 transition-all active:scale-95 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>{t.admin.saveChanges}</span>
            </button>
          </form>
        )}

        {/* TAB 2: Product Prices & Stock */}
        {activeTab === 'products' && (
          <div className="max-h-[460px] overflow-y-auto space-y-3 pr-2">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{p.name}</h4>
                  <span className="text-[11px] text-zinc-500 uppercase font-mono">
                    {p.series} · {p.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={editedPrices[p.id] ?? p.basePriceUZS}
                      onChange={(e) => handlePriceChange(p.id, e.target.value)}
                      className="w-36 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-mono text-white text-right outline-none focus:border-purple-500"
                    />
                    <span className="text-xs text-zinc-400 font-mono">so'm</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSaveProductPrice(p.id)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Narxni saqlash"
                  >
                    <Save className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleStock(p.id, p.inStock)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      p.inStock
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-600/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {p.inStock ? t.admin.inStock : t.admin.outOfStock}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Orders History */}
        {activeTab === 'orders' && (
          <div className="max-h-[460px] overflow-y-auto space-y-3">
            {orders.length === 0 ? (
              <div className="py-12 text-center text-xs text-zinc-400">
                {t.admin.noOrders}
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-2xl glass-panel border border-white/10 space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center font-semibold text-white">
                    <span>
                      #{ord.id} — {ord.customerName}
                    </span>
                    <span className="font-mono text-purple-300">
                      {formatUZS(ord.totalUZS)}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 space-y-1">
                    <div>
                      <span className="text-zinc-500">Tel: </span>
                      {ord.customerPhone} · <span className="text-zinc-500">Manzil: </span>
                      {ord.city}, {ord.address}
                    </div>
                    <div>
                      <span className="text-zinc-500">To'lov: </span>
                      {ord.paymentMethod} · <span className="text-zinc-500">Sana: </span>
                      {ord.date}
                    </div>
                    <div>
                      <span className="text-zinc-500">Mahsulotlar: </span>
                      {ord.items.map((it) => `${it.product.name} x${it.quantity}`).join(', ')}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
