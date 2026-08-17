import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BOT_NICHES } from '../data/botSimData';
import { BotChatMessage, BotNicheConfig } from '../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  RotateCcw, 
  Flame, 
  ShieldCheck, 
  Phone, 
  MessageSquare,
  Building2,
  Package,
  Scale,
  GraduationCap,
  X,
  Sliders,
  ExternalLink
} from 'lucide-react';

interface BotDemoSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAudit: (source?: string) => void;
}

export const BotDemoSimulator: React.FC<BotDemoSimulatorProps> = ({
  isOpen,
  onClose,
  onOpenAudit
}) => {
  const [selectedNicheId, setSelectedNicheId] = useState<string>('construction');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [messages, setMessages] = useState<BotChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [leadPayload, setLeadPayload] = useState<Record<string, any>>({
    score: 85,
    status: 'Квалификация в процессе'
  });
  const [customInput, setCustomInput] = useState<string>('');
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentNiche: BotNicheConfig = 
    BOT_NICHES.find((n) => n.id === selectedNicheId) || BOT_NICHES[0];

  const getNicheIcon = (id: string) => {
    switch (id) {
      case 'construction': return Building2;
      case 'wholesale': return Package;
      case 'legal': return Scale;
      case 'edtech': return GraduationCap;
      default: return Bot;
    }
  };

  // Reset dialogue when niche changes or simulator opens
  useEffect(() => {
    if (!isOpen) return;
    resetDialogue(selectedNicheId);
  }, [selectedNicheId, isOpen]);

  const resetDialogue = (nicheId: string) => {
    const niche = BOT_NICHES.find((n) => n.id === nicheId) || BOT_NICHES[0];
    setCurrentStep(0);
    setLeadSubmitted(false);
    setLeadPayload({
      niche: niche.title,
      score: 75,
      status: 'Диалог начат'
    });

    const firstStep = niche.dialogueTree[0];
    setIsTyping(true);

    setTimeout(() => {
      setMessages([
        {
          id: 'msg-0',
          sender: 'bot',
          text: firstStep.botMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: firstStep.userOptions.map((o) => o.text)
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleUserChoice = (optionText: string) => {
    const currentStepConfig = currentNiche.dialogueTree[currentStep];
    const matchedOption = currentStepConfig?.userOptions.find((o) => o.text === optionText);

    // 1. Add user message
    const newMsg: BotChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: optionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);

    // 2. Update CRM lead state
    if (matchedOption?.leadValue) {
      setLeadPayload((prev) => ({
        ...prev,
        ...matchedOption.leadValue,
        score: Math.min(100, (prev.score || 70) + 10)
      }));
    }

    const nextStepIndex = currentStep + 1;

    // 3. Trigger Bot Response
    if (nextStepIndex < currentNiche.dialogueTree.length) {
      setCurrentStep(nextStepIndex);
      setIsTyping(true);

      setTimeout(() => {
        const nextConfig = currentNiche.dialogueTree[nextStepIndex];
        const botReply: BotChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: nextConfig.botMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: nextConfig.userOptions.map((o) => o.text)
        };
        setMessages((prev) => [...prev, botReply]);
        setIsTyping(false);
      }, 1000);
    } else {
      // Completed qualification!
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setLeadSubmitted(true);
        setLeadPayload((prev) => ({
          ...prev,
          status: 'Успешно квалифицирован · Передан в amoCRM',
          score: 98
        }));
        setMessages((prev) => [
          ...prev,
          {
            id: `system-${Date.now()}`,
            sender: 'system',
            text: '✨ Заявка успешно квалифицирована и зафиксирована в amoCRM! Карточка обновлена.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 900);
    }
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    handleUserChoice(customInput.trim());
    setCustomInput('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl my-auto rounded-3xl bg-[#090d18] border border-white/[0.12] shadow-2xl shadow-black/90 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    ИИ-Симулятор Квалификации Лидов 24/7
                  </h3>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Live Demo
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Выберите нишу и испытайте сценарий первого контакта с клиентом
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => resetDialogue(selectedNicheId)}
                title="Перезапустить диалог"
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] text-xs flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Сбросить</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.06] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 4 Niches Selector Bar */}
          <div className="px-6 py-3 border-b border-white/[0.06] bg-black/40 flex items-center gap-2 overflow-x-auto">
            {BOT_NICHES.map((niche) => {
              const Icon = getNicheIcon(niche.id);
              const isCurrent = selectedNicheId === niche.id;
              return (
                <button
                  key={niche.id}
                  onClick={() => setSelectedNicheId(niche.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-blue-500/20 border border-blue-400/40'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{niche.title}</span>
                </button>
              );
            })}
          </div>

          {/* Main Body: 2 Columns (Left: Chat Dialog / Right: Live amoCRM Card) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
            
            {/* Left: Chat Window */}
            <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.08] bg-[#070a13] h-[450px] lg:h-[540px]">
              
              {/* Top Chat Channel Info */}
              <div className="px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02] flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2 text-cyan-400 font-medium">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Шлюз: WhatsApp Business API / Telegram
                </span>
                <span className="font-mono text-[11px]">SLA ответа: &lt; 3 сек</span>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col ${
                      msg.sender === 'user' 
                        ? 'items-end' 
                        : msg.sender === 'system' 
                        ? 'items-center' 
                        : 'items-start'
                    }`}
                  >
                    {msg.sender === 'system' ? (
                      <div className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold text-center my-2 max-w-md">
                        {msg.text}
                      </div>
                    ) : (
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-br-none shadow-lg shadow-blue-500/15 border border-blue-400/30'
                            : 'bg-[#111728] border border-white/[0.08] text-slate-100 rounded-bl-none'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-70">
                          <span className="font-bold uppercase tracking-wider">
                            {msg.sender === 'user' ? 'Потенциальный клиент' : 'ИИ-Ассистент Leopard'}
                          </span>
                          <span className="font-mono">{msg.timestamp}</span>
                        </div>
                        <p>{msg.text}</p>
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#111728] border border-white/[0.08] w-fit text-slate-400 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 text-[11px] font-mono">ИИ печатает ответ...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Interactive Options Footer */}
              <div className="p-4 border-t border-white/[0.08] bg-[#090e1c] space-y-3">
                {/* Clickable Quick Reply Chips */}
                {!leadSubmitted && messages.length > 0 && messages[messages.length - 1]?.options && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Быстрый выбор ответа:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {messages[messages.length - 1].options?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleUserChoice(opt)}
                          className="px-3.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-200 border border-blue-500/30 text-xs font-semibold transition-all hover:scale-[1.02] text-left"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Free input form */}
                <form onSubmit={handleCustomSend} className="flex gap-2">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Напишите свой ответ или вопрос..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 border border-blue-400/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Отправить</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Live amoCRM Deal Card Preview */}
            <div className="lg:col-span-5 flex flex-col bg-[#080b15] p-5 sm:p-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                    Сделка amoCRM (Live Telemetry)
                  </h4>
                </div>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  LEO-AI-{selectedNicheId.toUpperCase()}
                </span>
              </div>

              {/* Deal Card Interior */}
              <div className="space-y-4">
                {/* Scoring Header */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">
                      Скоринг целевого лида
                    </span>
                    <span className="text-2xl font-black text-blue-400 font-display">
                      {leadPayload.score || 75} / 100
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Статус</span>
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      Горячий лид
                    </span>
                  </div>
                </div>

                {/* Auto Extracted Fields */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5 text-xs">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block mb-2">
                    Авто-извлеченные параметры:
                  </span>
                  
                  {Object.entries(leadPayload).map(([key, val]) => {
                    if (key === 'score') return null;
                    return (
                      <div key={key} className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                        <span className="text-slate-400 capitalize font-mono text-[11px]">{key}:</span>
                        <span className="font-semibold text-slate-100 max-w-[60%] text-right truncate">
                          {String(val)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Success Banner if Completed */}
                {leadSubmitted && (
                  <div className="p-4 rounded-2xl bg-blue-500/15 border border-blue-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <span>Лид готов к передаче сейлз-менеджеру!</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Сформировано резюме разговора, поставлена авто-задача «Перезвон за 30 сек», инициирован звонок через Sipuni.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAudit(`bot_demo_completed_${selectedNicheId}`);
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md border border-blue-400/30"
                    >
                      <span>Внедрить такой бот в свой бизнес</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Niche Info */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-xs text-slate-400 space-y-1">
                  <div className="font-bold text-slate-200">{currentNiche.title}</div>
                  <p>{currentNiche.description}</p>
                  <div className="text-blue-400 font-mono text-[11px] pt-1">
                    {currentNiche.metrics}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
