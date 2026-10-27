import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from '../lib/router';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, navigate } = useRouter();

  const isChicoArea = pathname.startsWith('/chico');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and listen to Escape key when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith('#')) {
      if (pathname !== '/') {
        navigate('/' + href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#08090A]/90 backdrop-blur-md border-b border-[#1F2225] py-4'
            : 'bg-[#050607]/60 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Monogram */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="group flex items-center gap-1.5 font-impact text-2xl md:text-3xl tracking-tight text-[#F0EEE8] hover:text-[#B7FF00] transition-colors duration-200"
            id="brand-logo"
            aria-label="Lucas Prestes Início"
          >
            <span className="font-black">LP</span>
            <span className="text-[#B7FF00] font-tech text-3xl font-black">.</span>
            {isChicoArea && (
              <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase tracking-widest bg-[#B7FF00]/10 text-[#B7FF00] border border-[#B7FF00]/30">
                CHICO
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" id="desktop-nav">
            {isChicoArea ? (
              <>
                <a
                  href="/"
                  onClick={(e) => handleNavClick(e, '/')}
                  className="font-tech text-xs uppercase tracking-widest text-[#9A9D9F] hover:text-[#B7FF00] transition-colors py-1 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>SITE PRINCIPAL</span>
                </a>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F252C]"></span>
                <a
                  href="/chico"
                  onClick={(e) => handleNavClick(e, '/chico')}
                  className={`font-tech text-xs uppercase tracking-widest transition-colors py-1 flex items-center gap-2 ${
                    pathname === '/chico' ? 'text-[#B7FF00] font-bold' : 'text-[#9A9D9F] hover:text-[#B7FF00]'
                  }`}
                >
                  <span>CHICO (INÍCIO)</span>
                </a>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F252C]"></span>
                <a
                  href="/chico/privacidade"
                  onClick={(e) => handleNavClick(e, '/chico/privacidade')}
                  className={`font-tech text-xs uppercase tracking-widest transition-colors py-1 flex items-center gap-2 ${
                    pathname === '/chico/privacidade' ? 'text-[#B7FF00] font-bold' : 'text-[#9A9D9F] hover:text-[#B7FF00]'
                  }`}
                >
                  <span>PRIVACIDADE</span>
                </a>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F252C]"></span>
                <a
                  href="/chico/termos"
                  onClick={(e) => handleNavClick(e, '/chico/termos')}
                  className={`font-tech text-xs uppercase tracking-widest transition-colors py-1 flex items-center gap-2 ${
                    pathname === '/chico/termos' ? 'text-[#B7FF00] font-bold' : 'text-[#9A9D9F] hover:text-[#B7FF00]'
                  }`}
                >
                  <span>TERMOS</span>
                </a>
              </>
            ) : (
              <>
                <a
                  href="#problem"
                  onClick={(e) => handleNavClick(e, '#problem')}
                  className="font-tech text-xs uppercase tracking-widest text-[#9A9D9F] hover:text-[#B7FF00] transition-colors py-1 flex items-center gap-2"
                >
                  <span>PROBLEMA</span>
                </a>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]"></span>
                <a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, '#projects')}
                  className="font-tech text-xs uppercase tracking-widest text-[#9A9D9F] hover:text-[#B7FF00] transition-colors py-1 flex items-center gap-2"
                >
                  <span>CASOS REAIS</span>
                </a>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]"></span>
                <a
                  href="#diagnostico"
                  onClick={(e) => handleNavClick(e, '#diagnostico')}
                  className="font-tech text-xs uppercase tracking-widest text-[#9A9D9F] hover:text-[#B7FF00] transition-colors py-1 flex items-center gap-2"
                >
                  <span>DIAGNÓSTICO</span>
                </a>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F252C]"></span>
                <a
                  href="/chico"
                  onClick={(e) => handleNavClick(e, '/chico')}
                  className="font-tech text-xs uppercase tracking-widest text-[#9A9D9F] hover:text-[#B7FF00] transition-colors py-1 flex items-center gap-2"
                >
                  <span className="text-[#B7FF00]">●</span>
                  <span>CHICO (APP)</span>
                </a>
              </>
            )}
          </nav>

          {/* Contact Button Desktop */}
          <div className="hidden md:flex items-center" id="desktop-cta">
            <a
              href="mailto:eu@lucasprestes.com"
              className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest px-5 py-2.5 bg-[#0A0D10] border border-[#1F252C] hover:border-[#B7FF00] text-[#F0EEE8] hover:text-[#B7FF00] transition-all duration-300 group rounded-lg shadow-sm"
            >
              <span>FALAR COM LUCAS</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B7FF00] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#F0EEE8] hover:text-[#B7FF00] transition-colors focus:outline-none"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            id="mobile-menu-trigger"
          >
            {isOpen ? <X className="w-6 h-6 stroke-[2]" /> : <Menu className="w-6 h-6 stroke-[2]" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#050607]/98 backdrop-blur-2xl pt-24 px-6 flex flex-col md:hidden overflow-y-auto"
            id="mobile-menu-drawer"
          >
            <div className="flex flex-col gap-6 justify-center flex-1 pb-16 relative z-10">
              <span className="font-tech text-[10px] tracking-widest text-[#8C9094] border-b border-[#1F252C] pb-2 uppercase">
                {isChicoArea ? 'Chico // Assistente de IA' : 'Navegação'}
              </span>

              <div className="flex flex-col gap-5">
                <a
                  href="/"
                  onClick={(e) => handleNavClick(e, '/')}
                  className="font-impact font-black text-2xl tracking-tight text-[#F0EEE8] hover:text-[#B7FF00] transition-colors uppercase flex items-center justify-between"
                >
                  <span>SITE PRINCIPAL</span>
                  <span className="font-tech text-xs text-[#8C9094]">INÍCIO</span>
                </a>

                <div className="pt-2 border-t border-[#1F252C]/60 flex flex-col gap-3">
                  <span className="font-tech text-[11px] text-[#B7FF00] font-bold uppercase tracking-wider">
                    PRODUTO CHICO:
                  </span>
                  <a
                    href="/chico"
                    onClick={(e) => handleNavClick(e, '/chico')}
                    className={`font-impact text-xl tracking-tight transition-colors uppercase ${
                      pathname === '/chico' ? 'text-[#B7FF00]' : 'text-[#F0EEE8] hover:text-[#B7FF00]'
                    }`}
                  >
                    01 // Visão Geral do Chico
                  </a>
                  <a
                    href="/chico/privacidade"
                    onClick={(e) => handleNavClick(e, '/chico/privacidade')}
                    className={`font-impact text-xl tracking-tight transition-colors uppercase ${
                      pathname === '/chico/privacidade' ? 'text-[#B7FF00]' : 'text-[#F0EEE8] hover:text-[#B7FF00]'
                    }`}
                  >
                    02 // Política de Privacidade
                  </a>
                  <a
                    href="/chico/termos"
                    onClick={(e) => handleNavClick(e, '/chico/termos')}
                    className={`font-impact text-xl tracking-tight transition-colors uppercase ${
                      pathname === '/chico/termos' ? 'text-[#B7FF00]' : 'text-[#F0EEE8] hover:text-[#B7FF00]'
                    }`}
                  >
                    03 // Termos de Uso
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-[#1F252C]">
                <a
                  href="mailto:eu@lucasprestes.com"
                  className="w-full h-12 flex items-center justify-center gap-2 bg-[#B7FF00] text-[#050607] font-tech text-xs uppercase tracking-widest font-black rounded-xl shadow-lg"
                >
                  <span>FALAR COM LUCAS</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                </a>
              </div>
            </div>

            {/* Footer metadata in mobile drawer */}
            <div className="py-6 border-t border-[#1F252C] flex justify-between items-center font-tech text-[10px] text-[#8C9094] uppercase tracking-wider">
              <span>LUCAS PRESTES</span>
              <span className="text-[#B7FF00]">SEU TEMPO, DE VOLTA.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
