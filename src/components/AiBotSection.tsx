import React from 'react';
import { motion } from 'motion/react';
import { 
  Bot, 
  Zap, 
  BookOpen, 
  CalendarCheck, 
  UserCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';

interface AiBotSectionProps {
  onOpenBotDemo: () => void;
  onOpenAudit: (source?: string) => void;
}

export const AiBotSection: React.FC<AiBotSectionProps> = ({ onOpenBotDemo, onOpenAudit }) => {
  const capabilities = [
    {
      title: 'Мгновенный ответ 24/7 за 3 секунды',
      desc: 'Пока конкуренты спят или обедают, ваш автономный ИИ-ассистент перехватывает лид и начинает дружелюбную беседу.',
      icon: Zap,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/25'
    },
    {
      title: 'Глубокая квалификация по регламенту',
      desc: 'Задает точные вопросы по бюджету, срокам, объемам и отсеивает нецелевой трафик до передачи в отдел продаж.',
      icon: BrainCircuit,
      color: 'text-violet-400',
      bg: 'bg-violet-500/10 border-violet-500/25'
    },
    {
      title: 'Обучен на вашей базе знаний',
      desc: 'Отвечает на сложные технические вопросы, условия доставки, регламенты работы и особенности ваших продуктов.',
      icon: BookOpen,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/25'
    },
    {
      title: 'Авто-запись на встречу и замер',
      desc: 'Синхронизируется с календарем менеджеров и бронирует Zoom-консультацию или выезд специалиста без накладок.',
      icon: CalendarCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/25'
    },
    {
      title: 'Бесшовная передача в amoCRM',
      desc: 'Формирует структурированное резюме диалога, заполняет 10+ полей в сделке и назначает ответственного сотрудника.',
      icon: UserCheck,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/25'
    },
    {
      title: 'Сквозная аналитика и обучение',
      desc: 'Анализирует причины отказов, передает конверсионные сигналы в Яндекс.Директ и непрерывно улучшает скрипты.',
      icon: TrendingUp,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/25'
    }
  ];

  const customEasing = [0.16, 1, 0.3, 1];

  return (
    <section id="ai-bots" className="py-24 relative overflow-hidden bg-[#070814]">
      {/* Glow highlight in Violet & Indigo */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-violet-600/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
          >
            <Bot className="w-3.5 h-3.5 text-violet-400" />
            <span>AI-Driven Sales Automation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Интеллектуальный ИИ-ассистент,{' '}
            <span className="text-violet-400">который никогда не устает</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-4 text-base text-slate-300"
          >
            Автономные квалификаторы первого контакта для WhatsApp и Telegram. Без роботизированного холода — естественный человечный диалог и фиксация в amoCRM за секунды.
          </motion.p>
        </div>

        {/* AI Showcase Visual Banner */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-violet-500/30 bg-[#0c0d20] relative group shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 relative aspect-[16/9] lg:aspect-auto lg:h-full min-h-[300px] overflow-hidden order-2 lg:order-1">
              <img
                src="/images/ai_neural_bot_sales_assistant_1786889199162.jpg"
                alt="ИИ-квалификатор лидов и авто-воронка для amoCRM"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#0c0d20] via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-6 p-8 sm:p-10 space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-mono font-semibold">
                <BrainCircuit className="w-3.5 h-3.5 text-violet-400" />
                <span>Автономная квалификация 24/7</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Нейросеть берет на себя первый контакт и рутинный опрос
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                ИИ задает ключевые вопросы из вашего регламента квалификации, определяет платежеспособность и срочность, после чего создает готовую сделку в amoCRM со всеми ответами и ставит задачу менеджеру.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-200">
                  ⚡ Скорость ответа: 2-3 сек
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  🎯 Точность скоринга: 94%+
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Capabilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: customEasing }}
                className="p-6 rounded-3xl bg-[#0d0f22]/90 border border-slate-800 hover:border-violet-500/40 transition-all duration-300 group shadow-lg shadow-black/40"
              >
                <div className={`w-10 h-10 rounded-xl border ${cap.bg} ${cap.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-normal">
                  {cap.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Demo Showcase Banner with Violet-to-Indigo gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: customEasing }}
          className="relative rounded-3xl bg-gradient-to-r from-violet-950/70 via-[#0f1128] to-indigo-950/70 border border-violet-500/40 p-8 sm:p-10 overflow-hidden shadow-2xl shadow-black/80"
        >
          {/* Subtle real texture layer */}
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-luminosity pointer-events-none"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80')` }}
          />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-violet-500/20 text-violet-300 text-xs font-mono font-bold mb-4 border border-violet-500/30">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>ИНТЕРАКТИВНЫЙ СИМУЛЯТОР</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Протестируйте работу ИИ-бота на примере вашей ниши
            </h3>
            
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Мы подготовили 4 готовых сценария (Строительство, Опт, Юруслуги, EdTech). Выберите нишу, пройдите квалификацию и посмотрите, как в реальном времени заполняется карточка сделки в amoCRM.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                id="launch-bot-simulator-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenBotDemo}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all flex items-center gap-2.5 group border border-violet-400/40 cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Открыть живой симулятор ИИ-бота</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <button
                onClick={() => onOpenAudit('ai_bot_consult')}
                className="px-5 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/[0.1] text-xs font-semibold hover:border-violet-400/40 transition-all cursor-pointer"
              >
                Заказать обучение бота под свой бизнес
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
