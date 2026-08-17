import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardCheck, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Zap,
  ShieldAlert,
  Send,
  Users
} from 'lucide-react';
import { sound } from '../utils/sound';

interface AuditQuizProps {
  onOpenAudit: (source?: string, payload?: { quizScore: number; answersSummary: string }) => void;
}

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    text: string;
    points: number; // 0 to 25
    desc: string;
  }[];
}

export const AuditQuiz: React.FC<AuditQuizProps> = ({ onOpenAudit }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const customEasing = [0.16, 1, 0.3, 1];

  const questions: Question[] = [
    {
      id: 1,
      question: 'Сколько сотрудников обрабатывают заявки и общаются с клиентами?',
      subtitle: 'Размер команды влияет на сложность регламентов и риск потерь сделок',
      options: [
        { text: '1–2 сотрудника (или я сам)', points: 10, desc: 'Высокая личная вовлеченность, но рутина съедает все рабочее время' },
        { text: '3–6 менеджеров', points: 15, desc: 'Критическая зона: начинаются забытые звонки и споры за лидов' },
        { text: '7–15 менеджеров + РОП', points: 20, desc: 'Необходим жесткий digital-пайплайн, авто-задачи и прозрачный контроль' },
        { text: 'Более 15 сотрудников', points: 25, desc: 'Масштабный отдел: любая задержка на 5 минут стоит миллионов рублей' }
      ]
    },
    {
      id: 2,
      question: 'Как сейчас фиксируются звонки и переписки в мессенджерах?',
      subtitle: 'Ключевой фактор защиты клиентской базы от увода при смене сотрудников',
      options: [
        { text: 'Менеджеры звонят и пишут с личных телефонов', points: 0, desc: 'Критический риск: 100% базы может уйти вместе с сотрудником' },
        { text: 'Есть общая SIM-карта или рабочий WhatsApp на одном телефоне', points: 8, desc: 'Очередь из менеджеров, пропущенные сообщения и отсутствие истории' },
        { text: 'Телефония подключена, но WhatsApp ведется отдельно', points: 15, desc: 'Половина ключевых договоренностей не попадает в CRM' },
        { text: '100% звонков с записью и официальный WhatsApp в CRM', points: 25, desc: 'Идеальная прозрачность: каждый диалог сохраняется в карточке' }
      ]
    },
    {
      id: 3,
      question: 'За сколько минут в среднем ваш отдел связывается с новой заявкой?',
      subtitle: 'Скорость первого контакта определяет до 60% вероятности закрытия сделки',
      options: [
        { text: 'Более 1–2 часов (или на следующий день)', points: 2, desc: 'До 70% клиентов за это время уже выбирают предложение конкурентов' },
        { text: 'От 20 до 60 минут', points: 10, desc: 'Клиент успевает оставить еще 3–4 заявки на других сайтах' },
        { text: 'От 5 до 15 минут в рабочее время', points: 18, desc: 'Хороший показатель, но ночью и на выходных заявки простаивают' },
        { text: 'Меньше 1 минуты (или ИИ-бот 24/7 отвечает за 15 секунд)', points: 25, desc: 'Максимальный захват: клиент получает мгновенный отклик и бриф' }
      ]
    },
    {
      id: 4,
      question: 'Как формируются коммерческие предложения, договоры и счета?',
      subtitle: 'Скорость выставления документов в услугах напрямую ускоряет оплату',
      options: [
        { text: 'Вручную в Word / Excel (тратим по 30–50 минут на каждый)', points: 0, desc: 'Высокий риск ошибок в реквизитах и потеря драгоценного времени' },
        { text: 'По шаблонным файлам копированием реквизитов', points: 10, desc: 'Частые опечатки, смена менеджера ломает форматирование' },
        { text: 'Авто-генерация в CRM по кнопке за 30 секунд в PDF', points: 25, desc: 'Клиент получает готовый договор со сметой прямо во время разговора' }
      ]
    }
  ];

  const handleSelectOption = (points: number, optionText: string) => {
    sound.playClick(520 + currentStep * 80, 0.04);
    const updatedAnswers = [...answers, points];
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinished(true);
      sound.playSuccess();
    }
  };

  const handleReset = () => {
    sound.playClick(400, 0.03);
    setCurrentStep(0);
    setAnswers([]);
    setIsFinished(false);
  };

  const totalScore = answers.reduce((acc, curr) => acc + curr, 0);

  const getScoreData = (score: number) => {
    if (score < 40) {
      return {
        level: 'Критический уровень потерь (0–39%)',
        color: 'text-rose-400',
        badge: 'Срочный аудит',
        border: 'border-rose-500/30',
        bg: 'bg-rose-500/10',
        summary: 'Ваш бизнес теряет от 30% до 50% потенциальной выручки из-за человеческого фактора: долгого ответа, отсутствия единой базы переписок и ручных расчетов.'
      };
    } else if (score < 75) {
      return {
        level: 'Базовая автоматизация (40–74%)',
        color: 'text-amber-400',
        badge: 'Точки роста',
        border: 'border-amber-500/30',
        bg: 'bg-amber-500/10',
        summary: 'Основа продаж заложена, но сохраняются узкие места: мессенджеры вне CRM, медленная генерация КП и отсутствие ночного захвата лидов.'
      };
    } else {
      return {
        level: 'Высокая зрелость продаж (75–100%)',
        color: 'text-emerald-400',
        badge: 'Максимальный КПД',
        border: 'border-emerald-500/30',
        bg: 'bg-emerald-500/10',
        summary: 'Отличная дисциплина! Следующий уровень для вас — внедрение ИИ-агентов, предиктивной аналитики и тонкой докрутки конверсий.'
      };
    }
  };

  const scoreInfo = getScoreData(totalScore);

  return (
    <section id="quiz" className="py-24 relative overflow-hidden bg-[#070b14] border-b border-white/[0.08] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Экспресс-тест за 60 секунд</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
          >
            Индекс готовности отдела продаж к{' '}
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-fill-transparent text-cyan-400">
              масштабированию
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed"
          >
            Ответьте на 4 простых вопроса и мгновенно узнайте уязвимости вашей воронки с персональными рекомендациями.
          </motion.p>
        </div>

        {/* Quiz Card */}
        <div className="rounded-3xl bg-[#0a1024] border border-blue-500/20 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          {!isFinished ? (
            <div>
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-6 text-xs font-mono text-slate-400">
                <span>Вопрос {currentStep + 1} из {questions.length}</span>
                <span className="text-cyan-400 font-bold">{Math.round(((currentStep) / questions.length) * 100)}% пройдено</span>
              </div>
              
              <div className="w-full h-1.5 bg-white/[0.08] rounded-full mb-8 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {questions[currentStep].question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {questions[currentStep].subtitle}
                </p>
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {questions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.points, opt.text)}
                    className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-400/50 hover:bg-white/[0.06] text-left transition-all duration-200 group flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {opt.text}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {opt.desc}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: customEasing }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-mono font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Результат экспресс-диагностики</span>
              </div>

              <div>
                <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight">
                  {totalScore} <span className="text-2xl text-slate-300 font-sans">/ 100 баллов</span>
                </div>
                <div className={`text-base sm:text-lg font-bold mt-2 ${scoreInfo.color}`}>
                  {scoreInfo.level}
                </div>
              </div>

              <div className={`p-5 rounded-2xl ${scoreInfo.bg} border ${scoreInfo.border} text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl mx-auto text-left`}>
                {scoreInfo.summary}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    sound.playClick(600, 0.04);
                    onOpenAudit('quiz_result_cta', { 
                      quizScore: totalScore, 
                      answersSummary: `Индекс зрелости CRM: ${totalScore}/100 (${scoreInfo.level})` 
                    });
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Разобрать точки роста на аудите с Ильей</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 font-semibold text-xs border border-white/[0.08] transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Пройти заново</span>
                </button>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
