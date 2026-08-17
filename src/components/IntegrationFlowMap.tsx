import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, 
  Layers, 
  PhoneCall, 
  MessageSquare, 
  Send, 
  Search, 
  TrendingUp, 
  Bot, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Database, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Share2,
  Play,
  Pause
} from 'lucide-react';
import { sound } from '../utils/sound';

interface IntegrationFlowMapProps {
  onOpenAudit: (source?: string) => void;
}

interface IntegrationNode {
  id: string;
  name: string;
  category: 'traffic' | 'comms' | 'ai' | 'docs' | 'analytics';
  categoryLabel: string;
  description: string;
  benefits: string[];
  icon: typeof PhoneCall;
  color: string;
  borderActive: string;
  badge: string;
  image: string;
  metricDelta: string;
}

export const IntegrationFlowMap: React.FC<IntegrationFlowMapProps> = ({ onOpenAudit }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('wazzup');
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  const customEasing = [0.16, 1, 0.3, 1];

  const nodeIds = ['wazzup', 'sipuni', 'telegram', 'ai-agent', 'traffic', 'docs-auto', 'analytics'];

  // Auto-cycle through integration nodes every 3.6s
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setSelectedNodeId((prevId) => {
        const nextIdx = (nodeIds.indexOf(prevId) + 1) % nodeIds.length;
        return nodeIds[nextIdx];
      });
    }, 3600);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nodes: IntegrationNode[] = [
    {
      id: 'wazzup',
      name: 'WhatsApp Business (WABA)',
      category: 'comms',
      categoryLabel: 'Мессенджеры для услуг',
      description: 'Бесшовная интеграция WhatsApp без риска блокировок. Менеджер ведет диалог прямо из карточки amoCRM, отправляет презентации услуг, КП и получает подтверждения встреч.',
      benefits: ['Вся история переписки в amoCRM', 'Авто-отправка напоминаний о созвоне', 'Контроль лексики и скриптов'],
      icon: MessageSquare,
      color: 'text-emerald-400',
      borderActive: 'border-emerald-500/60',
      badge: 'Официальный WABA',
      image: '/images/crm_whatsapp_api_3d_1786802998741.jpg',
      metricDelta: '0% риска бана'
    },
    {
      id: 'sipuni',
      name: 'IP-Телефония Sipuni / UIS',
      category: 'comms',
      categoryLabel: 'Телефония и CTI',
      description: 'Мгновенное всплывание карточки при входящем звонке. Запись 100% разговоров с привязкой к сделке. Автоматический перевод постоянного клиента на персонального менеджера.',
      benefits: ['0% пропущенных звонков', 'Запись и транскрибация речи', 'Служебный CTI-виджет в браузере'],
      icon: PhoneCall,
      color: 'text-blue-400',
      borderActive: 'border-blue-500/60',
      badge: 'Связь без задержек',
      image: '/images/crm_sipuni_telephony_3d_1786803011830.jpg',
      metricDelta: 'Запись 100% звонков'
    },
    {
      id: 'telegram',
      name: 'Telegram Bots & Каналы',
      category: 'comms',
      categoryLabel: 'Telegram Инфраструктура',
      description: 'Прием лидов из Telegram-ботов, закрытых клубов и рекламы. Авто-создание сделки с UTM-метками и мгновенное распределение между дежурными менеджерами.',
      benefits: ['Мгновенный захват горячих лидов', 'Отправка файлов и смет', 'Уведомления РОПу в личный Telegram'],
      icon: Send,
      color: 'text-sky-400',
      borderActive: 'border-sky-500/60',
      badge: 'Быстрые заявки',
      image: '/images/crm_whatsapp_api_3d_1786802998741.jpg',
      metricDelta: 'Захват за 1 секунду'
    },
    {
      id: 'ai-agent',
      name: 'AI-Квалификатор 24/7',
      category: 'ai',
      categoryLabel: 'Искусственный интеллект',
      description: 'Обученный ИИ-агент, который отвечает клиентам в Telegram и WhatsApp за 15 секунд. Задает квалифицирующие вопросы, определяет бюджет услуги и передает менеджеру готовый бриф.',
      benefits: ['Работа ночью и в выходные 24/7', 'Квалификация по вашему скрипту', 'Снижение нагрузки на менеджеров'],
      icon: Bot,
      color: 'text-cyan-400',
      borderActive: 'border-cyan-500/60',
      badge: 'GPT-4o / Claude',
      image: '/images/crm_ai_qualification_3d_1786803039452.jpg',
      metricDelta: 'Ответ 24/7 за 15 сек'
    },
    {
      id: 'traffic',
      name: 'Яндекс.Директ & Таргет',
      category: 'traffic',
      categoryLabel: 'Источники заявок',
      description: 'Автоматическая сквозная передача UTM-меток, ключевых слов и посадочных страниц прямо в карточку сделки amoCRM для 100% контроля окупаемости рекламных кампаний.',
      benefits: ['Сквозные UTM-метки', 'Авто-передача оффлайн-конверсий', 'Точный расчет стоимости договора'],
      icon: Search,
      color: 'text-amber-400',
      borderActive: 'border-amber-500/60',
      badge: 'Атрибуция 100%',
      image: '/images/crm_bi_analytics_profit_1786802360630.jpg',
      metricDelta: 'Контроль CPL до рубля'
    },
    {
      id: 'docs-auto',
      name: 'Авто-генерация Договоров & Смет',
      category: 'docs',
      categoryLabel: 'Документооборот услуг',
      description: 'Генерация коммерческих предложений, договоров оказания услуг и актов в формате PDF за 1 клик с авто-подстановкой реквизитов, сумм и перечня услуг.',
      benefits: ['Договор за 20 секунд вместо 40 минут', 'Фирменный стиль и факсимиле', 'Отправка ссылки клиенту в WhatsApp'],
      icon: FileText,
      color: 'text-indigo-400',
      borderActive: 'border-indigo-500/60',
      badge: 'PDF за 1 клик',
      image: '/images/crm_auto_docs_contract_1786802347029.jpg',
      metricDelta: '20 сек на договор'
    },
    {
      id: 'analytics',
      name: 'Сквозная Аналитика (Roistat / DataLens)',
      category: 'analytics',
      categoryLabel: 'Управленческий дашборд',
      description: 'Интерактивный дашборд собственника: конверсия менеджеров, средний чек услуги, LTV клиентов, цикл сделки и окупаемость рекламы (ROMI) на одном экране.',
      benefits: ['Контроль ключевых метрик онлайн', 'Анализ эффективности каждого сотрудника', 'Прозрачный прогноз выручки'],
      icon: TrendingUp,
      color: 'text-purple-400',
      borderActive: 'border-purple-500/60',
      badge: 'Дашборд РОПа',
      image: '/images/crm_ltv_analytics_3d_1786803090990.jpg',
      metricDelta: 'ROMI & LTV наглядно'
    }
  ];

  const activeNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];
  const ActiveIcon = activeNode.icon;

  return (
    <section id="flow-map" className="py-20 relative overflow-hidden bg-[#060a14] border-b border-white/[0.08] text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3"
          >
            <Network className="w-3.5 h-3.5" />
            <span>Экосистема для сферы услуг</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            Интерактивная карта интеграций:{' '}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-fill-transparent text-cyan-400">
              единый контур amoCRM
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed"
          >
            Кликните по любому модулю экосистемы, чтобы увидеть 3D-схему работы и то, как данные перетекают в amoCRM.
          </motion.p>
        </div>

        {/* Premium Outer Container matching Pricing Section style */}
        <div className="p-5 sm:p-8 rounded-3xl bg-[#090e1e]/90 border border-blue-500/30 backdrop-blur-2xl shadow-2xl shadow-black/80 space-y-6 relative overflow-hidden">
          
          {/* Top Bar inside container */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-300 font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">Архитектура бесшовного обмена данными</span>
                <span className="text-xs text-slate-400">Центральное ядро: amoCRM Enterprise + REST API + Webhooks</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-xs font-mono bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl text-cyan-300">
                <span className={`w-2 h-2 rounded-full ${isAutoPlay ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}`} />
                <span>7 контуров {isAutoPlay ? '(авто)' : ''}</span>
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

          {/* 2-Column Content Grid: Module Selector (Left) + 3D Detail Inspector (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Interactive Buttons Grid */}
            <div className="lg:col-span-6 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold flex items-center justify-between">
                <span>Выберите модуль интеграции:</span>
                <span className="text-cyan-400 text-[11px]">Кликните на карточку для ручного выбора</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {nodes.map((node) => {
                  const Icon = node.icon;
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => {
                        sound.playClick(560, 0.025);
                        setIsAutoPlay(false);
                        setSelectedNodeId(node.id);
                      }}
                      className={`p-3.5 rounded-2xl text-left border transition-all duration-300 flex items-center gap-3 relative overflow-hidden group cursor-pointer ${
                        isSelected 
                          ? 'bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50' 
                          : 'bg-black/40 border-white/[0.08] hover:border-white/20 hover:bg-black/60'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected 
                          ? `bg-cyan-500/20 border-cyan-400/40 ${node.color}` 
                          : 'bg-white/[0.03] border-white/[0.06] text-slate-400 group-hover:text-white'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] text-slate-400 font-mono block truncate">
                            {node.categoryLabel}
                          </span>
                        </div>
                        <div className={`text-xs font-bold truncate mt-0.5 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {node.name.split(' (')[0]}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Hub synchronization indicator card */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] flex items-center justify-between mt-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Сквозная синхронизация 24/7</span>
                    <span className="text-[11px] text-slate-400">Автоматическая проверка шлюзов каждые 60 секунд</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                  Uptime 99.99%
                </span>
              </div>
            </div>

            {/* Right: Selected Module Inspector Card with 3D Image & Benefits */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#0b142c] via-[#080f22] to-[#060b18] border-2 border-cyan-400/40 shadow-2xl shadow-cyan-500/15 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center ${activeNode.color}`}>
                          <ActiveIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                            {activeNode.categoryLabel}
                          </span>
                          <h4 className="text-sm sm:text-base font-bold text-white">{activeNode.name}</h4>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full border border-cyan-400/30">
                        {activeNode.badge}
                      </span>
                    </div>

                    {/* 3D Illustration */}
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-[#0c1328] group">
                      <img
                        src={activeNode.image}
                        alt={activeNode.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono">
                        <span className="text-slate-300">Ключевой эффект:</span>
                        <span className="text-cyan-300 font-extrabold">{activeNode.metricDelta}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeNode.description}
                    </p>

                    {/* Key Benefits */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block tracking-wider">
                        Преимущества интеграции:
                      </span>
                      {activeNode.benefits.map((b, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* CTA within inspector */}
                  <div className="pt-3 border-t border-white/[0.08] space-y-2">
                    <button
                      onClick={() => {
                        sound.playClick(520, 0.05);
                        onOpenAudit(`integration_${activeNode.id}`);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 border border-blue-400/30"
                    >
                      <span>Подключить {activeNode.name.split(' ')[0]} в amoCRM</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-slate-400 block text-center">
                      Настройка занимает от 1 до 3 рабочих дней в рамках любого тарифа
                    </span>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Bottom Banner */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>
                Все интеграции настраиваются через <strong>официальные API и WABA-шлюзы</strong> без риска блокировок телефонных номеров и аккаунтов.
              </span>
            </div>

            <button
              onClick={() => onOpenAudit('integrations_map_all')}
              className="whitespace-nowrap text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors shrink-0"
            >
              <span>Запросить схему под ваши сервисы →</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
