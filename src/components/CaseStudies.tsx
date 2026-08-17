import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CASE_STUDIES, 
  INDUSTRY_FILTERS, 
  PROBLEM_FILTERS 
} from '../data/cases';
import { CaseStudy, IndustryType, ProblemSolvedType } from '../types';
import { 
  Building2, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Quote, 
  ArrowRight, 
  Sparkles,
  Users,
  MapPin,
  Filter,
  RotateCcw,
  HeartPulse,
  HardHat,
  ShoppingBag,
  Briefcase,
  LayoutGrid,
  Search,
  Check,
  Play,
  Pause,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/sound';

interface CaseStudiesProps {
  onOpenAudit: (source?: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenAudit }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>('all');
  const [selectedProblem, setSelectedProblem] = useState<ProblemSolvedType>('all');
  const [activeCaseId, setActiveCaseId] = useState<string>(CASE_STUDIES[0].id);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  const customEasing = [0.16, 1, 0.3, 1];

  // Filtered case studies
  const filteredCases = useMemo(() => {
    return CASE_STUDIES.filter((c) => {
      const matchIndustry = selectedIndustry === 'all' || c.industryId === selectedIndustry;
      const matchProblem = selectedProblem === 'all' || c.problemSolved.includes(selectedProblem);
      return matchIndustry && matchProblem;
    });
  }, [selectedIndustry, selectedProblem]);

  // Auto-cycle through cases
  useEffect(() => {
    if (!isAutoPlay || filteredCases.length <= 1) return;
    const interval = setInterval(() => {
      setActiveCaseId((prevId) => {
        const currentIdx = filteredCases.findIndex((c) => c.id === prevId);
        const nextIdx = (currentIdx + 1) % filteredCases.length;
        return filteredCases[nextIdx].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay, filteredCases]);

  // Ensure activeCaseId points to a valid case from filtered list
  const currentCase = useMemo(() => {
    if (filteredCases.length === 0) return null;
    const found = filteredCases.find((c) => c.id === activeCaseId);
    return found || filteredCases[0];
  }, [filteredCases, activeCaseId]);

  const handleIndustryChange = (indId: IndustryType) => {
    sound.playClick(490, 0.02);
    setIsAutoPlay(false);
    setSelectedIndustry(indId);
    const newMatches = CASE_STUDIES.filter((c) => {
      const matchInd = indId === 'all' || c.industryId === indId;
      const matchProb = selectedProblem === 'all' || c.problemSolved.includes(selectedProblem);
      return matchInd && matchProb;
    });
    if (newMatches.length > 0) {
      setActiveCaseId(newMatches[0].id);
    }
  };

  const handleProblemChange = (probId: ProblemSolvedType) => {
    sound.playClick(510, 0.02);
    setIsAutoPlay(false);
    setSelectedProblem(probId);
    const newMatches = CASE_STUDIES.filter((c) => {
      const matchInd = selectedIndustry === 'all' || c.industryId === selectedIndustry;
      const matchProb = probId === 'all' || c.problemSolved.includes(probId);
      return matchInd && matchProb;
    });
    if (newMatches.length > 0) {
      setActiveCaseId(newMatches[0].id);
    }
  };

  const handleResetFilters = () => {
    sound.playClick(440, 0.02);
    setIsAutoPlay(false);
    setSelectedIndustry('all');
    setSelectedProblem('all');
    setActiveCaseId(CASE_STUDIES[0].id);
  };

  const renderIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-3.5 h-3.5" />;
      case 'HeartPulse': return <HeartPulse className="w-3.5 h-3.5" />;
      case 'HardHat': return <HardHat className="w-3.5 h-3.5" />;
      case 'Sparkles': return <Sparkles className="w-3.5 h-3.5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-3.5 h-3.5" />;
      case 'Briefcase': return <Briefcase className="w-3.5 h-3.5" />;
      default: return <LayoutGrid className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden bg-[#060913]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-blue-600/10 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <span>Оцифрованные результаты внедрения</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Кейсы внедрения amoCRM{' '}
            <span className="text-blue-400">по отраслям и задачам</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-3 text-base text-slate-300"
          >
            Изучите реальные проекты с окупаемостью от 12 до 21 дня и подтвержденными метриками роста выручки.
          </motion.p>
        </div>

        {/* Compact & Intuitive Filter Controls Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: customEasing }}
          className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 mb-8 shadow-lg space-y-3.5"
        >
          {/* Header Row of Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Быстрый фильтр кейсов
              </span>
              <span className="text-[11px] text-slate-400 ml-1">
                (показано: <strong className="text-cyan-400 font-bold">{filteredCases.length}</strong> из {CASE_STUDIES.length})
              </span>
            </div>

            {(selectedIndustry !== 'all' || selectedProblem !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-slate-400" />
                <span>Сбросить ({selectedIndustry !== 'all' ? 1 : 0} + {selectedProblem !== 'all' ? 1 : 0})</span>
              </button>
            )}
          </div>

          {/* Row 1: Compact Industry Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider mr-1 shrink-0">
              Отрасль:
            </span>
            {INDUSTRY_FILTERS.map((ind) => {
              const isActive = selectedIndustry === ind.id;
              const matchCount = ind.id === 'all' 
                ? CASE_STUDIES.length 
                : CASE_STUDIES.filter((c) => c.industryId === ind.id).length;

              return (
                <button
                  key={ind.id}
                  id={`filter-industry-${ind.id}`}
                  onClick={() => handleIndustryChange(ind.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {renderIndustryIcon(ind.icon)}
                  <span>{ind.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/40 text-white font-mono' : 'bg-black/30 text-slate-400 font-mono'
                  }`}>
                    {matchCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Row 2: Compact Problem Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/60">
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider mr-1 shrink-0">
              Задача:
            </span>
            {PROBLEM_FILTERS.map((prob) => {
              const isActive = selectedProblem === prob.id;
              const matchCount = prob.id === 'all'
                ? CASE_STUDIES.length
                : CASE_STUDIES.filter((c) => c.problemSolved.includes(prob.id)).length;

              return (
                <button
                  key={prob.id}
                  id={`filter-problem-${prob.id}`}
                  onClick={() => handleProblemChange(prob.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-slate-700 text-white font-bold shadow-sm border border-slate-500'
                      : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {isActive && <Check className="w-3 h-3 text-cyan-400" />}
                  <span>{prob.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/40 text-white font-mono' : 'bg-black/30 text-slate-400 font-mono'
                  }`}>
                    {matchCount}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Filtered Case Studies Selector: 3x3 (3 per row) Grid */}
        {filteredCases.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                  Выберите кейс для изучения:
                </span>
                {isAutoPlay && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Авто-показ
                  </span>
                )}
              </div>

              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={isAutoPlay ? 'Приостановить авто-показ' : 'Включить авто-показ'}
              >
                {isAutoPlay ? (
                  <Pause className="w-3.5 h-3.5 text-blue-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>

            {/* 3x3 / 3-column Grid for all Case Studies Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {filteredCases.map((c) => {
                const isSelected = currentCase?.id === c.id;
                return (
                  <motion.button
                    key={c.id}
                    id={`case-card-tab-${c.id}`}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      sound.playClick(520, 0.02);
                      setIsAutoPlay(false);
                      setActiveCaseId(c.id);
                    }}
                    className={`rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer group ${
                      isSelected
                        ? 'bg-slate-900 border-blue-500 shadow-xl ring-2 ring-blue-500/80'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    {/* Visual Card Image Preview */}
                    <div className="relative h-36 w-full overflow-hidden bg-slate-950">
                      <img 
                        src={c.image}
                        alt={c.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-white bg-black/70 px-2 py-0.5 rounded-lg border border-white/10 backdrop-blur-sm">
                          Кейс {c.number}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-500/30 backdrop-blur-sm">
                          Окупаемость {c.payback}
                        </span>
                      </div>

                      {/* Bottom Image Label */}
                      <div className="absolute bottom-2 left-2.5 right-2.5">
                        <span className="text-[10px] font-medium text-cyan-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/30 backdrop-blur-sm inline-block">
                          {c.industryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-white line-clamp-1 mb-1 group-hover:text-blue-300 transition-colors">
                          {c.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1 mb-3">
                          {c.client}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {c.duration}
                        </span>
                        <span className="text-xs font-bold text-blue-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                          {isSelected ? 'Открыт внизу' : 'Смотреть'}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Main Active Case Deep-Dive Showcase Card */}
            {currentCase && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCase.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: customEasing }}
                  className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl"
                >
                  {/* Top Case Hero Banner with Cinematic Image */}
                  <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                    <img
                      src={currentCase.image}
                      alt={currentCase.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center brightness-[0.6] contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                    
                    {/* Overlay Metadata */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-md">
                            {currentCase.industryLabel}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold">
                            {currentCase.problemSolvedLabel}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-black/70 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {currentCase.location}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-black/70 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1">
                            <Users className="w-3 h-3 text-slate-400" />
                            {currentCase.team}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                          {currentCase.title}
                        </h3>
                        <p className="text-sm font-semibold text-slate-300 mt-1">
                          {currentCase.client}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="px-4 py-2 rounded-2xl bg-black/80 border border-slate-700 backdrop-blur-md text-right">
                          <span className="text-[10px] text-slate-400 uppercase font-mono block">Срок внедрения</span>
                          <span className="text-sm font-bold text-white">{currentCase.duration}</span>
                        </div>
                        <div className="px-4 py-2 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 backdrop-blur-md text-right">
                          <span className="text-[10px] text-emerald-300 uppercase font-mono block">Окупаемость</span>
                          <span className="text-sm font-bold text-emerald-300">{currentCase.payback}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Case Details Body */}
                  <div className="p-6 sm:p-10 space-y-10">
                    
                    {/* Metrics Grid */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                          Оцифрованные результаты до и после внедрения:
                        </h4>
                        <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          Подтверждено заказчиком
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {currentCase.metrics.map((m) => (
                          <motion.div
                            key={m.label}
                            whileHover={{ y: -2 }}
                            className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
                          >
                            <span className="text-xs text-slate-400 line-clamp-2 mb-2">{m.label}</span>
                            <div>
                              <div className="flex items-center gap-1.5 text-xs text-rose-400 line-through">
                                {m.before}
                              </div>
                              <div className="text-lg font-black text-emerald-400 font-display mt-0.5">
                                {m.after}
                              </div>
                              {m.gain && (
                                <span className="inline-block mt-1 text-[10px] font-mono font-bold text-slate-200 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                                  {m.gain}
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* 2-Column: Problem vs Solution with Bullets */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      
                      {/* Problem Section */}
                      <div className="p-6 rounded-3xl bg-[#140b0f] border border-rose-500/25 space-y-4">
                        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Исходная проблема и точки слива бюджета:</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {currentCase.problem}
                        </p>
                        <ul className="space-y-2 pt-2 border-t border-rose-500/15">
                          {currentCase.problemBullets.map((b, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                              <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solution Section */}
                      <div className="p-6 rounded-3xl bg-[#09141f] border border-blue-500/30 space-y-4">
                        <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Внедренная архитектура Leopard:</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {currentCase.solution}
                        </p>
                        <ul className="space-y-2 pt-2 border-t border-slate-800">
                          {currentCase.solutionBullets.map((b, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                              <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* Client Quote Box */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800 relative">
                      <Quote className="w-8 h-8 text-slate-600 absolute top-4 right-6" />
                      <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed max-w-4xl">
                        «{currentCase.quote.text}»
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-white font-bold flex items-center justify-center text-sm shadow-md">
                          {currentCase.quote.author.charAt(0)}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-white block">
                            {currentCase.quote.author}
                          </span>
                          <span className="text-xs text-slate-400">
                            {currentCase.quote.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Case Action Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-white block">
                          Хотите аналогичный результат для компании в сфере «{currentCase.industryLabel}»?
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Подготовим индивидуальную карту воронки и расчет окупаемости за 24 часа.
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => onOpenAudit(`case_${currentCase.id}`)}
                        className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                      >
                        <span>Получить разбор кейса для своей ниши</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>

                  </div>

                </motion.div>
              </AnimatePresence>
            )}
          </>
        ) : (
          /* Empty Filter State */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center max-w-xl mx-auto space-y-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-300 mx-auto flex items-center justify-center">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">Кейсов по выбранным фильтрам пока нет</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Попробуйте выбрать другую отрасль или категорию решаемой проблемы, либо сбросьте фильтры для просмотра всей базы.
            </p>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Показать все кейсы</span>
            </motion.button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

