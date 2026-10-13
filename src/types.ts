export type Language = 'uz' | 'en' | 'ru';

export type ProductColor = {
  name: string;
  nameUz: string;
  nameRu: string;
  hex: string;
  accentHex: string;
};

export type StorageOption = {
  capacity: string;
  priceModifier: number; // multiplier or added amount
};

export interface Product {
  id: string;
  name: string;
  tagline: {
    uz: string;
    en: string;
    ru: string;
  };
  category: 'iphone' | 'accessory';
  series?: string;
  basePriceUZS: number;
  availableColors: ProductColor[];
  storageOptions: StorageOption[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
  specs: {
    display: { uz: string; en: string; ru: string };
    chip: { uz: string; en: string; ru: string };
    camera: { uz: string; en: string; ru: string };
    battery: { uz: string; en: string; ru: string };
    material: { uz: string; en: string; ru: string };
  };
  description: {
    uz: string;
    en: string;
    ru: string;
  };
  dimensions?: string;
  weight?: string;
}

export interface CartItem {
  id: string; // unique combo id: productId-colorHex-storage
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedStorage: StorageOption;
  quantity: number;
  unitPriceUZS: number;
}

export interface OrderDetails {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  paymentMethod: 'cash_on_delivery' | 'card_transfer' | 'terminal';
  notes?: string;
  items: CartItem[];
  subtotalUZS: number;
  deliveryFeeUZS: number;
  totalUZS: number;
}

export interface StoreConfig {
  storeName: string;
  whatsAppPhone: string;
  supportPhone: string;
  showroomAddress: {
    uz: string;
    en: string;
    ru: string;
  };
  workingHours: {
    uz: string;
    en: string;
    ru: string;
  };
}
