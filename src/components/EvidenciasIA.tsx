import React from 'react';

export default function EvidenciasIA() {
  const handleScrollToCases = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#casos-reais') || document.querySelector('#projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="evidencias-ia"
      className="relative py-14 sm:py-20 md:py-24 bg-[#050607] border-t border-white/[0.07] text-[#F0EEE8]"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-12 space-y-12 sm:space-y-16">
        
        {/* 1. Contexto & Tese Editorial (Diretamente sobre o fundo) */}
        <div className="max-w-3xl text-left space-y-3.5 sm:space-y-4">
          <div className="font-tech text-xs tracking-[0.2em] text-[#8C9094] uppercase font-bold">
            IA APLICADA. NÃO APENAS ADOTADA.
          </div>

          <h2 className="font-impact uppercase tracking-tight text-white text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.02] font-black">
            QUASE TODO MUNDO JÁ USA IA. <br />
            <span className="text-[#B7FF00] font-marker normal-case tracking-normal block sm:inline text-[0.9em]">
              POUCOS TRANSFORMARAM ISSO EM RESULTADO.
            </span>
          </h2>

          <div className="space-y-2.5 font-sans text-sm sm:text-base text-[#A6ABB0] leading-relaxed pt-1">
            <p>Ter acesso à inteligência artificial ficou fácil.</p>
            <p>
              O verdadeiro desafio é conectá-la aos processos da empresa de uma forma que reduza trabalho, organize a operação e gere resultados que possam ser percebidos.
            </p>
          </div>
        </div>

        {/* 2. Sequência Tipográfica de Dados (Sem caixas, sem cards, sem fundos individuais) */}
        <div className="border-y border-white/[0.08] divide-y md:divide-y-0 md:divide-x divide-white/[0.08] grid grid-cols-1 md:grid-cols-3 text-left">
          
          {/* DADO 1 */}
          <div className="py-7 md:py-9 md:pr-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="font-impact text-5xl sm:text-6xl text-white font-black leading-none tracking-tight">
                88%
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#A6ABB0] leading-relaxed">
                das organizações pesquisadas já utilizavam IA regularmente em pelo menos uma função.
              </p>
            </div>
            <div>
              <a
                href="https://hai.stanford.edu/ai-index/2026-ai-index-report/economy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] sm:text-xs text-[#787D83] hover:text-white transition-colors underline underline-offset-2"
                title="Stanford AI Index 2026 — dados de 2025 (abre em nova aba)"
              >
                Stanford AI Index 2026 — dados de 2025 ↗
              </a>
            </div>
          </div>

          {/* DADO 2 */}
          <div className="py-7 md:py-9 md:px-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="font-impact text-5xl sm:text-6xl text-white font-black leading-none tracking-tight">
                80%
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#A6ABB0] leading-relaxed">
                dos profissionais pesquisados afirmam que a IA melhorou sua produtividade individual.
              </p>
            </div>
            <div>
              <a
                href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] sm:text-xs text-[#787D83] hover:text-white transition-colors underline underline-offset-2"
                title="McKinsey — State of AI 2026 (abre em nova aba)"
              >
                McKinsey — State of AI 2026 ↗
              </a>
            </div>
          </div>

          {/* DADO 3 */}
          <div className="py-7 md:py-9 md:pl-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="font-impact text-5xl sm:text-6xl text-white font-black leading-none tracking-tight">
                6%
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#A6ABB0] leading-relaxed">
                das organizações pesquisadas foram classificadas como empresas de alto desempenho com IA.
              </p>
              <p className="font-sans text-[11px] text-[#787D83] leading-normal pt-1">
                Classificação aplicada a organizações que atribuíram pelo menos 5% de impacto no EBIT ao uso de IA e descreveram esse impacto como significativo.
              </p>
            </div>
            <div>
              <a
                href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] sm:text-xs text-[#787D83] hover:text-white transition-colors underline underline-offset-2"
                title="McKinsey — State of AI 2026 (abre em nova aba)"
              >
                McKinsey — State of AI 2026 ↗
              </a>
            </div>
          </div>

        </div>

        {/* 3. Conclusão & Transição Editorial (Diretamente sobre o fundo, sem card, sem botão) */}
        <div className="max-w-3xl text-left space-y-4 pt-1">
          <h3 className="font-impact uppercase tracking-tight text-white text-2xl sm:text-3xl font-black leading-snug">
            A DIFERENÇA NÃO ESTÁ EM TER ACESSO À IA. <br />
            ESTÁ EM SABER{' '}
            <span className="text-[#B7FF00] font-marker normal-case tracking-normal inline-block text-[0.98em]">
              ONDE E COMO APLICÁ-LA.
            </span>
          </h3>

          <p className="font-sans text-sm sm:text-base text-[#A6ABB0] leading-relaxed">
            Não se trata de adicionar mais uma ferramenta à rotina. Trata-se de redesenhar o trabalho, conectar informações e construir uma solução que realmente funcione dentro da operação.
          </p>

          <div className="pt-2">
            <a
              href="#casos-reais"
              onClick={handleScrollToCases}
              className="inline-flex items-center text-xs sm:text-sm font-tech font-bold uppercase tracking-wider text-[#A6ABB0] hover:text-[#B7FF00] transition-colors underline underline-offset-4 cursor-pointer"
            >
              VER APLICAÇÕES REAIS ↓
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
