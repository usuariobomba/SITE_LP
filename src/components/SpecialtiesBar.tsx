import { useState, useEffect, useRef } from 'react';
import { portfolioAssets } from '../config/assets';
import { useIsMobile } from '../lib/useIsMobile';
import { getOptimizedCloudinaryUrl } from '../lib/utils';

export default function SpecialtiesBar() {
  const [isPaused, setIsPaused] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry.isIntersecting);
    }, { threshold: 0 });

    observer.observe(section);
    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  const panels = [
    { num: '01', title: 'HORAS RECUPERADAS', src: portfolioAssets.marquee[0] },
    { num: '02', title: 'MENOS TRABALHO MANUAL', src: portfolioAssets.marquee[1] },
    { num: '03', title: 'CONFERÊNCIA EM SEGUNDOS', src: portfolioAssets.marquee[2] },
    { num: '04', title: 'OPERAÇÃO CENTRALIZADA', src: portfolioAssets.marquee[3] },
    { num: '05', title: 'PROCESSOS AUTOMATIZADOS', src: portfolioAssets.marquee[4] },
    { num: '06', title: 'TEMPO PARA O QUE IMPORTA', src: portfolioAssets.marquee[5] },
  ];

  if (isMobile) {
    return null;
  }

  const duplicatedPanels = [...panels, ...panels, ...panels];
  const reversedPanels = [...panels].reverse();
  const duplicatedReversed = [...reversedPanels, ...reversedPanels, ...reversedPanels];

  const animateLeft = isPaused || !isInViewport ? 'none' : 'marquee 45s linear infinite';
  const animateRight = isPaused || !isInViewport ? 'none' : 'marquee-reverse 45s linear infinite';

  return (
    <section
      ref={sectionRef}
      id="specialties"
      className="relative w-full bg-[#08090A]/40 py-24 overflow-hidden z-20 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle gradient vignettes on left and right */}
      <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#08090A] to-transparent z-20 pointer-events-none hidden md:block" />
      <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#08090A] to-transparent z-20 pointer-events-none hidden md:block" />

      <div className="flex flex-col gap-6 w-full py-4" style={{ transform: 'rotate(-2.5deg) scale(1.05)' }}>
        {/* Row 1: Left Marquee */}
        <div className="w-full overflow-hidden relative">
          <div 
            className="flex gap-4 items-center"
            style={{
              animation: animateLeft,
              width: 'max-content',
            }}
          >
            {duplicatedPanels.map((panel, idx) => (
              <div
                key={`row1-${panel.num}-${idx}`}
                className="flex flex-col group relative shrink-0"
                style={{ width: 'clamp(200px, 18vw, 280px)' }}
              >
                <div 
                  className="relative w-full overflow-hidden rounded-md shadow-xl bg-[#0E1012] border border-[#1F2225]"
                  style={{ height: 'clamp(120px, 16vh, 170px)' }}
                >
                  <img
                    src={getOptimizedCloudinaryUrl(panel.src, { width: 300 })}
                    alt={panel.title}
                    className="w-full h-full object-cover filter saturate-[1.1] contrast-[1.05]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#08090A]/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right Marquee (Reverse) */}
        <div className="w-full overflow-hidden relative">
          <div 
            className="flex gap-4 items-center"
            style={{
              animation: animateRight,
              width: 'max-content',
            }}
          >
            {duplicatedReversed.map((panel, idx) => (
              <div
                key={`row2-${panel.num}-${idx}`}
                className="flex flex-col group relative shrink-0"
                style={{ width: 'clamp(200px, 18vw, 280px)' }}
              >
                <div 
                  className="relative w-full overflow-hidden rounded-md shadow-xl bg-[#0E1012] border border-[#1F2225]"
                  style={{ height: 'clamp(120px, 16vh, 170px)' }}
                >
                  <img
                    src={getOptimizedCloudinaryUrl(panel.src, { width: 300 })}
                    alt={panel.title}
                    className="w-full h-full object-cover filter saturate-[1.1] contrast-[1.05]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#08090A]/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
