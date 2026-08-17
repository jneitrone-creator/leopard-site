import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  Send, 
  Menu, 
  X, 
  Zap, 
  ArrowRight,
  Bot,
  Volume2,
  VolumeX
} from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  onOpenAudit: (source?: string) => void;
  onOpenBotDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAudit, onOpenBotDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    sound.enabled = next;
    if (next) sound.playClick(600, 0.03);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Диагностика', href: '#diagnostic' },
    { name: 'Интеграции', href: '#telephony' },
    { name: 'ИИ-Ассистент', href: '#ai-bot' },
    { name: 'Пайплайн amoCRM', href: '#pipeline' },
    { name: 'Кейсы', href: '#cases' },
    { name: 'Калькулятор ROI', href: '#calculator' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#06080e]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/60 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Status Badge */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-0.5 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/45 transition-all duration-300">
              <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                {/* Sleek leopard geometric mark */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-display font-black text-lg bg-gradient-to-br from-white via-blue-200 to-blue-400 bg-clip-text text-fill-transparent text-blue-400">
                  L
                </span>
                <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 animate-pulse" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  LEOPARD
                </span>
                <span className="text-[10px] font-mono tracking-widest text-blue-300 uppercase px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/25 hidden sm:inline-block">
                  CRM ARCHITECT
                </span>
              </div>
              <span className="text-[11px] text-slate-400 tracking-normal hidden md:inline-block font-medium">
                Business Automation
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-slate-300 hover:text-white hover:text-blue-300 px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Sound Effects Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all text-xs flex items-center justify-center ${
                soundActive 
                  ? 'bg-blue-500/10 border-blue-500/30 text-cyan-300 hover:bg-blue-500/20' 
                  : 'bg-white/[0.02] border-white/[0.08] text-slate-500 hover:text-slate-300'
              }`}
              title={soundActive ? 'Звуковые эффекты включены (нажмите для выключения)' : 'Звуковые эффекты выключены (нажмите для включения)'}
            >
              {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Live Bot Demo Trigger */}
            <button
              id="header-bot-demo-btn"
              onClick={onOpenBotDemo}
              className="group relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-400/60 transition-all duration-200"
            >
              <Bot className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform animate-pulse" />
              <span>ИИ-Симулятор</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </button>

            {/* SLA Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>SLA: 15 мин</span>
            </div>

            {/* Main Audit CTA Button */}
            <motion.button
              id="header-audit-cta-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenAudit('header')}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 border border-blue-400/30 transition-all"
            >
              <span>Получить аудит</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onOpenBotDemo}
              className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs"
              title="ИИ-Симулятор"
            >
              <Bot className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="sm:hidden border-b border-white/[0.08] bg-[#070a12]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-medium text-slate-300 hover:text-amber-400 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBotDemo();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                <span>Запустить ИИ-Демо Симулятор</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAudit('mobile_menu');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Заказать аудит отдела продаж</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
