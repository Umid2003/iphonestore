import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, ArrowLeft, PackageCheck, Truck } from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const {
    t,
    isConfirmationOpen,
    setIsConfirmationOpen,
    confirmedOrder,
    formatUZS,
    storeConfig,
  } = useStore();

  useEffect(() => {
    if (isConfirmationOpen) {
      // Fire celebratory luxury purple-silver confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#d8b4fe', '#ffffff', '#6366f1'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isConfirmationOpen]);

  if (!isConfirmationOpen || !confirmedOrder) return null;

  const handleWhatsAppReceipt = () => {
    const phone = storeConfig.whatsAppPhone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Assalomu alaykum! Buyurtmam raqami: ${confirmedOrder.id}\n` +
      `Mijoz: ${confirmedOrder.customerName}\n` +
      `Summa: ${formatUZS(confirmedOrder.totalUZS)}\n\n` +
      `Yetkazib berish holatini bilmoqchiman!`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl glass-dropdown border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8 text-center space-y-6">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-display font-bold text-white">
            {t.confirmation.successTitle}
          </h2>
          <p className="text-xs text-zinc-400">
            {t.confirmation.orderNumber}{' '}
            <span className="font-mono font-bold text-purple-400">
              #{confirmedOrder.id}
            </span>
          </p>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <Truck className="w-4 h-4 text-purple-400 shrink-0" />
            <span>{t.confirmation.estimatedDelivery}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <PackageCheck className="w-4 h-4 text-purple-400 shrink-0" />
            <span>{t.confirmation.thankYou}</span>
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between font-semibold text-white">
            <span>Jami summa:</span>
            <span className="font-mono text-purple-300">
              {formatUZS(confirmedOrder.totalUZS)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={handleWhatsAppReceipt}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-600/30"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.confirmation.sendWhatsAppCopy}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsConfirmationOpen(false)}
            className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.confirmation.backHome}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
