import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../data/faq';
import { 
  HelpCircle, 
  ChevronDown, 
  Sparkles, 
  ArrowRight, 
  MessageSquareQuote,
  Send
} from 'lucide-react';

interface FaqSectionProps {
  onOpenAudit: (source?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenAudit }) => {
  const [openIds, setOpenIds] = useState<number[]>([1]);

  const toggleAccordion = (id: number) => {
    setOpenIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const customEasing = [0.16, 1, 0.3, 1];

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#060913]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Частые вопросы</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Ответы на{' '}
            <span className="text-blue-400">главные вопросы</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-4 text-base text-slate-300"
          >
            Всё, что нужно знать перед стартом проекта по автоматизации и внедрению amoCRM.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-14">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: customEasing }}
                className="rounded-2xl bg-[#090e1c] border border-white/[0.08] overflow-hidden transition-all hover:border-blue-500/30"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      0{faq.id}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {faq.question}
                    </h3>
                  </div>
                  
                  <div className={`p-1.5 rounded-xl bg-white/[0.04] text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400 bg-blue-500/10' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: customEasing }}
                      className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.04]"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Direct Telegram / Help Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#090e1c] to-blue-900/30 border border-blue-500/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white">Остался специфический вопрос по вашей нише?</h4>
            <p className="text-xs text-slate-300 mt-0.5">Напишите напрямую бизнес-архитектору в Telegram @v8097 — ответим за 15 минут.</p>
          </div>
          <a
            href="https://t.me/v8097"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all shrink-0 border border-blue-400/30 hover:scale-105"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Написать в Telegram</span>
          </a>
        </div>

      </div>
    </section>
  );
};
