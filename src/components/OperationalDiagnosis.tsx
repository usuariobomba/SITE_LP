import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  MessageSquare,
  Repeat,
  FolderSearch,
  Users,
  AlertTriangle,
  FileCheck,
  Compass,
  Hourglass,
  Hand,
  Check,
  Send,
  HelpCircle
} from 'lucide-react';
import { contactInfo } from '../data';
import { trackEvent } from '../lib/analytics';

interface DiagnosisResult {
  diagnosticId: string;
  timeSpentArea: string;
  rootCause: string;
  whatCanBeDone: string;
  categorySummary: string;
}

const TIME_SINKS_OPTIONS = [
  { id: 'repetitivas', label: 'Fazer tarefas repetitivas', icon: Repeat },
  { id: 'organizar', label: 'Organizar informações', icon: FolderSearch },
  { id: 'atender', label: 'Atender pessoas', icon: MessageSquare },
  { id: 'problemas', label: 'Resolver problemas', icon: AlertTriangle },
  { id: 'conferir', label: 'Conferir / revisar', icon: FileCheck },
  { id: 'acompanhar', label: 'Acompanhar coisas', icon: Compass },
  { id: 'cobrar', label: 'Cobrar / esperar outras pessoas', icon: Hourglass },
  { id: 'manualmente', label: 'Fazer tarefas manualmente', icon: Hand },
  { id: 'outro', label: 'Outro tipo de atividade', icon: HelpCircle },
];

const FRICTION_CAUSES_OPTIONS = [
  { id: 'varias_vezes', label: 'Preciso fazer várias vezes' },
  { id: 'dependo_pessoas', label: 'Dependo de outras pessoas' },
  { id: 'info_espalhadas', label: 'As informações estão espalhadas' },
  { id: 'procurar_conferir', label: 'Preciso procurar / conferir coisas' },
  { id: 'tudo_manual', label: 'Faço tudo manualmente' },
  { id: 'erros_retrabalho', label: 'Acontecem erros ou retrabalho' },
  { id: 'caso_diferente', label: 'Cada caso é diferente' },
  { id: 'sem_processo', label: 'Não existe um processo definido' },
  { id: 'outro_motivo', label: 'Outro motivo' },
];

const FREQUENCY_OPTIONS = [
  { id: 'varias_dia', label: 'Várias vezes por dia', badge: 'Constante' },
  { id: 'todos_dias', label: 'Todos os dias', badge: 'Diário' },
  { id: 'semana', label: 'Algumas vezes por semana', badge: 'Semanal' },
  { id: 'mes', label: 'Algumas vezes por mês', badge: 'Mensal' },
  { id: 'pontual', label: 'É algo pontual', badge: 'Ocasional' },
];

const IMPACT_OPTIONS = [
  { id: 'poucos_min', label: 'Poucos minutos', desc: 'Rápido, mas acumulativo' },
  { id: 'meia_hora', label: 'Até meia hora', desc: 'Consome blocos do dia' },
  { id: 'horas', label: 'Algumas horas', desc: 'Impacto pesado na produtividade' },
  { id: 'grande_parte', label: 'Grande parte do dia', desc: 'Toma quase todo o expediente' },
  { id: 'depende', label: 'Depende muito', desc: 'Varia conforme a demanda' },
];

