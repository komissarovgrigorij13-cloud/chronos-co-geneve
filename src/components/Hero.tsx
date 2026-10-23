import { motion } from 'framer-motion';
import { Shield, Truck, Star, ArrowDown } from 'lucide-react';
import { translations, type Language } from '../data/translations';

interface HeroProps {
  language: Language;
  onExplore: () => void;
  onConcierge: () => void;
}

export function Hero({ language, onExplore, onConcierge }: HeroProps) {
  const t = translations[language];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-obsidian-950 pt-16">
      {/* Background radial luxury lighting */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(197,168,128,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(212,175,55,0.08) 0%, transparent 40%),
                            radial-gradient(circle at 50% 80%, rgba(197,168,128,0.05) 0%, transparent 40%)`,
        }}
      />

      {/* Subtle lines */}
      <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-600/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-600/15 to-transparent pointer-events-none" />

      {/* Motion container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-gold-500/60" />
          <span className="text-label text-gold-500/90 tracking-[0.35em] text-[10px] sm:text-xs">
            {t.heroEyebrow}
          </span>
          <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-gold-500/60" />
        </div>

        {/* Main Heading */}
        <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl text-platinum-200 leading-[1.05] mb-6 tracking-tight">
          {t.heroTitle1}{' '}
          <em className="not-italic text-gradient-gold font-normal">{t.heroTitle2}</em>
          <br />
          {t.heroTitle3}
        </h1>

        {/* Subheading */}
        <p className="text-platinum-400 text-sm sm:text-base lg:text-lg font-light tracking-wide leading-relaxed max-w-2xl mx-auto mb-10">
          {t.heroSubtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button onClick={onExplore} className="btn-gold-solid min-w-[220px] justify-center py-3.5 shadow-lg shadow-black/40">
            {t.exploreCollection}
          </button>
          <button onClick={onConcierge} className="btn-ghost min-w-[220px] justify-center py-3.5">
            {t.privateConcierge}
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <TrustBadge icon={Shield} title={t.escrowService} desc={t.escrowDesc} />
          <TrustBadge icon={Truck} title={t.armoredDelivery} desc={t.armoredDesc} />
          <TrustBadge icon={Star} title={t.lifetimeAuth} desc={t.lifetimeDesc} />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <button
        onClick={onExplore}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-platinum-500 hover:text-gold-400 transition-colors group"
        aria-label="Scroll to collection"
      >
        <span className="text-label text-[9px] tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} className="animate-bounce group-hover:text-gold-400" />
      </button>
    </section>
  );
}

function TrustBadge({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 p-3.5 rounded-xl border border-platinum-600/15 bg-obsidian-900/60 backdrop-blur-sm">
      <Icon size={17} className="text-gold-400" strokeWidth={1.5} />
      <p className="text-[11px] font-medium text-platinum-300 tracking-wider uppercase text-center">{title}</p>
      <p className="text-[10px] text-platinum-500 text-center leading-snug">{desc}</p>
    </div>
  );
}
