import React from 'react';
import { motion } from 'motion/react';
import { Check, Calendar, BarChart3, FileText } from 'lucide-react';

interface HourglassVisualProps {
  isMobile?: boolean;
}

const HERO_IMAGE_SRC = "https://res.cloudinary.com/dqwkvuubt/image/upload/v1787781460/ChatGPT_Image_26_de_ago._de_2026_18_52_57_jnywhh.png";

export default function HourglassVisual({ isMobile = false }: HourglassVisualProps) {
  return (
    <div 
      className="relative w-full flex items-center justify-center select-none overflow-visible"
      style={{
        minHeight: isMobile ? '320px' : '580px',
      }}
    >
      {/* Volumetric Green Glow & Atmosphere surrounding the image */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none ${
          isMobile 
            ? 'w-[280px] h-[280px] bg-[#B7FF00]/14 blur-[90px]' 
            : 'w-[520px] h-[520px] bg-[#B7FF00]/16 blur-[140px]'
        }`} 
      />
      <div 
        className={`absolute top-1/3 right-1/4 rounded-full pointer-events-none ${
          isMobile 
            ? 'w-[180px] h-[180px] bg-[#00E5FF]/6 blur-[70px]' 
            : 'w-[320px] h-[320px] bg-[#00E5FF]/8 blur-[100px]'
        }`} 
      />

      {/* Main Visual Container */}
      <div className={`relative w-full ${isMobile ? 'max-w-[390px]' : 'max-w-[760px]'} flex items-center justify-center`}>
        
        {/* The Exact Reference Background Asset with Masking & Blend */}
        <div className="relative w-full overflow-hidden rounded-2xl">
          <img
            src={HERO_IMAGE_SRC}
            alt="Ampulheta Neon e Fluxo de Automação de Dados"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_0_35px_rgba(183,255,0,0.18)]"
            style={{
              maskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 75%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 75%, transparent 100%)',
            }}
          />

          {/* Seamless Edge Blends into Deep Background (#050607) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050607] via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#050607] via-transparent to-[#050607] opacity-60" />
        </div>

        {/* ================= REFINED FLOATING INTERACTIVE HUD CARDS ================= */}

        {/* HUD 1 (Top Right): Rotina Ativa */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`absolute ${
            isMobile 
              ? 'top-[4%] right-[2%] p-2 max-w-[135px]' 
              : 'top-[6%] right-[3%] p-3 max-w-[190px]'
          } bg-[#0A0D10]/90 border border-[#B7FF00]/40 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-md z-20`}
        >
          <div className="flex items-center justify-between gap-1.5 border-b border-[#1C2228] pb-1 mb-1">
            <div className="flex items-center gap-1.5">
              <Calendar className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-[#B7FF00]`} />
              <span className="font-tech text-[8px] md:text-[9.5px] text-[#F0EEE8] font-bold uppercase tracking-wider">ROTINA ATIVA</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00] animate-pulse" />
          </div>
          <p className="font-tech text-[7.5px] md:text-[9px] text-[#9A9D9F] leading-tight">
            Execução: <span className="text-[#B7FF00] font-bold">100% Automática</span>
          </p>
        </motion.div>

        {/* HUD 2 (Bottom Right): Returned Hours Metric */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className={`absolute ${
            isMobile 
              ? 'bottom-[4%] right-[2%] p-2.5' 
              : 'bottom-[4%] right-[4%] p-3.5'
          } bg-[#0A0D10]/95 border border-[#B7FF00]/50 rounded-xl shadow-[0_12px_40px_rgba(183,255,0,0.2)] backdrop-blur-md z-20 flex items-center gap-2.5 md:gap-3`}
        >
          <div className={`${isMobile ? 'w-7 h-7' : 'w-9 h-9'} rounded-lg bg-[#B7FF00] flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(183,255,0,0.5)]`}>
            <BarChart3 className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'} text-[#050607]`} />
          </div>
          <div className="text-left">
            <span className={`font-impact ${isMobile ? 'text-sm' : 'text-lg'} text-[#F0EEE8] tracking-tight leading-none block`}>
              +4.5 HORAS
            </span>
            <span className={`font-tech ${isMobile ? 'text-[7.5px]' : 'text-[9px]'} text-[#B7FF00] font-bold uppercase tracking-wider block mt-0.5`}>
              DEVOLVIDAS POR DIA
            </span>
          </div>
        </motion.div>

        {/* Left Side: Floating Micro-Tag for Spreadsheet/Paper input */}
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [-4, -8, -4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute ${
            isMobile 
              ? 'top-[22%] left-[2%] p-1.5' 
              : 'top-[20%] left-[4%] p-2'
          } bg-[#0E1012]/95 border border-[#107C41]/80 text-white rounded-lg shadow-[0_6px_25px_rgba(16,124,65,0.4)] flex items-center gap-1.5 pointer-events-none z-20 backdrop-blur-md`}
        >
          <div className="w-3.5 h-3.5 rounded bg-[#107C41] flex items-center justify-center shrink-0">
            <FileText className="w-2 h-2 text-white" />
          </div>
          <span className="font-tech font-bold text-[8px] md:text-[10px] text-green-300">Planilha_v12.xlsx</span>
        </motion.div>

      </div>
    </div>
  );
}
