import { useEffect } from 'react';
import { MapPin, ShieldCheck, X } from 'lucide-react';
import type { Language } from '../data/translations';
import { translations } from '../data/translations';
import { ORDERED_BOUTIQUE_CITIES } from '../data/globe';
import { GlobalBoutiqueGlobe } from './GlobalBoutiqueGlobe';
import { CountryFlag } from './CountryFlag';

interface GlobalNetworkModalProps {
  open: boolean;
  language: Language;
  onClose: () => void;
}

export function GlobalNetworkModal({ open, language, onClose }: GlobalNetworkModalProps) {
  const t = translations[language];

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/80 p-2 backdrop-blur-md sm:items-center sm:p-8" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div className={`relative my-2 max-h-[calc(100dvh-1rem)] w-full max-w-7xl overflow-x-hidden overflow-y-auto rounded-2xl border border-gold-500/25 bg-obsidian-950 shadow-2xl shadow-black sm:my-auto sm:max-h-[calc(100vh-2rem)] sm:rounded-[2rem] ${language === 'AR' ? 'dir-rtl' : ''}`}>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_35%_45%,rgba(212,175,55,0.11),transparent_36%),radial-gradient(circle_at_85%_20%,rgba(197,168,128,0.06),transparent_30%)]" />

        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-platinum-600/25 bg-obsidian-900/90 text-platinum-400 transition-colors hover:border-gold-500/60 hover:text-gold-400 sm:right-5 sm:top-5 sm:h-10 sm:w-10"
          aria-label="Close global network"
        >
          <X size={17} />
        </button>

        <div className="relative grid min-h-0 grid-cols-1 lg:min-h-[min(760px,calc(100vh-64px))] lg:grid-cols-[1.3fr_0.7fr]">
          <div className="flex flex-col justify-center px-3 pb-4 pt-12 sm:px-10 sm:pt-16 lg:px-14 lg:py-12">
            <div className="mb-[-1rem] flex justify-center sm:mb-[-3rem] lg:mb-[-1rem]">
              <GlobalBoutiqueGlobe language={language} interactive showLabels className="max-h-[48dvh] max-w-[680px] sm:max-h-[calc(100vh-8rem)]" />
            </div>
            <div className="relative z-10 mt-0 text-center sm:mt-[-1rem] lg:mt-[-0.5rem]">
              <p className="mb-2 text-[10px] uppercase tracking-[0.36em] text-gold-400">{t.globeDragHint}</p>
              <p className="mx-auto max-w-xl text-xs font-light leading-relaxed text-platinum-500">{t.globeSubtitle}</p>
            </div>
          </div>

          <aside className="relative border-t border-platinum-600/15 bg-obsidian-900/60 px-3 py-6 sm:px-10 sm:py-8 lg:border-l lg:border-t-0 lg:py-14">
            <div className="mb-5 sm:mb-8">
              <div className="mb-4 flex items-center gap-2 text-gold-400">
                <MapPin size={15} />
                <span className="text-[10px] uppercase tracking-[0.35em]">{t.globeTab}</span>
              </div>
              <h2 className="max-w-md font-display text-3xl font-light leading-[0.95] text-platinum-100 sm:text-5xl">{t.globeTitle}</h2>
              <div className="mt-4 h-px w-20 bg-gold-400/70 sm:mt-5" />
            </div>

            <div className="max-h-[38dvh] space-y-2 overflow-y-auto pr-1 sm:max-h-[calc(100vh-18rem)] sm:space-y-2.5">
              {ORDERED_BOUTIQUE_CITIES.map((city) => {
                const label = city.labels[language];
                return (
                  <div key={city.id} className="group flex items-center justify-between gap-2 rounded-xl border border-platinum-600/15 bg-obsidian-950/55 px-3 py-2.5 transition-colors hover:border-gold-500/45 hover:bg-gold-500/[0.06] sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-500/35 bg-gold-500/10 sm:h-7 sm:w-7">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-300 shadow-[0_0_10px_rgba(240,208,96,0.9)]" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-display text-lg leading-none text-platinum-100 sm:text-xl">{label.city}</p>
                        <p className="mt-1 truncate text-[10px] uppercase tracking-[0.16em] text-platinum-500">{label.country}</p>
                      </div>
                    </div>
                    <CountryFlag countryId={city.countryId} className={city.countryId === '410' ? 'h-6 w-10' : ''} />
                    <ShieldCheck size={15} className="shrink-0 text-emerald-400/80" />
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-gold-500/20 bg-gold-500/[0.06] px-3 py-3 text-[10px] uppercase tracking-[0.16em] text-gold-400 sm:mt-8 sm:rounded-2xl sm:px-4">
              <span className="h-2 w-2 rounded-full bg-gold-300 shadow-[0_0_12px_rgba(240,208,96,0.9)]" />
              <span>{ORDERED_BOUTIQUE_CITIES.length} {t.globeLocations}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
