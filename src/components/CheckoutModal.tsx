import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Truck, Building2, CreditCard, Bitcoin, Landmark, CheckCircle2, User, Clock } from 'lucide-react';
import type { CartItem } from '../hooks/useStore';
import type { CurrencyCode } from '../data/watches';
import { formatPrice, consiergeNames } from '../data/watches';
import { translations, type Language } from '../data/translations';
import { ORDERED_BOUTIQUE_CITIES } from '../data/globe';
import { CountryFlag } from './CountryFlag';

interface CheckoutModalProps {
  open: boolean;
  items: CartItem[];
  currency: CurrencyCode;
  language: Language;
  bookingRef: string | null;
  onClose: () => void;
  onConfirm: (concierge: string, delivery: string, payment: string, city?: string) => void;
  onReset: () => void;
}

type DeliveryMethod = 'courier' | 'showroom';
type PaymentMethod = 'wire' | 'crypto' | 'banking';

export function CheckoutModal({
  open,
  items,
  currency,
  language,
  bookingRef,
  onClose,
  onConfirm,
  onReset,
}: CheckoutModalProps) {
  const [delivery, setDelivery] = useState<DeliveryMethod>('courier');
  const [cityId, setCityId] = useState(ORDERED_BOUTIQUE_CITIES[0]?.id ?? 'geneva');
  const [citySelectionConfirmed, setCitySelectionConfirmed] = useState(false);
  const [payment, setPayment] = useState<PaymentMethod>('wire');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [assignedConcierge] = useState(() => consiergeNames[Math.floor(Math.random() * consiergeNames.length)]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscrollBehavior;
    };
  }, [open]);

  const t = translations[language];
  const total = items.reduce((s, i) => s + i.watch.priceUSD, 0);
  const selectedCity = ORDERED_BOUTIQUE_CITIES.find((city) => city.id === cityId) ?? ORDERED_BOUTIQUE_CITIES[0];
  const selectedCityLabel = selectedCity?.labels[language].city ?? '';
  const changeCityLabel = language === 'RU'
    ? 'Изменить город'
    : language === 'FR'
      ? 'Changer de ville'
      : language === 'AR'
        ? 'تغيير المدينة'
        : 'Change city';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;
    const deliveryLabel = delivery === 'courier' ? t.armoredCourier : `${t.showroomPickup} (${selectedCityLabel})`;
    const paymentLabel = payment === 'wire' ? t.wireTransfer : payment === 'crypto' ? t.crypto : t.privateBanking;
    onConfirm(assignedConcierge, deliveryLabel, paymentLabel, delivery === 'showroom' ? selectedCityLabel : undefined);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !bookingRef && onClose()}
            className="fixed inset-0 bg-obsidian-950/85 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            onWheel={(event) => event.stopPropagation()}
            onTouchMove={(event) => event.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-obsidian-850 border border-gold-600/35 overflow-x-hidden max-h-[90vh] overflow-y-auto overscroll-contain z-10 shadow-2xl shadow-black"
          >
            {/* Close button */}
            {!bookingRef && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-platinum-500 hover:text-platinum-300 hover:bg-obsidian-750 transition-colors z-10"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            )}

            {bookingRef ? (
              /* Confirmation Screen */
              <div className="p-8 sm:p-10 text-center flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-full border-2 border-gold-400 bg-gold-500/15 flex items-center justify-center shadow-lg shadow-gold-500/10">
                  <CheckCircle2 size={30} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-label text-gold-500/80 tracking-[0.35em] mb-2">{t.reservationConfirmed}</p>
                  <h2 className="font-display text-3xl font-light text-platinum-200 mb-2">{t.allocationSecured}</h2>
                  <p className="text-xs text-platinum-400 leading-relaxed max-w-xs mx-auto">
                    {t.confirmationNotice}
                  </p>
                </div>

                {/* Booking Ref Card */}
                <div className="w-full p-5 rounded-2xl bg-obsidian-750/80 border border-gold-500/35">
                  <p className="text-[10px] uppercase tracking-widest text-platinum-500 mb-2">{t.bookingRef}</p>
                  <p className="font-mono text-2xl sm:text-3xl tracking-[0.25em] text-gradient-gold font-medium">{bookingRef}</p>
                </div>

                {/* Concierge Assignment */}
                <div className="flex items-center gap-4 w-full p-4 rounded-2xl bg-obsidian-750/50 border border-platinum-600/15 text-left">
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/35 flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-platinum-500 mb-0.5">{t.personalConcierge}</p>
                    <p className="text-sm font-medium text-platinum-200">{assignedConcierge}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-xs text-gold-400">
                    <Clock size={12} />
                    <span>{t.responseTime}</span>
                  </div>
                </div>

                <p className="text-[10px] text-platinum-500 leading-relaxed max-w-xs mx-auto">
                  {t.disclaimer}
                </p>

                <button onClick={onReset} className="btn-gold-solid min-w-[220px] justify-center py-3 text-xs">
                  {t.returnToCollection}
                </button>
              </div>
            ) : (
              /* Checkout Form */
              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <p className="text-label text-gold-500/80 tracking-[0.35em] mb-1.5">{t.checkoutTitle}</p>
                  <h2 className="font-display text-3xl font-light text-platinum-200">{t.checkoutSubtitle}</h2>
                  <p className="text-xs text-platinum-400 mt-1">
                    {items.length} {t.piecesSelected} · {t.estimatedTotal}: {formatPrice(total, currency)}
                  </p>
                </div>

                <div className="divider-gold mb-6" />

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Client Info */}
                  <fieldset>
                    <legend className="text-label text-platinum-400 mb-3">{t.yourDetails}</legend>
                    <div className="space-y-2.5">
                      <input
                        type="text"
                        placeholder={t.fullName}
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="input-luxury text-xs py-2.5"
                      />
                      <input
                        type="email"
                        placeholder={t.emailAddress}
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="input-luxury text-xs py-2.5"
                      />
                    </div>
                  </fieldset>

                  {/* Delivery */}
                  <fieldset>
                    <legend className="text-label text-platinum-400 mb-3">{t.acquisitionMethod}</legend>
                    <div className="space-y-2">
                      <DeliveryOption
                        icon={Truck}
                        value="courier"
                        label={t.armoredCourier}
                        desc={t.armoredCourierDesc}
                        selected={delivery === 'courier'}
                        onSelect={() => setDelivery('courier')}
                      />
                      <DeliveryOption
                        icon={Building2}
                        value="showroom"
                        label={t.showroomPickup}
                        desc={t.showroomPickupDesc}
                        selected={delivery === 'showroom'}
                        onSelect={() => setDelivery('showroom')}
                      >
                        {delivery === 'showroom' && (
                          <motion.div
                            layout
                            className={`mt-2.5 touch-pan-y overflow-y-auto overscroll-contain pr-1 ${citySelectionConfirmed
                              ? 'flex min-h-56 items-center justify-center'
                              : 'grid max-h-56 grid-cols-1 gap-1.5 sm:grid-cols-2'
                              }`}
                            onWheel={(event) => event.stopPropagation()}
                            onTouchMove={(event) => event.stopPropagation()}
                          >
                            <AnimatePresence initial={false} mode="popLayout">
                            {ORDERED_BOUTIQUE_CITIES
                              .filter((boutique) => !citySelectionConfirmed || boutique.id === cityId)
                              .map((boutique, index) => {
                              const label = boutique.labels[language];
                              const isSelected = cityId === boutique.id;
                              return (
                              <motion.button
                                layout
                                layoutId={`showroom-city-${boutique.id}`}
                                key={boutique.id}
                                type="button"
                                onClick={() => {
                                  setCityId(boutique.id);
                                  setCitySelectionConfirmed(true);
                                }}
                                aria-label={`${label.city}, ${label.country}`}
                                initial={isSelected ? { opacity: 0, scale: 0.92 } : { opacity: 1, scale: 1 }}
                                animate={{
                                  opacity: 1,
                                  scale: citySelectionConfirmed && isSelected ? 1.04 : 1,
                                  y: 0,
                                }}
                                exit={{
                                  opacity: 0,
                                  scale: 0.72,
                                  x: index % 2 === 0 ? -34 : 34,
                                  y: 22,
                                  rotate: index % 2 === 0 ? -4 : 4,
                                }}
                                transition={{
                                  layout: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
                                  duration: 0.5,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className={`relative flex min-h-10 items-center gap-2 rounded-xl border px-2.5 py-1.5 text-left ${citySelectionConfirmed && isSelected
                                  ? 'min-h-16 w-full max-w-[330px] border-gold-300 bg-gold-500/15 px-4 py-3 text-gold-200 shadow-lg shadow-gold-500/15'
                                  : 'border-platinum-600/20 text-platinum-500 hover:border-gold-500/40 hover:text-platinum-300'
                                }`}
                              >
                                <CountryFlag countryId={boutique.countryId} className="h-4 w-[26px]" />
                                <span className="min-w-0">
                                  <span className="block truncate text-[10px] font-medium uppercase tracking-[0.08em]">{label.city}</span>
                                  <span className={`block truncate text-[9px] ${citySelectionConfirmed && isSelected ? 'text-platinum-400' : 'text-platinum-600'}`}>{label.country}</span>
                                </span>
                                <AnimatePresence>
                                  {citySelectionConfirmed && isSelected && (
                                    <motion.span
                                      initial={{ opacity: 0, scale: 0.35, x: 10 }}
                                      animate={{ opacity: 1, scale: 1, x: 0 }}
                                      transition={{ type: 'spring', stiffness: 420, damping: 18, delay: 0.18 }}
                                      className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.25)]"
                                    >
                                      <CheckCircle2 size={17} strokeWidth={2.4} />
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </motion.button>
                              );
                            })}
                            </AnimatePresence>
                          </motion.div>
                        )}
                        <AnimatePresence initial={false}>
                          {delivery === 'showroom' && citySelectionConfirmed && (
                            <motion.button
                              type="button"
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.3 }}
                              onClick={() => setCitySelectionConfirmed(false)}
                              className="mx-auto mt-2 block text-[9px] uppercase tracking-[0.18em] text-platinum-500 transition-colors hover:text-gold-300"
                            >
                              {changeCityLabel}
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </DeliveryOption>
                    </div>
                  </fieldset>

                  {/* Settlement */}
                  <fieldset>
                    <legend className="text-label text-platinum-400 mb-3">{t.settlementMethod}</legend>
                    <div className="space-y-2">
                      <DeliveryOption
                        icon={Landmark}
                        value="wire"
                        label={t.wireTransfer}
                        desc={t.wireTransferDesc}
                        selected={payment === 'wire'}
                        onSelect={() => setPayment('wire')}
                      />
                      <DeliveryOption
                        icon={Bitcoin}
                        value="crypto"
                        label={t.crypto}
                        desc={t.cryptoDesc}
                        selected={payment === 'crypto'}
                        onSelect={() => setPayment('crypto')}
                      />
                      <DeliveryOption
                        icon={CreditCard}
                        value="banking"
                        label={t.privateBanking}
                        desc={t.privateBankingDesc}
                        selected={payment === 'banking'}
                        onSelect={() => setPayment('banking')}
                      />
                    </div>
                  </fieldset>

                  {/* Concierge Desk */}
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-obsidian-750/70 border border-gold-600/25">
                    <div className="w-10 h-10 rounded-full bg-gold-500/15 border border-gold-500/35 flex items-center justify-center flex-shrink-0">
                      <User size={15} className="text-gold-400" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-platinum-200">{assignedConcierge}</p>
                      <p className="text-[10px] text-platinum-500">{t.personalConcierge}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 text-emerald-400 text-[10px] uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{t.available}</span>
                    </div>
                  </div>

                  <button type="submit" className="btn-gold-solid w-full justify-center py-3.5 text-xs font-semibold">
                    {t.confirmReservation}
                  </button>

                  <p className="text-[10px] text-platinum-500 text-center leading-relaxed">
                    {t.disclaimer}
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function DeliveryOption({
  icon: Icon,
  value,
  label,
  desc,
  selected,
  onSelect,
  children,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  desc: string;
  selected: boolean;
  onSelect: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      data-value={value}
      onClick={onSelect}
      className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
        selected
          ? 'bg-gold-500/10 border-gold-500/60 shadow-sm'
          : 'bg-obsidian-750/40 border-platinum-600/15 hover:border-platinum-500/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <Icon size={15} className={selected ? 'text-gold-400 mt-0.5' : 'text-platinum-500 mt-0.5'} />
        <div className="flex-1">
          <p className={`text-xs font-medium tracking-wide mb-0.5 ${selected ? 'text-gold-300' : 'text-platinum-300'}`}>
            {label}
          </p>
          <p className="text-[10px] text-platinum-500 leading-relaxed">{desc}</p>
          {children}
        </div>
        <div
          className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 mt-0.5 ${
            selected ? 'border-gold-400 bg-gold-400' : 'border-platinum-600'
          }`}
        >
          {selected && <div className="w-full h-full rounded-full scale-50 bg-obsidian-900" />}
        </div>
      </div>
    </div>
  );
}
