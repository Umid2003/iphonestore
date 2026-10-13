import React from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { MapPin, Clock, Phone, MessageCircle, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, storeConfig, language } = useStore();

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppContact = () => {
    const phone = storeConfig.whatsAppPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <footer id="contact" className="border-t border-white/10 bg-black pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-display font-extrabold text-white tracking-wider">
                {storeConfig.storeName}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
            </div>
            <p className="leading-relaxed text-zinc-400">
              {t.footer.aboutBrand}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppContact}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-emerald-600/20 hover:text-emerald-400 border border-white/10 flex items-center justify-center text-zinc-300 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <a
                href="https://t.me/istudio_uz"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 border border-white/10 flex items-center justify-center text-zinc-300 transition-colors"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Showroom Flagship */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">
              {t.footer.showroom}
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {storeConfig.showroomAddress[language] || storeConfig.showroomAddress.uz}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>
                  {storeConfig.workingHours[language] || storeConfig.workingHours.uz}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span className="font-mono text-zinc-300">{storeConfig.supportPhone}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('hero')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('collection')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.iphones}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('accessories')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.accessories}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('why-us')}
                  className="hover:text-white transition-colors"
                >
                  {t.nav.about}
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge Support & Guarantee */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-bold text-white tracking-wide">
              Apple VIP Concierge
            </h4>
            <p className="leading-relaxed text-zinc-400">
              O'zbekiston bo'ylab eng tezkor yetkazib berish xizmati. Barcha qurilmalar rasmiy kafolat bilan ta'minlangan.
            </p>
            <div className="pt-1">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-purple-300">
                IMEI: 100% REGISTRATION
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-6">
            <span>{t.footer.privacyPolicy}</span>
            <span>{t.footer.termsOfService}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
