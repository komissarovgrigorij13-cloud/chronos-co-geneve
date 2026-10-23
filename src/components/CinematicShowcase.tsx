import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Sparkles, Building2, Clock, ArrowDown, Lock, ChevronRight } from 'lucide-react';
import { translations, type Language } from '../data/translations';

interface CinematicShowcaseProps {
  language: Language;
  onExploreCatalog: () => void;
}

interface VaultCard {
  city: string;
  country: string;
  address: string;
  transit: string;
  badge: string;
  desc: string;
}

const VAULT_ITEMS: Record<Language, VaultCard[]> = {
  EN: [
    {
      city: 'Genève',
      country: 'Switzerland',
      address: 'Rue du Rhône 42',
      transit: 'Direct Air Escort',
      badge: 'Flagship Depository',
      desc: 'Central vault housing grand complications and master watchmaker authentication labs.',
    },
    {
      city: 'Dubai',
      country: 'United Arab Emirates',
      address: 'DIFC Gate Village 08',
      transit: '2h Armored Courier',
      badge: 'Middle East Reserve',
      desc: 'Ultra-secure depository with private client salons and multi-currency escrow desks.',
    },
    {
      city: 'Monaco',
      country: 'Monaco',
      address: "Carré d'Or, Monte-Carlo",
      transit: 'Helipad & Yacht Transfer',
      badge: 'Riviera Allocation Desk',
      desc: 'Exclusive seasonal allocations and high-jewelry horology previews.',
    },
    {
      city: 'London',
      country: 'United Kingdom',
      address: 'Mayfair, Mount Street 14',
      transit: 'Same-Day Hand Delivery',
      badge: 'Private Parlour',
      desc: 'Discreet Mayfair residence dedicated to confidential acquisition consultations.',
    },
    {
      city: 'Tokyo',
      country: 'Japan',
      address: 'Ginza Namiki-dori 6',
      transit: 'G4S Secure Transit',
      badge: 'Asia-Pacific Vault',
      desc: 'Strictly confidential allocations of rare Japanese and Swiss independent horology.',
    },
    {
      city: 'Moscow',
      country: 'Russian Federation',
      address: 'Barvikha Luxury Village',
      transit: 'Dedicated Diplomatic Courier',
      badge: 'Private Advisory Salon',
      desc: 'Bespoke client relations with verified authentication certificates.',
    },
  ],
  RU: [
    {
      city: 'Женева',
      country: 'Швейцария',
      address: 'Rue du Rhône 42',
      transit: 'Прямой спецборт',
      badge: 'Флагманский Сейф',
      desc: 'Центральное хранилище grand complications и лаборатория сертификации мастеров.',
    },
    {
      city: 'Дубай',
      country: 'ОАЭ',
      address: 'DIFC Gate Village 08',
      transit: '2 часа бронеавтомобилем',
      badge: 'Ближневосточный Резерв',
      desc: 'Депозитарий высшей степени защиты с приватными лаунджами и крипто-эскроу расчетом.',
    },
    {
      city: 'Монако',
      country: 'Княжество Монако',
      address: "Carré d'Or, Monte-Carlo",
      transit: 'Трансфер на яхту / вертолет',
      badge: 'Лаундж Ривьеры',
      desc: 'Эксклюзивные сезонные аллокации и премьеры уникальных турбийонов.',
    },
    {
      city: 'Лондон',
      country: 'Великобритания',
      address: 'Mayfair, Mount Street 14',
      transit: 'Доставка в день брони',
      badge: 'Салон Мейфэр',
      desc: 'Конфиденциальная резиденция для примерки редчайших исторических референсов.',
    },
    {
      city: 'Токио',
      country: 'Япония',
      address: 'Гинза, Namiki-dori 6',
      transit: 'Спецкурьер G4S',
      badge: 'Азиатский Деск',
      desc: 'Строго конфиденциальный поиск штучных коллекционных экземпляров.',
    },
    {
      city: 'Москва',
      country: 'Россия',
      address: 'Барвиха Luxury Village',
      transit: 'Лично в руки курьером',
      badge: 'Приватный Деск',
      desc: 'Индивидуальное сопровождение закрытых сделок с полным нотариальным подтверждением.',
    },
  ],
  FR: [
    {
      city: 'Genève',
      country: 'Suisse',
      address: 'Rue du Rhône 42',
      transit: 'Escorte Aérienne',
      badge: 'Coffre Principal',
      desc: 'Chambre forte centrale avec laboratoires d’authentification des maîtres horlogers.',
    },
    {
      city: 'Dubaï',
      country: 'Émirats Arabes Unis',
      address: 'DIFC Gate Village 08',
      transit: '2h Fourgon Blindé',
      badge: 'Réserve Moyen-Orient',
      desc: 'Dépôt haute sécurité avec salons privés et règlement fiduciaire international.',
    },
    {
      city: 'Monaco',
      country: 'Monaco',
      address: "Carré d'Or, Monte-Carlo",
      transit: 'Héliport & Yacht',
      badge: 'Desk Riviera',
      desc: 'Allocations estivales exclusives et grandes complications de haute joaillerie.',
    },
    {
      city: 'Londres',
      country: 'Royaume-Uni',
      address: 'Mayfair, Mount Street 14',
      transit: 'Remise le Jour Même',
      badge: 'Salon Mayfair',
      desc: 'Résidence discrète réservée aux acquisitions de pièces de collection rarissimes.',
    },
    {
      city: 'Tokyo',
      country: 'Japon',
      address: 'Ginza Namiki-dori 6',
      transit: 'Transport G4S',
      badge: 'Coffre Asie',
      desc: 'Sourcing ultra-confidentiel des éditions limitées et pièces uniques.',
    },
    {
      city: 'Moscou',
      country: 'Russie',
      address: 'Barvikha Luxury Village',
      transit: 'Courrier Dédié',
      badge: 'Salon Conseil',
      desc: 'Accompagnement sur-mesure et protocoles stricts de traçabilité.',
    },
  ],
  AR: [
    {
      city: 'جنيف',
      country: 'سويسرا',
      address: 'Rue du Rhône 42',
      transit: 'مرافقة جوية فورية',
      badge: 'الخزينة الرئيسية',
      desc: 'الخزينة المركزية الكبرى مع مختبرات فحص وتوثيق كبار صانعي الساعات.',
    },
    {
      city: 'دبي',
      country: 'الإمارات',
      address: 'DIFC Gate Village 08',
      transit: 'ساعتان بسيارة مصفحة',
      badge: 'مستودع الشرق الأوسط',
      desc: 'مستودع أمني فائق السرية مع صالونات خاصة ومكاتب ضمان مالي.',
    },
    {
      city: 'موناكو',
      country: 'موناكو',
      address: "Carré d'Or, Monte-Carlo",
      transit: 'توصيل بالطائرة المروحية واليخوت',
      badge: 'مكتب الريفيرا',
      desc: 'تخصيصات موسمية نادرة ومعاينات أولية للساعات الفاخرة.',
    },
    {
      city: 'لندن',
      country: 'المملكة المتحدة',
      address: 'Mayfair, Mount Street 14',
      transit: 'تسليم في نفس اليوم',
      badge: 'صالون مايفير',
      desc: 'مقر خاص وسري مكرس للاستشارات والمعاينة الحصرية للساعات النادرة.',
    },
    {
      city: 'طوكيو',
      country: 'اليابان',
      address: 'Ginza Namiki-dori',
      transit: 'نقل مصفح سريع',
      badge: 'خزينة آسيا',
      desc: 'توفير أندر الإصدارات السويسرية واليابانية المستقلة بسرية مطلقة.',
    },
    {
      city: 'موسكو',
      country: 'روسيا',
      address: 'Barvikha Luxury Village',
      transit: 'توصيل خاص ودبلوماسي',
      badge: 'صالون الاستشارات',
      desc: 'إجراءات استشارية خاصة مع توثيق رسمي كامل لأصالة القطع.',
    },
  ],
};

