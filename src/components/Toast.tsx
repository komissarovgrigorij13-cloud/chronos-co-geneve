import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import type { ToastItem } from '../hooks/useStore';

interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="pointer-events-auto rounded-2xl bg-obsidian-850/95 backdrop-blur-md border border-gold-500/40 p-3.5 shadow-2xl shadow-black/80 flex items-center justify-between gap-3 text-platinum-300"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center flex-shrink-0">
                <Sparkles size={12} className="text-gold-400" />
              </div>
              <p className="text-xs tracking-wide text-platinum-200 font-light">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 text-platinum-500 hover:text-platinum-300 transition-colors"
              aria-label="Dismiss toast"
            >
              <X size={13} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
