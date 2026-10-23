import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import type { CartItem } from '../hooks/useStore';
import type { CurrencyCode } from '../data/watches';
import { formatPrice } from '../data/watches';
import { translations, type Language } from '../data/translations';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  language: Language;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  open,
  onClose,
  items,
  currency,
  language,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const total = items.reduce((sum, i) => sum + i.watch.priceUSD, 0);
  const t = translations[language];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian-950/80 backdrop-blur-md"
          />

          {/* Sliding Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-[100dvh] w-full max-w-md flex-col overflow-hidden rounded-l-2xl border-l border-gold-600/25 bg-obsidian-850 shadow-2xl shadow-black sm:h-full sm:rounded-l-3xl"
            role="dialog"
            aria-modal="true"
            aria-label="Allocation list"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-platinum-600/15 bg-obsidian-900/60 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:py-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center">
                  <ShoppingBag size={15} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-platinum-200 tracking-wider">{t.allocationList}</p>
                  <p className="text-[10px] text-platinum-500 tracking-widest uppercase">
                    {items.length} {t.piecesSelected}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-platinum-500 hover:text-platinum-300 hover:bg-obsidian-750 transition-colors"
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 space-y-3.5 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <ShoppingBag size={40} className="text-platinum-600/25" strokeWidth={1} />
                  <div>
                    <p className="text-sm text-platinum-400 mb-1">{t.emptyAllocation}</p>
                    <p className="text-xs text-platinum-600 max-w-xs mx-auto">{t.emptyAllocationDesc}</p>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.watch.id}
                    className="flex gap-3 p-3 rounded-2xl bg-obsidian-800/80 border border-platinum-600/15 hover:border-gold-500/30 transition-colors group"
                  >
                    <div className="w-16 h-16 rounded-xl flex-shrink-0 bg-obsidian-750 overflow-hidden">
                      <img
                        src={item.watch.imageUrl}
                        alt={item.watch.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] tracking-widest uppercase text-gold-500/80 mb-0.5">{item.watch.ref}</p>
                      <p className="text-xs font-medium text-platinum-200 truncate">{item.watch.model}</p>
                      <p className="text-[11px] text-platinum-500 truncate">{item.watch.variant}</p>
                      <p className="text-sm font-display text-gold-400 mt-1">{formatPrice(item.watch.priceUSD, currency)}</p>
                    </div>
                    <button
                      onClick={() => onRemove(item.watch.id)}
                      className="self-start p-1.5 text-platinum-600 hover:text-red-400 transition-colors opacity-60 group-hover:opacity-100"
                      aria-label="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-platinum-600/15 bg-obsidian-900/80 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:py-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-label text-platinum-500">{t.estimatedTotal}</span>
                  <span className="font-display text-2xl text-gradient-gold">
                    {formatPrice(total, currency)}
                  </span>
                </div>
                <p className="text-[10px] text-platinum-500 leading-relaxed mb-4">
                  {t.disclaimer}
                </p>
                <button
                  onClick={onCheckout}
                  className="btn-gold-solid w-full justify-center gap-2 py-3.5"
                >
                  {t.proceedToCheckout}
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
