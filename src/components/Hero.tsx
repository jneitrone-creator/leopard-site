import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  PhoneCall,
  Bot,
  MessageSquare,
  Activity,
  Layers,
  Sliders,
  CheckCircle2,
  Lock,
  Flame,
  Radio,
  Maximize2
} from 'lucide-react';
import { AtmosphericBackground } from './AtmosphericBackground';
import { InteractiveAmoKanban } from './InteractiveAmoKanban';

const customEasing = [0.22, 1, 0.36, 1];

interface HeroProps {
  onOpenAudit: (source?: string) => void;
  onOpenBotDemo: () => void;
  onOpenImageGen?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenAudit, 
  onOpenBotDemo,
  onOpenImageGen 
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse hover tracking for 3D holographic tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Scroll Parallax Controls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Smooth springs for parallax translation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });

  // Different depth layers for holographic parallax
  const yBackGrid = useTransform(smoothProgress, [0, 1], [0, 70]);
  const yLightCone = useTransform(smoothProgress, [0, 1], [0, 130]);
  const yLeftContent = useTransform(smoothProgress, [0, 1], [0, 30]);
  const yKanbanConsole = useTransform(smoothProgress, [0, 1], [0, 50]);

  // Floating Holographic Badges with deeper negative/positive parallax
  const yBadgeVoip = useTransform(smoothProgress, [0, 1], [0, -125]);
  const yBadgeAi = useTransform(smoothProgress, [0, 1], [0, -95]);
  const yBadgeWaba = useTransform(smoothProgress, [0, 1], [0, -145]);
  const yBadgeCore = useTransform(smoothProgress, [0, 1], [0, -75]);
  const yBadgeMetrics = useTransform(smoothProgress, [0, 1], [0, -50]);

  const rotateHolo1 = useTransform(smoothProgress, [0, 1], [0, 7]);
  const rotateHolo2 = useTransform(smoothProgress, [0, 1], [0, -6]);
  const opacityHolo = useTransform(smoothProgress, [0, 0.85, 1], [1, 0.95, 0.25]);
  const scaleHolo = useTransform(smoothProgress, [0, 1], [1, 0.97]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#060810] text-white select-none"
    >
      {/* 1. Dynamic Technological Background with Parallax Depth Grid */}
      <motion.div style={{ y: yBackGrid }} className="absolute inset-0 pointer-events-none">
        <AtmosphericBackground enableParticles={true} />
        
        {/* Holographic Projection Floor Grid */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.22)_0%,rgba(59,130,246,0.14)_35%,rgba(147,51,234,0.06)_60%,transparent_75%)] blur-2xl pointer-events-none" />
        
        {/* 3D Holographic Perspective Floor Lines */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-96 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(6, 182, 212, 0.2) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            transform: 'perspective(600px) rotateX(65deg) translateY(40px)',
            transformOrigin: 'bottom center'
          }}
        />
      </motion.div>

      {/* 2. Holographic Laser Projection Beams with Parallax */}
      <motion.div 
        style={{ y: yLightCone, opacity: opacityHolo }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Holographic Light Cone 1 (Cyan/Blue) */}
        <div className="absolute top-1/4 right-[15%] w-[420px] h-[650px] bg-gradient-to-b from-cyan-400/20 via-blue-600/10 to-transparent blur-[85px] rotate-[-12deg] transform-gpu" />
        
        {/* Holographic Light Cone 2 (Violet/Indigo) */}
        <div className="absolute top-1/3 right-[30%] w-[380px] h-[550px] bg-gradient-to-b from-indigo-500/15 via-purple-600/10 to-transparent blur-[95px] rotate-[18deg] transform-gpu" />
        
        {/* Subtle Horizontal Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-25 pointer-events-none" />
      </motion.div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Floating HUD Status Bar */}
        <motion.div 
          style={{ y: yBadgeCore }}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: customEasing }}
          className="mb-8 hidden sm:flex items-center justify-between py-2 px-4 rounded-2xl bg-black/50 border border-cyan-500/30 backdrop-blur-md text-[11px] font-mono text-slate-300 shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.2)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-300 font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              <span>HOLO-HUD // LIVE STREAM</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">amoCRM Core v4.8 Enterprise</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Sipuni + WABA 100% Online
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span>LATENCY: 12ms</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-300">AI QUALIFIER: ACTIVE</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN: FOCUSED HEADLINE & CTA ================= */}
          <motion.div 
            style={{ y: yLeftContent }}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: customEasing }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-200 text-xs font-semibold tracking-wide backdrop-blur-md shadow-md shadow-blue-950/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>Архитектура продаж amoCRM · Практика Ильи Вахитова</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.14]">
              Автоматизируем продажи.{' '}
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
                Проектируем систему, которая работает на результат.
              </span>
            </h1>

            {/* Subtitle */}
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-950/70 border border-blue-400/30 text-xs sm:text-sm font-semibold text-cyan-300 font-mono shadow-sm">
                <span>amoCRM + телефония + MAX + Telegram + ИИ + автоматизация</span>
              </div>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                Объединяем инструменты в единый контур — от первого обращения до сделки и выручки.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 space-y-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <motion.button
                  id="hero-primary-cta"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenAudit('hero_primary_audit')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 group cursor-pointer border border-blue-400/40"
                >
                  <span>Получить аудит продаж</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <button
                  onClick={() => {
                    const el = document.getElementById('pipeline-simulator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else onOpenBotDemo();
                  }}
                  className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Bot className="w-4 h-4 text-blue-400" />
                  <span>Посмотреть, как это работает</span>
                </button>
              </div>

              {/* AI Image Generation Affordance Button (Gemini 3 Pro) */}
              {onOpenImageGen && (
                <div className="pt-1">
                  <button
                    onClick={onOpenImageGen}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-medium transition-all cursor-pointer group shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
                    <span>Генератор 3D-визуалов CRM (1K / 2K / 4K)</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                      Gemini 3 Pro
                    </span>
                  </button>
                </div>
              )}

              {/* Key Trust & Performance Metrics Banner with Cyan Tinted Holographic Shadow */}
              <motion.div 
                style={{ y: yBadgeMetrics }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2"
              >
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-cyan-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(6,182,212,0.12)] hover:border-cyan-400/50 hover:shadow-[0_0_22px_rgba(6,182,212,0.25)] transition-all text-center group backdrop-blur-md">
                  <span className="block text-xl font-black font-mono text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">140+</span>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-300">систем внедрено</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-emerald-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(16,185,129,0.12)] hover:border-emerald-400/50 hover:shadow-[0_0_22px_rgba(16,185,129,0.25)] transition-all text-center group backdrop-blur-md">
                  <span className="block text-xl font-black font-mono text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">0%</span>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-300">потерь лидов</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-blue-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(59,130,246,0.12)] hover:border-blue-400/50 hover:shadow-[0_0_22px_rgba(59,130,246,0.25)] transition-all text-center group backdrop-blur-md">
                  <span className="block text-xl font-black font-mono text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">3 сек</span>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-300">отклик ИИ-бота</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-purple-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(168,85,247,0.12)] hover:border-purple-400/50 hover:shadow-[0_0_22px_rgba(168,85,247,0.25)] transition-all text-center group backdrop-blur-md">
                  <span className="block text-xl font-black font-mono text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">+35%</span>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-300">средний чек</span>
                </div>
              </motion.div>

              {/* Architect Guarantee Line with Portrait */}
              <div className="flex items-center gap-3.5 pt-3 border-t border-slate-800/80">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/60 shrink-0 bg-slate-800 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <img
                    src="/images/ilya_vakhitov_new_avatar.png"
                    alt="Илья Вахитов — CRM Architect"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                </div>
                <div className="text-xs">
                  <span className="text-white font-bold block flex items-center gap-1.5">
                    <span>Илья Вахитов — Главный CRM-архитектор</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
                  </span>
                  <span className="text-slate-400 font-normal">140+ внедренных систем · Личная ответственность за результат</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: INTERACTIVE AMOCRM KANBAN WITH PARALLAX HOLOGRAPHIC BADGES ================= */}
          <motion.div 
            style={{ 
              y: yKanbanConsole,
              scale: scaleHolo,
              opacity: opacityHolo,
              perspective: 1200,
            }}
            initial={{ opacity: 0, scale: 0.98, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: customEasing }}
            className="lg:col-span-7 relative"
          >
            {/* 3D Container with Mouse Responsive Shift & Glowing Cyan Laser Base */}
            <div 
              className="relative transition-transform duration-300 ease-out transform-gpu"
              style={{
                transform: `rotateX(${mousePos.y * -6}deg) rotateY(${mousePos.x * 8}deg)`
              }}
            >
              {/* Cyan Holographic Laser Emission Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/25 via-blue-500/20 to-purple-600/25 rounded-3xl blur-2xl opacity-80 -z-10 animate-pulse pointer-events-none" />
              
              {/* Holographic Projector Top & Bottom Edge Glow Lines */}
              <div className="absolute -top-1 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] shadow-[0_0_12px_rgba(6,182,212,0.9)] pointer-events-none z-30" />
              <div className="absolute -bottom-1 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] shadow-[0_0_12px_rgba(6,182,212,0.9)] pointer-events-none z-30" />

              {/* Main Interactive amoCRM Console with Light-Emitting Cyan Drop Shadow */}
              <div className="relative rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_35px_rgba(6,182,212,0.28),inset_0_1px_1px_rgba(6,182,212,0.3)]">
                <InteractiveAmoKanban 
                  onOpenAudit={onOpenAudit}
                  onOpenBotDemo={onOpenBotDemo}
                />
              </div>

              {/* ================= FLOATING HOLOGRAPHIC PARALLAX BADGES ================= */}

              {/* 1. Top-Right: Sipuni VoIP Telemetry Hologram */}
              <motion.div 
                style={{ 
                  y: yBadgeVoip, 
                  rotate: rotateHolo1,
                  x: mousePos.x * 20
                }}
                className="absolute -top-7 -right-4 sm:-right-6 z-20 hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#080e1e]/95 border border-cyan-400/70 shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_30px_rgba(6,182,212,0.5),inset_0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-2xl pointer-events-none"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-500/25 border border-cyan-400/50 text-cyan-300 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                  <PhoneCall className="w-4 h-4 animate-bounce text-cyan-200" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-extrabold uppercase text-cyan-300 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]">
                      Sipuni VoIP Node
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  </div>
                  <span className="text-xs font-bold text-white block">
                    100% Запись & AI-Анализ
                  </span>
                  <span className="text-[9px] font-mono text-cyan-200/70">
                    Задержка: 14мс · Скрипт 98%
                  </span>
                </div>
              </motion.div>

              {/* 2. Bottom-Left: AI Neural Lead Qualifier Hologram */}
              <motion.div 
                style={{ 
                  y: yBadgeAi, 
                  rotate: rotateHolo2,
                  x: mousePos.x * -18
                }}
                className="absolute -bottom-6 -left-4 sm:-left-6 z-20 hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#0f0a20]/95 border border-violet-400/70 shadow-[0_15px_35px_rgba(0,0,0,0.85),0_0_30px_rgba(139,92,246,0.45),0_0_20px_rgba(6,182,212,0.3),inset_0_0_15px_rgba(139,92,246,0.15)] backdrop-blur-2xl pointer-events-none"
              >
                <div className="w-8 h-8 rounded-xl bg-violet-500/25 border border-violet-400/50 text-violet-300 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(139,92,246,0.5)]">
                  <Bot className="w-4 h-4 text-violet-200" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-extrabold uppercase text-violet-300 drop-shadow-[0_0_6px_rgba(139,92,246,0.6)]">
                      AI Lead Qualifier
                    </span>
                    <span className="px-1 py-0.2 rounded text-[8px] bg-violet-500/30 text-violet-200 border border-violet-400/30">
                      3 сек
                    </span>
                  </div>
                  <span className="text-xs font-bold text-white block">
                    Скоринг 96/100 · 24/7
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">
                    Telegram + WhatsApp + Avito
                  </span>
                </div>
              </motion.div>

              {/* 3. Mid-Right: Official WABA Enterprise Green Badge */}
              <motion.div 
                style={{ 
                  y: yBadgeWaba,
                  x: mousePos.x * 15
                }}
                className="absolute top-1/2 -right-6 -translate-y-1/2 z-20 hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#05140d]/95 border border-emerald-400/70 shadow-[0_10px_25px_rgba(0,0,0,0.8),0_0_25px_rgba(16,185,129,0.4),0_0_15px_rgba(6,182,212,0.25),inset_0_0_10px_rgba(16,185,129,0.2)] backdrop-blur-2xl pointer-events-none"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                <div>
                  <span className="text-[10px] font-mono font-extrabold text-emerald-300 block leading-tight drop-shadow-[0_0_6px_rgba(16,185,129,0.6)]">
                    OFFICIAL WABA
                  </span>
                  <span className="text-[9px] text-slate-300">
                    0% Блокировок · Green Badge
                  </span>
                </div>
              </motion.div>

              {/* Holographic Technical Corner Reticles with Cyan Glow */}
              <div className="absolute -top-3 -left-3 text-cyan-300/80 font-mono text-[10px] pointer-events-none drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]">
                ┌ [HOLO-NODE: 01]
              </div>
              <div className="absolute -top-3 -right-3 text-cyan-300/80 font-mono text-[10px] pointer-events-none text-right drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]">
                [PIPELINE READY] ┐
              </div>
              <div className="absolute -bottom-3 -left-3 text-cyan-300/80 font-mono text-[10px] pointer-events-none drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]">
                └ [LAT 55.75° N]
              </div>
              <div className="absolute -bottom-3 -right-3 text-cyan-300/80 font-mono text-[10px] pointer-events-none text-right drop-shadow-[0_0_6px_rgba(6,182,212,0.8)]">
                [SLA 100%] ┘
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
