import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PhoneCall, 
  MessageSquare, 
  ShieldCheck, 
  Volume2, 
  Headphones, 
  Zap, 
  Lock, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Radio, 
  FileCheck, 
  UserCheck, 
  Clock, 
  Sparkles, 
  PhoneForwarded, 
  Check, 
  Layers, 
  Cpu,
  Play,
  Pause
} from 'lucide-react';
import { sound } from '../utils/sound';

interface TelephonyMessengersProps {
  onOpenAudit: (source?: string) => void;
}

export const TelephonyMessengers: React.FC<TelephonyMessengersProps> = ({ onOpenAudit }) => {
  const [activeSubTab, setActiveSubTab] = useState<'telephony' | 'messengers'>('telephony');
  const [selectedStandardIdx, setSelectedStandardIdx] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Auto-cycle through standards and tabs
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setSelectedStandardIdx((prev) => {
        if (prev >= 5) {
          setActiveSubTab((prevTab) => (prevTab === 'telephony' ? 'messengers' : 'telephony'));
          return 0;
        }
        return prev + 1;
      });
    }, 3600);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const telephonyProviders = [
    { name: 'Sipuni', type: 'Рекомендованный партнер', isRecommended: true, badge: 'Выбор Leopard', desc: 'Ультра-быстрая CTI-интеграция с amoCRM, мгновенная запись звонков без задержек и 99.99% аптайм.' },
    { name: 'UIS / Comagic', type: 'Enterprise IP-телефония', isRecommended: false, desc: 'Глубокий динамический коллтрекинг и сквозная атрибуция до рекламной кампании.' },
    { name: 'Mango Office', type: 'Виртуальная АТС', isRecommended: false, desc: 'Облачные номера, многоканальные очереди и интеллектуальное голосовое меню IVR.' },
    { name: 'Мегафон / МТС / Билайн ВАТС', type: 'Мобильные операторы', isRecommended: false, desc: 'Связка корпоративных SIM-карт сотрудников с единым шлюзом amoCRM.' }
  ];

  // 6 Telephony Standards with 3D thematic illustrations
  const telephonyFeatures = [
    { 
      id: 'recording',
      title: '100% запись разговоров', 
      desc: 'Каждый звонок автоматически прикрепляется к карточке клиента в формате MP3 с возможностью прослушивания в 1 клик и контролем РОПа.', 
      icon: Volume2,
      tag: 'Контроль разговоров',
      highlight: 'В карточке сделки',
      image: '/images/crm_call_recording_node_1786802317644.jpg',
      metric: '0% потерь данных'
    },
    { 
      id: 'autocall',
      title: 'Авто-перезвон <60 секунд', 
      desc: 'При пропущенном вызове робот мгновенно связывает свободного менеджера с клиентом, не давая заявке остыть.', 
      icon: Zap,
      tag: '0% потерь звонков',
      highlight: 'Мгновенный дозвон',
      image: '/images/crm_ai_speed_contact_1786802333457.jpg',
      metric: 'Дозвон < 60 сек'
    },
    { 
      id: 'routing',
      title: 'Умная маршрутизация', 
      desc: 'Постоянный клиент сразу направляется на своего персонального менеджера без ожидания в общей очереди и переключений.', 
      icon: UserCheck,
      tag: 'Персональный менеджер',
      highlight: 'Без переключений',
      image: '/images/crm_smart_routing_popup_3d_1786803123119.jpg',
      metric: 'Лояльность +40%'
    },
    { 
      id: 'popup',
      title: 'Всплывающая карточка клиента', 
      desc: 'При входящем вызове на экране всплывает имя клиента, текущий этап сделки, сумма и история прошлых покупок еще до снятия трубки.', 
      icon: Radio,
      tag: 'CTI-виджет',
      highlight: 'До снятия трубки',
      image: '/images/crm_smart_routing_popup_3d_1786803123119.jpg',
      metric: 'Ответ по имени'
    },
    { 
      id: 'calltracking',
      title: 'Динамический коллтрекинг', 
      desc: 'Фиксация ключевого слова из контекстной рекламы Яндекс.Директ, UTM-меток и города звонящего прямо в сделке.', 
      icon: Sparkles,
      tag: 'Сквозная атрибуция',
      highlight: 'UTM и ключевик',
      image: '/images/crm_bi_analytics_profit_1786802360630.jpg',
      metric: 'ROMI до рубля'
    },
    { 
      id: 'speech_ai',
      title: 'ИИ-речевая аналитика', 
      desc: 'Автоматическая транскрибация звонка в текст, проверка соблюдения скрипта продаж, детекция возражений и оценка работы менеджера.', 
      icon: Headphones,
      tag: 'Нейросеть РОПа',
      highlight: 'Транскрибация речи',
      image: '/images/crm_telephony_speech_ai_3d_1786803109384.jpg',
      metric: 'Оценка скрипта 100%'
    },
  ];

  const messengerFeatures = [
    { 
      title: 'Единый центр переписок', 
      desc: 'Менеджеры отвечают на WhatsApp, Telegram и Avito из единого интерфейса amoCRM без переключения вкладок.', 
      icon: MessageSquare,
      tag: 'Один экран',
      highlight: 'WhatsApp + TG + Avito',
      image: '/images/crm_whatsapp_api_3d_1786802998741.jpg',
      metric: 'Все чаты в 1 окне'
    },
    { 
      title: '100% защита базы от увода', 
      desc: 'Сотрудники не видят реальный номер телефона клиента и не могут скопировать контакты в личный телефон.', 
      icon: Lock,
      tag: 'Безопасность',
      highlight: 'Маскирование номеров',
      image: '/images/crm_whatsapp_api_3d_1786802998741.jpg',
      metric: 'База защищена'
    },
    { 
      title: 'Авто-создание сделки', 
      desc: 'Любое первое сообщение из любого мессенджера моментально создает карточку с сохранением рекламных меток.', 
      icon: Zap,
      tag: 'Без ручного ввода',
      highlight: '100% фиксация',
      image: '/images/crm_lead_stage1_3d_1786803024632.jpg',
      metric: '0% потерянных лидов'
    },
    { 
      title: 'Контроль SLA ответа', 
      desc: 'Таймер отслеживает скорость ответа менеджера. При задержке свыше 3 минут уведомление уходит РОПу.', 
      icon: Clock,
      tag: 'Контроль скорости',
      highlight: 'SLA < 3 минут',
      image: '/images/crm_ai_speed_contact_1786802333457.jpg',
      metric: 'Скорость ответа <3м'
    },
    { 
      title: 'Авто-отправка КП и счетов', 
      desc: 'Сформированное коммерческое предложение или ссылка на оплату уходит клиенту в диалог за 5 секунд.', 
      icon: FileCheck,
      tag: 'Мгновенная продажа',
      highlight: 'PDF в мессенджер',
      image: '/images/crm_auto_docs_contract_1786802347029.jpg',
      metric: 'КП за 5 секунд'
    },
    { 
      title: 'Массовые рассылки без бана', 
      desc: 'Официальные триггерные сервисные сообщения по базе клиентов через верифицированные WABA-каналы.', 
      icon: ShieldCheck,
      tag: 'Официальный WABA',
      highlight: 'Без риска блокировок',
      image: '/images/crm_whatsapp_api_3d_1786802998741.jpg',
      metric: '100% надежность'
    },
  ];

  const customEasing = [0.16, 1, 0.3, 1];
  const activeFeatureList = activeSubTab === 'telephony' ? telephonyFeatures : messengerFeatures;
  const currentStandard = activeFeatureList[selectedStandardIdx] || activeFeatureList[0];
  const ActiveStandardIcon = currentStandard.icon;

  const isTelephony = activeSubTab === 'telephony';

  return (
    <section id="telephony" className="py-20 relative overflow-hidden bg-[#070b16] border-b border-white/[0.08] text-white">
      {/* Ambient background glow based on active subtab */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] ${isTelephony ? 'bg-sky-600/10' : 'bg-emerald-600/10'} blur-[150px] pointer-events-none -z-10 transition-colors duration-500`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${isTelephony ? 'bg-sky-500/15 border-sky-500/30 text-sky-300' : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'} text-xs font-semibold uppercase tracking-wider mb-3 transition-colors`}
          >
            <PhoneCall className={`w-3.5 h-3.5 ${isTelephony ? 'text-sky-400' : 'text-emerald-400'}`} />
            <span>Связь & Коммуникации</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            IP-Телефония и Мессенджеры в{' '}
            <span className={isTelephony ? 'text-sky-400' : 'text-emerald-400'}>
              едином бесшовном контуре
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal"
          >
            Ни одного потерянного звонка, 100% фиксация диалогов в WhatsApp и Telegram и надежная защита клиентской базы от увода сотрудниками.
          </motion.p>
        </div>

        {/* Big Switcher with distinct tab colors & auto-play indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-black/50 border border-slate-700 backdrop-blur-xl">
            <button
              onClick={() => {
                sound.playClick(500, 0.02);
                setIsAutoPlay(false);
                setActiveSubTab('telephony');
                setSelectedStandardIdx(0);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeSubTab === 'telephony'
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>IP-Телефония (Sipuni, UIS, Mango)</span>
            </button>
            <button
              onClick={() => {
                sound.playClick(520, 0.02);
                setIsAutoPlay(false);
                setActiveSubTab('messengers');
                setSelectedStandardIdx(0);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                activeSubTab === 'messengers'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp & Telegram (WABA 2.0)</span>
            </button>
          </div>

          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="p-2.5 rounded-xl bg-black/50 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={isAutoPlay ? 'Приостановить авто-переключение' : 'Включить авто-переключение'}
          >
            {isAutoPlay ? (
              <Pause className="w-4 h-4 text-cyan-400" />
            ) : (
              <Play className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

        {/* Outer Container */}
        <div className={`p-5 sm:p-8 rounded-3xl ${isTelephony ? 'bg-[#090f20]/90 border-sky-500/30' : 'bg-[#071612]/90 border-emerald-500/30'} border backdrop-blur-2xl shadow-2xl shadow-black/80 space-y-6 relative overflow-hidden transition-all duration-500`}>
          
          {/* Top Bar inside container */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-300 font-bold">
                <Radio className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">
                  {activeSubTab === 'telephony' ? '6 стандартов надежности телефонии в amoCRM' : '6 правил работы с мессенджерами в amoCRM'}
                </span>
                <span className="text-xs text-slate-400">Гарантия фиксации 100% обращений и CTI-интеграция</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl text-cyan-300">
              <span className={`w-2 h-2 rounded-full ${isAutoPlay ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}`} />
              <span>Стандарт {selectedStandardIdx + 1} из 6 {isAutoPlay ? '(авто)' : ''}</span>
            </div>
          </div>

          {/* 6 Step Interactive Tabs Bar with Numbers & Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {activeFeatureList.map((feat, idx) => {
              const Icon = feat.icon;
              const isSelected = selectedStandardIdx === idx;
              return (
                <button
                  key={feat.title}
                  onClick={() => {
                    sound.playClick(500 + idx * 30, 0.025);
                    setIsAutoPlay(false);
                    setSelectedStandardIdx(idx);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border-cyan-400 shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/50 scale-[1.02]'
                      : 'bg-black/40 border-white/[0.08] hover:border-white/20 hover:bg-black/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300'
                        : 'bg-white/[0.04] border-white/[0.08] text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-cyan-400/20 text-cyan-300' : 'bg-white/[0.04] text-slate-400'
                    }`}>
                      0{idx + 1}
                    </span>
                  </div>

                  <div className={`text-xs font-bold truncate block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {feat.title}
                  </div>

                  <span className="text-[10px] text-slate-400 truncate block mt-0.5">
                    {feat.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Standard Deep-Dive with 3D Thematic Illustration & Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSubTab}-${selectedStandardIdx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {/* Left Column: 3D Thematic Image */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-black/40 border border-white/[0.08] p-4 sm:p-5 overflow-hidden relative group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-cyan-300 flex items-center justify-center border border-blue-400/30">
                        <ActiveStandardIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-white truncate">{currentStandard.title}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 whitespace-nowrap">
                      {currentStandard.highlight}
                    </span>
                  </div>

                  {/* 3D Generated Tech Illustration */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 my-1 bg-[#0c1328]">
                    <img
                      src={currentStandard.image}
                      alt={currentStandard.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating badge inside image */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono">
                      <span className="text-slate-300">Ключевой эффект:</span>
                      <span className="text-cyan-300 font-extrabold">{currentStandard.metric}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-3 pt-2 border-t border-white/[0.06]">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Работает в фоновом режиме через Webhooks & CTI</span>
                </div>
              </div>

              {/* Right Column: Standard Details & Business Logic */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08]">
                    <span className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1">
                      Описание стандарта:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {currentStandard.desc}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-cyan-300 block mb-0.5">
                        {currentStandard.tag}
                      </span>
                      <span className="text-xs text-slate-300">
                        Автоматически исключает человеческий фактор и хаос при коммуникациях с клиентами.
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 whitespace-nowrap ml-3">
                      Включено
                    </span>
                  </div>
                </div>

                {/* Navigator Controls */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Стандарт {selectedStandardIdx + 1} из 6
                  </span>
                  <div className="flex items-center gap-2">
                    {selectedStandardIdx > 0 && (
                      <button
                        onClick={() => {
                          sound.playClick(440, 0.02);
                          setSelectedStandardIdx(selectedStandardIdx - 1);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-slate-300 transition-all"
                      >
                        ← Назад
                      </button>
                    )}
                    {selectedStandardIdx < 5 ? (
                      <button
                        onClick={() => {
                          sound.playClick(540, 0.03);
                          setSelectedStandardIdx(selectedStandardIdx + 1);
                        }}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/30 transition-all border border-blue-400/30"
                      >
                        <span>Следующий стандарт</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          sound.playClick(580, 0.05);
                          onOpenAudit('telephony_standards_complete');
                        }}
                        className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all"
                      >
                        <span>Подключить стандарты телефонии</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Action Ribbon */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>
                Интеграция Sipuni и WhatsApp WABA входит в базовую настройку любого тарифа внедрения Leopard.
              </span>
            </div>

            <button
              onClick={() => onOpenAudit('telephony_quick_audit')}
              className="whitespace-nowrap text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors shrink-0"
            >
              <span>Рассчитать связку под наш отдел продаж →</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
