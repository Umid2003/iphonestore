import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.tsx';
import { Search, ShoppingBag, Heart, Sun, Moon, Settings, Menu, X, Globe } from 'lucide-react';
import { Language } from '../types.ts';

export const Navbar: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    theme,
    toggleTheme,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsAdminOpen,
    storeConfig,
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'uz', label: "O'zbekcha", flag: "UZ" },
    { code: 'ru', label: "Русский", flag: "RU" },
    { code: 'en', label: "English", flag: "EN" },
  ];

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-black/75 dark:bg-black/85 border-b border-white/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* ZONE 1: Brand Wordmark (Single text element in display face) */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="group flex items-center gap-2 whitespace-nowrap shrink-0 text-xl font-display font-extrabold tracking-wider text-white"
        >
          <span className="bg-gradient-to-r from-purple-400 via-white to-purple-300 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            {storeConfig.storeName}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
        </a>

        {/* ZONE 2: 4–5 single-line clean text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.home}
          </a>
          <a
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('collection');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.iphones}
          </a>
          <a
            href="#accessories"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('accessories');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.accessories}
          </a>
          <a
            href="#why-us"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('why-us');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.about}
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.contact}
          </a>
        </nav>

        {/* ZONE 3: Primary Action & Essential Interactive Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            title={t.nav.searchPlaceholder}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Indicator */}
          <a
            href="#collection"
            onClick={() => handleNavClick('collection')}
            aria-label="Wishlist"
            className="relative p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            title={t.nav.wishlist}
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </a>

          {/* Shopping Cart Bag */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Cart"
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-all text-xs font-semibold"
          >
            <ShoppingBag className="w-4 h-4 text-purple-400" />
            <span className="tabular-nums font-mono">{cartCount}</span>
          </button>

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangDropdownOpen((prev) => !prev)}
              aria-label="Language"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 border border-white/10 transition-all uppercase"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>{language}</span>
            </button>

            {isLangDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-36 glass-dropdown rounded-xl shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setIsLangDropdownOpen(false)}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setLanguage(l.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors ${
                      language === l.code
                        ? 'bg-purple-600 text-white font-bold'
                        : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-[10px] opacity-70 font-mono">{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle (Dark / Light) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            title={theme === 'dark' ? t.nav.themeLight : t.nav.themeDark}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
          </button>

          {/* Admin / Store Settings */}
          <button
            type="button"
            onClick={() => setIsAdminOpen(true)}
            aria-label="Admin Settings"
            className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 hidden sm:inline-flex"
            title={t.nav.adminSettings}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Open Navigation Menu"
            className="p-2 text-zinc-400 hover:text-white transition-colors md:hidden rounded-lg hover:bg-white/5"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-down Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-dropdown border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={() => handleNavClick('hero')}
              className="text-left px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-white/5"
            >
              {t.nav.home}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('collection')}
              className="text-left px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-white/5"
            >
              {t.nav.iphones}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('accessories')}
              className="text-left px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-white/5"
            >
              {t.nav.accessories}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('why-us')}
              className="text-left px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-white/5"
            >
              {t.nav.about}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-white/5"
            >
              {t.nav.contact}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-purple-400 hover:text-purple-300 rounded-lg hover:bg-purple-950/20"
            >
              {t.nav.adminSettings}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
