import { PricingTier, ServiceModule } from '../types';

export const SERVICE_MODULES: ServiceModule[] = [
  {
    id: 'ai-bot',
    name: 'AI-бот квалификации и продаж 24/7 (AI Bot)',
    category: 'ai',
    price: 25000,
    timelineDays: 3,
    description: 'Автономный ИИ-агент на базе GPT/Claude с обучением на регламентах вашей компании. Отвечает за 15 секунд в Telegram и WhatsApp, квалифицирует лидов и передает горячие заявки брокерам.',
    impact: '+45% к конверсии первого контакта',
    iconName: 'Bot',
    defaultInTiers: ['tier-ai-ecosystem']
  },
  {
    id: 'advanced-analytics',
    name: 'Сквозная BI-Аналитика (Advanced Analytics)',
    category: 'analytics',
    price: 60000,
    timelineDays: 3,
    description: 'Дашборды Power BI / Yandex DataLens: сквозной расчет ROMI по рекламным каналам, когортный анализ LTV, расчет чистой маржи по менеджерам и прогноз кассовых разрывов.',
    impact: '100% прозрачность окупаемости маркетинга',
    iconName: 'BarChart3',
    defaultInTiers: ['tier-ai-ecosystem']
  },
  {
    id: 'full-crm-integration',
    name: 'Комплексная архитектура amoCRM (Full CRM Integration)',
    category: 'core',
    price: 45000,
    timelineDays: 4,
    description: 'Индивидуальная многоэтапная digital-воронка (лиды + производство + допродажи), кастомная матрица обязательных полей, защита базы от увода сотрудниками и digital-пайплайн.',
    impact: 'Устранение хаоса и потерь на всех этапах',
    iconName: 'Layers',
    defaultInTiers: ['tier-turnkey', 'tier-ai-ecosystem']
  },
  {
    id: 'ip-telephony',
    name: 'IP-Телефония & Умная маршрутизация',
    category: 'core',
    price: 25000,
    timelineDays: 2,
    description: 'Подключение Sipuni / UIS / Mango: 100% запись звонков, авто-создание сделки при входящем, всплывающая карточка клиента и привязка постоянного клиента к персональному менеджеру.',
    impact: '0% пропущенных звонков в рабочие и нерабочие часы',
    iconName: 'PhoneCall',
    defaultInTiers: ['tier-express', 'tier-turnkey', 'tier-ai-ecosystem']
  },
  {
    id: 'messengers-hub',
    name: 'Омниканальный хаб мессенджеров',
    category: 'core',
    price: 22000,
    timelineDays: 2,
    description: 'Синхронизация WhatsApp Business API, официальных Telegram-ботов, сообщений сообществ VK и Avito в едином окне amoCRM без риска блокировки номеров.',
    impact: 'Вся переписка менеджеров сохраняется в сделке',
    iconName: 'MessageSquare',
    defaultInTiers: ['tier-express', 'tier-turnkey', 'tier-ai-ecosystem']
  },
  {
    id: 'contract-pipeline',
    name: 'Воронка повторных продаж & LTV для услуг',
    category: 'core',
    price: 26000,
    timelineDays: 3,
    description: 'Автоматический digital-пайплайн продления договоров, допродаж и контроля регулярных оплат (subscription / retainer) без ручного контроля менеджеров.',
    impact: '+30% к повторным обращениям и LTV клиентов',
    iconName: 'TrendingUp',
    defaultInTiers: ['tier-ai-ecosystem']
  },
  {
    id: 'speech-analytics',
    name: 'Речевая аналитика & Контроль скриптов',
    category: 'analytics',
    price: 24000,
    timelineDays: 2,
    description: 'Транскрибация звонков в текст, автоматический поиск запрещенных стоп-слов, контроль соблюдения скрипта и мгновенный алерт РОПу при риске конфликта с клиентом.',
    impact: 'Автоматический аудит 100% звонков вместо выборочного',
    iconName: 'Mic',
    defaultInTiers: ['tier-ai-ecosystem']
  },
  {
    id: 'team-training',
    name: 'Тренинг отдела продаж & Видео-регламенты',
    category: 'support',
    price: 19000,
    timelineDays: 2,
    description: 'Живое практическое обучение менеджеров и РОПа на реальных кейсах вашей компании, запись персональных видео-инструкций и аттестационное тестирование сотрудников.',
    impact: 'Команда начинает работать в системе без сопротивления',
    iconName: 'GraduationCap',
    defaultInTiers: ['tier-turnkey', 'tier-ai-ecosystem']
  },
  {
    id: 'document-auto',
    name: 'Авто-генерация КП, счетов и договоров',
    category: 'core',
    price: 15000,
    timelineDays: 1,
    description: 'Формирование коммерческих предложений в фирменном стиле, счетов и договоров с факсимиле в формате PDF за 1 клик прямо из карточки сделки.',
    impact: 'Выставление счета за 30 секунд вместо 40 минут',
    iconName: 'FileText',
    defaultInTiers: ['tier-turnkey', 'tier-ai-ecosystem']
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier-express',
    title: 'Экспресс-Аудит и Быстрый Старт',
    basePrice: 49000,
    priceFormatted: 'от 49 000 ₽',
    timeline: '5–7 рабочих дней',
    timelineDays: 6,
    targetAudience: 'Команды до 3–5 менеджеров, первичный запуск CRM.',
    tagline: 'Идеально для первого наведения порядка и быстрого устранения узких мест.',
    features: [
      'Экспресс-аудит текущей воронки и выявление точек потерь',
      'Базовая настройка воронки amoCRM под специфику ниши',
      'Настройка карточек сделки, контактов и обязательных полей',
      'Интеграция с мессенджерами',
      'Подключение сбора заявок с сайта и других источников'
    ],
    deliverables: [
      'Карта процессов и настроенная воронка',
      'Интеграция каналов лидогенерации',
      'Видео-инструкции для сотрудников'
    ],
    defaultModuleIds: ['ip-telephony', 'messengers-hub'],
    support: '3 дня гарантийной поддержки после запуска',
    ctaText: 'Выбрать «Экспресс-Старт»'
  },
  {
    id: 'tier-turnkey',
    title: 'Комплексная Автоматизация «Под Ключ»',
    basePrice: 98000,
    priceFormatted: 'от 98 000 ₽',
    timeline: '10–14 рабочих дней',
    timelineDays: 12,
    popular: true,
    badge: 'ВЫБОР 75% КЛИЕНТОВ',
    targetAudience: 'Отделы продаж от 4 до 15 менеджеров, амбициозный рост выручки.',
    tagline: 'Флагманское решение: превращение отдела продаж в прозрачную масштабируемую систему.',
    features: [
      'Все возможности тарифа «Экспресс-Старт»',
      'Многоуровневая Digital-воронка (первичка, дожим, повторные продажи)',
      'Полная интеграция IP-телефонии: умные очереди, запись, коллтрекинг',
      'Все мессенджеры: WhatsApp*, Telegram, Max, VK, Avito',
      'Авто-генерация договоров и счетов по шаблону в 1 клик',
      'Настройка прав доступа (защита базы от копирования и увода)',
      'Автоматические триггеры дожима клиентов и уведомления РОПу о просрочках',
      'Интеграция сайта, квизов, лид-форм и рекламы с сохранением всех UTM'
    ],
    deliverables: [
      'Бесшовный омниканальный контур',
      'Система авто-генерации документов',
      'Регламенты и аттестация команды',
      'Дашборд показателей для собственника'
    ],
    defaultModuleIds: ['full-crm-integration', 'ip-telephony', 'messengers-hub', 'document-auto', 'team-training'],
    support: '5 дней гарантийной поддержки после запуска',
    ctaText: 'Заказать «Под Ключ»'
  },
  {
    id: 'tier-ai-ecosystem',
    title: 'AI-драйв Экосистема + Сквозная Аналитика',
    basePrice: 165000,
    priceFormatted: 'от 165 000 ₽',
    timeline: '14–21 рабочий день',
    timelineDays: 18,
    badge: 'МАКСИМАЛЬНЫЙ СТЕК ДЛЯ ЛИДЕРОВ',
    targetAudience: 'Средний и крупный бизнес, высокий трафик, жесткие требования к рентабельности.',
    tagline: 'Максимальный технологический стек для лидеров рынка и системных компаний.',
    features: [
      'Все возможности тарифа «Под Ключ»',
      'Разработка и внедрение умного ИИ-бота (24/7 продажи и квалификация)',
      'Обучение ИИ на базе знаний компании и скриптах лучших продавцов',
      'Сквозная аналитика (Roistat / BI-дашборды)',
      'Речевая аналитика звонков с контролем скриптов и триггерных слов',
      'Индивидуальный дашборд собственника со всеми KPI на одном экране'
    ],
    deliverables: [
      'Обученный ИИ-агент первого контакта',
      'Сквозной дашборд Roistat / BI',
      'Авто-воронка удержания и допродаж услуг',
      'Полный регламент ИИ-автоматизации'
    ],
    defaultModuleIds: ['full-crm-integration', 'ai-bot', 'advanced-analytics', 'ip-telephony', 'messengers-hub', 'contract-pipeline', 'speech-analytics', 'team-training', 'document-auto'],
    support: '7 дней гарантийной поддержки после запуска',
    ctaText: 'Запустить «AI-Экосистему»'
  }
];

export const AMO_LICENSES_DATA = {
  title: 'Официальные лицензии amoCRM & Сопровождение',
  description: 'Как сертифицированные архитекторы amoCRM мы предоставляем официальные тарифы без наценок с эксклюзивными бонусами от Leopard.',
  benefits: [
    { title: '+1 месяц всегда в подарок', desc: 'От интегратора Ильи Вахитова при покупке любого тарифа и любого периода' },
    { title: 'До +6 месяцев от amoCRM', desc: 'Официальные подарки вендора при оплате на 9 мес (+1), 1 год (+2) или 2 года (+6)' },
    { title: 'Аудит перед продлением', desc: 'Бесплатная ревизия интеграций и очистка базы от дублей' },
    { title: 'Оплата по безналичному расчету', desc: 'Полный пакет закрывающих документов для бухгалтерии (ИП Вахитов И.В.)' }
  ],
  supportPlans: [
    { name: 'Базовый мониторинг', price: 'от 12 000 ₽/мес', desc: 'Контроль стабильности интеграций, виджетов и консультации РОПа' },
    { name: 'Бизнес-архитектор', price: 'от 28 000 ₽/мес', desc: 'Непрерывное развитие воронок, донастройка роботов, аналитические отчеты' }
  ]
};

