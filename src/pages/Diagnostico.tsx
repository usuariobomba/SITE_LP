import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { contactInfo } from '../data';
import { trackEvent } from '../lib/analytics';
import { FAIXAS_HORAS, calcularConta } from '../lib/horas';

type TextoStep = {
  kind: 'texto';
  key: 'pedido' | 'comoFazHoje' | 'custo' | 'proximo';
  titulo: string;
  dica: string;
  placeholder: string;
  obrigatorio: boolean;
};
type Step = TextoStep | { kind: 'horas' } | { kind: 'contato' };

const STEPS: Step[] = [
  {
    kind: 'texto',
    key: 'pedido',
    titulo: 'Se você pudesse tirar uma coisa da sua rotina, ou fazer funcionar sozinha, o que seria?',
    dica: 'Pode escrever do seu jeito. Não precisa ser técnico.',
    placeholder: 'Escreva aqui…',
    obrigatorio: true,
  },
  {
    kind: 'texto',
    key: 'comoFazHoje',
    titulo: 'Como você faz isso hoje?',
    dica: 'Conte como se estivesse explicando para alguém que acabou de entrar na empresa.',
    placeholder: 'Passo a passo, do jeito que acontece…',
    obrigatorio: true,
  },
  {
    kind: 'texto',
    key: 'custo',
    titulo: 'O que isso te custa hoje?',
    dica: 'Pode ser tempo, cliente que não volta, dinheiro ou paciência.',
    placeholder: 'Se não souber, pode pular.',
    obrigatorio: false,
  },
  { kind: 'horas' },
  {
    kind: 'texto',
    key: 'proximo',
    titulo: 'Quando isso estiver resolvido, qual seria a próxima coisa que você gostaria de melhorar?',
    dica: 'Opcional, mas costuma mostrar o que mais pesa.',
    placeholder: 'Se não souber, pode pular.',
    obrigatorio: false,
  },
  { kind: 'contato' },
];

function mascaraWhatsapp(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function lerUtm(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const p = new URLSearchParams(window.location.search);
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const v = p.get(k);
      if (v) out[k] = v.slice(0, 100);
    }
  } catch {
    // sem parâmetros
  }
  return out;
}

