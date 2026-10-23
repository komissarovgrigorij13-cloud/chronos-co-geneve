import { SlidersHorizontal } from 'lucide-react';
import type { Brand, Material } from '../data/watches';
import { brands, materials } from '../data/watches';
import type { SortOrder } from '../hooks/useStore';
import { translations, type Language } from '../data/translations';

interface FiltersProps {
  language: Language;
  activeBrand: Brand | 'All';
  setActiveBrand: (b: Brand | 'All') => void;
  activeMaterial: Material | 'All';
  setActiveMaterial: (m: Material | 'All') => void;
  sortOrder: SortOrder;
  setSortOrder: (s: SortOrder) => void;
  totalCount: number;
}

export function Filters({
  language,
  activeBrand,
  setActiveBrand,
  activeMaterial,
  setActiveMaterial,
  sortOrder,
  setSortOrder,
  totalCount,
}: FiltersProps) {
  const t = translations[language];

  return (
    <div className="bg-obsidian-850/95 backdrop-blur-md border-b border-platinum-600/15 sticky top-16 z-30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3.5 space-y-3">
        {/* Brand filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-platinum-500 mr-1.5">
            <SlidersHorizontal size={13} />
            <span className="text-label text-[10px]">{t.brand}</span>
          </div>
          <FilterPill
            label={t.all}
            active={activeBrand === 'All'}
            onClick={() => setActiveBrand('All')}
          />
          {brands.map((b) => (
            <FilterPill
              key={b}
              label={b}
              active={activeBrand === b}
              onClick={() => setActiveBrand(b)}
            />
          ))}
        </div>

        {/* Material & Sort */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-1 border-t border-platinum-600/10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-label text-[10px] text-platinum-500 mr-1">{t.material}</span>
            <FilterPill
              label={t.all}
              active={activeMaterial === 'All'}
              onClick={() => setActiveMaterial('All')}
              small
            />
            {materials.map((m) => (
              <FilterPill
                key={m}
                label={m}
                active={activeMaterial === m}
                onClick={() => setActiveMaterial(m)}
                small
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-label text-[10px] text-platinum-500">{t.sort}</span>
            <SortButton
              label={t.priceAsc}
              active={sortOrder === 'price-asc'}
              onClick={() => setSortOrder('price-asc')}
            />
            <SortButton
              label={t.priceDesc}
              active={sortOrder === 'price-desc'}
              onClick={() => setSortOrder('price-desc')}
            />
            <SortButton
              label={t.newest}
              active={sortOrder === 'newest'}
              onClick={() => setSortOrder('newest')}
            />
            <span className="text-label text-[10px] text-platinum-500/60 ml-2">
              {totalCount} {t.piecesCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterPill({
  label,
  active,
  onClick,
  small = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        ${small ? 'px-2.5 py-1 text-[10px]' : 'px-3 py-1.5 text-xs'}
        font-medium tracking-wider uppercase border transition-all duration-200
        ${active
          ? 'bg-gold-500/15 border-gold-500/60 text-gold-400 font-semibold shadow-sm'
          : 'border-platinum-600/20 text-platinum-400 hover:border-platinum-500/40 hover:text-platinum-200 hover:bg-obsidian-800'
        }
      `}
    >
      {label}
    </button>
  );
}

function SortButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs tracking-wider transition-colors duration-200
        ${active ? 'text-gold-400 underline underline-offset-4 font-medium' : 'text-platinum-500 hover:text-platinum-300'}`}
    >
      {label}
    </button>
  );
}
