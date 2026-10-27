import { ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export default function Process() {
  const steps = [
    {
      num: '01',
      title: 'Escutar',
      desc: 'Você me conta onde a rotina está pesada e quais tarefas consomem tempo demais.',
    },
    {
      num: '02',
      title: 'Mapear',
      desc: 'Identificamos o gargalo exato: controles paralelos, digitação manual e dados dispersos.',
    },
    {
      num: '03',
      title: 'Desenhar',
      desc: 'Planejamos a solução mais simples para que qualquer pessoa aprenda em minutos.',
    },
    {
      num: '04',
      title: 'Simplificar',
      desc: 'Construímos a ferramenta sob medida, deixando a complexidade técnica nos bastidores.',
    },
    {
      num: '05',
      title: 'Devolver',
      desc: 'Acompanhamos o uso real até que o tempo recuperado vire rotina permanente.',
    },
  ];

  const principles = [
    {
      num: '01',
      title: 'Sem Software Pronto',
      statement: 'A solução nasce do problema real, nunca o contrário.',
    },
    {
      num: '02',
      title: 'Tecnologia como Meio',
      statement: 'Toda a complexidade técnica fica 100% invisível nos bastidores.',
    },
    {
      num: '03',
      title: 'Tempo como Régua',
      statement: 'A pergunta final é quanto trabalho deixou de existir na sua rotina.',
    },
  ];

  const handleCtaClick = () => {
    trackEvent({
      name: 'time_diagnosis_cta_click',
      params: { location: 'process_diagnosis_section' }
    });
    const contactEl = document.querySelector('#diagnostico') || document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="process"
      className="relative py-14 sm:py-20 md:py-24 bg-[#050607]/80 backdrop-blur-[2px] text-[#F0EEE8] overflow-hidden"
    >
      {/* Invisible anchor target for principles */}
      <span id="principles" className="absolute top-1/2 opacity-0 pointer-events-none" />

      {/* Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#B7FF00]/[0.03] rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 space-y-12 sm:space-y-14">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]" />
            <span className="font-tech text-[11px] tracking-[0.2em] text-[#8C9094] uppercase font-bold">
              DIAGNÓSTICO DE TEMPO
            </span>
          </div>

          <h2 className="font-impact uppercase tracking-tight text-white text-[clamp(2.1rem,5.5vw,3.8rem)] leading-[0.96] font-black">
            DESCOBRIMOS ONDE SUA OPERAÇÃO ESTÁ <br />
            <span className="text-[#B7FF00] font-marker normal-case tracking-normal block sm:inline text-[0.92em] drop-shadow-[0_0_24px_rgba(183,255,0,0.4)]">
              perdendo tempo.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#A6ABB0] leading-relaxed max-w-2xl pt-1">
            Você me mostra a rotina. Eu procuro onde existe trabalho que não deveria consumir tantas horas da sua equipe.
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#8C9094] leading-relaxed max-w-2xl">
            Pode estar no atendimento, no WhatsApp, no financeiro, em documentos, pedidos, planilhas ou em qualquer rotina repetitiva da operação.
          </p>
        </div>

        {/* 1. 5 Passos do Método: Mobile Horizontal Swipe / Desktop 5 Columns */}
        <div className="space-y-2">
          <div className="flex sm:hidden items-center justify-between text-[10px] font-tech text-[#8C9094] px-1 uppercase tracking-wider">
            <span>PASSO A PASSO</span>
            <span className="text-[#B7FF00]">ARRASTE →</span>
          </div>

          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-5 gap-3 overflow-x-auto sm:overflow-visible snap-x-mandatory sm:snap-none no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="w-[75vw] sm:w-auto shrink-0 snap-start p-4 sm:p-5 rounded-2xl bg-[#090C0E] border border-[#1F2630] hover:border-[#B7FF00]/40 transition-colors duration-200 text-left flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#1F2630]/70 pb-2 mb-2">
                    <span className="font-tech text-xs font-black text-[#B7FF00]">
                      {step.num}
                    </span>
                    <span className="font-tech text-[8.5px] uppercase tracking-wider text-[#8C9094]">
                      ETAPA {idx + 1}
                    </span>
                  </div>

                  <h3 className="font-impact uppercase text-lg text-white font-black">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs text-[#A6ABB0] leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>

                <div className="w-full h-1 bg-[#1F2630] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#B7FF00]/60 rounded-full" 
                    style={{ width: `${((idx + 1) / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 3 Princípios Operacionais Compactos */}
        <div className="space-y-3 pt-2">
          <div className="text-left">
            <span className="font-tech text-[10.5px] font-bold text-[#8C9094] uppercase tracking-wider">
              COMO TRABALHO // 3 DIRETRIZES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 text-left">
            {principles.map((p) => (
              <div
                key={p.num}
                className="p-4 sm:p-5 rounded-2xl bg-[#090C0E] border border-[#1F2630]/80 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-tech text-xs font-black text-[#B7FF00]">
                    {p.num}
                  </span>
                  <h4 className="font-impact uppercase text-sm sm:text-base text-white font-black tracking-tight">
                    {p.title}
                  </h4>
                </div>
                <p className="font-sans text-xs text-[#A6ABB0] leading-relaxed">
                  {p.statement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. CTA do Diagnóstico */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0C120F] via-[#090C0E] to-[#090C0E] border border-[#1F2630] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-left">
          <p className="font-sans text-sm sm:text-base text-[#F0EEE8] font-normal leading-snug max-w-lg">
            Quer descobrir onde sua operação está perdendo horas toda semana?
          </p>

          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full sm:w-auto min-h-[48px] py-3 px-6 flex items-center justify-center gap-2 bg-[#B7FF00] hover:bg-[#D4FF55] text-[#050607] font-tech font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(183,255,0,0.25)] active:scale-[0.98] cursor-pointer shrink-0"
          >
            <span>DESCOBRIR ONDE ESTOU PERDENDO TEMPO</span>
            <ArrowRight className="w-4 h-4 text-[#050607] stroke-[3]" />
          </button>
        </div>

      </div>
    </section>
  );
}
