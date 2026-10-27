import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LiquidEther from './components/ui/LiquidEther';
import { RouterProvider, useRouter } from './lib/router';

// 5 Streamlined Landing Moments
const ProblemThesis = lazy(() => import('./components/ProblemThesis'));
const EvidenciasIA = lazy(() => import('./components/EvidenciasIA'));
const Projects = lazy(() => import('./components/Projects'));
const Process = lazy(() => import('./components/Process'));
const OperationalDiagnosis = lazy(() => import('./components/OperationalDiagnosis'));
const Contact = lazy(() => import('./components/Contact'));

// Chico Dedicated Pages (Public OAuth Verification Compliant)
const ChicoHome = lazy(() => import('./pages/ChicoHome'));
const ChicoPrivacidade = lazy(() => import('./pages/ChicoPrivacidade'));
const ChicoTermos = lazy(() => import('./pages/ChicoTermos'));

// Simple, non-blocking visual skeleton for progressive loading
function SectionPlaceholder() {
  return (
    <div className="w-full min-h-[40vh] flex items-center justify-center bg-transparent">
      <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-[#B7FF00]/50 animate-spin" />
    </div>
  );
}

function AppContent() {
  const { pathname } = useRouter();

  // Route 1: Chico Product Home (/chico)
  if (pathname === '/chico') {
    return (
      <div className="relative min-h-screen bg-[#050607] text-[#F0EEE8] font-sans antialiased selection:bg-[#B7FF00] selection:text-[#050607] overflow-x-clip w-full">
        <Header />
        <Suspense fallback={<SectionPlaceholder />}>
          <ChicoHome />
        </Suspense>
      </div>
    );
  }

  // Route 2: Chico Privacy Policy (/chico/privacidade)
  if (pathname === '/chico/privacidade') {
    return (
      <div className="relative min-h-screen bg-[#050607] text-[#F0EEE8] font-sans antialiased selection:bg-[#B7FF00] selection:text-[#050607] overflow-x-clip w-full">
        <Header />
        <Suspense fallback={<SectionPlaceholder />}>
          <ChicoPrivacidade />
        </Suspense>
      </div>
    );
  }

  // Route 3: Chico Terms of Service (/chico/termos)
  if (pathname === '/chico/termos') {
    return (
      <div className="relative min-h-screen bg-[#050607] text-[#F0EEE8] font-sans antialiased selection:bg-[#B7FF00] selection:text-[#050607] overflow-x-clip w-full">
        <Header />
        <Suspense fallback={<SectionPlaceholder />}>
          <ChicoTermos />
        </Suspense>
      </div>
    );
  }

  // Default: Main Lucas Prestes Landing Page
  return (
    <div className="relative min-h-screen bg-[#050607] text-[#F0EEE8] font-sans antialiased selection:bg-[#B7FF00] selection:text-[#050607] overflow-x-clip w-full">
      {/* Interactive Liquid Ether Fluid Simulation in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90">
        <LiquidEther
          colors={['#B7FF00', '#84CC16', '#10B981']}
          mouseForce={35}
          cursorSize={130}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.8}
          autoIntensity={3.0}
          takeoverDuration={0.25}
          autoResumeDelay={1500}
          autoRampDuration={0.6}
        />
      </div>

      {/* Fixed Header */}
      <Header />

      {/* Main One-Page Sections */}
      <main className="relative flex flex-col w-full bg-transparent">
        <div className="relative z-10 flex flex-col w-full">
          {/* 01 // Full-Screen Hero V2 (FROZEN & APPROVED) */}
          <Hero />

          {/* Progressively Loaded Content Moments */}
          <Suspense fallback={<SectionPlaceholder />}>
            {/* 02 // Problema + Tese */}
            <ProblemThesis />

            {/* 02.5 // Evidências IA */}
            <EvidenciasIA />

            {/* 03 // Provas Reais (Casos) */}
            <Projects />

            {/* 04 // Diagnóstico Interativo */}
            <OperationalDiagnosis />

            {/* 05 // Método & Princípios */}
            <Process />

            {/* 06 // Fechamento & Footer (Vamos Conversar?) */}
            <Contact />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
