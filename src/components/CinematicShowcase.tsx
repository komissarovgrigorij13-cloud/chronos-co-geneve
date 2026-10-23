import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { Shield, Sparkles, Building2, Clock, ArrowDown, Lock, ChevronRight, BadgeCheck, Fingerprint, ScanLine } from 'lucide-react';
import { translations, type Language } from '../data/translations';
import { ORDERED_BOUTIQUE_CITIES, rotationForCity } from '../data/globe';
import { GlobalBoutiqueGlobe } from './GlobalBoutiqueGlobe';
import { CountryFlag } from './CountryFlag';

interface CinematicShowcaseProps {
  language: Language;
  onExploreCatalog: () => void;
}

interface VaultCard {
  countryId?: string;
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

const FALLBACK_VAULT_COPY: Record<Language, { address: string; transit: string; badge: string; desc: string }> = {
  EN: {
    address: 'Private salon · by appointment',
    transit: 'Appointment Only',
    badge: 'Private Boutique',
    desc: 'A discreet local salon for private viewings, authentication and confidential acquisitions.',
  },
  RU: {
    address: 'Приватный салон · по записи',
    transit: 'Только по записи',
    badge: 'Приватный Бутик',
    desc: 'Закрытый локальный салон для просмотра, экспертизы и конфиденциального приобретения часов.',
  },
  FR: {
    address: 'Salon privé · sur rendez-vous',
    transit: 'Sur Rendez-vous',
    badge: 'Boutique Privée',
    desc: 'Un salon discret dédié aux présentations privées, à l’authentification et aux acquisitions confidentielles.',
  },
  AR: {
    address: 'صالون خاص · بموعد مسبق',
    transit: 'بموعد مسبق',
    badge: 'بوتيك خاص',
    desc: 'صالون محلي سري للمعاينة الخاصة وفحص الأصالة والاستحواذ على الساعات بسرية تامة.',
  },
};

function buildVaultItems(language: Language) {
  const curatedItems = VAULT_ITEMS[language] || VAULT_ITEMS.EN;
  const fallback = FALLBACK_VAULT_COPY[language] || FALLBACK_VAULT_COPY.EN;

  return ORDERED_BOUTIQUE_CITIES.map((city) => {
    const label = city.labels[language];
    const curated = curatedItems.find((item) => item.city === label.city);
    return curated
      ? { ...curated, countryId: city.countryId }
      : {
        city: label.city,
        country: label.country,
        address: fallback.address,
        transit: fallback.transit,
        badge: fallback.badge,
        desc: fallback.desc,
        countryId: city.countryId,
      };
  });
}

export function CinematicShowcase({ language, onExploreCatalog }: CinematicShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const vaultViewportRef = useRef<HTMLDivElement>(null);
  const vaultTrackRef = useRef<HTMLDivElement>(null);
  const [vaultTravel, setVaultTravel] = useState({ start: 0, end: 0 });
  const [globeState, setGlobeState] = useState<{
    progress: number;
    index: number;
    rotation: [number, number, number];
  }>({
    progress: 0,
    index: 0,
    rotation: rotationForCity(ORDERED_BOUTIQUE_CITIES[0]),
  });
  const t = translations[language];

  useLayoutEffect(() => {
    const viewport = vaultViewportRef.current;
    const track = vaultTrackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      const viewportStyle = getComputedStyle(viewport);
      const availableWidth = viewport.clientWidth
        - parseFloat(viewportStyle.paddingLeft)
        - parseFloat(viewportStyle.paddingRight);
      const firstCardWidth = track.firstElementChild?.getBoundingClientRect().width ?? 0;
      const trackPadding = parseFloat(getComputedStyle(track).paddingLeft);
      const start = Math.max(0, (availableWidth - firstCardWidth) / 2 - trackPadding);
      const end = Math.min(start, availableWidth - track.scrollWidth - firstCardWidth);
      setVaultTravel({ start, end });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    measure();
    return () => observer.disconnect();
  }, []);

  // Global scroll progress through the pinned showcase
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── PHASE 1: GENÈVE HERITAGE [0.00 -> 0.20] ──────────────────────────
  // Starts at scale 1, scales up to 1.3, blurs to 12px, fades out completely by 0.18
  const p1Opacity = useTransform(scrollYProgress, [0, 0.04, 0.06, 0.067], [1, 1, 0, 0]);
  const p1Scale = useTransform(scrollYProgress, [0, 0.06], [1, 1.3]);
  const p1Blur = useTransform(scrollYProgress, [0, 0.06], [0, 14]);
  const p1Display = useTransform(scrollYProgress, (v) => (v < 0.073 ? 'flex' : 'none'));

  // ── PHASE 2: THE PANTHEON 3D FLOATING CARDS [0.25 -> 0.50] ─────────────
  // Enters at 0.25 (scale 0.8 -> 1, opacity 0 -> 1), tilts in 3D, flies through at 0.45->0.48
  const p2Opacity = useTransform(scrollYProgress, [0.08, 0.093, 0.147, 0.16, 0.167], [0, 1, 1, 0, 0]);
  const p2Scale = useTransform(scrollYProgress, [0.08, 0.10, 0.147, 0.16], [0.82, 1, 1.05, 2.4]);
  const p2RotateX = useTransform(scrollYProgress, [0.083, 0.117, 0.15], [12, 0, -8]);
  const p2RotateY = useTransform(scrollYProgress, [0.083, 0.117, 0.15], [-15, 0, 12]);
  const p2Display = useTransform(scrollYProgress, (v) => (v >= 0.077 && v < 0.173 ? 'flex' : 'none'));

  // Let the final vault card arrive fully before fading this scene away.
  const p3Opacity = useTransform(scrollYProgress, [0.153, 0.183, 0.985, 0.995], [0, 1, 1, 0]);
  const p3TrackX = useTransform(scrollYProgress, [0.58, 0.98], [vaultTravel.start, vaultTravel.end]);
  const p3GlobeProgress = useTransform(scrollYProgress, [0.58, 0.98], [0, 1]);
  useMotionValueEvent(p3GlobeProgress, 'change', (value) => {
    const progress = Math.max(0, Math.min(1, value));
    const position = progress * (ORDERED_BOUTIQUE_CITIES.length - 1);
    const lowerIndex = Math.floor(position);
    const upperIndex = Math.min(ORDERED_BOUTIQUE_CITIES.length - 1, lowerIndex + 1);
    const mix = position - lowerIndex;
    const fromRotation = rotationForCity(ORDERED_BOUTIQUE_CITIES[lowerIndex]);
    const toRotation = rotationForCity(ORDERED_BOUTIQUE_CITIES[upperIndex]);

    setGlobeState({
      progress,
      index: Math.round(position),
      rotation: [
        fromRotation[0] + (toRotation[0] - fromRotation[0]) * mix,
        fromRotation[1] + (toRotation[1] - fromRotation[1]) * mix,
        0,
      ],
    });
  });

  // ── PHASE 4: TRANSITION TO CATALOGUE [0.90 -> 1.00] ───────────────────
  const p4Opacity = useTransform(scrollYProgress, [0.99, 0.997, 1.0], [0, 1, 1]);
  const p4Scale = useTransform(scrollYProgress, [0.99, 0.999], [0.92, 1]);
  const p4Display = useTransform(scrollYProgress, (v) => (v >= 0.99 ? 'flex' : 'none'));

  const vaultItems = buildVaultItems(language);
  const activeGlobeCity = ORDERED_BOUTIQUE_CITIES[globeState.index];
  const globeSequenceReady = globeState.progress > 0;

  return (
    <div ref={containerRef} className="relative h-[4200vh] bg-[#0a0a0a]">
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
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-[#C5A880]/30 bg-obsidian-900/90 p-6 shadow-2xl shadow-black backdrop-blur-xl sm:p-8 lg:p-10"
          >
            {/* Shimmer gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-gold-400/10" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-gold-400/10" />

            <div className="mb-6 flex items-center justify-between border-b border-platinum-600/15 pb-4">
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-gold-400">
                <Fingerprint size={13} />
                <span>Private provenance dossier</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Archive node 01 · live
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-left">
              {/* Image Preview with Studio Lighting */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-obsidian-800 border border-platinum-600/20 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"
                  alt="Patek Philippe Grand Complication"
                  className="w-full h-full object-cover scale-105"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-obsidian-950/90 border border-gold-500/40 text-gold-400 text-[9px] uppercase tracking-widest">
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

            <div className="mt-8 grid grid-cols-3 gap-2 border-t border-platinum-600/15 pt-5">
              {[
                ['100%', 'Provenance'],
                ['14-day', 'Reserve hold'],
                ['Tier I', 'Access level'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-platinum-600/15 bg-obsidian-950/45 px-3 py-3 text-center">
                  <p className="font-mono text-sm text-gold-400">{value}</p>
                  <p className="mt-1 text-[8px] uppercase tracking-widest text-platinum-500">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-platinum-600/15 pt-5">
              <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-platinum-500">
                <span>Chain of custody</span>
                <span className="flex items-center gap-1 text-gold-400"><BadgeCheck size={12} /> 4 checkpoints verified</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ['01', 'Acquired', 'Geneva'],
                  ['02', 'Inspected', 'Master atelier'],
                  ['03', 'Certified', 'Geneva Seal'],
                  ['04', 'Secured', 'Private vault'],
                ].map(([step, title, detail], index) => (
                  <div key={step} className="relative flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold-400/50 bg-gold-500/10 font-mono text-[9px] text-gold-400">
                      {step}
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-platinum-300">{title}</p>
                      <p className="mt-0.5 text-[9px] text-platinum-500">{detail}</p>
                    </div>
                    {index < 3 && <div className="absolute left-7 top-3 hidden h-px w-[calc(100%-1.5rem)] bg-gradient-to-r from-gold-400/40 to-transparent sm:block" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="mt-6 flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-platinum-500">
            <ScanLine size={13} className="text-gold-400" />
            <span>Scroll to unlock the global private vault network</span>
            <ArrowDown size={13} className="text-gold-400" />
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            STAGE 3: GLOBAL VAULTS NETWORK (Slow Scroll Sequence) [0.53 - 0.95]
        ══════════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            opacity: p3Opacity,
          }}
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 z-10 pointer-events-none overflow-hidden"
        >
          <div className="relative h-full w-full max-w-[1500px]">
            <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
              <GlobalBoutiqueGlobe
                language={language}
                interactive={false}
                highlightProgress={globeState.progress}
                rotation={globeState.rotation}
                activeCityId={globeSequenceReady ? activeGlobeCity.id : undefined}
                showLabels
                className="w-[min(78vw,680px)] max-w-none scale-105"
              />
            </div>

            <div className="absolute inset-x-0 top-[11%] px-4 text-center">
              <div className="mb-5">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Building2 size={16} className="text-gold-400" />
                  <span className="text-label text-gold-400 tracking-[0.4em] text-[10px] sm:text-xs uppercase">
                    {t.scrollyVaults}
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl text-platinum-100 font-light">
                  {t.globeTitle}
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-xs font-light leading-relaxed text-platinum-500">
                  {t.globeSubtitle}
                </p>
              </div>
            </div>

            <div ref={vaultViewportRef} className="absolute left-1/2 top-[72%] w-full max-w-[1080px] -translate-x-1/2 -translate-y-1/2 overflow-hidden px-2">
              <motion.div
                ref={vaultTrackRef}
                style={{ x: p3TrackX }}
                className="flex w-max items-center gap-4 px-2 sm:gap-6"
              >
                {vaultItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`w-[300px] flex-shrink-0 rounded-2xl bg-obsidian-900/95 p-5 text-left shadow-2xl shadow-black backdrop-blur-xl transition-all duration-700 sm:w-[370px] sm:p-6 ${idx === globeState.index
                        ? 'border border-gold-400/75 shadow-gold-500/15 scale-[1.02]'
                        : 'border border-gold-600/25 opacity-70'
                      }`}
                  >
                    <div className="mb-4 flex items-center justify-between gap-2 border-b border-platinum-600/15 pb-3">
                      <div>
                        <span className="mb-1 inline-flex items-center gap-1 text-[9px] font-medium uppercase tracking-widest text-gold-400">
                          <Lock size={10} /> {item.badge}
                        </span>
                        <h4 className="font-display text-2xl text-platinum-100">{item.city}</h4>
                        <p className="text-[11px] text-platinum-500">{item.address}, {item.country}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-right">
                        <CountryFlag countryId={item.countryId} />
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-platinum-500">Logistics</p>
                          <p className="mt-0.5 flex items-center justify-end gap-1 text-xs font-medium text-emerald-400">
                            <Clock size={12} /> {item.transit}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="mb-4 text-xs font-light leading-relaxed text-platinum-400">
                      {item.desc}
                    </p>

                    <div className="flex items-center justify-between border-t border-platinum-600/10 pt-2 text-[10px] uppercase tracking-wider text-gold-400/80">
                      <span>Vault Access Status</span>
                      <span className="font-mono text-platinum-300">Tier I Validated</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
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
