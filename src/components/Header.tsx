import { Search, ShoppingBag, ChevronDown, Crown, Globe2 } from 'lucide-react';
import type { CurrencyCode } from '../data/watches';
import { currencies } from '../data/watches';
import { translations, type Language } from '../data/translations';

interface HeaderProps {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  cartCount: number;
  onCartOpen: () => void;
  onOpenVip: () => void;
  onOpenGlobe: () => void;
}

export function Header({
  currency,
  setCurrency,
  language,
  setLanguage,
  searchQuery,
  setSearchQuery,
  cartCount,
  onCartOpen,
  onOpenVip,
  onOpenGlobe,
}: HeaderProps) {
  const currencyCodes = Object.keys(currencies) as CurrencyCode[];
  const languages: Language[] = ['EN', 'RU', 'FR', 'AR'];
  const t = translations[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian-900/95 backdrop-blur-md border-b border-platinum-600/15">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#" className="group flex flex-col leading-none">
            <span className="font-display text-base sm:text-lg font-light tracking-[0.3em] text-gradient-gold uppercase">
              {t.tagline}
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.45em] uppercase text-platinum-500 group-hover:text-gold-500 transition-colors">
              {t.established}
            </span>
          </a>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-sm lg:max-w-md relative hidden md:block">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-platinum-500 pointer-events-none"
          />
          <input
            type="search"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-luxury pl-8 py-2 text-xs bg-obsidian-800/80 border-platinum-600/15"
          />
        </div>

        {/* Right Actions: Lang, Currency, VIP, Cart */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          {/* Language Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[11px] font-medium tracking-widest uppercase text-platinum-400 hover:text-gold-400 transition-colors py-1">
              {language}
              <LanguageFlag language={language} />
              <ChevronDown size={11} />
            </button>
            <div className="absolute right-0 top-full mt-1 rounded-xl bg-obsidian-800 border border-gold-600/25 py-1 min-w-[75px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl shadow-black/80">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`w-full text-left px-3 py-1 text-[11px] tracking-widest uppercase transition-colors
                    ${language === lang
                      ? 'text-gold-400 bg-gold-500/15 font-semibold'
                      : 'text-platinum-400 hover:text-gold-400 hover:bg-obsidian-700'
                    }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <LanguageFlag language={lang} />
                    {lang}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-platinum-600/20" />

          {/* Currency Switcher */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[11px] font-medium tracking-widest uppercase text-platinum-400 hover:text-gold-400 transition-colors py-1">
              <span>{currencies[currency].symbol}</span>
              <span className="text-platinum-500 tracking-[0.12em]">{currency}</span>
              <ChevronDown size={11} />
            </button>
            <div className="absolute right-0 top-full mt-1 rounded-xl bg-obsidian-800 border border-gold-600/25 py-1 min-w-[128px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl shadow-black/80">
              {currencyCodes.map((code) => (
                <button
                  key={code}
                  onClick={() => setCurrency(code)}
                  className={`w-full text-left px-3 py-1 text-[11px] tracking-widest uppercase transition-colors
                    ${currency === code
                      ? 'text-gold-400 bg-gold-500/15 font-semibold'
                      : 'text-platinum-400 hover:text-gold-400 hover:bg-obsidian-700'
                    }`}
                >
                  <span className="flex w-full items-center justify-between gap-4">
                    <span>{currencies[code].symbol}</span>
                    <span className="text-platinum-500 tracking-[0.12em]">{code}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="h-4 w-px bg-platinum-600/20" />

          {/* Global Boutique Network */}
          <button
            onClick={onOpenGlobe}
            className="flex items-center gap-1.5 rounded-full border border-platinum-600/25 px-2.5 py-1 text-[11px] tracking-widest uppercase text-platinum-400 transition-all duration-200 hover:border-gold-500/60 hover:bg-gold-500/10 hover:text-gold-400"
            title={t.globeTab}
          >
            <Globe2 size={13} className="text-gold-400" />
            <span className="hidden lg:inline">{t.globeTab}</span>
          </button>

          <div className="h-4 w-px bg-platinum-600/20" />

          {/* VIP Lounge Button */}
          <button
            onClick={onOpenVip}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] tracking-widest uppercase border border-gold-500/40 text-gold-400 bg-gold-500/10 hover:bg-gold-500/20 hover:border-gold-400 transition-all duration-200"
            title="VIP Client Lounge"
          >
            <Crown size={12} className="text-gold-400" />
            <span className="hidden sm:inline">{t.vipLounge}</span>
          </button>

          {/* Allocation (Cart) Button */}
          <button
            onClick={onCartOpen}
            className="relative flex items-center gap-1.5 text-platinum-400 hover:text-gold-400 transition-colors group py-1"
            aria-label="Open allocation drawer"
          >
            <ShoppingBag size={17} className="group-hover:scale-105 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-gold-500 text-obsidian-900 text-[9px] font-bold flex items-center justify-center animate-fade-in shadow-md">
                {cartCount}
              </span>
            )}
            <span className="text-[11px] tracking-widest uppercase hidden md:inline ml-1">{t.allocation}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function LanguageFlag({ language }: { language: Language }) {
  const country = language === 'EN' ? 'United Kingdom' : language === 'RU' ? 'Russia' : language === 'FR' ? 'France' : 'Saudi Arabia';
  return (
    <svg className="language-flag" viewBox="0 0 28 18" role="img" aria-label={country}>
      {language === 'EN' && (
        <>
          <rect width="28" height="18" fill="#173f78" />
          <path d="M0 0 28 18M28 0 0 18" stroke="#fff" strokeWidth="4" />
          <path d="M0 0 28 18M28 0 0 18" stroke="#cf2030" strokeWidth="1.6" />
          <path d="M14 0v18M0 9h28" stroke="#fff" strokeWidth="6" />
          <path d="M14 0v18M0 9h28" stroke="#cf2030" strokeWidth="3" />
        </>
      )}
      {language === 'RU' && (
        <>
          <rect width="28" height="6" fill="#fff" />
          <rect y="6" width="28" height="6" fill="#2455a4" />
          <rect y="12" width="28" height="6" fill="#d9363e" />
        </>
      )}
      {language === 'FR' && (
        <>
          <rect width="9.33" height="18" fill="#1f4e9b" />
          <rect x="9.33" width="9.34" height="18" fill="#fff" />
          <rect x="18.67" width="9.33" height="18" fill="#e23d4f" />
        </>
      )}
      {language === 'AR' && (
        <>
          <rect width="28" height="18" fill="#176b45" />
          <path d="M5 7.5h18M7 10.5h14" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
          <path d="M7 13.2h14" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