export function CinematicShowcase({ language, onExploreCatalog }: CinematicShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  // Global scroll progress through the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── PHASE 1: GENÈVE HERITAGE [0.00 -> 0.20] ──────────────────────────
  // Starts at scale 1, scales up to 1.3, blurs to 12px, fades out completely by 0.18
  const p1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.18, 0.20], [1, 1, 0, 0]);
  const p1Scale = useTransform(scrollYProgress, [0, 0.18], [1, 1.3]);
  const p1Blur = useTransform(scrollYProgress, [0, 0.18], [0, 14]);
  const p1Display = useTransform(scrollYProgress, (v) => (v < 0.22 ? 'flex' : 'none'));

  // ── PHASE 2: THE PANTHEON 3D FLOATING CARDS [0.25 -> 0.50] ─────────────
  // Enters at 0.25 (scale 0.8 -> 1, opacity 0 -> 1), tilts in 3D, flies through at 0.45->0.48
  const p2Opacity = useTransform(scrollYProgress, [0.24, 0.28, 0.44, 0.48, 0.50], [0, 1, 1, 0, 0]);
  const p2Scale = useTransform(scrollYProgress, [0.24, 0.30, 0.44, 0.48], [0.82, 1, 1.05, 2.4]);
  const p2RotateX = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [12, 0, -8]);
  const p2RotateY = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [-15, 0, 12]);
  const p2Display = useTransform(scrollYProgress, (v) => (v >= 0.23 && v < 0.52 ? 'flex' : 'none'));

  // ── PHASE 3: GLOBAL VAULTS NETWORK HORIZONTAL CAROUSEL [0.55 -> 0.80] ──
  // Enters clean at 0.55, smooth horizontal carousel shift, fades to black by 0.78
  const p3Opacity = useTransform(scrollYProgress, [0.54, 0.58, 0.76, 0.80], [0, 1, 1, 0]);
  const p3TrackX = useTransform(scrollYProgress, [0.56, 0.76], ['25%', '-55%']);
  const p3Display = useTransform(scrollYProgress, (v) => (v >= 0.53 && v < 0.82 ? 'flex' : 'none'));

  // ── PHASE 4: TRANSITION TO CATALOGUE [0.85 -> 1.00] ───────────────────
  const p4Opacity = useTransform(scrollYProgress, [0.84, 0.90, 0.98, 1.0], [0, 1, 1, 1]);
  const p4Scale = useTransform(scrollYProgress, [0.84, 0.92], [0.92, 1]);
  const p4Display = useTransform(scrollYProgress, (v) => (v >= 0.83 ? 'flex' : 'none'));

  const vaultItems = VAULT_ITEMS[language] || VAULT_ITEMS.EN;

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#0a0a0a]">
      {/* ── STICKY PINNED FULLSCREEN VIEWPORT ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a] flex items-center justify-center z-20">
        {/* Subtle Luxury Vignette & Radial Light */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212,175,55,0.12) 0%, transparent 65%),
                              radial-gradient(circle at 20% 80%, rgba(197,168,128,0.06) 0%, transparent 50%)`,
          }}
        />

        {/* ══════════════════════════════════════════════════════════════════
            STAGE 1: GENÈVE HERITAGE [0.00 - 0.20]
        ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            display: p1Display,
            opacity: p1Opacity,
            scale: p1Scale,
            filter: useTransform(p1Blur, (b) => `blur(${b}px)`),
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 pointer-events-none"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield size={16} className="text-gold-400" />
            <span className="text-label text-gold-400 tracking-[0.45em] text-[10px] sm:text-xs uppercase">
              {t.scrollyHeritage}
            </span>
          </div>

          <h2 className="font-display font-light text-5xl sm:text-7xl lg:text-9xl text-platinum-100 tracking-tight leading-[1.02] max-w-6xl mx-auto">
            TIME IS THE<br />
            <span className="text-gradient-gold italic font-normal">ULTIMATE ASSET</span>
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 mt-12 text-platinum-400">
            <div>
              <p className="font-mono text-2xl sm:text-3xl text-gradient-gold">1839</p>
              <p className="text-[10px] uppercase tracking-widest text-platinum-500 mt-0.5">Genève Foundation</p>
            </div>
            <div className="h-8 w-px bg-platinum-600/20 hidden sm:block" />
            <div>
              <p className="font-mono text-2xl sm:text-3xl text-gradient-gold">100%</p>
              <p className="text-[10px] uppercase tracking-widest text-platinum-500 mt-0.5">Certified Provenance</p>
            </div>
            <div className="h-8 w-px bg-platinum-600/20 hidden sm:block" />
            <div>
              <p className="font-mono text-2xl sm:text-3xl text-gradient-gold">Tier I</p>
              <p className="text-[10px] uppercase tracking-widest text-platinum-500 mt-0.5">Private Allocation</p>
            </div>
          </div>

          <div className="absolute bottom-12 flex items-center gap-2 text-platinum-500 text-[10px] tracking-widest uppercase animate-pulse">
            <span>Scroll to Enter The Pantheon</span>
            <ArrowDown size={13} className="text-gold-400" />
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            STAGE 2: THE PANTHEON (3D Floating Card) [0.25 - 0.50]
        ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            display: p2Display,
            opacity: p2Opacity,
            scale: p2Scale,
            perspective: 1200,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10 pointer-events-none"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={16} className="text-gold-400" />
            <span className="text-label text-gold-400 tracking-[0.4em] text-[10px] sm:text-xs uppercase">
              {t.scrollyPantheon}
            </span>
          </div>

          {/* 3D Floating Masterpiece Card */}
          <motion.div
            style={{
              rotateX: p2RotateX,
              rotateY: p2RotateY,
            }}
            className="w-full max-w-3xl bg-obsidian-900/90 backdrop-blur-xl border border-[#C5A880]/30 shadow-2xl shadow-black p-6 sm:p-10 relative overflow-hidden"
          >
            {/* Shimmer gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
              {/* Image Preview with Studio Lighting */}
              <div className="relative aspect-square overflow-hidden bg-obsidian-800 border border-platinum-600/20 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
                  alt="Patek Philippe Grand Complication"
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-obsidian-950/90 border border-gold-500/40 text-gold-400 text-[9px] uppercase tracking-widest">
                  Grand Complication
                </div>
              </div>

              {/* Specs & Story */}
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gold-500/80 mb-1">Geneva · Ref. 5711/1A</p>
                  <h3 className="font-display text-3xl sm:text-4xl text-platinum-100 font-light leading-tight">
                    Patek Philippe
                  </h3>
                  <p className="text-xs text-platinum-400 font-light mt-1">Horology’s Sovereign Standard</p>
                </div>

                <p className="text-xs text-platinum-300 font-light leading-relaxed border-l-2 border-gold-500/40 pl-3">
                  “You never actually own a Patek Philippe. You merely look after it for the next generation.”
                </p>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-platinum-600/15 text-left">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-platinum-500">Calibre</p>
                    <p className="text-xs text-platinum-200 font-medium">Cal. 26-330 S C</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-platinum-500">Hallmark</p>
                    <p className="text-xs text-gold-400 font-medium">Geneva Seal Verified</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 text-[10px] uppercase tracking-widest text-emerald-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Immediate Vault Allocation</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            STAGE 3: GLOBAL VAULTS NETWORK (Horizontal Carousel) [0.55 - 0.80]
        ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            display: p3Display,
            opacity: p3Opacity,
          }}
          className="absolute inset-0 flex flex-col justify-center px-6 z-10 pointer-events-none overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Building2 size={16} className="text-gold-400" />
              <span className="text-label text-gold-400 tracking-[0.4em] text-[10px] sm:text-xs uppercase">
                {t.scrollyVaults}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl text-platinum-100 font-light">
              Confidential Depository Network
            </h2>
          </div>

          {/* Smooth Sliding Track */}
          <motion.div
            style={{ x: p3TrackX }}
            className="flex gap-6 sm:gap-8 items-center cursor-grab active:cursor-grabbing w-max px-8"
          >
            {vaultItems.map((item, idx) => (
              <div
                key={idx}
                className="w-[320px] sm:w-[380px] bg-obsidian-900/95 backdrop-blur-xl border border-gold-600/30 p-6 shadow-2xl shadow-black flex-shrink-0 text-left relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 border-b border-platinum-600/15 pb-3 mb-4">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest text-gold-400 font-medium mb-1">
                      <Lock size={10} /> {item.badge}
                    </span>
                    <h4 className="font-display text-2xl text-platinum-100">{item.city}</h4>
                    <p className="text-[11px] text-platinum-500">{item.address}, {item.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-wider text-platinum-500">Logistics</p>
                    <p className="text-xs font-medium text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
                      <Clock size={12} /> {item.transit}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-platinum-400 font-light leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-platinum-600/10 text-[10px] uppercase tracking-wider text-gold-400/80">
                  <span>Vault Access Status</span>
                  <span className="text-platinum-300 font-mono">Tier I Validated</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            STAGE 4: ALLOCATION VAULT READY [0.85 - 1.00]
        ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            display: p4Display,
            opacity: p4Opacity,
            scale: p4Scale,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10 pointer-events-auto"
        >
          <div className="w-14 h-14 rounded-full border border-gold-400/50 bg-gold-500/10 flex items-center justify-center mb-6 shadow-lg shadow-gold-500/10">
            <Lock size={22} className="text-gold-400" />
          </div>

          <p className="text-label text-gold-400 tracking-[0.45em] text-xs uppercase mb-3">
            Authentication Complete
          </p>

          <h2 className="font-display font-light text-4xl sm:text-6xl lg:text-7xl text-platinum-100 mb-6 tracking-tight">
            ALLOCATION VAULT<br />
            <span className="text-gradient-gold italic font-normal">UNLOCKED</span>
          </h2>

          <p className="text-platinum-400 text-xs sm:text-sm max-w-lg mx-auto mb-8 font-light leading-relaxed">
            Ten certified icons of Haute Horlogerie available for immediate private inspection or worldwide armored courier delivery.
          </p>

          <button
            onClick={onExploreCatalog}
            className="btn-gold-solid px-8 py-4 text-xs font-semibold tracking-[0.25em] shadow-2xl shadow-gold-500/20 hover:scale-105 transition-transform flex items-center gap-2"
          >
            <span>{t.exploreCollection}</span>
            <ChevronRight size={14} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
