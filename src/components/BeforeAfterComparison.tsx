import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Layers, 
  XCircle, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall, 
  Zap, 
  FileCheck, 
  TrendingUp,
  Clock,
  Check,
  ShieldCheck,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { sound } from '../utils/sound';

interface BeforeAfterComparisonProps {
  onOpenAudit: (source?: string) => void;
}

export const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({ onOpenAudit }) => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Auto-switch steps every 3.8 seconds until user clicks
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setSelectedNodeIndex((prev) => (prev + 1) % 4);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const customEasing = [0.16, 1, 0.3, 1];

  const nodes = [
    {
      id: 'calls',
      title: 'Фиксация и запись звонков',
      shortName: 'Телефония & Записи',
      icon: PhoneCall,
      image: '/images/crm_call_recording_node_1786802317644.jpg',
      badge: '0% потерь данных',
      metricDelta: 'Контроль 100%',
      before: {
        tag: 'ДО (Хаос)',
        headline: 'Звонки с личных мобильных и потеря базы',
        description: 'Звонки нигде не пишутся. При увольнении менеджер уносит клиентов и переписки с собой в телефонной книжке.',
        stat: 'Слепая зона руководства',
        color: 'text-rose-400',
        badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300'
      },
      after: {
        tag: 'ПОСЛЕ (amoCRM + Sipuni)',
        headline: '100% звонков в сделке + расшифровка',
        description: 'Каждый вызов мгновенно крепится в карточку в MP3. ИИ анализирует скрипт, а постоянный клиент переводится на личного менеджера.',
        stat: '100% диалогов сохранено',
        color: 'text-cyan-300',
        badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
      }
    },
    {
      id: 'speed',
      title: 'Скорость первого контакта',
      shortName: 'Скорость ответа 24/7',
      icon: Zap,
      image: '/images/crm_ai_speed_contact_1786802333457.jpg',
      badge: 'Ответ за 15 секунд',
      metricDelta: 'В 240 раз быстрее',
      before: {
        tag: 'ДО (Хаос)',
        headline: 'Ответ клиенту через 45–120 минут',
        description: 'В обед, вечером и на выходных заявки остывают без внимания. Клиент уходит к первому ответившему конкуренту.',
        stat: 'Слив до 40% лидов',
        color: 'text-rose-400',
        badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300'
      },
      after: {
        tag: 'ПОСЛЕ (ИИ-квалификатор)',
        headline: 'Мгновенный контакт 24/7 в WhatsApp/TG',
        description: 'Обученный ИИ-ассистент опрашивает клиента за 15 сек, выявляет потребность, бюджет и ставит готовый бриф менеджеру.',
        stat: 'Конверсия первого шага +65%',
        color: 'text-cyan-300',
        badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
      }
    },
    {
      id: 'docs',
      title: 'Подготовка КП, смет и договоров',
      shortName: 'Документооборот',
      icon: FileCheck,
      image: '/images/crm_auto_docs_contract_1786802347029.jpg',
      badge: 'PDF за 1 клик',
      metricDelta: 'Экономия 3ч в день',
      before: {
        tag: 'ДО (Хаос)',
        headline: 'Ручное заполнение Word/Excel по 40 минут',
        description: 'Менеджеры тратят половину рабочего дня на рутину: копирование реквизитов, исправление ошибок и пересылку файлов.',
        stat: 'Ошибки в счетах и суммах',
        color: 'text-rose-400',
        badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300'
      },
      after: {
        tag: 'ПОСЛЕ (Автогенерация)',
        headline: 'Фирменный PDF с печатью за 20 секунд',
        description: 'amoCRM автоматически генерирует договор, спецификацию и счет с факсимиле и отправляет прямую ссылку клиенту в мессенджер.',
        stat: 'Сделка закрывается в день звонка',
        color: 'text-cyan-300',
        badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
      }
    },
    {
      id: 'analytics',
      title: 'Прозрачность рекламы и окупаемости',
      shortName: 'Сквозная аналитика',
      icon: TrendingUp,
      image: '/images/crm_bi_analytics_profit_1786802360630.jpg',
      badge: 'ROMI до рубля',
      metricDelta: '+35–50% к прибыли',
      before: {
        tag: 'ДО (Хаос)',
        headline: 'Рекламный бюджет расходуется вслепую',
        description: 'Непонятно, какие кампании в Яндекс.Директ и Avito приносят реальные оплаченные договоры, а какие просто сливают бюджет.',
        stat: 'Конверсия ~4.2%',
        color: 'text-rose-400',
        badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-300'
      },
      after: {
        tag: 'ПОСЛЕ (Дашборд РОПа)',
        headline: 'Сквозная аналитика от клика до чистой прибыли',
        description: 'Интерактивный управленческий отчет: LTV, цикл сделки, окупаемость каждого источника и конверсия каждого сотрудника онлайн.',
        stat: 'Конверсия 14.8%+',
        color: 'text-cyan-300',
        badgeBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
      }
    }
  ];

  const activeItem = nodes[selectedNodeIndex];
  const ActiveIcon = activeItem.icon;

  return (
    <section id="before-after" className="py-24 relative overflow-hidden bg-[#070a12] border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Сравнение процессов & Архитектура</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Трансформация отдела продаж:{' '}
            <span className="text-blue-400">
              до и после внедрения
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed"
          >
            Выберите бизнес-процесс, чтобы наглядно увидеть устранение потерь и рост эффективности.
          </motion.p>
        </div>

        {/* Compact & Ultra-Clear Outer Container */}
        <div className="p-5 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Top 4 Interactive Selector Tabs & Controls */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">4 ключевых узла автоматизации:</span>
                {isAutoPlay && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Авто-показ
                  </span>
                )}
              </div>

              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isAutoPlay ? 'Приостановить авто-показ' : 'Включить авто-показ'}
              >
                {isAutoPlay ? (
                  <Pause className="w-3.5 h-3.5 text-blue-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
              {nodes.map((node, idx) => {
                const Icon = node.icon;
                const isSelected = selectedNodeIndex === idx;
                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      sound.playClick(500 + idx * 40, 0.03);
                      setIsAutoPlay(false);
                      setSelectedNodeIndex(idx);
                    }}
                    className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all duration-200 relative flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 shadow-md ring-1 ring-blue-400/40'
                        : 'bg-black/40 border-slate-800 hover:border-slate-700 hover:bg-black/60'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                          Шаг {idx + 1}
                        </span>
                        {isSelected && isAutoPlay && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        )}
                      </div>
                      <span className={`text-xs font-bold truncate block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {node.shortName}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Node Body: Visual + Side-by-Side Clarity Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* Left Column: Tech Illustration & Delta Badge */}
              <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl bg-black/40 border border-slate-800 p-4 sm:p-5 overflow-hidden relative group">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-400/30">
                      <ActiveIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white truncate">{activeItem.title}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 whitespace-nowrap">
                    {activeItem.badge}
                  </span>
                </div>

                {/* Illustration */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-800 my-1 bg-slate-950">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Delta tag on image */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono">
                    <span className="text-slate-300">Эффективность:</span>
                    <span className="text-emerald-400 font-extrabold">{activeItem.metricDelta}</span>
                  </div>
                </div>

                {/* Micro note */}
                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Внедряется в течение 3–5 рабочих дней</span>
                </div>
              </div>

              {/* Right Column: High-Contrast BEFORE vs AFTER Breakdown */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* BEFORE CARD */}
                <div className="p-5 rounded-2xl bg-[#140b0f] border border-rose-500/25 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-300 uppercase tracking-wider">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        {activeItem.before.tag}
                      </span>
                      <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-bold whitespace-nowrap">
                        {activeItem.before.stat}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-rose-100 leading-snug">
                      {activeItem.before.headline}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeItem.before.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-rose-900/40 text-[11px] text-rose-400/90 font-mono flex items-center justify-between">
                    <span>Итог:</span>
                    <span>Слив рекламного бюджета</span>
                  </div>
                </div>

                {/* AFTER CARD */}
                <div className="p-5 rounded-2xl bg-[#09141f] border border-blue-500/40 shadow-lg flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-300 uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        {activeItem.after.tag}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold whitespace-nowrap">
                        {activeItem.after.stat}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">
                      {activeItem.after.headline}
                    </h4>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      {activeItem.after.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-300 font-mono flex items-center justify-between">
                    <span>Итог:</span>
                    <span className="text-emerald-400 font-bold">Окупаемость 100%</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Ribbon */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                <Sparkles className="w-4 h-4 text-blue-200" />
              </div>
              <div>
                <span className="text-white font-bold block">
                  Переход на архитектуру Leopard окупается за 12–21 день
                </span>
                <span className="text-[11px] text-slate-400">
                  Сохраняем 100% лидов и высвобождаем до 3 часов рабочего времени менеджеров ежедневно.
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick(520, 0.05);
                onOpenAudit(`transformation_${activeItem.id}`);
              }}
              className="w-full sm:w-auto whitespace-nowrap px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Заказать аудит отдела продаж</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
