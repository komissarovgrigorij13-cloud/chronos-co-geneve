import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CinematicShowcase } from './components/CinematicShowcase';
import { Filters } from './components/Filters';
import { WatchCard } from './components/WatchCard';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { VIPPortalModal } from './components/VIPPortalModal';
import { GlobalNetworkModal } from './components/GlobalNetworkModal';
import { ToastContainer } from './components/Toast';
import { useStore } from './hooks/useStore';
import { translations } from './data/translations';
import type { Watch } from './data/watches';

export default function App() {
  const catalogRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [globeOpen, setGlobeOpen] = useState(false);

  // ── Lenis Smooth Kinetic Scrolling ─────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // ── Cursor Spotlight Glow ──────────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ── Global Scroll Progress Indicator ──────────────────────────────────────
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  const {
    language, setLanguage,
    currency, setCurrency,
    searchQuery, setSearchQuery,
    activeBrand, setActiveBrand,
    activeMaterial, setActiveMaterial,
    sortOrder, setSortOrder,
    filteredWatches,
    cartItems, cartCount, cartOpen, setCartOpen,
    addToCart, removeFromCart,
    quickViewWatch, setQuickViewWatch,
    checkoutOpen, setCheckoutOpen,
    bookingRef, confirmBooking, resetBooking,
    vipOpen, setVipOpen,
    vaultIds, toggleVault, isVaulted,
    orders,
    chatMessages, sendChatMessage,
    toasts, addToast, removeToast,
  } = useStore();

  const t = translations[language];

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAddToCartWithToast = (watch: Watch) => {
    addToCart(watch);
    addToast(`${watch.brand} ${watch.model}: ${t.toastAddedAllocation}`);
  };

  const handleToggleVaultWithToast = (watchId: string) => {
    const willBeVaulted = !isVaulted(watchId);
    toggleVault(watchId);
    addToast(willBeVaulted ? t.toastAddedVault : t.toastRemovedVault);
  };

  return (
    <div className={`min-h-screen bg-obsidian-950 text-platinum-400 font-sans relative ${language === 'AR' ? 'dir-rtl' : ''}`}>
      {/* ── Top Gold Scroll Progress Bar ── */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 origin-left z-50 shadow-md shadow-gold-500/20"
      />

      {/* ── Dynamic Mouse Cursor Spotlight ── */}
      <div
        className="fixed inset-0 pointer-events-none z-10 hidden lg:block transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(197, 168, 128, 0.05), transparent 80%)`,
        }}
      />

      {/* ── Fixed Header ── */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onOpenVip={() => setVipOpen(true)}
        onOpenGlobe={() => setGlobeOpen(true)}
      />

      {/* ── Hero Section ── */}
      <Hero
        language={language}
        onExplore={scrollToCatalog}
        onConcierge={() => setCheckoutOpen(true)}
      />

      {/* ── Scrollytelling Cinematic Showcase ── */}
      <CinematicShowcase
        language={language}
        onExploreCatalog={scrollToCatalog}
      />

      {/* ── Collection Catalogue ── */}
      <main ref={catalogRef} className="scroll-mt-16 relative z-20 bg-obsidian-900 border-t border-platinum-600/15">
        {/* Section Header */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-24 pb-8 text-center">
          <div className="flex items-center gap-4 mb-3 max-w-xl mx-auto">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-600/40" />
            <span className="text-label text-gold-500/80 tracking-[0.35em] text-[10px]">
              {t.tagline} · {t.collectionTitle}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-600/40" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-platinum-100">
            {t.collectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-platinum-400 mt-2.5 max-w-lg mx-auto font-light leading-relaxed">
            {t.collectionSubtitle}
          </p>
        </div>

        {/* Sticky Filters */}
        <Filters
          language={language}
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
          activeMaterial={activeMaterial}
          setActiveMaterial={setActiveMaterial}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          totalCount={filteredWatches.length}
        />

        {/* Catalog Grid */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
          {filteredWatches.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-3 text-center">
              <p className="font-display text-2xl font-light text-platinum-400">No timepieces match your criteria</p>
              <p className="text-xs text-platinum-500">Adjust filters or consult our concierge for private sourcing</p>
              <button
                onClick={() => {
                  setActiveBrand('All');
                  setActiveMaterial('All');
                  setSearchQuery('');
                }}
                className="btn-ghost mt-3 text-xs"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWatches.map((watch, index) => (
                <WatchCard
                  key={watch.id}
                  index={index}
                  watch={watch}
                  currency={currency}
                  language={language}
                  onViewDetails={setQuickViewWatch}
                  onAddToAllocation={handleAddToCartWithToast}
                  inCart={cartItems.some((i) => i.watch.id === watch.id)}
                  isVaulted={isVaulted(watch.id)}
                  onToggleVault={handleToggleVaultWithToast}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-platinum-600/15 bg-obsidian-950">
          <div className="max-w-screen-xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <p className="font-display text-lg text-gradient-gold tracking-[0.25em] uppercase mb-1">
                {t.tagline} Genève
              </p>
              <p className="text-[10px] text-platinum-500 tracking-widest uppercase">
                {t.established} · Rue du Rhône, Geneva · Private Salon
              </p>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-1 text-[10px] text-platinum-500">
              <p>{t.lifetimeDesc}</p>
              <p className="text-platinum-600">
                © {new Date().getFullYear()} Chronos &amp; Co. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* ── Overlays & Modals ── */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        currency={currency}
        language={language}
        onRemove={removeFromCart}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <QuickViewModal
        watch={quickViewWatch}
        currency={currency}
        language={language}
        onClose={() => setQuickViewWatch(null)}
        onAddToAllocation={(w) => {
          handleAddToCartWithToast(w);
          setQuickViewWatch(null);
        }}
        inCart={quickViewWatch ? cartItems.some((i) => i.watch.id === quickViewWatch.id) : false}
        isVaulted={quickViewWatch ? isVaulted(quickViewWatch.id) : false}
        onToggleVault={handleToggleVaultWithToast}
      />

      <CheckoutModal
        open={checkoutOpen}
        items={cartItems}
        currency={currency}
        language={language}
        bookingRef={bookingRef}
        onClose={() => setCheckoutOpen(false)}
        onConfirm={(concierge, delivery, payment, city) => {
          confirmBooking(concierge, delivery, payment, city);
          addToast(t.toastAddedAllocation, 'gold');
        }}
        onReset={resetBooking}
      />

      <VIPPortalModal
        open={vipOpen}
        onClose={() => setVipOpen(false)}
        language={language}
        currency={currency}
        orders={orders}
        vaultIds={vaultIds}
        onToggleVault={handleToggleVaultWithToast}
        onViewWatch={(w) => {
          setVipOpen(false);
          setQuickViewWatch(w);
        }}
        onAddToCart={handleAddToCartWithToast}
        chatMessages={chatMessages}
        onSendMessage={sendChatMessage}
      />

      <GlobalNetworkModal
        open={globeOpen}
        language={language}
        onClose={() => setGlobeOpen(false)}
      />

      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
