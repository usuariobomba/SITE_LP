import { ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export default function ProblemThesis() {
  const symptoms = [
    {
      num: '01',
      title: 'Informação Espalhada',
      desc: 'Dados divididos entre WhatsApp, planilhas, emails e sistemas diferentes.',
    },
    {
      num: '02',
      title: 'Atendimento Repetitivo',
      desc: 'Respostas, follow-ups, cobranças e atualizações feitas manualmente todos os dias.',
    },
    {
      num: '03',
      title: 'Processos Manuais',
      desc: 'Tarefas que dependem de alguém lembrar, copiar, conferir ou executar.',
    },
    {
      num: '04',
      title: 'Retrabalho',
      desc: 'O mesmo trabalho sendo repetido em ferramentas ou etapas diferentes.',
    },
  ];

  const handleCtaClick = () => {
    trackEvent({
      name: 'intermediate_cta_click',
      params: { location: 'problem_thesis_section' }
    });
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="problem"
      className="relative py-14 sm:py-20 md:py-24 bg-[#050607]/80 backdrop-blur-[2px] text-[#F0EEE8] overflow-hidden"
    >
      {/* Invisible anchor targets for backward compatibility */}
      <span id="services" className="absolute top-0 opacity-0 pointer-events-none" />
      <span id="about" className="absolute top-1/2 opacity-0 pointer-events-none" />

      {/* Atmospheric Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B7FF00]/[0.035] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 space-y-12 sm:space-y-16">
        
        {/* 1. O Problema: Headline & Conexão */}
        <div className="text-left max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]" />
            <span className="font-tech text-[11px] tracking-[0.2em] text-[#8C9094] uppercase font-bold">
              ONDE O TEMPO ESCAPA
            </span>
          </div>

          <h2 className="font-impact uppercase tracking-tight text-white text-[clamp(2.1rem,5.5vw,3.8rem)] leading-[0.96] font-black">
            SEU SISTEMA PODE ESTAR FUNCIONANDO. <br />
            <span className="text-[#8C9094]">E MESMO ASSIM SUA EMPRESA PERDE</span>{' '}
            <span className="text-[#B7FF00] font-marker normal-case tracking-normal block sm:inline text-[0.92em] drop-shadow-[0_0_24px_rgba(183,255,0,0.45)]">
              horas todos os dias.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#A6ABB0] leading-relaxed pt-1">
            O problema nem sempre está no sistema principal. Muitas vezes está no trabalho manual invisível entre uma etapa e outra.
          </p>
        </div>

        {/* 2. 4 Sintomas: Mobile Horizontal Swipe / Desktop 4 Columns */}
        <div className="space-y-2">
          {/* Mobile swipe hint */}
          <div className="flex sm:hidden items-center justify-between text-[10px] font-tech text-[#8C9094] px-1 uppercase tracking-wider">
            <span>SINTOMAS FREQUENTES</span>
            <span className="text-[#B7FF00]">ARRASTE →</span>
          </div>

          {/* Container: Horizontal Scroll on Mobile, 4-Col Grid on Desktop */}
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x-mandatory sm:snap-none no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
            {symptoms.map((item) => (
              <div
                key={item.num}
                className="w-[78vw] sm:w-auto shrink-0 snap-start p-5 rounded-2xl bg-[#090C0E] border border-[#1F2630] hover:border-[#B7FF00]/40 transition-colors duration-200 text-left space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-tech text-xs font-black text-[#B7FF00]">
                      {item.num}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1F2630]" />
                  </div>
                  <h3 className="font-impact uppercase text-lg sm:text-xl text-white font-black leading-tight mb-1.5">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#A6ABB0] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Frase de Conexão */}
          <p className="font-sans text-xs sm:text-sm text-[#8C9094] leading-relaxed pt-1 sm:pt-2 text-left">
            Pode estar no WhatsApp, numa planilha, numa conferência ou em um processo interno que simplesmente exige trabalho demais para funcionar.
          </p>
        </div>

        {/* 3. A Tese: Declaração Forte e Conclusiva */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0C1410] via-[#090C0E] to-[#090C0E] border border-[#1F2630] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
          <div className="space-y-1.5 max-w-xl">
            <span className="font-tech text-[10px] uppercase font-bold text-[#8C9094] tracking-wider block">
              POSICIONAMENTO // A TESE
            </span>
            <h3 className="font-impact uppercase tracking-tight text-white text-2xl sm:text-3xl font-black leading-tight">
              IA É O MEIO. <br />
              <span className="text-[#B7FF00] font-marker normal-case tracking-normal inline-block text-[1.02em] drop-shadow-[0_0_20px_rgba(183,255,0,0.4)] mr-1.5">
                TEMPO DE VOLTA
              </span>
              <span className="text-white">É O RESULTADO.</span>
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#9A9D9F] leading-relaxed pt-1">
              Cada empresa perde tempo de uma maneira diferente. Por isso, a solução também precisa ser construída de acordo com a sua operação.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full sm:w-auto min-h-[48px] py-3 px-5 flex items-center justify-center gap-2 bg-[#B7FF00] hover:bg-[#D4FF55] text-[#050607] font-tech font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(183,255,0,0.25)] active:scale-[0.98] cursor-pointer shrink-0"
          >
            <span>ANALISAR MEUS GARGALOS</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </div>
    </section>
  );
}