export default function Diagnostico() {
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState({ pedido: '', comoFazHoje: '', custo: '', proximo: '' });
  const [faixa, setFaixa] = useState('');
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consentimento, setConsentimento] = useState(false);
  const [isca, setIsca] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [concluido, setConcluido] = useState(false);
  const iniciou = useRef(false);

  // Página de anúncio: não precisa aparecer em buscas.
  useEffect(() => {
    const anterior = document.title;
    document.title = 'Diagnóstico | Lucas Prestes';
    const meta = document.querySelector('meta[name="robots"]');
    const robotsAnterior = meta?.getAttribute('content') ?? null;
    meta?.setAttribute('content', 'noindex, nofollow');
    return () => {
      document.title = anterior;
      if (meta && robotsAnterior) meta.setAttribute('content', robotsAnterior);
    };
  }, []);

  const step = STEPS[etapa];
  const conta = useMemo(() => (faixa ? calcularConta(faixa) : null), [faixa]);
  const progresso = concluido ? 100 : Math.round((etapa / STEPS.length) * 100);

  const podeAvancar = (() => {
    if (step.kind === 'texto') return !step.obrigatorio || respostas[step.key].trim().length >= 5;
    if (step.kind === 'horas') return faixa !== '';
    return nome.trim().length >= 2 && whatsapp.replace(/\D/g, '').length >= 10 && consentimento;
  })();

  const marcarInicio = () => {
    if (!iniciou.current) {
      iniciou.current = true;
      trackEvent({ name: 'lead_form_start', params: {} });
    }
  };

  const avancar = () => {
    setErro(null);
    trackEvent({ name: 'lead_form_step', params: { step: etapa + 1 } });
    setEtapa((e) => Math.min(e + 1, STEPS.length - 1));
  };

  const enviar = async () => {
    setErro(null);
    setEnviando(true);
    try {
      const r = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...respostas,
          faixaHoras: faixa || 'nao_sei',
          nome,
          whatsapp,
          consentimento,
          site: isca,
          utm: lerUtm(),
        }),
      });
      const dados = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(dados?.error || 'Não foi possível enviar agora.');
      trackEvent({ name: 'lead_form_submit', params: { faixa_horas: faixa || 'nao_sei' } });
      setConcluido(true);
    } catch (e: any) {
      setErro(e?.message || 'Não foi possível enviar agora. Tente de novo ou chame no WhatsApp.');
    } finally {
      setEnviando(false);
    }
  };

  const mensagemWhats = encodeURIComponent(`Oi Lucas, acabei de preencher o diagnóstico no seu site. Meu nome é ${nome.trim()}.`);
  const linkWhats = `${contactInfo.whatsapp}?text=${mensagemWhats}`;
  const trechoPedido = respostas.pedido.trim().replace(/\s+/g, ' ');
  const campo =
    'w-full rounded-xl bg-white/[0.04] border border-white/15 px-4 py-3.5 text-base text-[#F0EEE8] placeholder:text-white/35 focus:outline-none focus:border-[#B7FF00]/70 focus:ring-2 focus:ring-[#B7FF00]/20 transition';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 sm:px-8 pt-5 flex items-center justify-between">
        <a href="/" className="font-['Space_Grotesk'] font-bold tracking-tight text-lg text-[#F0EEE8]">
          Lucas Prestes
        </a>
        {!concluido && (
          <span className="text-xs text-white/50 tabular-nums">
            {etapa + 1} de {STEPS.length}
          </span>
        )}
      </header>

      <div className="px-5 sm:px-8 mt-4">
        <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden" role="progressbar" aria-valuenow={progresso} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-[#B7FF00] transition-all duration-500" style={{ width: `${progresso}%` }} />
        </div>
      </div>

      <main className="flex-1 flex items-start sm:items-center justify-center px-5 sm:px-8 py-8 sm:py-12">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {concluido ? (
              <motion.section key="fim" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="w-11 h-11 rounded-full bg-[#B7FF00] text-[#050607] flex items-center justify-center mb-6">
                  <Check className="w-6 h-6" strokeWidth={3} />
                </div>
                <h1 className="font-['Inter_Tight'] font-extrabold text-3xl sm:text-4xl leading-tight tracking-tight">
                  Recebi, {nome.trim().split(' ')[0]}.
                </h1>
                {trechoPedido && (
                  <p className="mt-5 text-white/70 text-base leading-relaxed">
                    Você me contou que quer resolver isto:
                    <span className="block mt-2 border-l-2 border-[#B7FF00] pl-4 text-[#F0EEE8] italic">
                      “{trechoPedido.length > 220 ? `${trechoPedido.slice(0, 220)}…` : trechoPedido}”
                    </span>
                  </p>
                )}
                {conta && <p className="mt-5 text-[#B7FF00] text-base">{conta.texto}</p>}
                <p className="mt-5 text-white/80 text-base leading-relaxed">
                  Vou ler com calma e te responder no WhatsApp com a minha leitura do seu caso.
                </p>
                <a
                  href={linkWhats}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ name: 'lead_form_whatsapp_click', params: {} })}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#B7FF00] text-[#050607] font-semibold px-6 py-3.5 hover:brightness-95 transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  Prefere já conversar agora?
                </a>
              </motion.section>
            ) : (
              <motion.section
                key={etapa}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22 }}
              >
                {etapa === 0 && (
                  <p className="text-[#B7FF00] text-sm font-medium mb-3">
                    Descubra onde seu negócio perde tempo. Leva cerca de 2 minutos.
                  </p>
                )}

                {step.kind === 'texto' && (
                  <>
                    <h1 className="font-['Inter_Tight'] font-extrabold text-2xl sm:text-3xl leading-tight tracking-tight">{step.titulo}</h1>
                    <p className="mt-3 text-white/60 text-sm sm:text-base">{step.dica}</p>
                    <textarea
                      value={respostas[step.key]}
                      onChange={(e) => {
                        marcarInicio();
                        setRespostas((r) => ({ ...r, [step.key]: e.target.value }));
                      }}
                      placeholder={step.placeholder}
                      rows={5}
                      maxLength={1500}
                      className={`${campo} mt-6 resize-none`}
                      aria-label={step.titulo}
                    />
                  </>
                )}

                {step.kind === 'horas' && (
                  <>
                    <h1 className="font-['Inter_Tight'] font-extrabold text-2xl sm:text-3xl leading-tight tracking-tight">
                      Quanto tempo isso toma por semana?
                    </h1>
                    <p className="mt-3 text-white/60 text-sm sm:text-base">Um palpite já serve.</p>
                    <div className="mt-6 grid gap-2.5">
                      {FAIXAS_HORAS.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFaixa(f.id)}
                          aria-pressed={faixa === f.id}
                          className={`text-left rounded-xl border px-4 py-3.5 text-base transition ${
                            faixa === f.id ? 'border-[#B7FF00] bg-[#B7FF00]/10 text-[#F0EEE8]' : 'border-white/15 bg-white/[0.03] text-white/80 hover:border-white/35'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                    {conta && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-5 rounded-xl border border-[#B7FF00]/40 bg-[#B7FF00]/[0.07] px-4 py-3.5 text-[#F0EEE8] text-base leading-relaxed"
                      >
                        {conta.texto}
                        <span className="block mt-1 text-xs text-white/50">Estimativa feita só com o número que você informou.</span>
                      </motion.p>
                    )}
                  </>
                )}

                {step.kind === 'contato' && (
                  <>
                    <h1 className="font-['Inter_Tight'] font-extrabold text-2xl sm:text-3xl leading-tight tracking-tight">
                      Para onde envio a minha leitura do seu caso?
                    </h1>
                    <p className="mt-3 text-white/60 text-sm sm:text-base">Respondo pelo WhatsApp.</p>
                    <div className="mt-6 grid gap-3">
                      <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome"
                        autoComplete="name"
                        maxLength={80}
                        className={campo}
                        aria-label="Seu nome"
                      />
                      <input
                        type="tel"
                        inputMode="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(mascaraWhatsapp(e.target.value))}
                        placeholder="WhatsApp com DDD"
                        autoComplete="tel"
                        className={campo}
                        aria-label="WhatsApp com DDD"
                      />
                      {/* Campo-isca contra robôs: invisível para pessoas. */}
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={isca}
                        onChange={(e) => setIsca(e.target.value)}
                        aria-hidden="true"
                        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                      />
                      <label className="flex items-start gap-3 text-sm text-white/65 leading-snug cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consentimento}
                          onChange={(e) => setConsentimento(e.target.checked)}
                          className="mt-0.5 h-4 w-4 accent-[#B7FF00]"
                        />
                        <span>Autorizo o contato por WhatsApp sobre este diagnóstico e o uso das minhas respostas apenas para essa finalidade.</span>
                      </label>
                    </div>
                  </>
                )}

                {erro && (
                  <p role="alert" className="mt-4 text-sm text-red-300">
                    {erro}
                  </p>
                )}

                <div className="mt-8 flex items-center gap-3">
                  {etapa > 0 && (
                    <button
                      type="button"
                      onClick={() => setEtapa((e) => Math.max(e - 1, 0))}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-3 text-sm text-white/80 hover:border-white/40 transition"
                    >
                      <ArrowLeft className="w-4 h-4" /> Voltar
                    </button>
                  )}
                  {step.kind === 'contato' ? (
                    <button
                      type="button"
                      disabled={!podeAvancar || enviando}
                      onClick={enviar}
                      className="inline-flex items-center gap-2 rounded-full bg-[#B7FF00] text-[#050607] font-semibold px-6 py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-95 transition"
                    >
                      {enviando ? 'Enviando…' : 'Enviar'} {!enviando && <ArrowRight className="w-4 h-4" />}
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled={!podeAvancar}
                        onClick={avancar}
                        className="inline-flex items-center gap-2 rounded-full bg-[#B7FF00] text-[#050607] font-semibold px-6 py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-95 transition"
                      >
                        Continuar <ArrowRight className="w-4 h-4" />
                      </button>
                      {step.kind === 'texto' && !step.obrigatorio && (
                        <button type="button" onClick={avancar} className="text-sm text-white/55 hover:text-white/80 underline underline-offset-4">
                          Pular
                        </button>
                      )}
                    </>
                  )}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
