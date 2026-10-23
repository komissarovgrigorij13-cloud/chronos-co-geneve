import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, User, Crown, History, Bookmark, MessageSquare, Send, CheckCircle2, Clock, ShieldCheck, Trash2 } from 'lucide-react';
import type { OrderRecord, ChatMessage } from '../hooks/useStore';
import type { Watch, CurrencyCode } from '../data/watches';
import { formatPrice, watches } from '../data/watches';
import { translations, type Language } from '../data/translations';

interface VIPPortalModalProps {
  open: boolean;
  onClose: () => void;
  language: Language;
  currency: CurrencyCode;
  orders: OrderRecord[];
  vaultIds: string[];
  onToggleVault: (id: string) => void;
  onViewWatch: (w: Watch) => void;
  onAddToCart: (w: Watch) => void;
  chatMessages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

type TabType = 'profile' | 'history' | 'vault' | 'chat';

export function VIPPortalModal({
  open,
  onClose,
  language,
  currency,
  orders,
  vaultIds,
  onToggleVault,
  onViewWatch,
  onAddToCart,
  chatMessages,
  onSendMessage,
}: VIPPortalModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [inputText, setInputText] = useState('');
  const t = translations[language];

  const vaultedWatches = watches.filter((w) => vaultIds.includes(w.id));

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-obsidian-950/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-4xl rounded-3xl bg-obsidian-800 border border-gold-600/30 shadow-2xl shadow-black flex flex-col max-h-[88vh] overflow-hidden z-10"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-platinum-600/15 bg-obsidian-850">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center">
                  <Crown size={15} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-gradient-gold tracking-wider">VIP Client Lounge</h3>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-platinum-500">{t.clientTier}</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-platinum-500 hover:text-platinum-300 hover:bg-obsidian-700 transition-colors"
                aria-label="Close VIP Lounge"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-platinum-600/15 bg-obsidian-900/60 overflow-x-auto">
              <TabBtn
                active={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
                icon={User}
                label="Profile & Tier"
              />
              <TabBtn
                active={activeTab === 'history'}
                onClick={() => setActiveTab('history')}
                icon={History}
                label={`${t.ordersHistory} (${orders.length})`}
              />
              <TabBtn
                active={activeTab === 'vault'}
                onClick={() => setActiveTab('vault')}
                icon={Bookmark}
                label={`${t.myVault} (${vaultedWatches.length})`}
              />
              <TabBtn
                active={activeTab === 'chat'}
                onClick={() => setActiveTab('chat')}
                icon={MessageSquare}
                label={t.liveChat}
              />
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Status Banner */}
                  <div className="p-5 rounded-2xl border border-gold-500/40 bg-gradient-to-r from-gold-500/10 via-obsidian-800 to-obsidian-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-gold-500/50 bg-gold-500/15 text-[10px] font-semibold tracking-widest uppercase text-gold-400 mb-2">
                        Tier I Member · Active
                      </span>
                      <h4 className="font-display text-2xl text-platinum-200">Monsieur Laurent de Saint-Germain</h4>
                      <p className="text-xs text-platinum-500 mt-1">Private Client ID: <span className="font-mono text-gold-400">CH-VIP-9941</span> · Geneva Vault Access: Validated</p>
                    </div>
                    <div className="text-right sm:border-l sm:border-platinum-600/20 sm:pl-6">
                      <p className="text-[10px] uppercase tracking-widest text-platinum-500">Allocation Credit Line</p>
                      <p className="font-display text-2xl text-gradient-gold">$1,500,000 USD</p>
                      <p className="text-[10px] text-emerald-400 flex items-center justify-end gap-1 mt-1">
                        <ShieldCheck size={12} /> Escrow Guaranteed
                      </p>
                    </div>
                  </div>

                  {/* Manager Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-obsidian-750 border border-platinum-600/15">
                      <p className="text-label text-platinum-500 mb-3">Dedicated Senior Concierge</p>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center">
                          <User size={20} className="text-gold-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-platinum-200">Élodie Marchetti</p>
                          <p className="text-xs text-gold-500/80">Senior Horology Advisory & Acquisitions</p>
                          <p className="text-[11px] text-platinum-500">Geneva Office · Private Line Active</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('chat')}
                        className="btn-gold-solid w-full justify-center py-2 text-xs gap-1.5"
                      >
                        <MessageSquare size={13} />
                        Open Direct Concierge Channel
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-obsidian-750 border border-platinum-600/15 flex flex-col justify-between">
                      <div>
                        <p className="text-label text-platinum-500 mb-2">Privileges & Benefits</p>
                        <ul className="space-y-2 text-xs text-platinum-400">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-gold-400" />
                            Priority 48-hour pre-allocation on discontinued references
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-gold-400" />
                            Complimentary worldwide armored transport via G4S
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-gold-400" />
                            Zero-cost third-party independent watchmaker appraisal
                          </li>
                        </ul>
                      </div>
                      <p className="text-[10px] text-platinum-600 mt-4">Provenance audit certified annually by Swiss Horology Registry.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="text-center py-12 text-platinum-600">
                      <History size={32} className="mx-auto mb-2 opacity-40" />
                      <p className="text-sm">No allocation inquiries recorded yet.</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="p-5 rounded-2xl bg-obsidian-750 border border-platinum-600/15 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-platinum-600/10 pb-3">
                          <div>
                            <span className="font-mono text-sm tracking-widest text-gold-400 font-medium">
                              {order.bookingRef}
                            </span>
                            <span className="text-xs text-platinum-500 ml-3">Date: {order.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium border border-amber-600/40 bg-amber-900/20 text-amber-400">
                              <Clock size={10} /> {order.status}
                            </span>
                            <span className="font-display text-lg text-platinum-200 ml-2">
                              {formatPrice(order.totalUSD, currency)}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-platinum-400">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-platinum-600">Acquisition Method</p>
                            <p className="text-platinum-300 font-medium mt-0.5">{order.deliveryMethod} {order.showroomCity ? `(${order.showroomCity})` : ''}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-platinum-600">Settlement Method</p>
                            <p className="text-platinum-300 font-medium mt-0.5">{order.paymentMethod}</p>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2">
                          <p className="text-[10px] uppercase tracking-widest text-platinum-600">Timepieces In Allocation</p>
                          <div className="flex flex-wrap gap-2">
                            {order.items.map((watch) => (
                              <div key={watch.id} className="flex items-center gap-2 p-2 rounded-lg bg-obsidian-800 border border-platinum-600/10 text-xs">
                                <span className="text-gold-400 font-medium">{watch.brand}</span>
                                <span className="text-platinum-300">{watch.model}</span>
                                <span className="text-[10px] text-platinum-500">({watch.ref})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'vault' && (
                <div>
                  {vaultedWatches.length === 0 ? (
                    <div className="text-center py-16 text-platinum-600">
                      <Bookmark size={36} className="mx-auto mb-3 opacity-30" />
                      <p className="text-base text-platinum-400 mb-1">{t.vaultEmpty}</p>
                      <p className="text-xs text-platinum-600 max-w-sm mx-auto">{t.vaultEmptyDesc}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {vaultedWatches.map((watch) => (
                        <div key={watch.id} className="p-4 rounded-2xl bg-obsidian-750 border border-platinum-600/15 flex gap-4">
                          <img
                            src={watch.imageUrl}
                            alt={watch.imageAlt}
                            className="w-20 h-20 rounded-xl object-cover bg-obsidian-700 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-gold-500/80">{watch.ref}</p>
                              <h5 className="font-display text-base text-platinum-200 truncate">{watch.model}</h5>
                              <p className="text-xs font-display text-gold-400 mt-0.5">
                                {formatPrice(watch.priceUSD, currency)}
                              </p>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={() => onViewWatch(watch)}
                                className="px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider border border-platinum-600/30 text-platinum-400 hover:border-gold-500/50 hover:text-gold-300 transition-colors"
                              >
                                {t.viewDetails}
                              </button>
                              <button
                                onClick={() => onAddToCart(watch)}
                                className="px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider bg-gold-500/20 border border-gold-500/50 text-gold-300 hover:bg-gold-500/30 transition-colors"
                              >
                                {t.inquire}
                              </button>
                              <button
                                onClick={() => onToggleVault(watch.id)}
                                className="p-1 text-platinum-600 hover:text-red-400 transition-colors ml-auto"
                                title="Remove from vault"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'chat' && (
                <div className="flex flex-col h-[480px]">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-obsidian-850 border border-platinum-600/10 mb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-platinum-300 font-medium">Élodie Marchetti</span>
                      <span className="text-platinum-600">· Senior Concierge</span>
                    </div>
                    <span className="text-[10px] text-platinum-500 uppercase tracking-wider">Geneva Desk · Active Channel</span>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto space-y-3 p-3 rounded-xl bg-obsidian-900/60 border border-platinum-600/10">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                      >
                        <div
                          className={`p-3 text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-gold-500/20 border border-gold-500/40 text-platinum-200'
                              : 'bg-obsidian-700 border border-platinum-600/15 text-platinum-300'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-platinum-600 mt-1 px-1">{msg.timestamp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSend} className="flex gap-2 mt-3">
                    <input
                      type="text"
                      placeholder="Type private message to your concierge…"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="input-luxury text-xs py-2.5 flex-1"
                    />
                    <button type="submit" className="btn-gold-solid px-5 py-2.5 text-xs">
                      <Send size={13} />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function TabBtn({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 text-xs tracking-wider uppercase transition-colors whitespace-nowrap border-b-2
        ${active
          ? 'border-gold-400 text-gold-400 bg-gold-500/10 font-medium'
          : 'border-transparent text-platinum-500 hover:text-platinum-300 hover:bg-obsidian-800'
        }`}
    >
      <Icon size={14} />
      {label}
    </button>
  );
}
