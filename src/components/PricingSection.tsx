import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRICING_TIERS, SERVICE_MODULES, AMO_LICENSES_DATA } from '../data/pricing';
import { PricingTier, ServiceModule } from '../types';
import { 
  CreditCard, 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Gift, 
  Zap,
  Bot,
  BarChart3,
  Layers,
  PhoneCall,
  MessageSquare,
  Database,
  Mic,
  GraduationCap,
  FileText,
  Plus,
  RotateCcw,
  Sliders,
  CheckCircle2,
  CheckSquare,
  Square,
  Flame,
  TrendingUp,
  Crown
} from 'lucide-react';
import { sound } from '../utils/sound';

interface PricingSectionProps {
  onOpenAudit: (
    source?: string, 
    tierOrData?: string | { tierTitle: string; modules: string[]; totalPrice: number }
  ) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenAudit }) => {
  const [viewMode, setViewMode] = useState<'tiers' | 'configurator'>('tiers');
  const [selectedBaseTierId, setSelectedBaseTierId] = useState<string>('tier-turnkey');
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>(() => {
    const defaultTier = PRICING_TIERS.find((t) => t.id === 'tier-turnkey');
    return defaultTier ? defaultTier.defaultModuleIds : [];
  });

  // Interactive License Calculator States
  // Rates: Basic = 599, Extended = 1299, Pro = 1799
  // Duration: 6, 9, 12, 24 months
  // Integrator always gives +1 month gift
  // amoCRM gifts:
  // 6 mo: 0 gift from amo -> client gets 6+1=7 mo, pays for 6 mo
  // 9 mo: +1 mo from amo -> client gets 9+1=10 mo, pays for 8 mo (599*8=4792, 1299*8=10392, 1799*8=14392)
  // 12 mo (1 yr): +2 mo from amo -> client gets 12+1=13 mo, pays for 10 mo (599*10=5990, 1299*10=12990, 1799*10=17990)
  // 24 mo (2 yrs): +6 mo from amo -> client gets 24+1=25 mo, pays for 18 mo (599*18=10782, 1299*18=23382, 1799*18=32382)
  const [licensePlan, setLicensePlan] = useState<'basic' | 'extended' | 'pro'>('extended');
  const [licenseUsers, setLicenseUsers] = useState<number>(5);
  const [licenseMonths, setLicenseMonths] = useState<6 | 9 | 12 | 24>(12);

  const planPricePerMonth = useMemo(() => {
    switch (licensePlan) {
      case 'basic': return 599;
      case 'extended': return 1299;
      case 'pro': return 1799;
    }
  }, [licensePlan]);

  // Billing months calculation:
  // 6 mo -> pay for 6
  // 9 mo -> pay for 8 (amo gives 1 mo discount/gift)
  // 12 mo -> pay for 10 (amo gives 2 mo discount/gift)
  // 24 mo -> pay for 18 (amo gives 6 mo discount/gift)
  const paidMonthsCount = useMemo(() => {
    switch (licenseMonths) {
      case 6: return 6;
      case 9: return 8;
      case 12: return 10;
      case 24: return 18;
      default: return 10;
    }
  }, [licenseMonths]);

  // Total months client actually receives: period + 1 month from integrator
  const totalReceivedMonths = useMemo(() => {
    return licenseMonths + 1; // +1 month from Ilya Vakhitov / Leopard on ANY plan
  }, [licenseMonths]);

  const giftMonthsAmo = useMemo(() => {
    switch (licenseMonths) {
      case 6: return 0;
      case 9: return 1;
      case 12: return 2;
      case 24: return 6;
    }
  }, [licenseMonths]);

  const calculatedLicenseTotal = useMemo(() => {
    return planPricePerMonth * licenseUsers * paidMonthsCount;
  }, [planPricePerMonth, licenseUsers, paidMonthsCount]);

  // Savings calculation compared to paying full months
  const standardNominalTotal = planPricePerMonth * licenseUsers * licenseMonths;
  const totalMoneySaved = standardNominalTotal - calculatedLicenseTotal + (planPricePerMonth * licenseUsers * 1); // amo discount + 1 mo free integrator value

  const customEasing = [0.16, 1, 0.3, 1];

  const currentBaseTier = useMemo(() => {
    return PRICING_TIERS.find((t) => t.id === selectedBaseTierId) || PRICING_TIERS[1];
  }, [selectedBaseTierId]);

  // Handle tier selection
  const handleSelectTier = (tierId: string) => {
    setSelectedBaseTierId(tierId);
    const tier = PRICING_TIERS.find((t) => t.id === tierId);
    if (tier) {
      setSelectedModuleIds(tier.defaultModuleIds);
    }
  };

  // Toggle individual module
  const handleToggleModule = (moduleId: string) => {
    setSelectedModuleIds((prev) => {
      if (prev.includes(moduleId)) {
        return prev.filter((id) => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  // Calculate real-time total price and timeline
  const { calculatedPrice, calculatedTimelineDays, selectedModulesList } = useMemo(() => {
    const selectedMods = SERVICE_MODULES.filter((m) => selectedModuleIds.includes(m.id));
    
    // Base tier calculations
    const baseTier = PRICING_TIERS.find((t) => t.id === selectedBaseTierId) || PRICING_TIERS[0];
    
    // Add extra modules that are not part of defaultBase
    const extraModules = selectedMods.filter((m) => !baseTier.defaultModuleIds.includes(m.id));
    const extraCost = extraModules.reduce((acc, m) => acc + m.price, 0);
    const extraDays = Math.ceil(extraModules.reduce((acc, m) => acc + m.timelineDays, 0) * 0.6);

    const total = baseTier.basePrice + extraCost;
    const days = baseTier.timelineDays + extraDays;

    return {
      calculatedPrice: total,
      calculatedTimelineDays: days,
      selectedModulesList: selectedMods
    };
  }, [selectedBaseTierId, selectedModuleIds]);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(val);
  };

  const renderModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return <Bot className="w-4 h-4" />;
      case 'BarChart3': return <BarChart3 className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'PhoneCall': return <PhoneCall className="w-4 h-4" />;
      case 'MessageSquare': return <MessageSquare className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Mic': return <Mic className="w-4 h-4" />;
      case 'GraduationCap': return <GraduationCap className="w-4 h-4" />;
      case 'FileText': return <FileText className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const handleOpenCustomAudit = () => {
    onOpenAudit('custom_configurator', {
      tierTitle: `${currentBaseTier.title} (Кастомная конфигурация)`,
      modules: selectedModulesList.map((m) => m.name),
      totalPrice: calculatedPrice
    });
  };

  const handleOpenTierDirect = (tier: PricingTier) => {
    onOpenAudit(`pricing_${tier.id}`, {
      tierTitle: tier.title,
      modules: tier.features,
      totalPrice: tier.basePrice
    });
  };

  const handleSwitchToCustomizerWithTier = (tierId: string) => {
    handleSelectTier(tierId);
    setViewMode('configurator');
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-[#060913]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEasing }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <CreditCard className="w-3.5 h-3.5 text-blue-400" />
            <span>Прозрачная стоимость без скрытых платежей</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: customEasing }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
          >
            Тарифы внедрения и{' '}
            <span className="text-blue-400">динамический калькулятор</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: customEasing }}
            className="mt-4 text-base text-slate-300"
          >
            Выберите один из 3 готовых тарифов или соберите кастомную конфигурацию модулей с расчетом стоимости в реальном времени.
          </motion.p>

          {/* Mode Switcher Buttons */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
            <button
              onClick={() => setViewMode('tiers')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                viewMode === 'tiers'
                  ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3 Готовых Тарифа</span>
            </button>
            <button
              onClick={() => setViewMode('configurator')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                viewMode === 'configurator'
                  ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Конфигуратор & Доп. Модули</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                Live
              </span>
            </button>
          </div>
        </div>

        {/* View Mode 1: 3 Pre-defined Tiers Cards */}
        {viewMode === 'tiers' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: customEasing }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16"
          >
            {PRICING_TIERS.map((tier, idx) => {
              const isPopular = tier.popular;
              return (
                <motion.div
                  key={tier.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                    isPopular
                      ? 'bg-[#0b1226] border-2 border-blue-400 shadow-2xl shadow-blue-500/25 scale-[1.02] z-10'
                      : 'bg-[#090e1c] border border-white/[0.08] hover:border-blue-500/40'
                  }`}
                >
                  {/* Popular / Crown Badge */}
                  {tier.badge && (
                    <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white font-extrabold text-xs uppercase tracking-wider shadow-md whitespace-nowrap flex items-center gap-1.5 ${
                      isPopular 
                        ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-black border border-amber-300 shadow-amber-500/30' 
                        : 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white'
                    }`}>
                      {isPopular && <Crown className="w-3.5 h-3.5 text-slate-950 fill-current" />}
                      <span>{tier.badge}</span>
                    </div>
                  )}

                  <div>
                    {/* Title & Price */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {tier.title}
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-display">
                        {tier.priceFormatted}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4 pb-4 border-b border-white/[0.08]">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>Срок реализации: {tier.timeline}</span>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {tier.tagline}
                    </p>

                    {/* Target Audience */}
                    {tier.targetAudience && (
                      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-slate-200 mb-6">
                        <span className="text-cyan-400 font-mono font-bold text-[11px] block mb-0.5 uppercase tracking-wider">
                          Для кого:
                        </span>
                        <span>{tier.targetAudience}</span>
                      </div>
                    )}

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block">
                        Что входит в пакет:
                      </span>
                      {tier.features.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[11px] text-slate-400 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{tier.support}</span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOpenTierDirect(tier)}
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                        isPopular
                          ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 border border-blue-400/40'
                          : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] hover:border-blue-400/40'
                      }`}
                    >
                      <span>{tier.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>

                    <button
                      onClick={() => handleSwitchToCustomizerWithTier(tier.id)}
                      className="w-full py-2 text-center text-[11px] text-blue-400/80 hover:text-blue-300 font-mono transition-colors"
                    >
                      + Настроить доп. модули к этому тарифу →
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* View Mode 2: Dynamic Service Modules Configurator */}
        {viewMode === 'configurator' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: customEasing }}
            className="mb-16 space-y-8"
          >
            {/* Step 1: Base Tier Preset Selector */}
            <div className="p-6 rounded-3xl bg-[#090e1c] border border-white/[0.08] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase font-bold text-blue-400 block mb-1">
                    Шаг 1: Выберите базовый тариф-основу
                  </span>
                  <p className="text-xs text-slate-400">
                    Базовый тариф определяет основной каркас архитектуры и стартовый набор модулей.
                  </p>
                </div>
                
                <button
                  onClick={() => handleSelectTier(selectedBaseTierId)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs text-slate-300 border border-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                  <span>Сбросить модули к стандарту</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PRICING_TIERS.map((t) => {
                  const isSelected = selectedBaseTierId === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTier(t.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-blue-500/15 border-blue-400 ring-1 ring-blue-400/40 shadow-lg shadow-blue-500/15'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{t.title}</span>
                        <span className="text-xs font-mono font-bold text-blue-400">{t.priceFormatted}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{t.tagline}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Interactive Modules Selection Grid & Real-time Live Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Module Cards */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-blue-400">
                    Шаг 2: Добавьте или отключите сервисные модули ({selectedModuleIds.length} выбрано):
                  </span>
                </div>

                <div className="space-y-3">
                  {SERVICE_MODULES.map((mod) => {
                    const isSelected = selectedModuleIds.includes(mod.id);
                    const isBaseDefault = currentBaseTier.defaultModuleIds.includes(mod.id);

                    return (
                      <div
                        key={mod.id}
                        onClick={() => handleToggleModule(mod.id)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-[#0d162d] border-blue-400/50 shadow-md shadow-blue-500/15'
                            : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center shrink-0 transition-all ${
                            isSelected ? 'bg-blue-500 text-white' : 'border border-white/20 text-transparent'
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                                {renderModuleIcon(mod.iconName)}
                                {mod.name}
                              </span>
                              {isBaseDefault && (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                                  Входит в базовый тариф
                                </span>
                              )}
                              {!isBaseDefault && isSelected && (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 font-mono border border-blue-500/30">
                                  Доп. опция (+{formatPrice(mod.price)})
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                              {mod.description}
                            </p>
                            <div className="flex items-center gap-3 pt-1 text-[11px]">
                              <span className="text-cyan-400 font-medium">
                                Эффект: {mod.impact}
                              </span>
                              <span className="text-slate-500 font-mono">
                                +{mod.timelineDays} дн.
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="sm:text-right shrink-0 pl-8 sm:pl-0">
                          <div className="text-sm font-mono font-extrabold text-blue-400">
                            {formatPrice(mod.price)}
                          </div>
                          <span className={`text-[10px] font-mono block ${
                            isSelected ? 'text-emerald-400' : 'text-slate-500'
                          }`}>
                            {isSelected ? '✓ Подключен' : '+ Добавить'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Live Price & Timeline Recalculation Sticky Card */}
              <div className="lg:col-span-4 sticky top-28">
                <div className="p-6 rounded-3xl bg-gradient-to-b from-[#0c152b] to-[#070c1a] border border-blue-500/40 shadow-2xl shadow-black/80 space-y-6">
                  
                  {/* Header */}
                  <div className="border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Итоговый расчет проекта</span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      {currentBaseTier.title} + {selectedModuleIds.length} модулей
                    </h4>
                  </div>

                  {/* Real-time Dynamic Total */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">
                      Итоговая инвестиция в автоматизацию:
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-display">
                      {formatPrice(calculatedPrice)}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>Срок под ключ: ~{calculatedTimelineDays} рабочих дней</span>
                    </div>
                  </div>

                  {/* Selected Modules Checklist */}
                  <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                    <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block">
                      Состав вашего комплекса ({selectedModulesList.length}):
                    </span>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {selectedModulesList.map((m) => (
                        <div key={m.id} className="flex items-center justify-between text-xs text-slate-200">
                          <span className="truncate pr-2">• {m.name.split('(')[0]}</span>
                          <span className="text-blue-300 font-mono text-[11px] shrink-0">
                            {formatPrice(m.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projected Payback */}
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Расчетная окупаемость: 14–25 дней</span>
                    </div>
                    <p className="text-[11px] text-emerald-400/80">
                      За счет мгновенного ответа лидам и ликвидации потерь заявок в мессенджерах.
                    </p>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOpenCustomAudit}
                    className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-extrabold text-xs shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2 border border-blue-400/30"
                  >
                    <span>Заказать сконфигурированный комплекс</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Фиксированная смета в официальном договоре</span>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* amoCRM Official Licenses & Interactive Calculator Box - Visually Distinct Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: customEasing }}
          className="rounded-3xl bg-gradient-to-b from-[#0c1633] via-[#091026] to-[#070c1c] border-2 border-cyan-500/30 p-6 sm:p-10 shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] space-y-10 relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0" />

          {/* Official Partner Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold mb-2">
                <Gift className="w-3.5 h-3.5 text-cyan-400" />
                <span>ОФИЦИАЛЬНЫЙ СЕРТИФИЦИРОВАННЫЙ ПАРТНЕР AMOCRM</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Калькулятор лицензий amoCRM + Бонусы Leopard
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Актуальные официальные тарифы amoCRM с подарками: <strong className="text-cyan-300 font-semibold">+1 месяц всегда в подарок от Ильи Вахитова</strong> + до <strong className="text-emerald-300 font-semibold">+6 месяцев от amoCRM</strong>.
              </p>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold shrink-0 flex items-center gap-2 shadow-lg shadow-emerald-950/30">
              <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>+1 месяц в подарок от интегратора при любом тарифе</span>
            </div>
          </div>

          {/* Interactive Calculator Controls Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            <div className="lg:col-span-7 space-y-9">
              {/* 1. Tariff Plan Selector */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center border border-cyan-400/30">1</span>
                    <label className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Выберите тариф amoCRM:
                    </label>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-semibold">
                    Рекомендованный: Расширенный
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {[
                    { id: 'basic', name: 'Базовый', price: 599, desc: 'Для небольших команд и старта в услугах' },
                    { id: 'extended', name: 'Расширенный', price: 1299, desc: 'Digital-пайплайн, авто-задачи и роботы', isPopular: true },
                    { id: 'pro', name: 'Профессиональный', price: 1799, desc: 'Полный функционал, скоринг, защита и мониторинг' },
                  ].map((plan) => {
                    const isSelected = licensePlan === plan.id;
                    return (
                      <button
                        key={plan.id}
                        onClick={() => {
                          sound.playClick(500, 0.03);
                          setLicensePlan(plan.id as 'basic' | 'extended' | 'pro');
                        }}
                        className={`p-4 rounded-2xl text-left border transition-all relative flex flex-col justify-between ${
                          isSelected 
                            ? 'bg-cyan-950/50 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50' 
                            : 'bg-black/40 border-white/[0.08] hover:border-white/20'
                        }`}
                      >
                        {plan.isPopular && (
                          <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                            Хит продаж
                          </span>
                        )}
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-white truncate">{plan.name}</span>
                            <span className="text-xs font-mono text-cyan-300 font-bold whitespace-nowrap">{plan.price} ₽/мес</span>
                          </div>
                          <span className="text-[11px] text-slate-300 block leading-tight">{plan.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Number of Users / Seats */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center border border-cyan-400/30">2</span>
                    <label className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Количество пользователей:
                    </label>
                  </div>
                  <span className="text-base sm:text-lg font-extrabold text-cyan-300 font-mono">
                    {licenseUsers} {licenseUsers === 1 ? 'пользователь' : licenseUsers < 5 ? 'пользователя' : 'пользователей'}
                  </span>
                </div>

                <div className="space-y-3">
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={licenseUsers}
                    onChange={(e) => {
                      sound.playClick(400 + Number(e.target.value) * 15, 0.02);
                      setLicenseUsers(Number(e.target.value));
                    }}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
                    <span>1 пользователь</span>
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                    <span>30+</span>
                  </div>
                </div>
              </div>

              {/* 3. Duration Period Selector (6, 9, 12, 24 months) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center border border-cyan-400/30">3</span>
                    <label className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Период оплаты лицензий:
                    </label>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Оплата за {paidMonthsCount} мес. → Доступ на {totalReceivedMonths} мес.
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 6 Months */}
                  <button
                    onClick={() => {
                      sound.playClick(460, 0.03);
                      setLicenseMonths(6);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      licenseMonths === 6
                        ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md ring-1 ring-cyan-400/40'
                        : 'bg-black/30 border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">6 месяцев</span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/20 px-1.5 py-0.5 rounded font-bold">
                        +1 мес. от нас
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1">
                      Оплата за 6 мес. → итог <strong>7 месяцев</strong> работы
                    </div>
                  </button>

                  {/* 9 Months */}
                  <button
                    onClick={() => {
                      sound.playClick(500, 0.03);
                      setLicenseMonths(9);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      licenseMonths === 9
                        ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md ring-1 ring-cyan-400/40'
                        : 'bg-black/30 border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">9 месяцев</span>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded font-bold">
                        +1 мес. амо + 1 от нас
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1">
                      Оплата за <strong>8 мес.</strong> → итог <strong>10 месяцев</strong>
                    </div>
                  </button>

                  {/* 1 Year / 12 Months - RECOMMENDED */}
                  <button
                    onClick={() => {
                      sound.playClick(580, 0.04);
                      setLicenseMonths(12);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all relative ${
                      licenseMonths === 12
                        ? 'bg-gradient-to-r from-blue-600/40 to-cyan-700/40 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/60'
                        : 'bg-black/30 border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="absolute -top-2.5 right-3 bg-emerald-500 text-slate-950 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
                      Рекомендуем
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">1 год (12 месяцев)</span>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded font-bold">
                        +2 мес. амо + 1 от нас
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1">
                      Оплата за <strong>10 мес.</strong> → итог <strong>13 месяцев</strong> работы
                    </div>
                  </button>

                  {/* 2 Years / 24 Months */}
                  <button
                    onClick={() => {
                      sound.playClick(640, 0.04);
                      setLicenseMonths(24);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      licenseMonths === 24
                        ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md ring-1 ring-cyan-400/40'
                        : 'bg-black/30 border-white/[0.08] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">2 года (24 месяца)</span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/20 px-1.5 py-0.5 rounded font-bold">
                        +6 мес. амо + 1 от нас
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1">
                      Оплата за <strong>18 мес.</strong> → итог <strong>25 месяцев</strong>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Calculated License Cost Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-black/50 border border-blue-500/30 space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase">Официальные лицензии:</span>
                  <div className="text-base font-bold text-white mt-0.5">
                    amoCRM {licensePlan === 'basic' ? '«Базовый»' : licensePlan === 'extended' ? '«Расширенный»' : '«Профессиональный»'}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-cyan-300 font-bold px-2.5 py-1 rounded bg-blue-500/20 border border-blue-400/30">
                    {totalReceivedMonths} мес. доступа
                  </span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="space-y-1 bg-white/[0.02] p-4 rounded-xl border border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase">К оплате:</span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    Оплачивается {paidMonthsCount} мес. вместо {licenseMonths}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-display">
                  {formatPrice(calculatedLicenseTotal)}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {licenseUsers} {licenseUsers === 1 ? 'пользователь' : 'пользователей'} × {formatPrice(planPricePerMonth)}/мес × {paidMonthsCount} оплачиваемых мес.
                </div>
              </div>

              {/* Bonus Breakdown summary */}
              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-1.5">
                <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ваши включенные бонусы:</span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>• Подарок от интегратора Leopard:</span>
                    <strong className="text-white">+1 месяц бесплатно</strong>
                  </div>
                  {giftMonthsAmo > 0 && (
                    <div className="flex items-center justify-between">
                      <span>• Скидка от amoCRM за период:</span>
                      <strong className="text-emerald-400">+{giftMonthsAmo} мес. в подарок</strong>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-1 mt-1 font-semibold">
                    <span className="text-slate-300">Фактический срок действия:</span>
                    <span className="text-cyan-300 font-mono font-bold">{totalReceivedMonths} месяцев</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Официальный счет amoCRM без скрытых наценок</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Бесплатный аудит базы перед продлением</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Полный пакет закрывающих документов для бухгалтерии</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  sound.playClick(600, 0.04);
                  onOpenAudit('licenses_calculator', {
                    tierTitle: `Лицензии amoCRM «${licensePlan === 'basic' ? 'Базовый' : licensePlan === 'extended' ? 'Расширенный' : 'Профессиональный'}» (${licenseUsers} польз., оплата за ${paidMonthsCount} мес. с доступом на ${totalReceivedMonths} мес.)`,
                    totalPrice: calculatedLicenseTotal
                  });
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-bold text-xs shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Оформить лицензии с бонусами</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
