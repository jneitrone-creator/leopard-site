import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  Send, 
  Mail, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Bot, 
  MessageSquare,
  Building
} from 'lucide-react';

interface ContactFooterProps {
  onOpenAudit: (source?: string) => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenAudit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    telegram: '',
    niche: '',
    preferredChannel: 'telegram' as 'telegram' | 'whatsapp' | 'call'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const customEasing = [0.16, 1, 0.3, 1];

  return (
    <footer id="contacts" className="relative pt-24 pb-12 bg-[#05070c] border-t border-white/[0.08] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Section & Form Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0c152e] via-[#090e1c] to-[#070a14] border border-blue-500/40 p-8 sm:p-12 mb-20 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Col: Pitch & SLA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>БЕСПЛАТНЫЙ АУДИТ ОТДЕЛА ПРОДАЖ</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Получите персональную карту автоматизации и устранения слива лидов
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                За 30 минут разберем вашу текущую воронку, телефонию и мессенджеры. Покажем точки утечки выручки и рассчитаем точный срок окупаемости для вашей компании.
              </p>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>SLA ответа на заявку — 15 минут в рабочее время</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Прямая связь с ведущим архитектором amoCRM</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Без навязывания — только оцифрованные сценарии роста</span>
                </div>
              </div>
            </div>

            {/* Right Col: Instant Booking Form */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-black/50 border border-white/[0.1] backdrop-blur-xl">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Заявка успешно принята!</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Бизнес-архитектор свяжется с вами в течение 15 минут по указанному каналу ({formData.preferredChannel === 'telegram' ? 'Telegram' : formData.preferredChannel === 'whatsapp' ? 'WhatsApp' : 'Телефон'}).
                  </p>
                  <a
                    href="https://t.me/v8097"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold transition-all shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Перейти в диалог @v8097 прямо сейчас</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                        Ваше имя:
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Константин"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                        Телефон:
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
                        Telegram (ник или номер):
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
                        Ниша бизнеса:
                      </label>
                      <input
                        type="text"
                        value={formData.niche}
                        onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                        placeholder="Строительство / Опт / Услуги"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-2">
                      Удобный канал для связи:
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
                                : 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-white hover:border-white/20'
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
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-extrabold text-xs shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 pt-3 border border-blue-400/30"
                  >
                    <span>Заказать бесплатный аудит воронки</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <p className="text-[10px] text-center text-slate-400">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Конфиденциальность гарантируется.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Credentials & Direct Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-white/[0.08]">
          
          {/* Phone */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 hover:border-blue-500/30 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-xs font-mono text-slate-400">Телефон:</div>
            <a
              href="tel:+79824078097"
              className="text-base font-bold text-white hover:text-blue-400 transition-colors block"
            >
              +7 (982) 407-80-97
            </a>
            <span className="text-[11px] text-slate-400 block">Прямой номер руководителя</span>
          </div>

          {/* Telegram */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 hover:border-blue-500/30 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div className="text-xs font-mono text-slate-400">Telegram:</div>
            <a
              href="https://t.me/v8097"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-bold text-sky-400 hover:text-sky-300 transition-colors block"
            >
              @v8097 (t.me/v8097)
            </a>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Онлайн · Ответ за 15 мин
            </span>
          </div>

          {/* Email */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 hover:border-blue-500/30 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-xs font-mono text-slate-400">Электронная почта:</div>
            <a
              href="mailto:verypery@yandex.ru"
              className="text-sm font-bold text-white hover:text-blue-400 transition-colors block truncate"
            >
              verypery@yandex.ru
            </a>
            <span className="text-[11px] text-slate-400 block">Для КП, договоров и реквизитов</span>
          </div>

          {/* Hours & Geography */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 hover:border-blue-500/30 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-xs font-mono text-slate-400">График и география:</div>
            <div className="text-xs font-bold text-white">Пн–Сб 09:00–20:00 (МСК)</div>
            <span className="text-[11px] text-slate-400 block">Вся Россия и СНГ (Дистанционно)</span>
          </div>

        </div>

        {/* Bottom Legal & Copyright info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <span className="font-semibold text-slate-300">
              © {new Date().getFullYear()} Leopard Business Automation
            </span>
            <span className="text-slate-400">
              Юрлицо: ИП Вахитов Илья Вадимович
            </span>
          </div>

          <div className="text-[11px] text-slate-400 text-center sm:text-right">
            Сертифицированный архитектор amoCRM · Внедрение, IP-телефония, ИИ-боты и сквозная аналитика
          </div>
        </div>

      </div>
    </footer>
  );
};
