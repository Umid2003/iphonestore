import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { OrderDetails } from '../types.ts';
import {
  X,
  ShieldCheck,
  Truck,
  MessageCircle,
  CreditCard,
  Banknote,
  Receipt,
  Check,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    t,
    cart,
    cartSubtotalUZS,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsConfirmationOpen,
    setConfirmedOrder,
    clearCart,
    formatUZS,
    storeConfig,
    addOrder,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+998 ');
  const [city, setCity] = useState('Toshkent');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'card_transfer' | 'terminal'>(
    'cash_on_delivery'
  );
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || customerPhone.trim().length < 9) {
      setErrorMessage(t.checkout.fillAllFields);
      return;
    }

    const orderId = `IST-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      id: orderId,
      date: new Date().toLocaleDateString(),
      customerName,
      customerPhone,
      city,
      address,
      paymentMethod,
      notes,
      items: [...cart],
      subtotalUZS: cartSubtotalUZS,
      deliveryFeeUZS: 0,
      totalUZS: cartSubtotalUZS,
    };

    addOrder(newOrder);
    setConfirmedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
  };

  // WhatsApp 1-Click Direct Submission
  const handleWhatsAppCheckout = () => {
    if (!customerName.trim() || customerPhone.trim().length < 9) {
      setErrorMessage(t.checkout.fillAllFields);
      return;
    }

    const phone = storeConfig.whatsAppPhone.replace(/[^0-9]/g, '');
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (${item.selectedColor.name}, ${item.selectedStorage?.capacity || ''}) x${item.quantity} = ${formatUZS(
            item.unitPriceUZS * item.quantity
          )}`
      )
      .join('\n');

    const message = encodeURIComponent(
      `💎 YANGI BUYURTMA — iSTUDIO\n\n` +
      `👤 Mijoz: ${customerName}\n` +
      `📞 Tel: ${customerPhone}\n` +
      `📍 Manzil: ${city}, ${address}\n` +
      `💳 To'lov: ${paymentMethod}\n` +
      `${notes ? `📝 Izoh: ${notes}\n` : ''}\n` +
      `📦 Buyurtma tarkibi:\n${itemsList}\n\n` +
      `💰 JAMI: ${formatUZS(cartSubtotalUZS)}\n\n` +
      `Iltimos, buyurtmani yetkazish vaqtini tasdiqlab yuboring!`
    );

    const orderId = `IST-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderDetails = {
      id: orderId,
      date: new Date().toLocaleDateString(),
      customerName,
      customerPhone,
      city,
      address,
      paymentMethod,
      notes,
      items: [...cart],
      subtotalUZS: cartSubtotalUZS,
      deliveryFeeUZS: 0,
      totalUZS: cartSubtotalUZS,
    };

    addOrder(newOrder);
    setConfirmedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl glass-dropdown border border-white/10 shadow-2xl overflow-hidden my-8 p-6 sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono mb-1">
            <Truck className="w-4 h-4" />
            <span>Fast Dispatch Uzbekistan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            {t.checkout.title}
          </h2>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {t.checkout.fullName} *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={t.checkout.fullNamePlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {t.checkout.phone} *
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder={t.checkout.phonePlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-purple-500 transition-colors font-mono"
              />
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {t.checkout.deliveryCity}
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-purple-500 transition-colors"
              >
                <option value="Toshkent">Toshkent shahri (2 soatda tezkor)</option>
                <option value="Samarqand">Samarqand viloyati</option>
                <option value="Buxoro">Buxoro viloyati</option>
                <option value="Andijon">Andijon viloyati</option>
                <option value="Farg'ona">Farg'ona viloyati</option>
                <option value="Namangan">Namangan viloyati</option>
                <option value="Xorazm">Xorazm viloyati</option>
                <option value="Qashqadaryo">Qashqadaryo viloyati</option>
                <option value="Navoiy">Navoiy viloyati</option>
              </select>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">
                {t.checkout.address} *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t.checkout.addressPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">
              {t.checkout.notes}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.checkout.notesPlaceholder}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">
              {t.checkout.paymentMethod}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash_on_delivery')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                  paymentMethod === 'cash_on_delivery'
                    ? 'bg-purple-600/20 border-purple-500 ring-1 ring-purple-500'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <Banknote className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    {t.checkout.cashOnDelivery}
                  </span>
                  <span className="text-[10px] text-zinc-400">Tekshirib naqd to'lash</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card_transfer')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                  paymentMethod === 'card_transfer'
                    ? 'bg-purple-600/20 border-purple-500 ring-1 ring-purple-500'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <CreditCard className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    {t.checkout.cardTransfer}
                  </span>
                  <span className="text-[10px] text-zinc-400">Payme / Click / Uzum</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('terminal')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                  paymentMethod === 'terminal'
                    ? 'bg-purple-600/20 border-purple-500 ring-1 ring-purple-500'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <Receipt className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    {t.checkout.terminal}
                  </span>
                  <span className="text-[10px] text-zinc-400">Kuryerdagi terminal</span>
                </div>
              </button>
            </div>
          </div>

          {/* Order Summary Strip */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-400 block">Jami to'lov:</span>
              <span className="text-xl font-mono font-bold text-white tabular-nums">
                {formatUZS(cartSubtotalUZS)}
              </span>
            </div>
            <div className="text-right text-xs text-zinc-400">
              <span className="text-emerald-400 font-semibold block">Yetkazib berish: Bepul</span>
              <span>1 yillik rasmiy kafolat bilan</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="submit"
              className="py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-600/30"
            >
              <Check className="w-4 h-4" />
              <span>{t.checkout.submitOrder}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              className="py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.checkout.orderViaWhatsApp}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
