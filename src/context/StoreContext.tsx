import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, ProductColor, StorageOption, CartItem, OrderDetails, StoreConfig, Language } from '../types.ts';
import { initialProducts, initialStoreConfig } from '../data/products.ts';
import { translations } from '../i18n/translations.ts';

interface StoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.uz;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  products: Product[];
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  storeConfig: StoreConfig;
  updateStoreConfig: (updates: Partial<StoreConfig>) => void;
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, storage: StorageOption, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalUZS: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isConfirmationOpen: boolean;
  setIsConfirmationOpen: (open: boolean) => void;
  confirmedOrder: OrderDetails | null;
  setConfirmedOrder: (order: OrderDetails | null) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  orders: OrderDetails[];
  addOrder: (order: OrderDetails) => void;
  formatUZS: (amount: number) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'istudio_cart_v1',
  WISHLIST: 'istudio_wishlist_v1',
  CONFIG: 'istudio_config_v1',
  PRODUCTS: 'istudio_products_v1',
  ORDERS: 'istudio_orders_v1',
  LANG: 'istudio_lang_v1',
  THEME: 'istudio_theme_v1',
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language State (Uzbek first)
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return saved === 'en' || saved === 'ru' || saved === 'uz' ? (saved as Language) : 'uz';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    document.documentElement.lang = lang;
  };

  const t = useMemo(() => translations[language], [language]);

  // 2. Theme State (Dark mode default for futuristic luxury showroom)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved === 'light' ? 'light' : 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEYS.THEME, next);
      return next;
    });
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // 3. Store Configuration
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? JSON.parse(saved) : initialStoreConfig;
    } catch {
      return initialStoreConfig;
    }
  });

  const updateStoreConfig = (updates: Partial<StoreConfig>) => {
    setStoreConfig((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(next));
      return next;
    });
  };

  // 4. Products Data (editable via admin panel)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === productId ? { ...p, ...updates } : p));
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(next));
      return next;
    });
  };

  // 5. Cart Management
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: Product,
    color: ProductColor,
    storage: StorageOption,
    quantity = 1
  ) => {
    const itemKey = `${product.id}-${color.hex}-${storage.capacity}`;
    const unitPrice = product.basePriceUZS + storage.priceModifier;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          product,
          selectedColor: color,
          selectedStorage: storage,
          quantity,
          unitPriceUZS: unitPrice,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const cartSubtotalUZS = useMemo(
    () => cart.reduce((sum, item) => sum + item.unitPriceUZS * item.quantity, 0),
    [cart]
  );

  // 6. Wishlist Management
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(next));
      return next;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // 7. Orders history
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addOrder = (order: OrderDetails) => {
    setOrders((prev) => {
      const next = [order, ...prev];
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(next));
      return next;
    });
  };

  // 8. Modals UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Helper: Currency Formatter for Uzbek So'm (UZS)
  const formatUZS = (amount: number): string => {
    const formatted = Math.round(amount)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formatted} ${t.catalog.currency}`;
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        products,
        updateProduct,
        storeConfig,
        updateStoreConfig,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotalUZS,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isConfirmationOpen,
        setIsConfirmationOpen,
        confirmedOrder,
        setConfirmedOrder,
        wishlist,
        toggleWishlist,
        isWishlisted,
        selectedProductForModal,
        setSelectedProductForModal,
        isSearchOpen,
        setIsSearchOpen,
        isAdminOpen,
        setIsAdminOpen,
        orders,
        addOrder,
        formatUZS,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
