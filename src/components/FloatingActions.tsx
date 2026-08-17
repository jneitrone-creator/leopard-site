import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Send, 
  MessageSquare, 
  Bot, 
  Sparkles, 
  X, 
  ChevronUp,
  Headphones
} from 'lucide-react';

interface FloatingActionsProps {
  onOpenAudit: (source?: string) => void;
  onOpenBotDemo: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenAudit,
  onOpenBotDemo
}) => {
  const [expanded, setExpanded] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-end gap-2.5">
        
        {/* Expanded options menu */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 15 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2 p-2 rounded-2xl bg-[#090e1c]/95 border border-blue-500/40 backdrop-blur-xl shadow-2xl shadow-black/90 mb-1"
            >
              {/* Bot Demo Trigger */}
              <button
                onClick={() => {
                  setExpanded(false);
                  onOpenBotDemo();
                }}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 text-xs font-bold border border-blue-500/30 transition-all text-left"
              >
                <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>ИИ-Симулятор (Live Demo)</span>
              </button>

              {/* Telegram */}
              <a
                href="https://t.me/v8097"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-500/20 transition-all"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>Написать в Telegram @v8097</span>
              </a>

              {/* Direct Call */}
              <a
                href="tel:+79824078097"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/20 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Позвонить +7 982 407-80-97</span>
              </a>

              {/* Quick Audit */}
              <button
                onClick={() => {
                  setExpanded(false);
                  onOpenAudit('floating_widget');
                }}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 transition-all border border-blue-400/30"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Заказать аудит отдела продаж</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <div className="flex items-center gap-2">
          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            title="Наверх"
            className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.08] backdrop-blur-xl shadow-lg transition-all"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          {/* Contact Hub Toggle Button with Pulse */}
          <motion.button
            id="floating-contact-hub"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className="relative flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-bold text-xs shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all border border-blue-400/30"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            
            <span className="hidden sm:inline">Связь & ИИ-Тест</span>
            
            {expanded ? <X className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
          </motion.button>
        </div>

      </div>
    </div>
  );
};
