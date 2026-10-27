import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, MessageCircle, Target, Compass } from 'lucide-react';
import { contactInfo } from '../data';
import { trackEvent } from '../lib/analytics';
import { FAIXAS_HORAS, calcularConta } from '../lib/horas';

type Caminho = 'especifico' | 'explorar';

const SINAIS = [
  'Respondo as mesmas perguntas várias vezes',
  'Passo a mesma informação de um lugar para outro',
  'Confiro coisas na mão',
  'Esqueço prazos ou retornos',
  'Só uma pessoa sabe fazer certas coisas',
  'Descubro os erros tarde demais',
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

const campo =
  'w-full rounded-xl bg-white/[0.04] border border-white/15 px-4 py-3.5 text-base text-[#F0EEE8] placeholder:text-white/35 focus:outline-none focus:border-[#B7FF00]/70 focus:ring-2 focus:ring-[#B7FF00]/20 transition';

function Rotulo({ titulo, dica }: { titulo: string; dica?: string }) {
  return (
    <div className="mb-2.5">
      <p className="font-['Inter_Tight'] font-bold text-lg sm:text-xl leading-snug">{titulo}</p>
      {dica && <p className="mt-1 text-sm text-white/55">{dica}</p>}
    </div>
  );
}

export default function Diagnostico() {
  const [caminho, setCaminho] = useState<Caminho | null>(null);
  const [pedido, setPedido] = useState('');
  const [comoFazHoje, setComoFazHoje] = useState('');
  const [negocio, setNegocio] = useState('');
  const [sinais, setSinais] = useState<string[]>([]);
  const [faixa, setFaixa] = useState('');
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consentimento, setConsentimento] = useState(false);
  const [isca, setIsca] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [concluido, setConcluido] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

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

  const conta = useMemo(() => (faixa ? calcularConta(faixa) : null), [faixa]);

  const escolher = (c: Caminho) => {
    if (caminho !== c) trackEvent({ name: 'lead_form_start', params: { caminho: c } });
    setCaminho(c);
    setErro(null);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  };

  const alternarSinal = (s: string) =>
    setSinais((atual) => (atual.includes(s) ? atual.filter((x) => x !== s) : atual.length < 4 ? [...atual, s] : atual));

  const contatoOk = nome.trim().length >= 2 && whatsapp.replace(/\D/g, '').length >= 10 && consentimento;
  const conteudoOk =
    caminho === 'especifico'
      ? pedido.trim().length >= 5 && comoFazHoje.trim().length >= 5
      : caminho === 'explorar'
        ? negocio.trim().length >= 2 && pedido.trim().length >= 5
        : false;
  const podeEnviar = conteudoOk && contatoOk && !enviando;

  const enviar = async () => {
    if (!caminho) return;
    setErro(null);
    setEnviando(true);
    try {
      const r = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caminho,
          pedido,
          comoFazHoje: caminho === 'especifico' ? comoFazHoje : '',
          negocio: caminho === 'explorar' ? negocio : '',
          sinais: caminho === 'explorar' ? sinais : [],
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
      trackEvent({ name: 'lead_form_submit', params: { caminho, faixa_horas: faixa || 'nao_sei' } });
      setConcluido(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e: any) {
      setErro(e?.message || 'Não foi possível enviar agora. Tente de novo ou chame no WhatsApp.');
    } finally {
      setEnviando(false);
    }
  };

  const linkWhats = `${contactInfo.whatsapp}?text=${encodeURIComponent(`Oi Lucas, acabei de preencher o diagnóstico no seu site. Meu nome é ${nome.trim()}.`)}`;
  const trechoPedido = pedido.trim().replace(/\s+/g, ' ');

  const cartao = (c: Caminho, Icone: typeof Target, titulo: string, texto: string) => (
    <button
      type="button"
      onClick={() => escolher(c)}
      aria-pressed={caminho === c}
      className={`text-left rounded-2xl border p-5 transition w-full ${
        caminho === c ? 'border-[#B7FF00] bg-[#B7FF00]/10' : 'border-white/15 bg-white/[0.03] hover:border-white/35'
      }`}
    >
      <Icone className={`w-6 h-6 mb-3 ${caminho === c ? 'text-[#B7FF00]' : 'text-white/60'}`} />
      <span className="block font-['Inter_Tight'] font-bold text-lg leading-snug">{titulo}</span>
      <span className="block mt-1 text-sm text-white/60 leading-snug">{texto}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-5 sm:px-8 pt-5">
        <a href="/" className="font-['Space_Grotesk'] font-bold tracking-tight text-lg text-[#F0EEE8]">
          Lucas Prestes
        </a>
      </header>

      <main className="flex-1 flex justify-center px-5 sm:px-8 py-10 sm:py-14">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {concluido ? (
              <motion.section key="fim" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="w-11 h-11 rounded-full bg-[#B7FF00] text-[#050607] flex items-center justify-center mb-6">
                  <Check className="w-6 h-6" strokeWidth={3} />
                </div>
                <h1 className="font-['Inter_Tight'] font-extrabold text-3xl sm:text-4xl leading-tight tracking-tight">
                  Recebi, {nome.trim().split(' ')[0]}.
                </h1>
                {trechoPedido && (
                  <p className="mt-5 text-white/70 text-base leading-relaxed">
                    {caminho === 'explorar' ? 'Você me contou que o que mais pesou foi:' : 'Você me contou que quer resolver isto:'}
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
              <motion.section key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                <h1 className="font-['Inter_Tight'] font-extrabold text-3xl sm:text-4xl leading-tight tracking-tight">
                  Onde o seu negócio perde tempo?
                </h1>
                <p className="mt-3 text-white/65 text-base leading-relaxed">
                  Conte em cerca de 2 minutos. Eu leio e respondo com a minha leitura do seu caso.
                </p>

                <p className="mt-9 mb-3 text-sm font-medium text-[#B7FF00]">Qual dessas é a sua situação?</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {cartao('especifico', Target, 'Já sei o que quero resolver', 'Tenho uma tarefa, um processo ou uma ideia em mente.')}
                  {cartao('explorar', Compass, 'Quero entender por onde começar', 'Sinto que dá para melhorar, mas não sei o quê nem como a IA entra.')}
                </div>

                <AnimatePresence>
                  {caminho && (
                    <motion.div
                      key={caminho}
                      ref={formRef}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-9 grid gap-7 scroll-mt-6"
                    >
                      {caminho === 'especifico' ? (
                        <>
                          <div>
                            <Rotulo titulo="O que você quer resolver ou fazer funcionar sozinho?" dica="Pode escrever do seu jeito. Não precisa ser técnico." />
                            <textarea value={pedido} onChange={(e) => setPedido(e.target.value)} rows={4} maxLength={1500} className={`${campo} resize-none`} placeholder="Escreva aqui…" aria-label="O que você quer resolver" />
                          </div>
                          <div>
                            <Rotulo titulo="Como isso é feito hoje?" dica="Conte como se estivesse explicando para alguém que acabou de entrar na empresa." />
                            <textarea value={comoFazHoje} onChange={(e) => setComoFazHoje(e.target.value)} rows={4} maxLength={1500} className={`${campo} resize-none`} placeholder="Passo a passo, do jeito que acontece…" aria-label="Como isso é feito hoje" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <Rotulo titulo="Qual é o seu negócio?" />
                            <input type="text" value={negocio} onChange={(e) => setNegocio(e.target.value)} maxLength={200} className={campo} placeholder="Ex.: salão de beleza, loja de peças, escritório…" aria-label="Qual é o seu negócio" />
                          </div>
                          <div>
                            <Rotulo titulo="Pense na última semana. O que mais tomou o seu tempo ou te cansou?" dica="Pode ser qualquer coisa, grande ou pequena." />
                            <textarea value={pedido} onChange={(e) => setPedido(e.target.value)} rows={4} maxLength={1500} className={`${campo} resize-none`} placeholder="Escreva aqui…" aria-label="O que mais tomou seu tempo na última semana" />
                          </div>
                          <div>
                            <Rotulo titulo="Isso costuma acontecer por aí?" dica="Marque o que fizer sentido (até 4). É opcional." />
                            <div className="flex flex-wrap gap-2">
                              {SINAIS.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => alternarSinal(s)}
                                  aria-pressed={sinais.includes(s)}
                                  className={`rounded-full border px-3.5 py-2 text-sm transition ${
                                    sinais.includes(s) ? 'border-[#B7FF00] bg-[#B7FF00]/10 text-[#F0EEE8]' : 'border-white/15 bg-white/[0.03] text-white/75 hover:border-white/35'
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      <div>
                        <Rotulo titulo="Quanto tempo isso toma por semana?" dica="Um palpite já serve." />
                        <div className="grid grid-cols-2 gap-2">
                          {FAIXAS_HORAS.map((f) => (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() => setFaixa(f.id)}
                              aria-pressed={faixa === f.id}
                              className={`text-left rounded-xl border px-3.5 py-3 text-sm sm:text-base transition ${
                                faixa === f.id ? 'border-[#B7FF00] bg-[#B7FF00]/10 text-[#F0EEE8]' : 'border-white/15 bg-white/[0.03] text-white/80 hover:border-white/35'
                              }`}
                            >
                              {f.label}
                            </button>
                          ))}
                        </div>
                        {conta && (
                          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-xl border border-[#B7FF00]/40 bg-[#B7FF00]/[0.07] px-4 py-3 text-base leading-relaxed">
                            {conta.texto}
                            <span className="block mt-1 text-xs text-white/50">Estimativa feita só com o número que você informou.</span>
                          </motion.p>
                        )}
                      </div>

                      <div>
                        <Rotulo titulo="Para onde envio a minha leitura do seu caso?" dica="Respondo pelo WhatsApp." />
                        <div className="grid gap-3">
                          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" autoComplete="name" maxLength={80} className={campo} aria-label="Seu nome" />
                          <input type="tel" inputMode="tel" value={whatsapp} onChange={(e) => setWhatsapp(mascaraWhatsapp(e.target.value))} placeholder="WhatsApp com DDD" autoComplete="tel" className={campo} aria-label="WhatsApp com DDD" />
                          {/* Campo-isca contra robôs: invisível para pessoas. */}
                          <input type="text" tabIndex={-1} autoComplete="off" value={isca} onChange={(e) => setIsca(e.target.value)} aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
                          <label className="flex items-start gap-3 text-sm text-white/65 leading-snug cursor-pointer">
                            <input type="checkbox" checked={consentimento} onChange={(e) => setConsentimento(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#B7FF00]" />
                            <span>Autorizo o contato por WhatsApp sobre este diagnóstico e o uso das minhas respostas apenas para essa finalidade.</span>
                          </label>
                        </div>
                      </div>

                      {erro && (
                        <p role="alert" className="text-sm text-red-300">
                          {erro}
                        </p>
                      )}

                      <div>
                        <button
                          type="button"
                          disabled={!podeEnviar}
                          onClick={enviar}
                          className="inline-flex items-center gap-2 rounded-full bg-[#B7FF00] text-[#050607] font-semibold px-7 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-95 transition"
                        >
                          {enviando ? 'Enviando…' : 'Enviar'} {!enviando && <ArrowRight className="w-4 h-4" />}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
