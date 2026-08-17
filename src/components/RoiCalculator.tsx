import React, { useState, useId } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  TrendingUp, 
  AlertOctagon, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  CheckCircle2,
  DollarSign,
  Flame,
  Percent,
  Coins,
  ShieldCheck
} from 'lucide-react';
import { sound } from '../utils/sound';

interface RoiCalculatorProps {
  onOpenAudit: (source?: string, lossData?: { monthlyLoss: number; annualGain: number }) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenAudit }) => {
  const [leadsPerMonth, setLeadsPerMonth] = useState<number>(350);
  const [averageCheck, setAverageCheck] = useState<number>(120000);
  const [currentConversion, setCurrentConversion] = useState<number>(4.5);
  const [lostLeadsPercent, setLostLeadsPercent] = useState<number>(28);

  const leadsId = useId();
  const checkId = useId();
  const conversionId = useId();
  const lostLeadsId = useId();

  // Math Calculations:
  // Lost leads per month = leadsPerMonth * (lostLeadsPercent / 100)
  // If those leads were processed with the conversion rate:
  // Lost deals per month = Lost leads * (currentConversion / 100)
  // Monthly Lost Revenue = Lost deals * averageCheck
  const lostLeadsCount = Math.round(leadsPerMonth * (lostLeadsPercent / 100));
  const lostDealsCount = (lostLeadsCount * (currentConversion / 100));
  const monthlyLoss = Math.round(lostDealsCount * averageCheck);
  const annualLoss = monthlyLoss * 12;

  // Potential annual uplift with Leopard (recovering lost leads + conversion boost ~45%)
  const recoveredAnnualRevenue = Math.round(monthlyLoss * 12 * 0.85);
  
  // Implementation cost estimate for payback calculation
  const estimatedCost = 98000;
  const paybackDays = monthlyLoss > 0 ? Math.max(7, Math.round((estimatedCost / (monthlyLoss / 30)))) : 14;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(val);
  };

  const customEasing = [0.16, 1, 0.3, 1];

  return (
    <section id="roi-calc" className="py-24 relative overflow-hidden bg-[#060a14] border-b border-white/[0.08] text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Финансовый аудит потерь</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Калькулятор потерь выручки{' '}
            <span className="bg-gradient-to-r from-rose-300 via-rose-400 to-amber-300 bg-clip-text text-fill-transparent text-rose-400">
              из-за сливов лидов
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed"
          >
            Укажите параметры вашего бизнеса, чтобы увидеть реальную сумму недополученной прибыли за месяц и год из-за отсутствия CRM-системы и автодозвона.
          </motion.p>
        </div>

        {/* Premium Outer Container matching Pricing Section style */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#090e1e]/90 border border-blue-500/30 backdrop-blur-2xl shadow-2xl shadow-black/80 space-y-8 relative overflow-hidden">
          
          {/* Top Bar inside container */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300 font-bold">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">Интерактивная диагностика окупаемости</span>
                <span className="text-xs text-slate-400">Расчет основан на метриках 140+ внедренных воронок в сфере услуг</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-xl text-rose-300">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <span>Диагностика в реальном времени</span>
            </div>
          </div>

          {/* 2-Column Calculator Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                  <Flame className="w-4 h-4 text-blue-400" />
                  <span>Параметры вашего отдела продаж:</span>
                </h3>
                <span className="text-[11px] font-mono text-cyan-400">Передвигайте ползунки</span>
              </div>

              {/* Slider 1: Leads per month */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor={leadsId} className="text-slate-300 font-medium">Количество входящих лидов в месяц:</label>
                  <span className="font-mono font-bold text-cyan-300 text-sm px-2.5 py-0.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    {leadsPerMonth} заявок
                  </span>
                </div>
                <input
                  id={leadsId}
                  type="range"
                  min={30}
                  max={3000}
                  step={10}
                  value={leadsPerMonth}
                  onChange={(e) => {
                    sound.playClick(350 + Number(e.target.value) / 10, 0.015);
                    setLeadsPerMonth(Number(e.target.value));
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>30 лидов</span>
                  <span>1 500</span>
                  <span>3 000 лидов</span>
                </div>
              </div>

              {/* Slider 2: Average Check */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor={checkId} className="text-slate-300 font-medium">Средний чек сделки (услуги):</label>
                  <span className="font-mono font-bold text-cyan-300 text-sm px-2.5 py-0.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    {formatCurrency(averageCheck)}
                  </span>
                </div>
                <input
                  id={checkId}
                  type="range"
                  min={10000}
                  max={1500000}
                  step={5000}
                  value={averageCheck}
                  onChange={(e) => {
                    sound.playClick(400 + Number(e.target.value) / 10000, 0.015);
                    setAverageCheck(Number(e.target.value));
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>10 000 ₽</span>
                  <span>750 000 ₽</span>
                  <span>1.5 млн ₽</span>
                </div>
              </div>

              {/* Slider 3: Current Conversion */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor={conversionId} className="text-slate-300 font-medium">Текущая конверсия в оплату:</label>
                  <span className="font-mono font-bold text-cyan-300 text-sm px-2.5 py-0.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    {currentConversion}%
                  </span>
                </div>
                <input
                  id={conversionId}
                  type="range"
                  min={0.5}
                  max={25}
                  step={0.5}
                  value={currentConversion}
                  onChange={(e) => {
                    sound.playClick(450 + Number(e.target.value) * 10, 0.015);
                    setCurrentConversion(Number(e.target.value));
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0.5%</span>
                  <span>12%</span>
                  <span>25%</span>
                </div>
              </div>

              {/* Slider 4: Lost Leads % */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor={lostLeadsId} className="text-slate-300 font-medium">
                    Оценка потерь лидов (забытые, долгий ответ, без перезвона):
                  </label>
                  <span className="font-mono font-bold text-rose-400 text-sm px-2.5 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                    {lostLeadsPercent}%
                  </span>
                </div>
                <input
                  id={lostLeadsId}
                  type="range"
                  min={5}
                  max={60}
                  step={1}
                  value={lostLeadsPercent}
                  onChange={(e) => {
                    sound.playClick(300 + Number(e.target.value) * 5, 0.015);
                    setLostLeadsPercent(Number(e.target.value));
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>5% (Минимум)</span>
                  <span>30% (Среднее по РФ)</span>
                  <span>60% (Критично)</span>
                </div>
              </div>

              {/* Loss warning note */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] text-xs text-slate-400 flex items-center gap-3">
                <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
                <span>
                  По статистике amoCRM, в 78% компаний без SLA и авто-дозвона теряется от 25% до 45% обращений в первые 15 минут.
                </span>
              </div>
            </div>

            {/* Right Column: Calculated Results Card & Visual Analytics Dashboard */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0e1630] via-[#091024] to-[#060b18] border-2 border-blue-400/40 shadow-2xl shadow-blue-500/20 space-y-6 flex flex-col justify-between">
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <span className="text-xs font-mono uppercase text-slate-300 font-bold">
                      Итоговый расчет потерь
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      Окупаемость: ~{paybackDays} дней
                    </span>
                  </div>

                  {/* Monthly Loss Display */}
                  <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
                    <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block mb-1">
                      Ежемесячные прямые потери:
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono drop-shadow-md">
                      {formatCurrency(monthlyLoss)}
                    </div>
                    <p className="text-xs text-rose-200/90 mt-2 leading-relaxed">
                      Теряется около <strong>~{Math.round(lostDealsCount)} сделок</strong> каждый месяц из-за скорости первого контакта и отсутствия авто-задач.
                    </p>
                  </div>

                  {/* Potential Annual Gain */}
                  <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                    <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      Потенциальный прирост за 1 год с Leopard:
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-mono drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                      + {formatCurrency(recoveredAnnualRevenue)}
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      За счет возврата потерянных лидов, контроля SLA и внедрения ИИ-квалификатора 24/7.
                    </p>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                  <motion.button
                    id="calc-audit-cta-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      sound.playClick(520, 0.05);
                      onOpenAudit('roi_calculator', { monthlyLoss, annualGain: recoveredAnnualRevenue });
                    }}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-extrabold text-xs shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 border border-blue-400/30 cursor-pointer"
                  >
                    <span>Получить аудит с расчетом под наш бизнес</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  
                  <p className="text-[11px] text-center text-slate-400">
                    Бесплатный 30-минутный стратегический разбор с бизнес-архитектором
                  </p>
                </div>

              </div>

              {/* Visual Mini Analytics Card with Image */}
              <div className="rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#080d1d] relative group shadow-lg">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src="/images/crm_sales_roi_analytics_dashboard_1786889185395.jpg"
                    alt="Сквозная финансовая аналитика и окупаемость amoCRM"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85] contrast-[1.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d1d] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30 backdrop-blur-sm">
                      Дашборд РОПа и Собственника
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30 backdrop-blur-sm">
                      100% прозрачность
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>
                Средний срок возврата инвестиций во внедрение amoCRM от Leopard составляет <strong>от 12 до 21 дня</strong>.
              </span>
            </div>

            <button
              onClick={() => onOpenAudit('roi_calculator_cases')}
              className="whitespace-nowrap text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors shrink-0"
            >
              <span>Посмотреть кейсы с подтвержденными цифрами →</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
