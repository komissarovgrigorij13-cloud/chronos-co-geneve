import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckCircle2, Bookmark, ArrowUpRight } from 'lucide-react';
import type { Watch, CurrencyCode } from '../data/watches';
import { formatPrice } from '../data/watches';
import { translations, type Language } from '../data/translations';
import { getLocalizedWatch } from '../data/watchLocalization';

interface WatchCardProps {
  watch: Watch;
  currency: CurrencyCode;
  language: Language;
  onViewDetails: (w: Watch) => void;
  onAddToAllocation: (w: Watch) => void;
  inCart: boolean;
  isVaulted: boolean;
  onToggleVault: (id: string) => void;
  index: number;
}

export function WatchCard({
  watch,
  currency,
  language,
  onViewDetails,
  onAddToAllocation,
  inCart,
  isVaulted,
  onToggleVault,
  index,
}: WatchCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const t = translations[language];
  const localized = getLocalizedWatch(watch, language);

  const STATUS_LABELS: Record<Watch['status'], string> = {
    'In Vault': t.statusInVault,
    'By Allocation Only': t.statusByAllocation,
    'Sold Out': t.statusSoldOut,
    'Certified Authentic': t.statusCertified,
  };

  const STATUS_STYLES: Record<Watch['status'], string> = {
    'In Vault': 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400',
    'By Allocation Only': 'bg-gold-600/15 border-gold-500/50 text-gold-400',
    'Sold Out': 'bg-red-950/50 border-red-700/40 text-red-400',
    'Certified Authentic': 'bg-blue-950/50 border-blue-600/40 text-blue-400',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      onClick={() => onViewDetails(watch)}
      className="card-luxury group relative flex flex-col overflow-hidden bg-gradient-to-b from-[#1a1917] via-[#111110] to-[#090908] border border-platinum-600/15 hover:border-gold-500/50 shadow-2xl shadow-black/80 cursor-pointer"
    >
      {/* Top Left: New Badge */}
      {watch.isNew && (
        <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-gold-500 to-gold-400 text-obsidian-950 text-[9px] font-bold tracking-[0.2em] uppercase shadow-lg shadow-black/50">
          {t.newArrival}
        </div>
      )}

      {/* Top Right: Vault Bookmark Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleVault(watch.id);
        }}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
          isVaulted
            ? 'bg-gold-500/25 border-gold-400 text-gold-400 shadow-md'
            : 'bg-obsidian-900/70 border-platinum-600/20 text-platinum-400 hover:text-gold-400 hover:border-gold-500/40'
        }`}
        title={isVaulted ? 'Remove from My Vault' : 'Save to My Vault'}
      >
        <Bookmark size={13} className={isVaulted ? 'fill-gold-400' : ''} />
      </button>

      {/* Image Container with Luxury Fallback */}
      <div className="relative overflow-hidden rounded-t-2xl bg-[radial-gradient(circle_at_50%_25%,rgba(197,168,128,0.18),transparent_44%),linear-gradient(145deg,#29251e_0%,#151514_50%,#080807_100%)] aspect-square">
        {/* Shimmer skeleton while loading */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 shimmer-gold flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-gold-600/20 animate-pulse" />
          </div>
        )}

        {!imgError ? (
          <img
            src={watch.imageUrl}
            alt={watch.imageAlt}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105 group-hover:brightness-105 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          /* High-end Horology Fallback Emblem */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-obsidian-800 via-obsidian-900 to-obsidian-950 border border-gold-500/20">
            <div className="w-16 h-16 rounded-full border border-gold-500/30 flex items-center justify-center mb-3 bg-gold-500/10">
              <span className="font-display text-xl text-gold-400">CH</span>
            </div>
            <p className="font-display text-base text-platinum-300 tracking-wider">{watch.brand}</p>
            <p className="text-[10px] text-gold-500/80 uppercase tracking-widest mt-0.5">{watch.ref}</p>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#111110] via-[#111110]/45 to-transparent" />

        {/* Hover Quick View Hint */}
        <div className="absolute inset-0 bg-obsidian-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
          <span className="text-[10px] tracking-widest uppercase text-gold-300 flex items-center gap-1 rounded-lg bg-obsidian-900/90 px-3 py-1.5 border border-gold-500/40 backdrop-blur-sm">
            {t.viewDetails} <ArrowUpRight size={12} />
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 bg-gradient-to-b from-[#111110]/95 via-[#111110] to-[#0a0a09]">
        {/* Status Badge & Condition */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[9px] font-semibold tracking-[0.15em] uppercase ${STATUS_STYLES[watch.status]}`}>
            {STATUS_LABELS[watch.status]}
          </span>
          <span className="text-label text-[10px] text-platinum-500">{localized.condition}</span>
        </div>

        {/* Reference & Model Name */}
        <p className="text-[10px] tracking-[0.25em] uppercase text-gold-500/80 mb-0.5 font-medium">{watch.ref}</p>
        <p className="text-label text-[10px] text-platinum-500 mb-0.5">{watch.brand}</p>
        <h3 className="font-display text-xl font-light text-platinum-200 leading-tight mb-1 group-hover:text-gold-300 transition-colors">
          {watch.model}
        </h3>
        <p className="text-xs text-platinum-400 leading-relaxed mb-4 line-clamp-2 font-light">{localized.variant}</p>

        {/* Specs Strip */}
        <div className="flex gap-4 mb-4 py-2.5 border-y border-platinum-600/15 bg-obsidian-900/40 px-2.5">
          <Spec label={t.diameter} value={`${watch.caseDiameter}mm`} />
          <Spec label={t.reserve} value={`${watch.powerReserve}h`} />
          <Spec label={t.waterRes} value={`${watch.waterResistance}m`} />
        </div>

        {/* Price */}
        <p className="font-display text-2xl font-light text-gradient-gold mb-5">
          {formatPrice(watch.priceUSD, currency)}
        </p>

        {/* Full-width Responsive Action Button */}
        <div className="mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!inCart && watch.status !== 'Sold Out') {
                onAddToAllocation(watch);
              }
            }}
            disabled={watch.status === 'Sold Out' || inCart}
            className={`w-full justify-center rounded-xl py-3 px-4 text-xs font-medium tracking-wider uppercase flex items-center gap-2 transition-all duration-500 whitespace-nowrap overflow-hidden ${
              inCart
                ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 cursor-default font-medium'
                : watch.status === 'Sold Out'
                  ? 'border border-platinum-600/20 text-platinum-600/50 cursor-not-allowed bg-obsidian-900/50'
                  : 'btn-gold-solid hover:shadow-lg hover:shadow-gold-500/10'
            }`}
          >
            {inCart ? (
              <>
                <CheckCircle2 size={13} className="flex-shrink-0" />
                <span className="truncate">{t.inAllocation}</span>
              </>
            ) : watch.status === 'Sold Out' ? (
              <span className="truncate">{t.soldOut}</span>
            ) : (
              <>
                <Plus size={13} className="flex-shrink-0 text-gold-400" />
                <span className="truncate">{t.acquirePiece}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[9px] uppercase tracking-wider text-platinum-500 truncate">{label}</span>
      <span className="text-xs font-medium text-platinum-300 truncate">{value}</span>
    </div>
  );
}