export default function OperationalDiagnosis() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Accumulated state
  const [selectedTimeSinks, setSelectedTimeSinks] = useState<string[]>([]);
  const [customTimeSink, setCustomTimeSink] = useState('');
  
  const [selectedFrictionCauses, setSelectedFrictionCauses] = useState<string[]>([]);
  const [customFrictionCause, setCustomFrictionCause] = useState('');
  
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [selectedImpact, setSelectedImpact] = useState('');
  const [desiredRelief, setDesiredRelief] = useState('');
  
  // Step 6 adaptive deepening state (if triggered by AI)
  const [deepeningQuestion, setDeepeningQuestion] = useState('');
  const [suggestedOptions, setSuggestedOptions] = useState<string[]>([]);
  const [deepeningAnswer, setDeepeningAnswer] = useState('');
  
  // Status and result
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStart = () => {
    trackEvent({ name: 'diagnosis_start', params: { source: 'time_diagnosis_button' } });
    setHasStarted(true);
    setCurrentStep(1);
    setErrorMsg(null);
    scrollToTop();
  };

  const handleToggleTimeSink = (label: string) => {
    if (selectedTimeSinks.includes(label)) {
      setSelectedTimeSinks(selectedTimeSinks.filter((s) => s !== label));
    } else {
      if (selectedTimeSinks.length < 3) {
        setSelectedTimeSinks([...selectedTimeSinks, label]);
      }
    }
  };

  const handleToggleFrictionCause = (label: string) => {
    if (selectedFrictionCauses.includes(label)) {
      setSelectedFrictionCauses(selectedFrictionCauses.filter((s) => s !== label));
    } else {
      if (selectedFrictionCauses.length < 3) {
        setSelectedFrictionCauses([...selectedFrictionCauses, label]);
      }
    }
  };

  const handleNextFromStep1 = () => {
    if (selectedTimeSinks.length === 0) return;
    trackEvent({ name: 'diagnosis_step_answered', params: { step: 1, length: selectedTimeSinks.length } });
    setCurrentStep(2);
    scrollToTop();
  };

  const handleNextFromStep2 = () => {
    if (selectedFrictionCauses.length === 0) return;
    trackEvent({ name: 'diagnosis_step_answered', params: { step: 2, length: selectedFrictionCauses.length } });
    setCurrentStep(3);
    scrollToTop();
  };

  const handleSelectFrequency = (freq: string) => {
    setSelectedFrequency(freq);
    trackEvent({ name: 'diagnosis_step_answered', params: { step: 3, length: freq.length } });
    setCurrentStep(4);
    scrollToTop();
  };

  const handleSelectImpact = (imp: string) => {
    setSelectedImpact(imp);
    trackEvent({ name: 'diagnosis_step_answered', params: { step: 4, length: imp.length } });
    setCurrentStep(5);
    scrollToTop();
  };

  const handleAnalyzeFromStep5 = async () => {
    setErrorMsg(null);
    setIsLoading(true);

    const compiledTimeSinks = [
      ...selectedTimeSinks.filter((s) => s !== 'Outro tipo de atividade'),
      ...(customTimeSink.trim() ? [customTimeSink.trim()] : []),
    ];

    const compiledFrictions = [
      ...selectedFrictionCauses.filter((s) => s !== 'Outro motivo'),
      ...(customFrictionCause.trim() ? [customFrictionCause.trim()] : []),
    ];

    trackEvent({
      name: 'diagnosis_step_answered',
      params: { step: 5, length: desiredRelief.trim().length },
    });

    try {
      const response = await fetch('/api/diagnosis/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timeSinks: compiledTimeSinks,
          frictionCauses: compiledFrictions,
          frequency: selectedFrequency,
          impact: selectedImpact,
          desiredRelief: desiredRelief.trim(),
          isFinalStep: false,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data) {
        throw new Error(data?.error || 'Falha ao analisar as informações.');
      }

      if (data.isComplete) {
        setResult({
          diagnosticId: data.diagnosticId || 'TEMPO-REC',
          timeSpentArea: data.timeSpentArea,
          rootCause: data.rootCause,
          whatCanBeDone: data.whatCanBeDone,
          categorySummary: data.categorySummary || desiredRelief.slice(0, 40) || 'rotina operacional',
        });
        trackEvent({
          name: 'diagnosis_completed',
          params: { total_steps: 5, id: data.diagnosticId },
        });
      } else {
        // Step 6: Needs 1 follow-up question
        setDeepeningQuestion(data.deepeningQuestion || 'Hoje, onde essa rotina costuma travar mais?');
        setSuggestedOptions(data.suggestedOptions || []);
        setCurrentStep(6);
      }
      scrollToTop();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Não foi possível concluir a análise agora. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalizeFromDeepening = async () => {
    setErrorMsg(null);
    setIsLoading(true);

    const compiledTimeSinks = [
      ...selectedTimeSinks.filter((s) => s !== 'Outro tipo de atividade'),
      ...(customTimeSink.trim() ? [customTimeSink.trim()] : []),
    ];

    const compiledFrictions = [
      ...selectedFrictionCauses.filter((s) => s !== 'Outro motivo'),
      ...(customFrictionCause.trim() ? [customFrictionCause.trim()] : []),
    ];

    try {
      const response = await fetch('/api/diagnosis/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timeSinks: compiledTimeSinks,
          frictionCauses: compiledFrictions,
          frequency: selectedFrequency,
          impact: selectedImpact,
          desiredRelief: desiredRelief.trim(),
          deepeningQuestion,
          deepeningAnswer: deepeningAnswer.trim(),
          isFinalStep: true,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data) {
        throw new Error(data?.error || 'Falha ao concluir o diagnóstico.');
      }

      setResult({
        diagnosticId: data.diagnosticId || 'TEMPO-REC',
        timeSpentArea: data.timeSpentArea,
        rootCause: data.rootCause,
        whatCanBeDone: data.whatCanBeDone,
        categorySummary: data.categorySummary || desiredRelief.slice(0, 40) || 'rotina operacional',
      });
      trackEvent({
        name: 'diagnosis_completed',
        params: { total_steps: 6, id: data.diagnosticId },
      });
      scrollToTop();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Não foi possível finalizar o diagnóstico. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    trackEvent({ name: 'diagnosis_restarted', params: {} });
    setHasStarted(false);
    setCurrentStep(1);
    setSelectedTimeSinks([]);
    setCustomTimeSink('');
    setSelectedFrictionCauses([]);
    setCustomFrictionCause('');
    setSelectedFrequency('');
    setSelectedImpact('');
    setDesiredRelief('');
    setDeepeningQuestion('');
    setSuggestedOptions([]);
    setDeepeningAnswer('');
    setResult(null);
    setErrorMsg(null);
    scrollToTop();
  };

  // Build WhatsApp contextual link
  const getWhatsAppLink = () => {
    if (!result) return contactInfo.whatsapp;
    const cleanProblem = result.categorySummary || result.timeSpentArea.slice(0, 60);
    const message = `Oi Lucas, fiz o Diagnóstico de Tempo no site. O principal ponto que apareceu foi ${cleanProblem}. Gostaria de entender o que poderia ser feito.`;
    return `https://wa.me/5515998300680?text=${encodeURIComponent(message)}`;
  };

  const totalVisualSteps = deepeningQuestion ? 6 : 5;
  const progressPercent = Math.min(100, Math.round((currentStep / totalVisualSteps) * 100));

  return (
    <section 
      id="diagnostico" 
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[#050607] border-t border-white/[0.07] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(183,255,0,0.06),rgba(5,6,7,0))]" />
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Title Section */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/[0.08] text-white/70 text-xs font-mono tracking-wider uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00] animate-pulse" />
            DIAGNÓSTICO DE TEMPO
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-impact font-bold tracking-tight text-white uppercase max-w-2xl mx-auto leading-tight">
            Vamos descobrir onde seu tempo está indo.
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-white/60 max-w-xl mx-auto font-sans leading-relaxed">
            Algumas perguntas rápidas. No final, mostramos onde pode existir trabalho desnecessário na sua operação.
          </p>
        </div>

        {/* Diagnostic Box Container */}
        <div className="bg-[#0A0C0E] border border-white/[0.1] shadow-2xl p-5 sm:p-8 md:p-10 relative">
          
          {/* Progress Bar (Visible once started and not finished) */}
          {hasStarted && !result && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
                <span className="text-[#B7FF00] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  ETAPA {currentStep} DE {totalVisualSteps}
                </span>
                <span>{progressPercent}% CONCLUÍDO</span>
              </div>
              <div className="h-1 bg-white/[0.06] overflow-hidden w-full">
                <motion.div 
                  className="h-full bg-[#B7FF00]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}

          {/* ERROR NOTIFICATION */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
              <p className="flex-1">{errorMsg}</p>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: INITIAL SCREEN (Before Start) */}
          {/* ========================================================================= */}
          {!hasStarted && !result && (
            <div className="py-6 sm:py-10 text-center space-y-8">
              <div className="max-w-xl mx-auto space-y-4">
                <p className="text-white/80 text-base sm:text-lg font-sans leading-relaxed">
                  Não procuramos softwares ou soluções prontas. A proposta é direta: entender a sua rotina real e identificar os pontos manuais que drenam horas da sua equipe.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-left">
                  <div className="p-3.5 bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[#B7FF00] font-mono text-xs mb-1">01. INVESTIGAÇÃO</div>
                    <div className="text-white/80 text-xs leading-relaxed">Respostas diretas por toque, sem questionários longos.</div>
                  </div>
                  <div className="p-3.5 bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[#B7FF00] font-mono text-xs mb-1">02. CAUSA REAL</div>
                    <div className="text-white/80 text-xs leading-relaxed">Identifica o atrito sem jargões ou soluções forçadas.</div>
                  </div>
                  <div className="p-3.5 bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[#B7FF00] font-mono text-xs mb-1">03. PARECER CLARO</div>
                    <div className="text-white/80 text-xs leading-relaxed">Visão objetiva do que pode ser feito para recuperar tempo.</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="btn-start-diagnosis"
                  onClick={handleStart}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#B7FF00] text-[#050607] font-tech font-bold text-sm tracking-wider uppercase hover:bg-[#c6ff33] transition-colors shadow-[0_0_25px_rgba(183,255,0,0.25)]"
                >
                  DESCUBRA ONDE A IA PODE DEVOLVER TEMPO À SUA EMPRESA
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW: STAGES (1 to 6) */}
          {/* ========================================================================= */}
          {hasStarted && !result && (
            <AnimatePresence mode="wait">
              {/* STEP 1: TIME SINKS */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-impact font-bold text-white uppercase tracking-tight">
                      Em que tipo de coisa você sente que mais perde tempo?
                    </h3>
                    <p className="text-sm text-white/50 font-sans mt-1">
                      Selecione até 3 opções que mais pesam na sua rotina diária.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {TIME_SINKS_OPTIONS.map((item) => {
                      const isSelected = selectedTimeSinks.includes(item.label);
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleToggleTimeSink(item.label)}
                          className={`flex items-center gap-3 p-3.5 text-left border transition-all text-sm ${
                            isSelected
                              ? 'bg-[#B7FF00]/10 border-[#B7FF00] text-white'
                              : 'bg-white/[0.02] border-white/[0.08] text-white/80 hover:border-white/20 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className={`p-1.5 rounded-none ${isSelected ? 'text-[#B7FF00]' : 'text-white/40'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="flex-1 font-sans leading-tight">{item.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#B7FF00] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {selectedTimeSinks.includes('Outro tipo de atividade') && (
                    <div className="pt-2">
                      <input
                        type="text"
                        value={customTimeSink}
                        onChange={(e) => setCustomTimeSink(e.target.value)}
                        placeholder="Especifique a atividade em poucas palavras..."
                        className="w-full bg-[#050607] border border-white/20 px-4 py-2.5 text-white text-sm focus:border-[#B7FF00] focus:outline-none"
                      />
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between border-t border-white/[0.07]">
                    <span className="text-xs font-mono text-white/40">
                      {selectedTimeSinks.length}/3 selecionados
                    </span>
                    <button
                      id="btn-step1-next"
                      type="button"
                      disabled={selectedTimeSinks.length === 0}
                      onClick={handleNextFromStep1}
                      className={`inline-flex items-center gap-2 px-6 py-3 font-tech font-bold text-xs tracking-wider uppercase transition-all ${
                        selectedTimeSinks.length > 0
                          ? 'bg-[#B7FF00] text-[#050607] hover:bg-[#c6ff33]'
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      AVANÇAR
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: FRICTION CAUSES */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-impact font-bold text-white uppercase tracking-tight">
                      O que costuma tornar isso demorado?
                    </h3>
                    <p className="text-sm text-white/50 font-sans mt-1">
                      Selecione até 3 motivos que mais causam atrito ou lentidão.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {FRICTION_CAUSES_OPTIONS.map((item) => {
                      const isSelected = selectedFrictionCauses.includes(item.label);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleToggleFrictionCause(item.label)}
                          className={`flex items-center justify-between p-3.5 text-left border transition-all text-sm ${
                            isSelected
                              ? 'bg-[#B7FF00]/10 border-[#B7FF00] text-white'
                              : 'bg-white/[0.02] border-white/[0.08] text-white/80 hover:border-white/20 hover:bg-white/[0.04]'
                          }`}
                        >
                          <span className="font-sans leading-tight pr-2">{item.label}</span>
                          {isSelected ? (
                            <Check className="w-4 h-4 text-[#B7FF00] shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedFrictionCauses.includes('Outro motivo') && (
                    <div className="pt-2">
                      <input
                        type="text"
                        value={customFrictionCause}
                        onChange={(e) => setCustomFrictionCause(e.target.value)}
                        placeholder="Descreva o motivo brevemente..."
                        className="w-full bg-[#050607] border border-white/20 px-4 py-2.5 text-white text-sm focus:border-[#B7FF00] focus:outline-none"
                      />
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between border-t border-white/[0.07]">
                    <button
                      type="button"
                      onClick={() => { setCurrentStep(1); scrollToTop(); }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      VOLTAR
                    </button>
                    <button
                      id="btn-step2-next"
                      type="button"
                      disabled={selectedFrictionCauses.length === 0}
                      onClick={handleNextFromStep2}
                      className={`inline-flex items-center gap-2 px-6 py-3 font-tech font-bold text-xs tracking-wider uppercase transition-all ${
                        selectedFrictionCauses.length > 0
                          ? 'bg-[#B7FF00] text-[#050607] hover:bg-[#c6ff33]'
                          : 'bg-white/10 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      AVANÇAR
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: FREQUENCY */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-impact font-bold text-white uppercase tracking-tight">
                      Isso acontece com que frequência?
                    </h3>
                    <p className="text-sm text-white/50 font-sans mt-1">
                      Toque na opção mais comum na sua operação.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FREQUENCY_OPTIONS.map((item) => {
                      const isSelected = selectedFrequency === item.label;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectFrequency(item.label)}
                          className={`flex items-center justify-between p-4 text-left border transition-all ${
                            isSelected
                              ? 'bg-[#B7FF00]/10 border-[#B7FF00] text-white'
                              : 'bg-white/[0.02] border-white/[0.08] text-white/80 hover:border-white/25 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div>
                            <div className="font-sans font-medium text-white text-sm">{item.label}</div>
                          </div>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-white/[0.06] text-white/60">
                            {item.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-white/[0.07]">
                    <button
                      type="button"
                      onClick={() => { setCurrentStep(2); scrollToTop(); }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      VOLTAR
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: IMPACT / DIMENSION */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-impact font-bold text-white uppercase tracking-tight">
                      Quando isso acontece, quanto trabalho costuma dar?
                    </h3>
                    <p className="text-sm text-white/50 font-sans mt-1">
                      Uma estimativa geral de esforço (sem precisar de cálculos exatos).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {IMPACT_OPTIONS.map((item) => {
                      const isSelected = selectedImpact === item.label;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectImpact(item.label)}
                          className={`flex items-center justify-between p-4 text-left border transition-all ${
                            isSelected
                              ? 'bg-[#B7FF00]/10 border-[#B7FF00] text-white'
                              : 'bg-white/[0.02] border-white/[0.08] text-white/80 hover:border-white/25 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div>
                            <div className="font-sans font-medium text-white text-sm">{item.label}</div>
                            <div className="text-xs text-white/40 font-sans mt-0.5">{item.desc}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#B7FF00] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-white/[0.07]">
                    <button
                      type="button"
                      onClick={() => { setCurrentStep(3); scrollToTop(); }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      VOLTAR
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: DESIRED RELIEF (OPEN SHORT TEXT) */}
              {currentStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl sm:text-2xl font-impact font-bold text-white uppercase tracking-tight">
                      O que você gostaria que simplesmente deixasse de precisar fazer?
                    </h3>
                    <p className="text-sm text-white/50 font-sans mt-1">
                      Descreva em poucas palavras a tarefa concreta que mais consome sua energia.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={desiredRelief}
                      onChange={(e) => setDesiredRelief(e.target.value)}
                      placeholder="Ex.: conferir se o pedido bate com a nota, responder as mesmas dúvidas no WhatsApp, juntar relatórios de 3 sistemas..."
                      className="w-full bg-[#050607] border border-white/20 p-4 text-white text-sm focus:border-[#B7FF00] focus:outline-none resize-none font-sans leading-relaxed"
                    />
                    <div className="text-right text-[11px] font-mono text-white/40">
                      {desiredRelief.length} caracteres
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-white/[0.07]">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => { setCurrentStep(4); scrollToTop(); }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      VOLTAR
                    </button>
                    <button
                      id="btn-step5-analyze"
                      type="button"
                      disabled={isLoading}
                      onClick={handleAnalyzeFromStep5}
                      className="inline-flex items-center gap-2 px-7 py-3 bg-[#B7FF00] text-[#050607] font-tech font-bold text-xs tracking-wider uppercase hover:bg-[#c6ff33] transition-all shadow-[0_0_15px_rgba(183,255,0,0.15)] disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-3 h-3 border-2 border-[#050607] border-t-transparent rounded-full animate-spin" />
                          ANALISANDO...
                        </>
                      ) : (
                        <>
                          ANALISAR ROTINA
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 6: ADAPTIVE DEEPENING (OPTIONAL FOLLOW-UP QUESTION) */}
              {currentStep === 6 && (
                <motion.div
                  key="step-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#B7FF00] tracking-wider uppercase bg-[#B7FF00]/10 px-2.5 py-1 mb-2">
                      <Sparkles className="w-3 h-3" />
                      APROFUNDAMENTO // APENAS MAIS UM PONTO
                    </div>
                    <h3 className="text-xl sm:text-2xl font-impact font-bold text-white uppercase tracking-tight">
                      {deepeningQuestion}
                    </h3>
                    <p className="text-sm text-white/50 font-sans mt-1">
                      Responda rapidamente para fechar o parecer com precisão.
                    </p>
                  </div>

                  {suggestedOptions.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-white/40 uppercase">Sugestões rápidas:</div>
                      <div className="flex flex-wrap gap-2">
                        {suggestedOptions.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setDeepeningAnswer(opt)}
                            className={`px-3.5 py-2 border text-xs font-sans transition-all text-left ${
                              deepeningAnswer === opt
                                ? 'bg-[#B7FF00]/15 border-[#B7FF00] text-white'
                                : 'bg-white/[0.03] border-white/[0.08] text-white/70 hover:border-white/20'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      value={deepeningAnswer}
                      onChange={(e) => setDeepeningAnswer(e.target.value)}
                      placeholder="Digite sua resposta..."
                      className="w-full bg-[#050607] border border-white/20 px-4 py-3 text-white text-sm focus:border-[#B7FF00] focus:outline-none font-sans"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-white/[0.07]">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => { setCurrentStep(5); scrollToTop(); }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      VOLTAR
                    </button>
                    <button
                      id="btn-step6-finalize"
                      type="button"
                      disabled={isLoading}
                      onClick={handleFinalizeFromDeepening}
                      className="inline-flex items-center gap-2 px-7 py-3 bg-[#B7FF00] text-[#050607] font-tech font-bold text-xs tracking-wider uppercase hover:bg-[#c6ff33] transition-all shadow-[0_0_15px_rgba(183,255,0,0.15)] disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-3 h-3 border-2 border-[#050607] border-t-transparent rounded-full animate-spin" />
                          CONCLUINDO...
                        </>
                      ) : (
                        <>
                          CONCLUIR DIAGNÓSTICO
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* ========================================================================= */}
          {/* VIEW: RESULT SCREEN (Diagnóstico Concluído) */}
          {/* ========================================================================= */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header Status */}
              <div className="border-b border-white/[0.08] pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B7FF00] tracking-wider uppercase mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#B7FF00]" />
                    DIAGNÓSTICO CONCLUÍDO
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-impact font-bold text-white uppercase tracking-tight">
                    Encontramos um possível ponto de perda de tempo.
                  </h3>
                </div>
                <div className="text-xs font-mono text-white/40 sm:text-right">
                  ID: <span className="text-white/80 font-bold">{result.diagnosticId}</span>
                </div>
              </div>

              {/* 3 Main Result Cards */}
              <div className="space-y-4">
                
                {/* 1. ONDE O TEMPO ESTÁ SENDO GASTO */}
                <div className="p-5 sm:p-6 bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#B7FF00] tracking-wider uppercase mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00]" />
                    ONDE O TEMPO ESTÁ SENDO GASTO
                  </div>
                  <p className="text-white text-base sm:text-lg font-sans leading-relaxed">
                    {result.timeSpentArea}
                  </p>
                </div>

                {/* 2. O QUE ESTÁ POR TRÁS DISSO */}
                <div className="p-5 sm:p-6 bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider uppercase mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    O QUE ESTÁ POR TRÁS DISSO
                  </div>
                  <p className="text-white/80 text-sm sm:text-base font-sans leading-relaxed">
                    {result.rootCause}
                  </p>
                </div>

                {/* 3. O QUE PODE SER FEITO */}
                <div className="p-5 sm:p-6 bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider uppercase mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    O QUE PODE SER FEITO
                  </div>
                  <p className="text-white/80 text-sm sm:text-base font-sans leading-relaxed">
                    {result.whatCanBeDone}
                  </p>
                </div>

              </div>

              {/* Contextual CTA Section */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  id="btn-whatsapp-diagnosis"
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ name: 'diagnosis_whatsapp_cta', params: { id: result.diagnosticId } })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#B7FF00] text-[#050607] font-tech font-bold text-sm tracking-wider uppercase hover:bg-[#c6ff33] transition-all shadow-[0_0_25px_rgba(183,255,0,0.25)] text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  QUERO DEVOLVER ESSE TEMPO
                </a>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  REFAZER DIAGNÓSTICO
                </button>
              </div>

            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
