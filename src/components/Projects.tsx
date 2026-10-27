import { useState, useRef } from 'react';
import { projects } from '../data';
import { Project } from '../types';
import { Play, X, ArrowRight } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

function VideoPlayer({ project, onPlayStateChange }: { project: Project; onPlayStateChange?: (playing: boolean) => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(
    project.youtubeId ? `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg` : ''
  );
  const [hasFailed, setHasFailed] = useState(false);
  const retryRef = useRef(0);

  const handlePlay = () => {
    trackEvent({
      name: 'case_video_play',
      params: { case_id: project.id, video_url: project.videoUrl }
    });
    setIsPlaying(true);
    onPlayStateChange?.(true);
  };

  const handleImgError = () => {
    if (retryRef.current === 0 && project.youtubeId) {
      retryRef.current = 1;
      setImgSrc(`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`);
    } else {
      setHasFailed(true);
    }
  };

  if (!project.youtubeId) return null;

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-[16/9] bg-[#050607] rounded-xl overflow-hidden shadow-2xl border border-[#1F2630]">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1`}
          title={project.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
        <button
          type="button"
          onClick={() => {
            setIsPlaying(false);
            onPlayStateChange?.(false);
          }}
          className="absolute top-3 right-3 z-30 px-3 py-1 bg-[#050607]/90 hover:bg-[#1F2630] text-[#F0EEE8] rounded-md border border-[#1F2630] text-xs flex items-center gap-1.5 transition-colors shadow-lg cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
          <span className="font-tech text-[10px] font-bold uppercase">FECHAR</span>
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={handlePlay}
      className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#090C0E] border border-[#1F2630] cursor-pointer group select-none shadow-xl"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePlay();
        }
      }}
      aria-label={`Assistir demonstração de ${project.name}`}
    >
      {!hasFailed && imgSrc ? (
        <img
          src={imgSrc}
          onError={handleImgError}
          alt={`Demonstração de ${project.name}`}
          className="w-full h-full object-cover filter brightness-[0.8] group-hover:brightness-95 group-hover:scale-[1.02] transition-all duration-500 ease-out"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#090C0E] p-6 text-center">
          <span className="font-tech text-xs text-[#8C9094] mb-1 uppercase tracking-wider">DEMONSTRAÇÃO EM VÍDEO</span>
          <span className="font-impact uppercase text-base text-white">{project.name}</span>
        </div>
      )}

      {/* Dark overlay with glowing play button */}
      <div className="absolute inset-0 bg-[#050607]/30 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#050607]/90 border border-[#B7FF00]/60 text-[#B7FF00] group-hover:bg-[#B7FF00] group-hover:text-[#050607] group-hover:border-[#B7FF00] flex items-center justify-center shadow-2xl backdrop-blur-md group-hover:scale-110 transition-all duration-200">
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </div>
      </div>

      <div className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 bg-[#050607]/90 backdrop-blur-md rounded border border-[#1F2630] pointer-events-none">
        <span className="font-tech text-[9px] uppercase tracking-wider text-white font-bold">
          ASSISTIR VÍDEO
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  // Primary featured case
  const featuredProject = projects.find(p => p.id === 'conferencia-pedidos-nfe') || projects[0];
  
  // Secondary cases
  const secondaryProjects = projects.filter(p => p.id !== featuredProject.id);

  // Active secondary project modal or expanded inline view
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const handleCtaClick = () => {
    trackEvent({
      name: 'time_diagnosis_cta_click',
      params: { location: 'projects_section' }
    });
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSecondary = (project: Project) => {
    trackEvent({
      name: 'case_open',
      params: { case_id: project.id, case_title: project.name }
    });
    setActiveModalProject(project);
  };

  return (
    <section
      id="casos-reais"
      className="relative py-14 sm:py-20 md:py-24 bg-[#050607]/80 backdrop-blur-[2px] text-[#F0EEE8] overflow-hidden"
    >
      {/* Anchor for backward compatibility with existing #projects links */}
      <div id="projects" className="absolute -top-20 left-0 pointer-events-none" />
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#B7FF00]/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]" />
            <span className="font-tech text-[11px] tracking-[0.2em] text-[#8C9094] uppercase font-bold">
              PROVAS REAIS
            </span>
          </div>

          <h2 className="font-impact uppercase tracking-tight text-white text-[clamp(2.1rem,5.5vw,3.8rem)] leading-[0.96] font-black">
            CASOS REAIS. <br />
            <span className="text-[#8C9094]">SISTEMAS QUE ELIMINARAM</span>{' '}
            <span className="text-[#B7FF00] font-marker normal-case tracking-normal block sm:inline text-[0.92em] drop-shadow-[0_0_24px_rgba(183,255,0,0.4)]">
              trabalho manual.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#A6ABB0] leading-relaxed max-w-2xl mt-2">
            Demonstrações práticas de softwares sob medida construídos para aposentar conferências no papel e devolver horas de trabalho.
          </p>
        </div>

        {/* 1. FEATURED CASE PRINCIPAL */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#090C0E] border border-[#1F2630] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          {/* Narrative / Specs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-[#B7FF00]/10 border border-[#B7FF00]/30 font-tech text-[10px] font-black text-[#B7FF00]">
                CASE DESTAQUE
              </span>
              <span className="font-tech text-[10px] text-[#8C9094] uppercase tracking-wider">
                Auditoria Fiscal Automática
              </span>
            </div>

            <h3 className="font-impact uppercase text-2xl sm:text-3xl text-white font-black leading-tight">
              {featuredProject.name}
            </h3>

            {featuredProject.painHeadline && (
              <p className="font-sans text-xs sm:text-sm text-[#E0E2E4] italic border-l-2 border-[#B7FF00] pl-3 py-0.5 leading-relaxed">
                "{featuredProject.painHeadline}"
              </p>
            )}

            <div className="space-y-2 pt-1">
              {featuredProject.specs.map((spec) => (
                <div key={spec.label} className="p-2.5 rounded-xl bg-[#050607] border border-[#1F2630]/80 space-y-0.5">
                  <span className="font-tech text-[9px] text-[#B7FF00] uppercase font-bold tracking-wider block">
                    {spec.label.split('(')[0].trim()}
                  </span>
                  <p className="font-sans text-xs text-[#C4C7CB] leading-relaxed">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Video Player */}
          <div className="lg:col-span-6">
            <VideoPlayer project={featuredProject} />
          </div>
        </div>

        {/* 2. OUTROS PROJETOS: Horizontal Scroll-Snap Track */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-left">
            <span className="font-tech text-xs font-bold text-[#8C9094] uppercase tracking-wider">
              OUTROS PROJETOS DESENVOLVIDOS ({secondaryProjects.length})
            </span>
            <span className="font-tech text-[10px] text-[#B7FF00] uppercase sm:hidden">
              ARRASTE →
            </span>
          </div>

          {/* Horizontal Track (Mobile: swipe-snap / Desktop: 3 compact columns) */}
          <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible snap-x-mandatory sm:snap-none no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 pb-2 sm:pb-0">
            {secondaryProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => handleSelectSecondary(project)}
                className="w-[80vw] sm:w-auto shrink-0 snap-start p-4 rounded-2xl bg-[#090C0E] border border-[#1F2630] hover:border-[#B7FF00]/50 transition-all duration-200 cursor-pointer text-left flex flex-col justify-between group space-y-3"
              >
                <div className="space-y-2">
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-[#050607] border border-[#1F2630]">
                    {project.youtubeId && (
                      <img
                        src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`}
                        alt={project.name}
                        className="w-full h-full object-cover filter brightness-[0.75] group-hover:brightness-95 group-hover:scale-105 transition-all duration-300"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-9 h-9 rounded-full bg-[#050607]/80 text-[#B7FF00] border border-[#B7FF00]/40 flex items-center justify-center group-hover:bg-[#B7FF00] group-hover:text-[#050607] transition-colors">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-tech text-[10px] font-black text-[#B7FF00]">
                      0{idx + 2}
                    </span>
                    <span className="font-tech text-[8.5px] text-[#8C9094] uppercase tracking-wider">
                      {project.category.split('//')[0].trim()}
                    </span>
                  </div>

                  <h4 className="font-impact uppercase text-base text-white font-black leading-tight group-hover:text-[#B7FF00] transition-colors">
                    {project.name}
                  </h4>

                  <p className="font-sans text-xs text-[#8C9094] line-clamp-2 leading-relaxed">
                    {project.painHeadline || project.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#1F2630]/60 flex items-center justify-between text-xs font-tech font-bold text-[#F0EEE8] group-hover:text-[#B7FF00]">
                  <span>VER DETALHES & VÍDEO</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Conversion Anchor */}
        <div className="text-center max-w-md mx-auto pt-2">
          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full min-h-[48px] py-3 px-6 flex items-center justify-center gap-2 bg-[#B7FF00] hover:bg-[#D4FF55] text-[#050607] font-tech font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-[0_0_24px_rgba(183,255,0,0.25)] active:scale-[0.98] cursor-pointer"
          >
            <span>DESCOBRIR ONDE ESTOU PERDENDO TEMPO</span>
            <ArrowRight className="w-4 h-4 stroke-[3] shrink-0" />
          </button>
        </div>

      </div>

      {/* Secondary Project Light Modal / Overlay */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#050607]/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#090C0E] border border-[#1F2630] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-left">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#1F2630] pb-3">
              <div>
                <span className="font-tech text-[10px] text-[#B7FF00] font-black uppercase">
                  DEMONSTRAÇÃO REAL
                </span>
                <h3 className="font-impact uppercase text-xl text-white font-black leading-tight">
                  {activeModalProject.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="p-1.5 rounded-lg bg-[#050607] hover:bg-[#1F2630] text-[#F0EEE8] transition-colors cursor-pointer border border-[#1F2630]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Video Player */}
            <VideoPlayer project={activeModalProject} />

            {/* Modal Quick Specs */}
            <div className="space-y-2 pt-1">
              {activeModalProject.specs.map((spec) => (
                <div key={spec.label} className="p-2.5 rounded-lg bg-[#050607] border border-[#1F2630]/70 space-y-0.5">
                  <span className="font-tech text-[9px] text-[#B7FF00] uppercase font-bold tracking-wider block">
                    {spec.label.split('(')[0].trim()}
                  </span>
                  <p className="font-sans text-xs text-[#C4C7CB] leading-relaxed">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
