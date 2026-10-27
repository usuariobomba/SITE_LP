import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Box, 
  Clock, 
  ArrowRight, 
  ChevronDown
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { trackEvent } from '../lib/analytics';
import { useIsMobile } from '../lib/useIsMobile';

// Static Approved Image Poster / Primary Fallback
const HERO_BG_IMAGE = "https://res.cloudinary.com/dqwkvuubt/image/upload/v1787781460/ChatGPT_Image_26_de_ago._de_2026_18_52_57_jnywhh.png";

// Local Web-Optimized MP4 (fast keyframes for smooth instant seeking + no audio)
const HERO_VIDEO_LOCAL = "/hero_video_optimized.mp4";

export default function Hero() {
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const reqAnimRef = useRef<number | null>(null);

  // =========================================================================
  // SCROLL-DRIVEN VIDEO PLAYBACK (SEEKING CONTROLADO PELO SCROLL)
  // A seção fica pinned/fixa na tela durante o scroll (250vh) e o vídeo avança
  // =========================================================================
  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;

    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.pause();

    const handleScroll = () => {
      if (!containerRef.current || !videoEl) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      
      if (totalScrollable <= 0) return;

      // Progresso 0 a 1 estritamente delimitado pela seção do Hero
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);

      const duration = videoEl.duration || 8;
      targetTimeRef.current = progress * duration;
    };

    // Loop a 60fps com interpolação suave
    let isRunning = true;
    const smoothScrubLoop = () => {
      if (!isRunning) return;
      if (videoEl && videoEl.duration && !videoEl.seeking) {
        const diff = targetTimeRef.current - videoEl.currentTime;
        if (Math.abs(diff) > 0.01) {
          videoEl.currentTime += diff * 0.3;
        }
      }
      reqAnimRef.current = requestAnimationFrame(smoothScrubLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    reqAnimRef.current = requestAnimationFrame(smoothScrubLoop);

    return () => {
      isRunning = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (reqAnimRef.current) {
        cancelAnimationFrame(reqAnimRef.current);
      }
    };
  }, [shouldReduceMotion, isMobile, videoLoaded]);

  const handleLoadedMetadata = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleScrollToDiagnosis = () => {
    trackEvent({
      name: 'hero_cta_click',
      params: { cta_type: 'diagnosis', label: 'DESCOBRIR ONDE ESTOU PERDENDO TEMPO' }
    });
    const el = document.querySelector('#diagnostico') || document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToProblem = () => {
    const el = document.querySelector('#problem');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${
        isMobile || shouldReduceMotion ? 'h-auto' : 'h-[250vh]'
      }`}
    >
      {/* Viewport Pinned/Sticky: a tela permanece fixa enquanto o usuário rola */}
      <section 
        id="hero"
        className={`${
          isMobile || shouldReduceMotion 
            ? 'relative min-h-[100dvh]' 
            : 'sticky top-0 h-screen'
        } w-full bg-[#050607] text-[#F0EEE8] overflow-hidden flex flex-col justify-between pt-20 pb-8 px-5 sm:px-8 lg:px-14 select-none z-10`}
      >
        {/* =========================================================================
            1. CINEMATIC BACKGROUND LAYER (VÍDEO LOCAL CONTROLADO POR SCROLL)
            ========================================================================= */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          
          {/* Static Image Poster / Primary Mobile Asset & Instant Fallback */}
          <img
            src={HERO_BG_IMAGE}
            alt="Ampulheta Neon e Engenharia de Processos"
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover ${
              isMobile ? 'object-[74%_48%]' : 'object-[65%_50%]'
            } filter brightness-95 contrast-105 transition-opacity duration-500 ${
              !isMobile && videoLoaded && !shouldReduceMotion ? 'opacity-0' : 'opacity-85'
            }`}
          />

          {/* Veo 3.1 Local Video (Desktop Only, seek sincronizado com o scroll) */}
          {!isMobile && !shouldReduceMotion && (
            <video
              ref={videoRef}
              src={HERO_VIDEO_LOCAL}
              muted
              playsInline
              preload="auto"
              poster={HERO_BG_IMAGE}
              onLoadedMetadata={handleLoadedMetadata}
              onLoadedData={() => setVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover object-[65%_50%] filter brightness-95 contrast-105 transition-opacity duration-500 ${
                videoLoaded ? 'opacity-85' : 'opacity-0'
              }`}
            />
          )}

          {/* Seamless Blend Gradients: transição suave e escurecimento do lado esquerdo para a copy */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050607] via-[#050607]/80 to-transparent lg:w-[60%]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050607] via-[#050607]/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050607] via-[#050607]/85 to-transparent" />

          {/* Controlled Ambient Acid-Green Glow behind the hourglass */}
          <div className="absolute top-1/2 right-[12%] lg:right-[20%] -translate-y-1/2 w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] bg-[#B7FF00]/14 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* =========================================================================
            2. FOREGROUND HTML CONTENT (PRESERVED AESTHETIC & LEGIBILITY)
            ========================================================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center py-6 sm:py-10">
          <div className="w-full max-w-2xl flex flex-col space-y-4 sm:space-y-6 text-left">
            
            {/* Eyebrow Chip */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0E12]/85 border border-[#B7FF00]/30 backdrop-blur-md w-fit shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#B7FF00] animate-pulse" />
              <span className="font-tech text-[9.5px] sm:text-[11px] text-[#B7FF00] uppercase tracking-widest font-bold">
                IA APLICADA A PROCESSOS REAIS
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-impact uppercase tracking-tight text-white leading-[0.86]"
              style={{ fontSize: 'clamp(3.3rem, 7.5vw, 6.8rem)' }}
            >
              <span className="block text-white font-black">
                SEU TEMPO,
              </span>
              <span 
                className="block text-[#B7FF00] font-marker normal-case tracking-normal text-[1.05em] mt-1 sm:mt-2 drop-shadow-[0_0_35px_rgba(183,255,0,0.65)] transform -rotate-1 origin-left"
              >
                DE VOLTA.
              </span>
            </motion.h1>

            {/* Subheadline with Bold Highlights */}
            <motion.p 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="font-sans text-[15px] sm:text-lg lg:text-[19px] text-[#C4C7CB] leading-relaxed max-w-xl"
            >
              Encontro processos que consomem horas da sua empresa e desenvolvo sistemas, agentes e automações com IA para simplificar a operação, eliminar trabalho manual e devolver tempo.
            </motion.p>

            {/* 3 Step Micro Strip */}
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="grid grid-cols-3 divide-x divide-[#1F2630] rounded-xl bg-[#0B0E12]/90 border border-[#1F2630] py-2.5 px-2 backdrop-blur-md max-w-lg shadow-md"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2">
                <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full border border-[#B7FF00]/60 bg-[#B7FF00]/10 flex items-center justify-center shrink-0">
                  <Search className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#B7FF00]" />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="font-tech font-bold text-[9.5px] sm:text-[11px] text-white uppercase tracking-wider">
                    IDENTIFICO
                  </span>
                  <span className="font-tech text-[7.5px] sm:text-[9px] text-[#8C9094] uppercase tracking-wider mt-0.5">
                    01
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2">
                <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full border border-[#B7FF00]/60 bg-[#B7FF00]/10 flex items-center justify-center shrink-0">
                  <Box className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#B7FF00]" />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="font-tech font-bold text-[9.5px] sm:text-[11px] text-white uppercase tracking-wider">
                    CRIO
                  </span>
                  <span className="font-tech text-[7.5px] sm:text-[9px] text-[#8C9094] uppercase tracking-wider mt-0.5">
                    02
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2">
                <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full border border-[#B7FF00]/60 bg-[#B7FF00]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#B7FF00]" />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="font-tech font-bold text-[9.5px] sm:text-[11px] text-white uppercase tracking-wider">
                    DEVOLVO
                  </span>
                  <span className="font-tech text-[7.5px] sm:text-[9px] text-[#8C9094] uppercase tracking-wider mt-0.5">
                    03
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Primary High-Impact CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="pt-2 sm:pt-3 flex flex-col items-start gap-2.5 w-full max-w-md"
            >
              <button
                type="button"
                onClick={handleScrollToDiagnosis}
                className="w-full h-[52px] sm:h-[58px] px-6 sm:px-8 inline-flex items-center justify-center gap-3 bg-[#B7FF00] hover:bg-[#D4FF55] text-[#050607] font-tech font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-200 shadow-[0_0_35px_rgba(183,255,0,0.4)] hover:shadow-[0_0_55px_rgba(183,255,0,0.65)] active:scale-[0.98] cursor-pointer text-center"
              >
                <span>DESCOBRIR ONDE ESTOU PERDENDO TEMPO</span>
                <ArrowRight className="w-4 h-4 text-[#050607] stroke-[3]" />
              </button>

              <p className="font-tech text-[9.5px] sm:text-[10.5px] text-[#787D83] uppercase tracking-widest">
                DIAGNÓSTICO DIRETO COM LUCAS // SEM COMPROMISSO
              </p>
            </motion.div>

          </div>
        </div>

        {/* =========================================================================
            3. BOTTOM SCROLL INDICATOR & SCRUB PROGRESS
            ========================================================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pt-2 border-t border-[#1F2630]/60">
          <button
            type="button"
            onClick={handleScrollToProblem}
            className="group inline-flex items-center gap-2 font-tech text-[10px] sm:text-[11px] text-[#787D83] hover:text-[#B7FF00] uppercase tracking-widest transition-colors cursor-pointer"
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#B7FF00] group-hover:translate-y-0.5 transition-transform" />
            <span>Role para avançar a transformação do tempo</span>
          </button>

          {!isMobile && !shouldReduceMotion && (
            <div className="hidden sm:flex items-center gap-3">
              <span className="font-tech text-[9px] text-[#787D83] uppercase tracking-widest">
                FLUXO DE TEMPO
              </span>
              <div className="w-24 h-1 bg-[#1F2630] rounded-full overflow-hidden">
                <div 
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  className="h-full bg-[#B7FF00] shadow-[0_0_6px_#B7FF00] transition-all duration-75"
                />
              </div>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}
