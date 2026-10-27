import { useState } from 'react';
import { MessageSquare, ArrowRight, Check, Copy } from 'lucide-react';
import { contactInfo } from '../data';
import { portfolioAssets } from '../config/assets';
import { trackEvent } from '../lib/analytics';
import SiteFooter from './SiteFooter';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    trackEvent({ name: 'email_click', params: { source: 'copy_email' } });
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppClick = () => {
    trackEvent({ name: 'whatsapp_click', params: { source: 'contact_section' } });
  };

  const handleEmailDirectClick = () => {
    trackEvent({ name: 'email_click', params: { source: 'direct_mailto' } });
  };

  return (
    <section id="contact" className="relative overflow-hidden w-full bg-[#050607]/80 backdrop-blur-[2px]">
      
      {/* Contact Section: High Contrast, Compact, Atmospheric */}
      <div className="py-16 sm:py-20 md:py-28 text-center relative z-10">
        {/* Glowing atmospheric backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#B7FF00]/[0.045] rounded-full blur-[180px] pointer-events-none" />

        {/* Floating Animated Face Elements ("soltas pelo ar, maiores e dispersas com profundidade/blur") */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          
          {/* 1. Deep Background - Top Far Left (Blurred & Soft) */}
          <div className="absolute -top-4 -left-6 sm:top-2 sm:left-4 lg:left-12 w-20 sm:w-28 md:w-36 animate-float-2 transform -rotate-[22deg] opacity-50 blur-[4px]">
            <img
              src={portfolioAssets.footer[0]}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>

          {/* 2. Foreground Crisp - Top Left */}
          <div className="absolute top-2 left-2 sm:top-8 sm:left-12 lg:left-28 w-20 sm:w-28 md:w-36 lg:w-40 animate-float-1 transform -rotate-12 opacity-95">
            <img
              src={portfolioAssets.footer[1]}
              alt="Avatar 3D flutuante"
              referrerPolicy="no-referrer"
              className="w-full h-auto drop-shadow-[0_16px_32px_rgba(0,0,0,0.8)] filter brightness-110"
            />
          </div>

          {/* 3. Deep Background - Top Right (Soft Blur) */}
          <div className="absolute -top-6 right-2 sm:top-2 sm:right-8 lg:right-16 w-16 sm:w-24 md:w-32 animate-float-3 transform rotate-[25deg] opacity-45 blur-[3px]">
            <img
              src={portfolioAssets.footer[2]}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>

          {/* 4. Foreground Crisp - Top Right */}
          <div className="absolute top-6 -right-2 sm:top-10 sm:right-10 lg:right-32 w-22 sm:w-30 md:w-38 lg:w-44 animate-float-2 transform rotate-15 opacity-95">
            <img
              src={portfolioAssets.footer[3]}
              alt="Avatar 3D flutuante"
              referrerPolicy="no-referrer"
              className="w-full h-auto drop-shadow-[0_18px_36px_rgba(0,0,0,0.85)] filter brightness-105"
            />
          </div>

          {/* 5. Midground - Mid Left Edge */}
          <div className="absolute top-[42%] -left-6 sm:top-[38%] sm:left-2 lg:left-10 w-24 sm:w-32 md:w-40 animate-float-3 transform rotate-[18deg] opacity-80">
            <img
              src={portfolioAssets.footer[4]}
              alt="Avatar 3D flutuante"
              referrerPolicy="no-referrer"
              className="w-full h-auto drop-shadow-[0_14px_28px_rgba(0,0,0,0.7)] filter brightness-105"
            />
          </div>

          {/* 6. Background Subtle - Behind Center Right (Deep Blur) */}
          <div className="hidden sm:block absolute top-[45%] right-12 lg:right-24 w-18 sm:w-24 md:w-28 animate-float-1 transform -rotate-[15deg] opacity-40 blur-[5px]">
            <img
              src={portfolioAssets.footer[0]}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-auto"
            />
          </div>

          {/* 7. Foreground Large - Mid/Bottom Right */}
          <div className="absolute top-[48%] -right-4 sm:top-[42%] sm:right-4 lg:right-14 w-24 sm:w-34 md:w-44 animate-float-4 transform -rotate-12 opacity-90">
            <img
              src={portfolioAssets.footer[1]}
              alt="Avatar 3D flutuante"
              referrerPolicy="no-referrer"
              className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter brightness-110"
            />
          </div>

          {/* 8. Bottom Left Crisp */}
          <div className="absolute -bottom-4 left-0 sm:bottom-4 sm:left-14 lg:left-36 w-22 sm:w-30 md:w-38 animate-float-2 transform -rotate-[16deg] opacity-85">
            <img
              src={portfolioAssets.footer[2]}
              alt="Avatar 3D flutuante"
              referrerPolicy="no-referrer"
              className="w-full h-auto drop-shadow-[0_16px_30px_rgba(0,0,0,0.8)] filter brightness-105"
            />
          </div>

          {/* 9. Bottom Center Background (Blurred & Scaled) */}
          <div className="hidden sm:block absolute bottom-2 left-[30%] w-16 sm:w-20 md:w-24 animate-float-3 transform rotate-[10deg] opacity-35 blur-[4px]">
            <img
              src={portfolioAssets.footer[3]}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-auto"
            />
          </div>

          {/* 10. Foreground Large - Bottom Right */}
          <div className="absolute -bottom-6 right-1 sm:bottom-2 sm:right-14 lg:right-36 w-24 sm:w-32 md:w-42 animate-float-1 transform rotate-[20deg] opacity-90">
            <img
              src={portfolioAssets.footer[4]}
              alt="Avatar 3D flutuante"
              referrerPolicy="no-referrer"
              className="w-full h-auto drop-shadow-[0_18px_36px_rgba(0,0,0,0.85)] filter brightness-110"
            />
          </div>
        </div>

        <div className="relative z-10 px-5 sm:px-8 md:px-12 max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]" />
            <span className="font-tech text-[11px] tracking-[0.2em] text-[#8C9094] uppercase font-bold">
              DIAGNÓSTICO DIRETO
            </span>
          </div>

          {/* Dominant Headline with Brush Accent */}
          <h2 className="font-impact uppercase tracking-tight text-white text-[clamp(2.5rem,7vw,4.8rem)] leading-[0.92] font-black">
            VAMOS{' '}
            <span className="text-[#B7FF00] font-marker normal-case tracking-normal text-[0.95em] drop-shadow-[0_0_28px_rgba(183,255,0,0.45)]">
              conversar?
            </span>
          </h2>

          {/* Compact Impact Statement */}
          <p className="font-sans text-sm sm:text-base text-[#E0E2E4] leading-relaxed max-w-xl mx-auto font-normal">
            Você me mostra o que está dando trabalho — atendimento, WhatsApp, planilhas, documentos ou qualquer outra rotina. Eu procuro onde existe tempo sendo desperdiçado e se há uma forma melhor de resolver.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto items-center justify-center">
            <a
              href={contactInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto flex-1 min-h-[48px] py-3 px-5 inline-flex items-center justify-center gap-2 font-tech text-xs uppercase tracking-wider bg-[#B7FF00] text-[#050607] hover:bg-[#D4FF55] transition-all duration-200 cursor-pointer select-none font-black rounded-xl shadow-[0_0_24px_rgba(183,255,0,0.3)] active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4 fill-current shrink-0" />
              <span>CONVERSAR NO WHATSAPP</span>
              <ArrowRight className="w-4 h-4 stroke-[3] shrink-0" />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full sm:w-auto min-h-[48px] py-3 px-5 inline-flex items-center justify-center gap-2 font-tech text-xs uppercase tracking-wider border border-[#1F2630] bg-[#090C0E] hover:border-[#B7FF00]/60 text-[#F0EEE8] hover:text-[#B7FF00] transition-all duration-200 cursor-pointer select-none font-bold rounded-xl active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#B7FF00]" />
                  <span>COPIADO!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPIAR E-MAIL</span>
                </>
              )}
            </button>
          </div>

          <div>
            <a 
              href={`mailto:${contactInfo.email}`}
              onClick={handleEmailDirectClick}
              className="font-tech text-xs text-[#8C9094] hover:text-[#B7FF00] transition-colors underline tracking-wider"
            >
              ou envie um e-mail para {contactInfo.email}
            </a>
          </div>

        </div>
      </div>

      {/* Shared Site Footer with Chico Subnav */}
      <SiteFooter showChicoSubnav={true} />

    </section>
  );
}
