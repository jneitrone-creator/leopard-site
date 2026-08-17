import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Send, 
  ArrowRight, 
  Sparkles,
  Building2,
  Users,
  Briefcase,
  Clock,
  TrendingUp,
  FileCheck,
  FileText,
  Lock,
  PhoneCall,
  Check
} from 'lucide-react';
import { AtmosphericBackground } from './AtmosphericBackground';

interface ExpertSectionProps {
  onOpenAudit: (source?: string) => void;
}

export const ExpertSection: React.FC<ExpertSectionProps> = ({ onOpenAudit }) => {
  const customEasing = [0.16, 1, 0.3, 1];

  const expertStats = [
    { 
      value: '8+ лет', 
      label: 'В архитектуре CRM и B2B-продаж', 
      sub: 'с 2017 года',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
      subColor: 'text-amber-300/70'
    },
    { 
      value: '140+', 
      label: 'Спроектированных отделов продаж', 
      sub: 'в 28 нишах',
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/30',
      subColor: 'text-sky-300/70'
    },
    { 
      value: '16 дней', 
      label: 'Средняя окупаемость внедрения', 
      sub: 'по метрикам ROMI',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      subColor: 'text-emerald-300/70'
    },
    { 
      value: '100%', 
      label: 'Личное ведение каждого проекта', 
      sub: 'без стажёров',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/30',
      subColor: 'text-indigo-300/70'
    },
  ];

  const methodologyPrinciples = [
    {
      num: '01',
      title: 'Глубокий аудит вместо шаблонных настроек',
      desc: 'Мы не просто создаем воронку в amoCRM — мы погружаемся в экономику сделки, скрипты менеджеров, логику отказов и точки слива рекламы.',
      accent: 'text-amber-400',
      badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      borderHover: 'hover:border-amber-500/40',
      tag: 'Погружение в цифры'
    },
    {
      num: '02',
      title: 'Прямая связь с ведущим архитектором 24/7',
      desc: 'Никаких стажёров, джуниор-интеграторов или испорченного телефона через проджект-менеджеров. Илья лично разрабатывает архитектурную карту, пишет логику автоматизаций, проводит практикумы для сотрудников и лично отвечает за результат в выделенном Telegram-чате проекта.',
      accent: 'text-cyan-300',
      badgeBg: 'bg-cyan-500/20 border-cyan-400/50 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.3)]',
      borderHover: 'border-cyan-500/40 bg-slate-900 shadow-[0_0_25px_rgba(6,182,212,0.15)]',
      tag: 'Персональная ответственность',
      isHero: true
    },
    {
      num: '03',
      title: 'Фиксация SLA и гарантия в договоре',
      desc: 'Каждый этап внедрения оцифрован по срокам (от 8 до 14 рабочих дней) с аттестацией команды и 30-дневным пост-сопровождением до первых закрытых сделок.',
      accent: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      borderHover: 'hover:border-emerald-500/40',
      tag: 'Юридический SLA'
    }
  ];

  const personalGuarantees = [
    {
      icon: Lock,
      title: 'NDA и защита базы 100%',
      desc: 'Юридическая тайна коммерческих данных, жесткое разграничение прав доступа и полная блокировка несанкционированного экспорта контактов.',
      highlight: false
    },
    {
      icon: FileText,
      title: 'Твердый договор & SLA',
      desc: 'Фиксированная прозрачная смета без скрытых доплат, утвержденный график спринтов и штрафные санкции за срыв дедлайнов.',
      highlight: false
    },
    {
      icon: ShieldCheck,
      title: '30 дней личного сопровождения & докрутки',
      desc: 'Личный контроль работы менеджеров после запуска, разбор реальных записей звонков и переписок в CRM, устранение саботажа и оперативная калибровка триггеров воронок до выхода на целевую конверсию.',
      highlight: true,
      badge: 'Включено в договор'
    }
  ];

  return (
    <section id="expert" className="py-28 relative overflow-hidden bg-[#070b14] border-b border-slate-800/80 text-white">
      {/* Atmospheric Background */}
      <AtmosphericBackground enableParticles={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Персональный консалтинг & CRM-Архитектура</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Кто стоит за внедрением:{' '}
            <span className="text-blue-400">
              экспертиза и личная ответственность
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed"
          >
            Leopard — это не конвейерное агентство с десятками стажеров. Это экспертная практика ведущего архитектора amoCRM с персональным контролем каждой интеграции.
          </motion.p>
        </div>

        {/* 2-Column Main Expert Showcase: Large Vertical Portrait & In-Depth Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Prominent Portrait + Verified Badges + Direct Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: customEasing }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-2xl">
              
              {/* Photo Canvas - Large, High-Def Portrait */}
              <div className="relative aspect-[9/16] sm:aspect-[4/5] bg-slate-950 overflow-hidden group">
                <img
                  src="/images/ilya_vakhitov_new_avatar.png"
                  alt="Илья Вахитов — Ведущий CRM-Архитектор · Основатель Leopard"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-95 transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/ilya_vakhitov_new_avatar.png';
                  }}
                />
                
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-transparent to-transparent opacity-90" />

                {/* Status Indicator */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ведет проекты лично · Открыт к аудиту</span>
                </div>

                {/* Overlaid Bio Card on Photo Bottom */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0b1120]/95 border border-slate-700/80 backdrop-blur-md text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        Илья Вахитов
                        <ShieldCheck className="w-5 h-5 text-sky-400" />
                      </h3>
                      <p className="text-xs text-slate-300 font-medium mt-0.5">Ведущий CRM-Архитектор · Основатель Leopard</p>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/30 font-bold">
                      amoCRM Pro
                    </span>
                  </div>
                </div>
              </div>

              {/* Official Credentials Strip */}
              <div className="p-4 bg-[#090e1c] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Сертифицированный партнер amoCRM
                </span>
                <span className="text-slate-400 font-mono text-[11px]">
                  Sipuni · Wazzup · 1C · AI
                </span>
              </div>
            </div>

            {/* Direct Telegram & Consultation Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Прямой контакт Ильи:</span>
                  <a 
                    href="https://t.me/v8097" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-blue-400 transition-colors"
                  >
                    @v8097
                  </a>
                </div>
              </div>

              <a 
                href="https://t.me/v8097" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
              >
                Написать в TG
              </a>
            </div>

            {/* Real Strategy Meeting Preview Thumbnail */}
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
              <img 
                src="/images/sales_director_meeting_consultation_1786804437272.jpg" 
                alt="Консультация с руководителем" 
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-xl object-cover border border-slate-700 shrink-0"
              />
              <div className="text-xs">
                <p className="font-semibold text-slate-200">Формат работы: Стратегическая сессия</p>
                <p className="text-slate-400 text-[11px] mt-0.5">Разбор воронки и скриптов в Zoom с видеозаписью и ментальной картой.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Expert Manifesto, Key Proof, Principles & Guarantees */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: customEasing }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Quote / Manifesto */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0f172a] to-[#0a0f1d] border border-blue-500/30 shadow-2xl relative">
              <span className="text-4xl text-blue-500/40 font-serif leading-none absolute top-4 left-4">“</span>
              <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed pt-2">
                «За годы работы я понял одно: технологии усиливают только ту систему, которая изначально правильно спроектирована. Поэтому я начинаю не с настроек, а с архитектуры продаж.»
              </p>
              <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span className="font-semibold text-white">Илья Вахитов — ведущий архитектор Leopard</span>
                <span className="font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30">
                  Личная практика с 2017 года
                </span>
              </div>
            </div>

            {/* High-Contrast Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {expertStats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl ${stat.bg} border transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-black/40 flex flex-col justify-between text-center`}
                >
                  <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-200 mt-1.5 font-bold leading-snug">
                    {stat.label}
                  </div>
                  <div className={`text-[11px] font-mono mt-1 font-medium ${stat.subColor}`}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* 3 Core Methodology Principles */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  Принципы персонального внедрения:
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {methodologyPrinciples.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 sm:p-5 rounded-2xl bg-slate-900/90 border ${item.isHero ? 'border-cyan-500/50 bg-[#0c1429] shadow-lg shadow-cyan-500/10' : 'border-slate-800/90'} ${item.borderHover} transition-all duration-300 flex items-start gap-4 shadow-md group relative overflow-hidden`}
                  >
                    {item.isHero && (
                      <div className="absolute top-0 right-0 px-3 py-0.5 bg-gradient-to-l from-cyan-500/20 to-transparent text-[10px] font-mono text-cyan-300 border-b border-l border-cyan-500/30 rounded-bl-xl font-bold">
                        {item.tag}
                      </div>
                    )}
                    <div className={`w-9 h-9 rounded-xl ${item.badgeBg} font-black flex items-center justify-center shrink-0 text-xs border font-mono shadow-sm group-hover:scale-105 transition-transform`}>
                      {item.num}
                    </div>
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <h5 className="text-sm font-extrabold text-white group-hover:text-cyan-200 transition-colors">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Guarantees Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {personalGuarantees.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx} 
                    className={`p-4 rounded-2xl ${item.highlight ? 'bg-gradient-to-b from-[#0e1c36] to-[#091124] border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/10' : 'bg-[#090e1c] border border-slate-800'} relative`}
                  >
                    {item.badge && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-mono text-[9px] font-extrabold uppercase tracking-wider shadow-sm">
                        {item.badge}
                      </span>
                    )}
                    <Icon className={`w-5 h-5 ${item.highlight ? 'text-emerald-400' : 'text-blue-400'} mb-2`} />
                    <h6 className="text-xs font-bold text-white mb-1.5 leading-snug">{item.title}</h6>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Action CTA Button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onOpenAudit('expert_ilya_cta')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Записаться на 30-минутный личный аудит с Ильей</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

