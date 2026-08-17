import React, { useState, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RolePains } from './components/RolePains';
import { ExpertSection } from './components/ExpertSection';
import { TelephonyMessengers } from './components/TelephonyMessengers';
import { AiBotSection } from './components/AiBotSection';
import { AmoPipelineSimulator } from './components/AmoPipelineSimulator';
import { RoiCalculator } from './components/RoiCalculator';
import { CaseStudies } from './components/CaseStudies';
import { BeforeAfterComparison } from './components/BeforeAfterComparison';
import { IntegrationFlowMap } from './components/IntegrationFlowMap';
import { AuditQuiz } from './components/AuditQuiz';
import { PricingSection } from './components/PricingSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { FaqSection } from './components/FaqSection';
import { ContactFooter } from './components/ContactFooter';
import { FloatingActions } from './components/FloatingActions';
import { LeftScrollProgress } from './components/LeftScrollProgress';

// Modals are loaded on demand (opened by user interaction) so the initial bundle stays small
const BotDemoSimulator = lazy(() => import('./components/BotDemoSimulator').then(m => ({ default: m.BotDemoSimulator })));
const AuditModal = lazy(() => import('./components/AuditModal').then(m => ({ default: m.AuditModal })));
const ImageGeneratorModal = lazy(() => import('./components/ImageGeneratorModal').then(m => ({ default: m.ImageGeneratorModal })));

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isBotDemoOpen, setIsBotDemoOpen] = useState<boolean>(false);
  const [isImageGenOpen, setIsImageGenOpen] = useState<boolean>(false);
  const [auditSource, setAuditSource] = useState<string>('hero');
  const [selectedTier, setSelectedTier] = useState<string | undefined>(undefined);
  const [calculatedLoss, setCalculatedLoss] = useState<{ monthlyLoss: number; annualGain: number } | undefined>(undefined);
  const [packageData, setPackageData] = useState<{ tierTitle: string; modules?: string[]; totalPrice?: number } | undefined>(undefined);

  const handleOpenAudit = (
    source = 'general',
    payload?: string | { monthlyLoss: number; annualGain: number } | { tierTitle: string; modules?: string[]; totalPrice?: number }
  ) => {
    setAuditSource(source);
    if (typeof payload === 'string') {
      setSelectedTier(payload);
      setCalculatedLoss(undefined);
      setPackageData(undefined);
    } else if (payload && typeof payload === 'object') {
      if ('monthlyLoss' in payload) {
        setCalculatedLoss(payload);
        setSelectedTier(undefined);
        setPackageData(undefined);
      } else if ('tierTitle' in payload) {
        setPackageData(payload);
        setSelectedTier(payload.tierTitle);
        setCalculatedLoss(undefined);
      }
    } else {
      setSelectedTier(undefined);
      setCalculatedLoss(undefined);
      setPackageData(undefined);
    }
    setIsAuditModalOpen(true);
  };

  const handleCloseAudit = () => {
    setIsAuditModalOpen(false);
  };

  const handleOpenBotDemo = () => {
    setIsBotDemoOpen(true);
  };

  const handleCloseBotDemo = () => {
    setIsBotDemoOpen(false);
  };

  const handleOpenImageGen = () => {
    setIsImageGenOpen(true);
  };

  const handleCloseImageGen = () => {
    setIsImageGenOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#060810] text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Top Fixed Header with Navigation and SLA */}
      <Header 
        onOpenAudit={() => handleOpenAudit('header_button')} 
        onOpenBotDemo={handleOpenBotDemo}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section with Holographic Parallax Scroll Animations & Interactive amoCRM Live Console */}
        <Hero 
          onOpenAudit={() => handleOpenAudit('hero_primary_cta')} 
          onOpenBotDemo={handleOpenBotDemo}
          onOpenImageGen={handleOpenImageGen}
        />

        {/* 2. Role-Based Diagnostic Pains Switcher */}
        <RolePains 
          onOpenAudit={() => handleOpenAudit('role_pains')}
        />

        {/* 2.1 Interactive Before vs After Architecture Comparison */}
        <BeforeAfterComparison 
          onOpenAudit={() => handleOpenAudit('before_after_comparison')}
        />

        {/* 3. Authoritative Expert Section: Ilya Vakhitov - Lead CRM Architect */}
        <ExpertSection 
          onOpenAudit={() => handleOpenAudit('expert_section')}
        />

        {/* 3.1 Live Service Data Flow Map (WABA, Telephony, CRM, AI) */}
        <IntegrationFlowMap 
          onOpenAudit={() => handleOpenAudit('integration_flow_map')}
        />

        {/* 4. Telephony, WhatsApp, Telegram, Avito Omnichannel Studio (Dark) */}
        <TelephonyMessengers 
          onOpenAudit={() => handleOpenAudit('telephony_messengers')}
        />

        {/* 5. Autonomous AI Sales Bots & Knowledge Base (Dark) */}
        <AiBotSection 
          onOpenBotDemo={handleOpenBotDemo}
          onOpenAudit={handleOpenAudit}
        />

        {/* 6. Interactive 6-Stage amoCRM Pipeline Simulator (Dark) */}
        <AmoPipelineSimulator 
          onOpenAudit={handleOpenAudit}
        />

        {/* 6.1 Interactive 60-second CRM Maturity Quiz */}
        <AuditQuiz 
          onOpenAudit={(src, payload) => handleOpenAudit(src, payload ? { tierTitle: payload.answersSummary, totalPrice: 0 } : undefined)}
        />

        {/* 7. Revenue Loss & ROI Calculator */}
        <RoiCalculator 
          onOpenAudit={(src, loss) => handleOpenAudit(src, loss)}
        />

        {/* 8. Multi-Filtered Case Studies with Metrics & Real Business Context */}
        <CaseStudies 
          onOpenAudit={handleOpenAudit}
        />

        {/* 9. Tariffs, amoCRM Licenses & Dynamic Module Configurator */}
        <PricingSection 
          onOpenAudit={(src, tier) => handleOpenAudit(src, tier)}
        />

        {/* 10. 6-Step Implementation Methodology Blueprint */}
        <ProcessTimeline 
          onOpenAudit={handleOpenAudit}
        />

        {/* 11. FAQ Accordion */}
        <FaqSection 
          onOpenAudit={handleOpenAudit}
        />
      </main>

      {/* 12. Footer with Business Credentials, Direct Telegram to Ilya & Audit Form */}
      <ContactFooter 
        onOpenAudit={handleOpenAudit}
      />

      {/* Global Modals & Interactive Overlays (lazy-loaded on demand) */}
      <Suspense fallback={null}>
        {isBotDemoOpen && (
          <BotDemoSimulator
            isOpen={isBotDemoOpen}
            onClose={handleCloseBotDemo}
            onOpenAudit={handleOpenAudit}
          />
        )}

        {isAuditModalOpen && (
          <AuditModal
            isOpen={isAuditModalOpen}
            onClose={handleCloseAudit}
            source={auditSource}
            tierTitle={selectedTier}
            lossData={calculatedLoss}
            packageData={packageData}
          />
        )}

        {isImageGenOpen && (
          <ImageGeneratorModal
            isOpen={isImageGenOpen}
            onClose={handleCloseImageGen}
          />
        )}
      </Suspense>

      {/* Floating Speed-Dial Contact and Demo Launcher */}
      <FloatingActions 
        onOpenAudit={handleOpenAudit}
        onOpenBotDemo={handleOpenBotDemo}
      />

      {/* Global Interactive Left Scroll Progress & Navigation Track */}
      <LeftScrollProgress />
    </div>
  );
}
