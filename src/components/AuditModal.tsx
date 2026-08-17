import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Send, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Calculator,
  Building2,
  Users
} from 'lucide-react';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  tierTitle?: string;
  lossData?: { monthlyLoss: number; annualGain: number };
  packageData?: { tierTitle: string; modules?: string[]; totalPrice?: number };
}

export const AuditModal: React.FC<AuditModalProps> = ({
  isOpen,
  onClose,
  source,
  tierTitle,
  lossData,
  packageData
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    telegram: '',
    niche: '',
    teamSize: '3-7 менеджеров',
    currentCrm: 'amoCRM есть, но не работает',
    preferredChannel: 'telegram' as 'telegram' | 'whatsapp' | 'call'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(val);
  };

  const activeTitle = packageData?.tierTitle || tierTitle;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl my-auto rounded-3xl bg-[#090e1c] border border-blue-500/40 p-6 sm:p-8 shadow-2xl shadow-black/90 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{activeTitle ? `Выбран: ${activeTitle}` : 'Стратегический аудит воронки'}</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Заявка на аудит отдела продаж и архитектуру amoCRM
            </h3>
            
            <p className="text-xs text-slate-300 mt-1">
              Разберем точки слива лидов, телефонию и мессенджеры. SLA ответа — 15 минут.
            </p>
          </div>

          {/* Configured Package Banner if from Pricing Configurator */}
          {packageData && packageData.totalPrice && (
            <div className="mb-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-slate-300 uppercase font-bold">Сконфигурированный комплекс:</span>
                <span className="text-blue-400 font-mono font-extrabold text-sm">
                  {formatCurrency(packageData.totalPrice)}
                </span>
              </div>
              {packageData.modules && packageData.modules.length > 0 && (
                <div className="text-[11px] text-slate-400 line-clamp-2">
                  Модули: {packageData.modules.map(m => m.split('(')[0]).join(', ')}
                </div>
              )}
            </div>
          )}

          {/* Pre-calculated Loss Banner if from Calculator */}
          {lossData && lossData.monthlyLoss > 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5 text-rose-300">
                <Calculator className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Оценка расчетных потерь: <strong>{formatCurrency(lossData.monthlyLoss)}/мес</strong></span>
              </div>
              <span className="text-[10px] font-mono text-blue-300 bg-blue-500/15 px-2 py-0.5 rounded border border-blue-500/20">
                +{formatCurrency(lossData.annualGain)}/год
              </span>
            </div>
          )}

          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-white">Заявка успешно отправлена!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Бизнес-архитектор Leopard свяжется с вами в течение 15 минут через {formData.preferredChannel === 'telegram' ? 'Telegram' : formData.preferredChannel === 'whatsapp' ? 'WhatsApp' : 'телефонный звонок'}.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="https://t.me/v8097"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg border border-blue-400/30"
                >
                  <Send className="w-4 h-4" />
                  <span>Написать в Telegram @v8097 сейчас</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-white/[0.04] text-slate-300 text-xs hover:text-white"
                >
                  Закрыть окно
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                    Ваше имя: *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Алексей"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                    Телефон: *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                    Telegram:
                  </label>
                  <input
                    type="text"
                    value={formData.telegram}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    placeholder="@username"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                    Размер команды продаж:
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090e1c] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="1-2 менеджера">1–2 менеджера</option>
                    <option value="3-7 менеджеров">3–7 менеджеров</option>
                    <option value="8-15 менеджеров">8–15 менеджеров</option>
                    <option value="более 15 менеджеров">15+ менеджеров</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                  Текущий статус CRM:
                </label>
                <select
                  value={formData.currentCrm}
                  onChange={(e) => setFormData({ ...formData, currentCrm: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090e1c] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-blue-400"
                >
                  <option value="CRM нет, ведем в Excel/блокнотах">CRM нет, ведем в Excel/блокнотах</option>
                  <option value="amoCRM есть, но настроена плохо">amoCRM есть, но настроена плохо</option>
                  <option value="Переход с Битрикс24 / другой CRM">Переход с Битрикс24 / другой CRM</option>
                  <option value="Нужен только ИИ-бот и телефония">Нужен только ИИ-бот и телефония</option>
                  <option value="Продление официальных лицензий">Продление официальных лицензий</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-2">
                  Куда отправить карту аудита:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'telegram', label: 'Telegram', icon: Send },
                    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                    { id: 'call', label: 'Звонок', icon: Phone },
                  ].map((ch) => {
                    const Icon = ch.icon;
                    const isChosen = formData.preferredChannel === ch.id;
                    return (
                      <button
                        type="button"
                        key={ch.id}
                        onClick={() => setFormData({ ...formData, preferredChannel: ch.id as any })}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isChosen
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold border-blue-400 shadow-md shadow-blue-500/20'
                            : 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{ch.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-extrabold text-xs shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 border border-blue-400/30"
              >
                <span>Получить стратегию и аудит отдела продаж</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ИП Вахитов Илья Вадимович · Конфиденциальность гарантируется</span>
              </div>
            </form>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
