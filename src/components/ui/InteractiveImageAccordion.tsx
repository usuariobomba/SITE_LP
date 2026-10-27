import React, { useState } from 'react';
import { services } from '@/data';
import { ArrowUpRight, CheckCircle2, Plus, Minus } from 'lucide-react';
import { useIsMobile } from '../../lib/useIsMobile';
import { portfolioAssets } from '../../config/assets';

export function InteractiveImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-7xl mx-auto py-4">
      {/* Desktop View: Horizontal Interactive Accordion */}
      {!isMobile && (
        <div className="hidden lg:flex items-center justify-center gap-4 h-[500px]">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            const num = `0${index + 1}`;
            const firstWord = service.title.split(' ')[0];

            return (
              <div
                key={num}
                onMouseEnter={() => setActiveIndex(index)}
                className={`
                  relative h-full rounded-2xl overflow-hidden cursor-pointer
                  transition-all duration-700 ease-in-out border border-[#F0EEE8]/15
                  flex flex-col justify-end shadow-2xl bg-[#08090A]
                  ${isActive ? 'flex-[2.5] bg-[#121417] border-[#7557FF]/40 p-8' : 'flex-[0.6] hover:flex-[0.8] hover:border-[#F0EEE8]/30 p-4'}
                `}
              >
                {/* Content overlay */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm tracking-widest text-[#FF3E6C] font-bold px-3 py-1 rounded-full bg-[#FF3E6C]/10 border border-[#FF3E6C]/30">
                      {num}
                    </span>
                    {isActive && (
                      <span className="w-8 h-8 rounded-full bg-[#FF3E6C] text-[#08090A] flex items-center justify-center animate-pulse">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <div className="relative h-full flex flex-col justify-end">
                    {isActive ? (
                      <div className="space-y-4 animate-fadeIn pb-2">
                        <h3 className="font-display font-extrabold uppercase tracking-tight text-2xl text-[#F0EEE8]">
                          {service.title}
                        </h3>
                        <p className="font-sans text-xl text-[#F0EEE8]/85 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="grid grid-cols-1 gap-2.5 pt-3 border-t border-[#F0EEE8]/10">
                          {service.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-sm text-[#F0EEE8]/75 font-sans">
                              <CheckCircle2 className="w-4 h-4 text-[#C6FF3D] shrink-0 mt-0.5" />
                              <span className="leading-snug">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-y-0 right-0 w-full flex items-center justify-end pointer-events-none pr-2 lg:pr-3">
                        <h3 className="font-display font-black uppercase text-[#F0EEE8]/50 [writing-mode:vertical-rl] rotate-180 h-full flex items-center justify-between tracking-widest text-lg lg:text-2xl select-none">
                          {firstWord}
                        </h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile & Tablet view: Interactive accordion por toque */}
      {isMobile && (
        <div className="flex flex-col gap-4">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            const num = `0${index + 1}`;

            return (
              <div
                key={num}
                className={`
                  relative rounded-2xl overflow-hidden border transition-all duration-300 bg-[#0E1012]
                  ${isActive ? 'border-[#7557FF]/60 shadow-[0_10px_30px_rgba(117,87,255,0.1)]' : 'border-[#1F2225]'}
                `}
              >
                {/* Accordion Trigger Header - Minimum 56px height and touch area */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(isActive ? -1 : index)}
                  aria-expanded={isActive}
                  className="w-full flex items-center justify-between p-5 text-left text-[#F0EEE8] focus:outline-none focus:ring-1 focus:ring-[#7557FF] rounded-t-2xl min-h-[56px]"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-xs text-[#FF3E6C] font-black tracking-widest bg-[#FF3E6C]/10 border border-[#FF3E6C]/20 px-2 py-0.5 rounded">
                      {num}
                    </span>
                    <h3 className="font-display font-black text-sm uppercase tracking-wide">
                      {service.title}
                    </h3>
                  </div>
                  <span className="p-1 text-[#C6FF3D] border border-[#1F2225] rounded bg-[#08090A]">
                    {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Animated expandable content panel */}
                <div
                  className={`
                    transition-all duration-300 ease-in-out overflow-hidden
                    ${isActive ? 'max-h-[800px] border-t border-[#1F2225]/60 p-5 space-y-4' : 'max-h-0'}
                  `}
                >
                  {/* Short description */}
                  <p className="text-lg text-[#F0EEE8]/85 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    {service.description}
                  </p>

                  {/* Service Deliverables & Bullet details */}
                  <div className="space-y-2 pt-2">
                    <span className="font-sans text-[9px] text-[#7557FF] uppercase tracking-widest font-bold block">
                      ENTREGÁVEIS DESTA ETAPA
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {service.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#9A9D9F] font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C6FF3D] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>


                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
