import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Shield, CheckCircle2, Package, Plus, Send, Bookmark } from 'lucide-react';
import type { Watch, CurrencyCode } from '../data/watches';
import { formatPrice } from '../data/watches';
import { translations, type Language } from '../data/translations';

interface QuickViewModalProps {
  watch: Watch | null;
  currency: CurrencyCode;
  language: Language;
  onClose: () => void;
  onAddToAllocation: (w: Watch) => void;
  inCart: boolean;
  isVaulted: boolean;
  onToggleVault: (id: string) => void;
}

export function QuickViewModal({
  watch,
  currency,
  language,
  onClose,
  onAddToAllocation,
  inCart,
  isVaulted,
  onToggleVault,
}: QuickViewModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [imgError, setImgError] = useState(false);

  const t = translations[language];

  if (!watch) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSent(true);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={`${watch.brand} ${watch.model}`}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-obsidian-950/85 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative w-full max-w-4xl rounded-3xl bg-obsidian-800 border border-gold-600/30 overflow-hidden max-h-[90vh] overflow-y-auto z-10 shadow-2xl shadow-black"
        >
          {/* Close & Vault Buttons */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => onToggleVault(watch.id)}
              className={`p-2 rounded-full border backdrop-blur-md transition-colors ${
                isVaulted
                  ? 'bg-gold-500/20 border-gold-400 text-gold-400'
                  : 'bg-obsidian-900/70 border-platinum-600/20 text-platinum-400 hover:text-gold-400'
              }`}
              title="Save to My Vault"
            >
              <Bookmark size={16} className={isVaulted ? 'fill-gold-400' : ''} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-obsidian-900/70 border border-platinum-600/20 text-platinum-400 hover:text-platinum-200 hover:bg-obsidian-700 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Preview */}
            <div className="relative bg-obsidian-750 aspect-square md:aspect-auto">
              {!imgError ? (
                <img
                  src={watch.imageUrl}
                  alt={watch.imageAlt}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-obsidian-800">
                  ⌚
                </div>
              )}

              {/* Provenance Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-obsidian-900/95 px-3 py-2 border border-gold-600/40 backdrop-blur-sm">
                <Shield size={13} className="text-gold-400" />
                <span className="text-[10px] tracking-widest uppercase text-gold-400 font-medium">
                  {watch.boxAndPapers ? t.fullSet : t.watchOnly}
                </span>
              </div>
            </div>

            {/* Specifications & Inquiry */}
            <div className="p-6 sm:p-8 flex flex-col">
              <div className="mb-5">
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold-500/80 mb-1 font-medium">{watch.ref}</p>
                <p className="text-label text-platinum-500 mb-0.5">{watch.brand}</p>
                <h2 className="font-display text-2xl sm:text-3xl font-light text-platinum-200 leading-tight mb-1">
                  {watch.model}
                </h2>
                <p className="text-xs text-platinum-400 mb-3">{watch.variant}</p>
                <p className="font-display text-3xl font-light text-gradient-gold">
                  {formatPrice(watch.priceUSD, currency)}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="divider-gold mb-5" />
              <div className="grid grid-cols-2 gap-x-5 gap-y-3.5 mb-5 text-xs">
                <SpecRow label={t.caliber} value={watch.caliber} />
                <SpecRow label={t.movement} value={watch.movement} />
                <SpecRow label={t.diameter} value={`${watch.caseDiameter}mm`} />
                <SpecRow label={t.waterRes} value={`${watch.waterResistance}m`} />
                <SpecRow label={t.reserve} value={`${watch.powerReserve}h`} />
                <SpecRow label={t.year} value={String(watch.year)} />
                <SpecRow label={t.material} value={watch.material} />
                <SpecRow label={t.condition} value={watch.condition} />
              </div>

              {/* Complications */}
              <div className="mb-5">
                <p className="text-label text-platinum-500 mb-2">{t.complications}</p>
                <div className="flex flex-wrap gap-1.5">
                  {watch.complications.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-0.5 rounded-md border border-platinum-600/25 text-platinum-300 text-[10px] tracking-wider uppercase bg-obsidian-750"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-platinum-400 leading-relaxed mb-6 font-light">{watch.description}</p>

              {/* Box & Papers */}
              <div className="flex items-center gap-2 mb-6">
                <Package size={14} className={watch.boxAndPapers ? 'text-gold-400' : 'text-platinum-500'} />
                <span className="text-xs text-platinum-400">
                  {watch.boxAndPapers ? t.fullSet : t.watchOnly}
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => !inCart && watch.status !== 'Sold Out' && onAddToAllocation(watch)}
                disabled={watch.status === 'Sold Out' || inCart}
                className={`w-full justify-center mb-6 rounded-full flex items-center gap-2 py-3.5 text-xs tracking-widest uppercase font-medium transition-all ${
                  inCart
                    ? 'bg-emerald-950/50 border border-emerald-500/50 text-emerald-400 cursor-default'
                    : watch.status === 'Sold Out'
                      ? 'border border-platinum-600/20 text-platinum-600/50 cursor-not-allowed'
                      : 'btn-gold-solid'
                }`}
              >
                {inCart ? (
                  <>
                    <CheckCircle2 size={14} /> {t.inAllocation}
                  </>
                ) : watch.status === 'Sold Out' ? (
                  t.soldOut
                ) : (
                  <>
                    <Plus size={14} /> {t.inquire}
                  </>
                )}
              </button>

              <div className="divider-gold mb-5" />

              {/* Direct Inquiry Form */}
              <div>
                <p className="text-label text-platinum-500 mb-3">{t.directInquiry}</p>
                {sent ? (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-emerald-300">{t.inquirySent}</p>
                      <p className="text-[11px] text-emerald-400/80 mt-0.5">{t.inquirySuccessMsg}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-2.5">
                    <input
                      type="text"
                      placeholder={t.fullName}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="input-luxury text-xs py-2.5"
                    />
                    <input
                      type="email"
                      placeholder={t.emailAddress}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input-luxury text-xs py-2.5"
                    />
                    <textarea
                      placeholder={t.messagePlaceholder}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={2}
                      className="input-luxury text-xs resize-none py-2.5"
                    />
                    <button type="submit" className="btn-gold w-full justify-center gap-2 py-2.5 text-xs">
                      <Send size={12} />
                      {t.sendInquiry}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider text-platinum-500 mb-0.5">{label}</p>
      <p className="text-xs text-platinum-300 font-medium">{value}</p>
    </div>
  );
}
