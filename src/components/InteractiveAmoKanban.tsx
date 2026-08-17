import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  PhoneCall, 
  Send, 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Pause, 
  CheckCircle2, 
  ShieldCheck,
  Building2,
  Stethoscope,
  Factory,
  ChevronRight,
  TrendingUp,
  Flame,
  Layers
} from 'lucide-react';
import { sound } from '../utils/sound';

interface InteractiveAmoKanbanProps {
  onOpenAudit: (source?: string) => void;
  onOpenBotDemo: () => void;
}

export type PipelineSector = 'real_estate' | 'medical' | 'b2b';

const SECTOR_SEQUENCE: PipelineSector[] = ['real_estate', 'medical', 'b2b'];

export const InteractiveAmoKanban: React.FC<InteractiveAmoKanbanProps> = ({
  onOpenAudit,
  onOpenBotDemo,
}) => {
  const [sectorIndex, setSectorIndex] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0); // 0 to 3
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  const sector = SECTOR_SEQUENCE[sectorIndex];

  // Sector-specific data models with required colors: Purple for Real Estate, Pink for Medical, Yellow for B2B
  const sectorData = {
    real_estate: {
      title: 'Недвижимость & Девелопмент',
      tabLabel: 'Недвижимость',
      dealTitle: 'ЖК «Резиденция» · Апартаменты 140 м²',
      price: '34 500 000 ₽',
      sourceTag: 'Яндекс.Директ [Премиум]',
      // PURPLE THEME
      themeColor: 'purple',
      borderColor: 'border-purple-500/50',
      activeTabBg: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-600/40 shadow-lg',
      glowColor: 'bg-purple-600/25',
      badgeBg: 'bg-purple-500/20 border-purple-400/40 text-purple-200',
      stageActiveBg: 'bg-purple-600/30 border-purple-400 text-white ring-2 ring-purple-400/60 shadow-lg shadow-purple-950/60',
      headerGradient: 'from-purple-950/80 via-slate-900/90 to-purple-950/40',
      priceColor: 'text-purple-300',
      accentText: 'text-purple-400',
      accentBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      thumbImg: '/images/real_estate_thumb_1786828630935.jpg',
      icon: Building2,
      clientName: 'Алексей Петров',
      responsible: 'Илья Вахитов (CRM-Архитектор)',
      clientAvatar: 'АП',
      stages: ['1. Новый лид', '2. ИИ-Квалификация', '3. Показ назначен', '4. Договор брони'],
      telegramMsg: '«Алексей, отправили подборку 3-комнатных пентхаусов и видео-румтур в Telegram»',
      sipuniCall: 'Звонок 03:42 мин. Договорились о встрече на объекте в субботу в 12:00. Скрипт 98%.',
      aiScoring: 'Скоринг 96/100 · Бюджет 35 млн ₽ подтвержден без ипотеки. Срочность: Высокая.',
      autoAction: 'Сделка автоматически переведена на этап [Показ] и поставлена задача брокеру.'
    },
    medical: {
      title: 'Медицина & Клиники',
      tabLabel: 'Клиники',
      dealTitle: 'Программа All-on-4 · Премиум имплантация',
      price: '480 000 ₽',
      sourceTag: 'ВКонтакте Таргет [Ортодонтия]',
      // PINK THEME
      themeColor: 'pink',
      borderColor: 'border-pink-500/50',
      activeTabBg: 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-pink-600/40 shadow-lg',
      glowColor: 'bg-pink-600/25',
      badgeBg: 'bg-pink-500/20 border-pink-400/40 text-pink-200',
      stageActiveBg: 'bg-pink-600/30 border-pink-400 text-white ring-2 ring-pink-400/60 shadow-lg shadow-pink-950/60',
      headerGradient: 'from-pink-950/80 via-slate-900/90 to-pink-950/40',
      priceColor: 'text-pink-300',
      accentText: 'text-pink-400',
      accentBg: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      thumbImg: '/images/medical_clinic_thumb_1786828642878.jpg',
      icon: Stethoscope,
      clientName: 'Елена Смирнова',
      responsible: 'Куратор лечения (Врач-координатор)',
      clientAvatar: 'ЕС',
      stages: ['1. Заявка с сайта', '2. Анамнез ИИ', '3. Запись на КТ', '4. План лечения'],
      telegramMsg: '«Елена, памятка перед приемом и запись к главному хирургу подтверждены на 14:00»',
      sipuniCall: 'Подтверждение записи за 2 часа (Автодозвон Sipuni). Пациент подтвердил визит.',
      aiScoring: 'ИИ собрал первичные симптомы и забронировал свободное окно в расписании врачей.',
      autoAction: 'Данные внесены в медицинскую карту amoCRM. Статус визита: 100% подтвержден.'
    },
    b2b: {
      title: 'Производство & Оптовые поставки',
      tabLabel: 'Производство',
      dealTitle: 'Станок лазерной резки ЧПУ 6кВт с доставкой',
      price: '4 850 000 ₽',
      sourceTag: 'SEO Органика [Заводское ТЗ]',
      // YELLOW / AMBER THEME
      themeColor: 'yellow',
      borderColor: 'border-amber-400/50',
      activeTabBg: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-black font-extrabold shadow-amber-500/40 shadow-lg',
      glowColor: 'bg-amber-400/25',
      badgeBg: 'bg-amber-400/20 border-amber-300/40 text-amber-200',
      stageActiveBg: 'bg-amber-500/30 border-amber-300 text-white ring-2 ring-amber-300/70 shadow-lg shadow-amber-950/60',
      headerGradient: 'from-amber-950/80 via-slate-900/90 to-yellow-950/40',
      priceColor: 'text-amber-300',
      accentText: 'text-amber-400',
      accentBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      thumbImg: '/images/factory_b2b_thumb_1786828654217.jpg',
      icon: Factory,
      clientName: 'Дмитрий Ковалев',
      responsible: 'Ведущий инженер проекта',
      clientAvatar: 'ДК',
      stages: ['1. Входящее ТЗ', '2. Расчет 1С', '3. Согласование КП', '4. Счет на оплату'],
      telegramMsg: '«Дмитрий, счет №284 и спецификация выгружены из 1С и отправлены в чат»',
      sipuniCall: 'Техническая консультация (08:15 мин). Согласованы параметры станины и оптики.',
      aiScoring: 'Нейросеть распознала вложенные чертежи PDF и сформировала смету за 4 секунды.',
      autoAction: 'Автоматическая генерация счета в 1С и резервирование оборудования на складе.'
    }
  };

  const cur = sectorData[sector];

  // Auto-progress stages: 1.8s per stage. When reaching stage 3 (end of pipeline), advance to the next sector!
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveStep((prevStep) => {
        if (prevStep >= 3) {
          // Reached the end of the pipeline -> switch to next sector!
          setSectorIndex((prevSec) => (prevSec + 1) % SECTOR_SEQUENCE.length);
          return 0;
        }
        return prevStep + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <div className={`relative rounded-3xl bg-[#090d1a]/95 border ${cur.borderColor} shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(6,182,212,0.22),0_0_70px_rgba(30,58,138,0.3)] backdrop-blur-2xl p-4 sm:p-6 text-white overflow-hidden transition-all duration-500`}>
      
      {/* Sector Dynamic Glow Ambient */}
      <div className={`absolute -top-24 -right-24 w-96 h-96 ${cur.glowColor} blur-[130px] pointer-events-none transition-all duration-700`} />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-600/10 blur-[130px] pointer-events-none" />

      {/* ================= 1. NICHE TABS (WITH THUMBNAILS & AUTO-PROGRESS INDICATOR) ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-800/80">
        
        {/* 3 Niche Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-2xl bg-black/70 border border-slate-800/90 shadow-[0_2px_15px_rgba(0,0,0,0.5),0_0_12px_rgba(6,182,212,0.08)]">
          {SECTOR_SEQUENCE.map((secKey, idx) => {
            const isSel = sectorIndex === idx;
            const item = sectorData[secKey];
            return (
              <button
                key={secKey}
                onClick={() => {
                  sound.playClick(520, 0.02);
                  setIsAutoPlay(false);
                  setSectorIndex(idx);
                  setActiveStep(0);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  isSel 
                    ? `${item.activeTabBg} scale-[1.02] shadow-[0_0_15px_rgba(6,182,212,0.3)]` 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {/* Miniature Photo */}
                <div className="w-5 h-5 rounded-md overflow-hidden border border-white/30 shrink-0 bg-slate-900">
                  <img 
                    src={item.thumbImg} 
                    alt={item.tabLabel}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{item.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Play/Pause Control & Auto-Cycle Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-black/50 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]" title="Автоматическая смена этапов и воронок">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_6px_rgba(6,182,212,0.9)]" />
          </div>

          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="p-2 rounded-xl bg-slate-800/90 text-slate-300 hover:text-white border border-slate-700/80 hover:border-cyan-500/40 hover:shadow-[0_0_12px_rgba(6,182,212,0.25)] transition-all cursor-pointer"
            title={isAutoPlay ? 'Приостановить авто-показ' : 'Запустить авто-показ'}
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* ================= 2. HIGHLIGHTED KANBAN HEADER WITH IMAGE BACKGROUND & PIPELINE STAGES ================= */}
      <div className="pt-3.5 pb-2">
        
        {/* Photo-Backed Highlight Banner for Active Sector & Deal Amount with Cyan/Theme Glow */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-700/90 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.15)] mb-3">
          
          {/* Background Image with Crisp Lighting & Subtle Color Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={cur.thumbImg} 
              alt={cur.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.1] scale-105 transition-all duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${cur.headerGradient} opacity-60 mix-blend-multiply`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-black/30 to-black/20" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${cur.badgeBg} shrink-0 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]`}>
                <cur.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-200 drop-shadow">
                    Воронка amoCRM
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${cur.badgeBg} shadow-sm backdrop-blur-sm`}>
                    {cur.sourceTag}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5 tracking-tight drop-shadow-md">
                  {cur.title}
                </h3>
              </div>
            </div>

            {/* Single Unified Deal Price (No duplication) */}
            <div className="flex flex-col sm:items-end bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-cyan-500/30 self-start sm:self-auto shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <span className="text-[10px] font-mono text-slate-300">Сумма сделки</span>
              <span className={`text-lg sm:text-xl font-black font-mono ${cur.priceColor} tracking-tight drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]`}>
                {cur.price}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Pipeline Stages (Live Auto-Advancing) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {cur.stages.map((stName, idx) => {
            const isActive = activeStep === idx;
            const isPassed = activeStep > idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick(460 + idx * 50, 0.02);
                  setActiveStep(idx);
                  setIsAutoPlay(false);
                }}
                className={`p-2.5 rounded-xl text-left transition-all duration-300 border cursor-pointer relative overflow-hidden ${
                  isActive
                    ? `${cur.stageActiveBg} scale-[1.02] shadow-[0_0_20px_rgba(6,182,212,0.35)]`
                    : isPassed
                    ? 'bg-slate-900/90 border-slate-700 text-slate-200 shadow-sm'
                    : 'bg-black/50 border-slate-800/80 text-slate-500 hover:text-slate-300'
                }`}
              >
                {/* Active progress bar top indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="stageActiveBar"
                    className="absolute top-0 left-0 right-0 h-1 bg-cyan-300 shadow-[0_0_10px_rgba(6,182,212,1)]" 
                  />
                )}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold truncate">
                    {stName}
                  </span>
                  {isActive ? (
                    <span className="w-2 h-2 rounded-full bg-cyan-300 shrink-0 ml-1 animate-ping shadow-[0_0_6px_rgba(6,182,212,1)]" />
                  ) : isPassed ? (
                    <span className="text-[11px] text-emerald-400 font-bold shrink-0 ml-1">✓</span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= 3. ACTIVE DEAL DETAIL ROW ================= */}
      <div className="relative my-3 p-3.5 rounded-2xl bg-[#060a14] border border-slate-800/90 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.1)]">
        
        {/* Deal Object Title + Responsible & Client Pills */}
        <div className="rounded-xl bg-slate-900/90 border border-slate-700/80 p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.7),0_0_15px_rgba(6,182,212,0.12)] space-y-2.5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2.5 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-cyan-300/80">Объект / Заказ:</span>
              <h4 className="text-sm sm:text-base font-bold text-white drop-shadow-sm">
                {cur.dealTitle}
              </h4>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              <span>Текущий статус: <strong className="text-cyan-200">{cur.stages[activeStep]}</strong></span>
            </div>
          </div>

          {/* Client & CRM Architect Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {/* Client Pill */}
            <div className="p-2 rounded-xl bg-black/70 border border-slate-800/90 shadow-sm flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-bold text-[11px] shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                {cur.clientAvatar}
              </div>
              <div className="truncate">
                <span className="text-[10px] text-slate-400 block leading-none">Клиент</span>
                <span className="text-white font-bold">{cur.clientName}</span>
              </div>
            </div>

            {/* Responsible Person Pill */}
            <div className="p-2 rounded-xl bg-black/70 border border-slate-800/90 shadow-sm flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.3)]">
                <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-slate-400 block leading-none">Ответственный в CRM</span>
                <span className="text-white font-bold">{cur.responsible}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 4. 4 LIVE AUTOMATION TILES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2.5">
          
          {/* Tile 1: WhatsApp / Telegram Message */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className={`p-3 rounded-xl border transition-all duration-300 ${
              activeStep >= 2
                ? 'bg-emerald-950/60 border-emerald-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(16,185,129,0.3),0_0_10px_rgba(6,182,212,0.15)]' 
                : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]">
                <Send className="w-3.5 h-3.5" />
                <span>Чат Telegram / WhatsApp</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-400/40 shadow-[0_0_8px_rgba(16,185,129,0.25)]">
                100% фиксация
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {cur.telegramMsg}
            </p>
          </motion.div>

          {/* Tile 2: Sipuni VoIP Call Attached */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className={`p-3 rounded-xl border transition-all duration-300 ${
              activeStep >= 1 
                ? 'bg-sky-950/60 border-cyan-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.35)]' 
                : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Звонок Sipuni прикреплен</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-200 bg-cyan-500/20 px-1.5 py-0.5 rounded border border-cyan-400/40 shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                Речевая аналитика
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {cur.sipuniCall}
            </p>
          </motion.div>

          {/* Tile 3: AI Qualification & Instant Answer */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className={`p-3 rounded-xl border transition-all duration-300 ${
              activeStep >= 1 
                ? 'bg-violet-950/60 border-violet-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(139,92,246,0.35),0_0_10px_rgba(6,182,212,0.15)]' 
                : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <div className="flex items-center gap-1.5 text-violet-300 font-bold drop-shadow-[0_0_6px_rgba(139,92,246,0.6)]">
                <Bot className="w-3.5 h-3.5" />
                <span>ИИ-Ассистент (3 сек)</span>
              </div>
              <span className="text-[10px] font-mono text-violet-200 bg-violet-500/20 px-1.5 py-0.5 rounded border border-violet-400/40 shadow-[0_0_8px_rgba(139,92,246,0.3)]">
                Скоринг 96%
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {cur.aiScoring}
            </p>
          </motion.div>

          {/* Tile 4: Auto-Stage Transition & Task Schedule */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className={`p-3 rounded-xl border transition-all duration-300 ${
              activeStep >= 3 
                ? 'bg-amber-950/60 border-amber-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.35),0_0_10px_rgba(6,182,212,0.15)]' 
                : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Авто-маршрутизация</span>
              </div>
              <span className="text-[10px] font-mono text-amber-200 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-400/40 shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                0 ошибок
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {cur.autoAction}
            </p>
          </motion.div>

        </div>
      </div>

      {/* ================= 5. BOTTOM ACTION FOOTER ================= */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>0 потерь лидов · 100% звонков в CRM · ИИ-контроль</span>
        </div>

        <button
          onClick={() => onOpenAudit('kanban_interactive_cta')}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Спроектировать такую систему</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
