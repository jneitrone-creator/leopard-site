import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ROLE_DIAGNOSTICS } from '../data/pains';
import { RoleType } from '../types';
import { sound } from '../utils/sound';
import { 
  Building2, 
  Users, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Timer,
  ShieldAlert,
  CheckSquare,
  PhoneCall,
  MessageSquare,
  BarChart3,
  XCircle,
  Play,
  Pause
} from 'lucide-react';
import { AtmosphericBackground } from './AtmosphericBackground';

interface RolePainsProps {
  onOpenAudit: (source?: string) => void;
}

const ROLES_LIST: RoleType[] = ['owner', 'rop', 'marketer'];

export const RolePains: React.FC<RolePainsProps> = ({ onOpenAudit }) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>('owner');
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Auto-switch roles every 4 seconds until user clicks
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setSelectedRole((prev) => {
        const nextIdx = (ROLES_LIST.indexOf(prev) + 1) % ROLES_LIST.length;
        return ROLES_LIST[nextIdx];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const currentDiagnostic = ROLE_DIAGNOSTICS.find(r => r.id === selectedRole) || ROLE_DIAGNOSTICS[0];

  const getRoleIcon = (roleId: RoleType) => {
    switch (roleId) {
      case 'owner': return Building2;
      case 'rop': return Users;
      case 'marketer': return Target;
    }
  };

  const getRoleTheme = (roleId: RoleType) => {
    switch (roleId) {
      case 'owner':
        return {
          activeTabClass: 'text-amber-300 bg-amber-500/20 border-amber-500/40 shadow-amber-500/10',
          accentText: 'text-amber-400',
          badgeClass: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
          btnClass: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/25',
          borderClass: 'border-amber-500/30',
          cardHover: 'hover:border-amber-500/40',
          solutionIconText: 'text-amber-400',
          pillBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20'
        };
      case 'rop':
        return {
          activeTabClass: 'text-rose-300 bg-rose-500/20 border-rose-500/40 shadow-rose-500/10',
          accentText: 'text-rose-400',
          badgeClass: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
          btnClass: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/25',
          borderClass: 'border-rose-500/30',
          cardHover: 'hover:border-rose-500/40',
          solutionIconText: 'text-rose-400',
          pillBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20'
        };
      case 'marketer':
        return {
          activeTabClass: 'text-violet-300 bg-violet-500/20 border-violet-500/40 shadow-violet-500/10',
          accentText: 'text-violet-400',
          badgeClass: 'bg-violet-500/15 border-violet-500/30 text-violet-300',
          btnClass: 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/25',
          borderClass: 'border-violet-500/30',
          cardHover: 'hover:border-violet-500/40',
          solutionIconText: 'text-violet-400',
          pillBg: 'bg-violet-500/10 text-violet-300 border-violet-500/20'
        };
    }
  };

  const getRoleImage = (roleId: RoleType) => {
    switch (roleId) {
      case 'owner':
        return {
          src: '/images/owner_executive_meeting_1786825634740.jpg',
          alt: 'Стратегическое совещание собственника бизнеса и аналитика показателей'
        };
      case 'rop':
        return {
          src: '/images/rop_sales_leader_1786825649093.jpg',
          alt: 'Контроль работы менеджеров и пайплайна РОПом'
        };
      case 'marketer':
        return {
          src: '/images/cmo_marketing_growth_1786825662911.jpg',
          alt: 'Сквозная аналитика ROMI, CAC и окупаемости каналов'
        };
    }
  };

  const getItemIcon = (name: string) => {
    switch (name) {
      case 'Timer': return Timer;
      case 'ShieldAlert': return ShieldAlert;
      case 'TrendingUp': return TrendingUp;
      case 'CheckSquare': return CheckSquare;
      case 'PhoneCall': return PhoneCall;
      case 'Zap': return Zap;
      case 'Target': return Target;
      case 'MessageSquare': return MessageSquare;
      case 'BarChart3': return BarChart3;
      default: return Sparkles;
    }
  };

  const customEasing = [0.16, 1, 0.3, 1];
  const roleImage = getRoleImage(selectedRole);
  const roleTheme = getRoleTheme(selectedRole);

  return (
    <section id="role-pains" className="py-24 relative overflow-hidden bg-[#070a12] border-y border-slate-800 text-white">
      {/* Dynamic Technological Atmospheric Background */}
      <AtmosphericBackground enableParticles={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Диагностика узких мест воронки</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Где именно ваш отдел продаж{' '}
            <span className="text-blue-400">
              теряет деньги прямо сейчас?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed"
          >
            Выберите свою роль в управлении бизнесом, чтобы увидеть ключевые точки скрытых потерь и архитектурные решения от Leopard.
          </motion.p>
        </div>

        {/* 3 Role Switcher Pills with Distinct Active Styling & Auto-play indicator */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            {ROLE_DIAGNOSTICS.map((role) => {
              const Icon = getRoleIcon(role.id);
              const isActive = selectedRole === role.id;
              const rTheme = getRoleTheme(role.id);
              return (
                <button
                  key={role.id}
                  onClick={() => {
                    sound.playClick(480, 0.02);
                    setIsAutoPlay(false);
                    setSelectedRole(role.id);
                  }}
                  className={`relative flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? `${rTheme.activeTabClass} border shadow-md` 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? rTheme.accentText : 'text-slate-400'}`} />
                  <span>{role.title}</span>
                  {isActive && isAutoPlay && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-1" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={isAutoPlay ? 'Приостановить авто-переключение' : 'Включить авто-переключение'}
          >
            {isAutoPlay ? (
              <Pause className="w-4 h-4 text-emerald-400" />
            ) : (
              <Play className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

        {/* Asymmetric Editorial Diagnostic Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDiagnostic.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: customEasing }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Featured Column: Real Editorial Photography & Strategic Context */}
            <div className={`lg:col-span-5 flex flex-col justify-between rounded-3xl overflow-hidden border ${roleTheme.borderClass} bg-slate-900 shadow-2xl relative group`}>
              {/* Photo Area */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <img
                  src={roleImage.src}
                  alt={roleImage.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                {/* Float Badge */}
                <div className={`absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${roleTheme.badgeClass} backdrop-blur-md text-xs font-mono font-bold shadow-lg`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Фокус: {currentDiagnostic.badge}</span>
                </div>
              </div>

              {/* Photo Bottom Narrative */}
              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className={`text-[11px] font-mono uppercase tracking-wider font-bold ${roleTheme.accentText}`}>
                    Стратегический срез
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    {currentDiagnostic.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {currentDiagnostic.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Средний рост конверсии:</span>
                    <span className="text-emerald-400 font-bold">+35%...50%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Срок окупаемости:</span>
                    <span className="text-slate-200 font-bold">14–21 день</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Distinct Non-Uniform Diagnostic Items */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              {currentDiagnostic.items.map((item, idx) => {
                const ItemIcon = getItemIcon(item.iconName);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.08, ease: customEasing }}
                    className={`p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 ${roleTheme.cardHover} transition-all duration-200 shadow-md group`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                          <ItemIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono font-bold text-rose-400 uppercase bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                              Потеря: {item.pain}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-normal">
                            {item.painDetails}
                          </p>
                        </div>
                      </div>

                      <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap self-start">
                        {item.effect}
                      </span>
                    </div>

                    {/* Fix Ribbon */}
                    <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className={`w-4 h-4 ${roleTheme.solutionIconText} shrink-0`} />
                        <span><strong>Решение:</strong> {item.solution}</span>
                      </div>
                      <button
                        onClick={() => onOpenAudit(`role_${currentDiagnostic.id}_${item.id}`)}
                        className={`${roleTheme.accentText} hover:opacity-80 font-bold flex items-center gap-1 transition-opacity shrink-0 cursor-pointer`}
                      >
                        <span>Разбор →</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Bottom Quick Audit Bar */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Персональный аудит с разбором регламентов и воронки</span>
                </div>
                <button
                  onClick={() => onOpenAudit(`diagnostic_banner_${currentDiagnostic.id}`)}
                  className={`px-4 py-2 rounded-xl ${roleTheme.btnClass} font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer`}
                >
                  <span>Заказать аудит отдела</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

