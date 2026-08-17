import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/process';
import { 
  Search, 
  Layers, 
  Sliders, 
  Cpu, 
  GraduationCap, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Workflow
} from 'lucide-react';

interface ProcessTimelineProps {
  onOpenAudit: (source?: string) => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onOpenAudit }) => {
  const getStepIcon = (name: string) => {
    switch (name) {
      case 'Search': return Search;
      case 'Layers': return Layers;
      case 'Sliders': return Sliders;
      case 'Cpu': return Cpu;
      case 'GraduationCap': return GraduationCap;
      case 'Sparkles': return Sparkles;
      default: return Workflow;
    }
  };

  const customEasing = [0.16, 1, 0.3, 1];

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-[#060913]">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Workflow className="w-3.5 h-3.5 text-blue-400" />
            <span>Методология Leopard</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            6 этапов внедрения{' '}
            <span className="text-blue-400">до гарантированного результата</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-4 text-base text-slate-300"
          >
            От детального аудита узких мест до боевого запуска и обучения вашей команды.
          </motion.p>
        </div>

        {/* Methodology Architectural Blueprint Visual */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#090e20] relative group shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 p-8 sm:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
                <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                <span>Архитектурная схема интеграции</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Прозрачная карта движения сделки
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                До написания первой строчки кода и настройки полей мы создаем интерактивную архитектурную карту в Miro: рекламный трафик → ИИ-квалификация → amoCRM → телефония и мессенджеры → сквозная аналитика.
              </p>
              <div className="pt-2 flex flex-col gap-2 text-xs text-slate-300">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  Устранение слепых зон и дублирования
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  Фиксация точных регламентов для РОПа и брокеров
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto lg:h-full min-h-[300px] overflow-hidden">
              <img
                src="/images/expert_audit_architecture_blueprint_1786889226830.jpg"
                alt="Архитектура сквозной автоматизации B2B-продаж"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#090e20] via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = getStepIcon(step.icon);
            const stepThemes = [
              { color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/30', hoverBorder: 'hover:border-amber-500/40', activeBg: 'group-hover:bg-amber-500' },
              { color: 'text-cyan-400', bg: 'bg-cyan-500/15 border-cyan-500/30', hoverBorder: 'hover:border-cyan-500/40', activeBg: 'group-hover:bg-cyan-500' },
              { color: 'text-indigo-400', bg: 'bg-indigo-500/15 border-indigo-500/30', hoverBorder: 'hover:border-indigo-500/40', activeBg: 'group-hover:bg-indigo-500' },
              { color: 'text-violet-400', bg: 'bg-violet-500/15 border-violet-500/30', hoverBorder: 'hover:border-violet-500/40', activeBg: 'group-hover:bg-violet-500' },
              { color: 'text-sky-400', bg: 'bg-sky-500/15 border-sky-500/30', hoverBorder: 'hover:border-sky-500/40', activeBg: 'group-hover:bg-sky-500' },
              { color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30', hoverBorder: 'hover:border-emerald-500/40', activeBg: 'group-hover:bg-emerald-500' },
            ];
            const theme = stepThemes[idx % stepThemes.length];

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: customEasing }}
                className={`relative flex flex-col justify-between rounded-3xl bg-[#090e1c] border border-white/[0.08] p-6 ${theme.hoverBorder} transition-all duration-300 group shadow-lg`}
              >
                <div>
                  {/* Top Step Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${theme.bg} ${theme.color} border flex items-center justify-center group-hover:scale-110 ${theme.activeBg} group-hover:text-white transition-all`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Clock className={`w-3 h-3 ${theme.color}`} />
                        {step.duration}
                      </span>
                      <span className={`text-lg font-black font-mono ${theme.color}`}>
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-slate-100 transition-colors mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Результат этапа:
                  </span>
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Team Training & Adoption Banner */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-indigo-500/30 bg-[#0a0d24] relative group shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 relative aspect-[16/9] lg:aspect-auto lg:h-full min-h-[280px] overflow-hidden order-2 lg:order-1">
              <img
                src="/images/crm_team_training_workshop_1786889213274.jpg"
                alt="Обучение менеджеров и аттестация команды в amoCRM"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#0a0d24] via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-6 p-8 sm:p-10 space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Этап 5 & 6: Аттестация и адаптация</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Команда работает в CRM с первого дня без саботажа
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Проводим живые практикумы на реальных лидах, записываем индивидуальные видео-инструкции для каждого сотрудника и тестируем усвоение регламентов. РОП получает прозрачный инструмент контроля без ручного микроменеджмента.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-200">
                  📚 Видеобаза знаний остаётся у вас
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  🛡️ 30 дней гарантийного сопровождения
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenAudit('process_timeline')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-extrabold text-xs shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all border border-blue-400/30 cursor-pointer"
          >
            <span>Забронировать дату старта проекта</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </section>
  );
};
