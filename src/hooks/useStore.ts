import { useState, useMemo, useCallback } from 'react';
import { watches, type Watch, type Brand, type Material, type CurrencyCode } from '../data/watches';
import { type Language } from '../data/translations';

export type SortOrder = 'price-asc' | 'price-desc' | 'newest';

export interface CartItem {
  watch: Watch;
  quantity: 1;
}

export interface ToastItem {
  id: string;
  message: string;
  type?: 'gold' | 'info';
}

export interface OrderRecord {
  id: string;
  bookingRef: string;
  date: string;
  items: Watch[];
  totalUSD: number;
  deliveryMethod: string;
  showroomCity?: string;
  paymentMethod: string;
  concierge: string;
  status: 'In Verification' | 'Escrow Secured' | 'In Transit';
}

export interface ChatMessage {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  timestamp: string;
}

export function useStore() {
  // ── Language ──────────────────────────────────────────────────────────────
  const [language, setLanguage] = useState<Language>('RU');

  // ── Currency ──────────────────────────────────────────────────────────────
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  // ── Search & Filters ──────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBrand, setActiveBrand] = useState<Brand | 'All'>('All');
  const [activeMaterial, setActiveMaterial] = useState<Material | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  // ── Cart / Allocation ─────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // ── Modals ────────────────────────────────────────────────────────────────
  const [quickViewWatch, setQuickViewWatch] = useState<Watch | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  // ── VIP Portal & Vault ────────────────────────────────────────────────────
  const [vipOpen, setVipOpen] = useState(false);
  const [vaultIds, setVaultIds] = useState<string[]>(['patek-nautilus-5711']);
  const [orders, setOrders] = useState<OrderRecord[]>([
    {
      id: 'ord-01',
      bookingRef: 'CC-2026-V89AP',
      date: '2026-09-18',
      items: [watches[0]],
      totalUSD: 54800,
      deliveryMethod: 'Armored Courier Delivery',
      paymentMethod: 'International Wire Transfer',
      concierge: 'Élodie Marchetti',
      status: 'Escrow Secured',
    },
  ]);

  // ── Concierge Chat ────────────────────────────────────────────────────────
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'concierge',
      text: 'Good day. I am Élodie Marchetti, your Senior Horology Concierge at Chronos & Co. Genève. How may I assist your collection acquisition today?',
      timestamp: '14:22',
    },
  ]);

  // ── Toasts ────────────────────────────────────────────────────────────────
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type: 'gold' | 'info' = 'gold') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Derived: filtered & sorted watches ───────────────────────────────────
  const filteredWatches = useMemo(() => {
    let list = [...watches];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (w) =>
          w.brand.toLowerCase().includes(q) ||
          w.model.toLowerCase().includes(q) ||
          w.variant.toLowerCase().includes(q) ||
          w.ref.toLowerCase().includes(q),
      );
    }

    if (activeBrand !== 'All') {
      list = list.filter((w) => w.brand === activeBrand);
    }

    if (activeMaterial !== 'All') {
      list = list.filter((w) => w.material === activeMaterial);
    }

    switch (sortOrder) {
      case 'price-asc':
        list.sort((a, b) => a.priceUSD - b.priceUSD);
        break;
      case 'price-desc':
        list.sort((a, b) => b.priceUSD - a.priceUSD);
        break;
      case 'newest':
        list.sort((a, b) => b.year - a.year || (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return list;
  }, [searchQuery, activeBrand, activeMaterial, sortOrder]);

  // ── Cart Actions ──────────────────────────────────────────────────────────
  const addToCart = useCallback((watch: Watch) => {
    setCartItems((prev) => {
      if (prev.find((i) => i.watch.id === watch.id)) return prev;
      return [...prev, { watch, quantity: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((watchId: string) => {
    setCartItems((prev) => prev.filter((i) => i.watch.id !== watchId));
  }, []);

  const cartCount = cartItems.length;

  // ── Vault Actions ─────────────────────────────────────────────────────────
  const toggleVault = useCallback((watchId: string) => {
    setVaultIds((prev) => {
      const exists = prev.includes(watchId);
      if (exists) {
        return prev.filter((id) => id !== watchId);
      } else {
        return [...prev, watchId];
      }
    });
  }, []);

  const isVaulted = useCallback((watchId: string) => vaultIds.includes(watchId), [vaultIds]);

  // ── Booking Confirmation ──────────────────────────────────────────────────
  const confirmBooking = useCallback((concierge: string, delivery: string, payment: string, city?: string) => {
    const ref = `CC-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    setBookingRef(ref);

    const newOrder: OrderRecord = {
      id: `ord-${Date.now()}`,
      bookingRef: ref,
      date: new Date().toISOString().split('T')[0],
      items: cartItems.map((i) => i.watch),
      totalUSD: cartItems.reduce((s, i) => s + i.watch.priceUSD, 0),
      deliveryMethod: delivery,
      showroomCity: city,
      paymentMethod: payment,
      concierge,
      status: 'In Verification',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    return { ref, concierge };
  }, [cartItems]);

  const resetBooking = useCallback(() => {
    setBookingRef(null);
    setCheckoutOpen(false);
  }, []);

  // ── Concierge Chat simulation ─────────────────────────────────────────────
  const sendChatMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: timeStr,
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Simulated personalized concierge reply
    setTimeout(() => {
      const replies = [
        `Understood. I have logged your request regarding this piece. Our Geneva vault authentication team will inspect provenance papers before we schedule escrow.`,
        `Thank you for your message. I am currently coordinating with our European vault network. Would you prefer private showroom viewing in Geneva or discreet armored courier?`,
        `Noted with discretion. We hold direct allocation for this reference. I will prepare the formal allocation deed and insurance certificate for you shortly.`,
        `Certainly. Your private allocation status (Tier I) grants you first right of refusal on incoming pieces before public catalogue release.`,
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'concierge',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1100);
  }, []);

  return {
    // Language & Translations
    language, setLanguage,
    // Currency
    currency, setCurrency,
    // Filters
    searchQuery, setSearchQuery,
    activeBrand, setActiveBrand,
    activeMaterial, setActiveMaterial,
    sortOrder, setSortOrder,
    // Data
    filteredWatches,
    // Cart
    cartItems, cartCount, cartOpen, setCartOpen,
    addToCart, removeFromCart,
    // Modals
    quickViewWatch, setQuickViewWatch,
    checkoutOpen, setCheckoutOpen,
    bookingRef, confirmBooking, resetBooking,
    // VIP & Vault
    vipOpen, setVipOpen,
    vaultIds, toggleVault, isVaulted,
    orders,
    // Chat
    chatMessages, sendChatMessage,
    // Toasts
    toasts, addToast, removeToast,
  };
}
