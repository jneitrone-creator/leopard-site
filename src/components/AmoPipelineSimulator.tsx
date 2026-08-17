import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PIPELINE_STAGES } from '../data/pipeline';
import { PipelineStage } from '../types';
import { 
  Inbox, 
  Bot, 
  PhoneCall, 
  FileText, 
  CreditCard, 
  BarChart, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Radio, 
  Layers,
  Cpu,
  Zap,
  ShieldCheck,
  TrendingUp,
  Clock,
  Send,
  UserCheck,
  Play,
  Pause
} from 'lucide-react';
import { sound } from '../utils/sound';

interface AmoPipelineSimulatorProps {
  onOpenAudit: (source?: string) => void;
}

export const AmoPipelineSimulator: React.FC<AmoPipelineSimulatorProps> = ({ onOpenAudit }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Auto-cycle through pipeline stages 1..6
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 6 ? 1 : prev + 1));
    }, 3600);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const stageImages: Record<number, { img: string; badgeText: string; delta: string }> = {
    1: {
      img: '/images/crm_lead_stage1_3d_1786803024632.jpg',
      badgeText: 'Мгновенный захват лида',
      delta: '0% потерь на входе'
    },
    2: {
      img: '/images/crm_ai_qualification_3d_1786803039452.jpg',
      badgeText: 'ИИ-скрининг 24/7 за 15 сек',
      delta: 'SLA < 15 секунд'
    },
    3: {
      img: '/images/crm_expert_call_3d_1786803054280.jpg',
      badgeText: 'CTI-звонок с записью в MP3',
      delta: '100% запись звонков'
    },
    4: {
      img: '/images/crm_proposal_sent_3d_1786803065209.jpg',
      badgeText: 'Генерация PDF за 20 сек',
      delta: 'Экономия 3ч / день'
    },
    5: {
      img: '/images/crm_invoice_paid_3d_1786803079154.jpg',
      badgeText: 'Авто-фискализация & Чек',
      delta: 'Мгновенное закрытие'
    },
    6: {
      img: '/images/crm_ltv_analytics_3d_1786803090990.jpg',
      badgeText: 'Сквозной ROMI & LTV',
      delta: '+35–50% к прибыли'
    }
  };

  const currentStage: PipelineStage = 
    PIPELINE_STAGES.find((s) => s.step === activeStep) || PIPELINE_STAGES[0];

  const getStageIcon = (name: string) => {
    switch (name) {
      case 'Inbox': return Inbox;
      case 'Bot': return Bot;
      case 'PhoneCall': return PhoneCall;
      case 'FileText': return FileText;
      case 'CreditCard': return CreditCard;
      case 'BarChart': return BarChart;
      default: return Sparkles;
    }
  };

  const currentMedia = stageImages[activeStep] || stageImages[1];
  const customEasing = [0.16, 1, 0.3, 1];

  return (
    <section id="pipeline" className="py-20 relative overflow-hidden bg-[#060a14] border-b border-white/[0.08] text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Архитектура Digital-Воронки</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Интерактивный симулятор{' '}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-fill-transparent text-cyan-400">
              пайплайна amoCRM
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed"
          >
            Нажимайте на этапы воронки, чтобы увидеть, какие автоматические триггеры, роботы и интеграции срабатывают на каждом шаге пути клиента.
          </motion.p>
        </div>

        {/* Compact & Ultra-Clear Outer Container matching License Pricing Style */}
        <div className="p-5 sm:p-8 rounded-3xl bg-[#090e1e]/90 border border-blue-500/30 backdrop-blur-2xl shadow-2xl shadow-black/80 space-y-6 relative overflow-hidden">
          
          {/* Top Bar with Status Indicator */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-300 font-bold">
                <Radio className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">Сквозной маршрут лида в amoCRM</span>
                <span className="text-xs text-slate-400">6 ключевых этапов: от первого касания до повторных продаж (LTV)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-xs font-mono bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl text-cyan-300">
                <span className={`w-2 h-2 rounded-full ${isAutoPlay ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}`} />
                <span>Этап {activeStep} из 6 {isAutoPlay ? '(авто)' : ''}</span>
              </div>

              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="p-2 rounded-xl bg-black/50 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isAutoPlay ? 'Приостановить авто-переключение' : 'Включить авто-переключение'}
              >
                {isAutoPlay ? (
                  <Pause className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* 6 Step Interactive Tabs Bar with Numbers & Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {PIPELINE_STAGES.map((stage) => {
              const Icon = getStageIcon(stage.iconName);
              const isActive = stage.step === activeStep;
              return (
                <button
                  key={stage.step}
                  onClick={() => {
                    sound.playClick(480 + stage.step * 35, 0.025);
                    setIsAutoPlay(false);
                    setActiveStep(stage.step);
                  }}
                  className={`relative p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border-cyan-400 shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/50 scale-[1.02]'
                      : 'bg-black/40 border-white/[0.08] hover:border-white/20 hover:bg-black/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                      isActive 
                        ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300 shadow-sm' 
                        : 'bg-white/[0.04] border-white/[0.08] text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-cyan-400/20 text-cyan-300' : 'bg-white/[0.04] text-slate-400'
                    }`}>
                      0{stage.step}
                    </span>
                  </div>

                  <div className={`text-xs font-bold truncate block ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {stage.title.split('. ')[1]}
                  </div>

                  <span className="text-[10px] text-slate-400 truncate block mt-0.5">
                    {stage.stageName.split(' / ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Stage Deep-Dive with 3D Thematic Illustration & Automation Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* Left Column: Thematic 3D Image & Delta Metrics */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-black/40 border border-white/[0.08] p-4 sm:p-5 overflow-hidden relative group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                        Этап 0{currentStage.step}
                      </span>
                      <span className="text-xs font-bold text-white truncate">{currentStage.stageName}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 whitespace-nowrap">
                      {currentStage.metricImpact}
                    </span>
                  </div>

                  {/* 3D Generated Tech Illustration */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 my-1 bg-[#0c1328]">
                    <img
                      src={currentMedia.img}
                      alt={currentStage.stageName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating badge inside image */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono">
                      <span className="text-slate-300 truncate">{currentMedia.badgeText}</span>
                      <span className="text-cyan-300 font-extrabold shrink-0 ml-2">{currentMedia.delta}</span>
                    </div>
                  </div>
                </div>

                {/* Systems connected to this stage */}
                <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Шлюзы на этом этапе:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentStage.systems.map((sys) => (
                      <span
                        key={sys}
                        className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-cyan-200"
                      >
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Trigger, Robot Action & Result Cards */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                
                <div className="space-y-3">
                  {/* Trigger Box */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08]">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Триггер перехода на этап:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {currentStage.trigger}
                    </p>
                  </div>

                  {/* Automation Box */}
                  <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider mb-1">
                      <Cpu className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Автоматическое действие роботов amoCRM:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                      {currentStage.automationAction}
                    </p>
                  </div>

                  {/* CRM Result Box */}
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Финальный результат в карточке CRM:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {currentStage.crmResult}
                    </p>
                  </div>
                </div>

                {/* Simulator Step Controls */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Шаг {activeStep} из 6
                  </span>
                  <div className="flex items-center gap-2">
                    {activeStep > 1 && (
                      <button
                        onClick={() => {
                          sound.playClick(440, 0.02);
                          setActiveStep(activeStep - 1);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-slate-300 transition-all"
                      >
                        ← Назад
                      </button>
                    )}
                    {activeStep < 6 ? (
                      <button
                        onClick={() => {
                          sound.playClick(540, 0.03);
                          setActiveStep(activeStep + 1);
                        }}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/30 transition-all border border-blue-400/30"
                      >
                        <span>Следующий этап</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          sound.playClick(580, 0.05);
                          onOpenAudit('pipeline_simulator_complete');
                        }}
                        className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all"
                      >
                        <span>Заказать воронку под ключ</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Banner */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>
                Каждый этап настраивается под специфику ваших услуг с жестким контролем времени реакции (SLA) и защитой от зависания сделок.
              </span>
            </div>

            <button
              onClick={() => onOpenAudit('pipeline_custom_setup')}
              className="whitespace-nowrap text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors shrink-0"
            >
              <span>Получить проект воронки под вашу нишу →</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
