import React from 'react';
import { contactInfo } from '../data';
import { trackEvent } from '../lib/analytics';
import { Link } from '../lib/router';

interface SiteFooterProps {
  lastUpdated?: string;
  showChicoSubnav?: boolean;
}

export default function SiteFooter({ lastUpdated, showChicoSubnav = true }: SiteFooterProps) {
  const handleWhatsAppClick = () => {
    trackEvent({ name: 'whatsapp_click', params: { source: 'site_footer' } });
  };

  return (
    <footer className="bg-[#050607] text-[#F0EEE8] py-10 border-t border-[#1F2630]/70 relative z-10 w-full">
      <div className="px-5 sm:px-8 md:px-12 max-w-5xl mx-auto space-y-6">
        
        {/* Optional Chico Interlinks Bar */}
        {showChicoSubnav && (
          <div className="p-4 sm:p-5 rounded-xl bg-[#090C0E] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-tech">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00] animate-pulse" />
              <span className="text-white font-bold tracking-wider uppercase">Chico // Assistente de IA</span>
              {lastUpdated && (
                <span className="text-[#8C9094] border-l border-[#1F2630] pl-2 text-[11px]">
                  Última atualização: {lastUpdated}
                </span>
              )}
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-4 text-[#8C9094]">
              <Link to="/chico" className="hover:text-[#B7FF00] transition-colors underline-offset-4 hover:underline">
                Visão Geral do Chico
              </Link>
              <span className="text-[#2F353C]">•</span>
              <Link to="/chico/privacidade" className="hover:text-[#B7FF00] transition-colors underline-offset-4 hover:underline">
                Política de Privacidade
              </Link>
              <span className="text-[#2F353C]">•</span>
              <Link to="/chico/termos" className="hover:text-[#B7FF00] transition-colors underline-offset-4 hover:underline">
                Termos de Uso
              </Link>
            </nav>
          </div>
        )}

        {/* Main Site Footer Details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left pt-2">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-tech text-xs text-[#B7FF00] font-black">LP.</span>
              <span className="font-tech text-xs text-white font-bold tracking-wider">
                LUCAS PRESTES // SEU TEMPO, DE VOLTA.
              </span>
            </div>
            <p className="font-tech text-[9.5px] text-[#6A7077] uppercase tracking-wider">
              RECUPERAÇÃO DE TEMPO &amp; DESENVOLVIMENTO © 2026 • RESPONSÁVEL: LUCAS PRESTES
            </p>
          </div>

          <div className="flex items-center gap-5 font-tech text-xs text-[#8C9094]">
            <a 
              href="mailto:eu@lucasprestes.com"
              className="hover:text-[#B7FF00] transition-colors"
            >
              eu@lucasprestes.com
            </a>
            <span className="text-[#2F353C]">•</span>
            <a 
              href={contactInfo.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={handleWhatsAppClick}
              className="hover:text-[#B7FF00] transition-colors"
            >
              WhatsApp
            </a>
            <span className="text-[#2F353C]">•</span>
            <a 
              href={contactInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#B7FF00] transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-[#2F353C]">•</span>
            <a 
              href={contactInfo.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#B7FF00] transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
