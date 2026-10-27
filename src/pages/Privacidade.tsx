import { useEffect } from 'react';

const EMAIL = 'eu@lucasprestes.com';

const secoes: { titulo: string; corpo: string[] }[] = [
  {
    titulo: 'Quem é o responsável',
    corpo: [
      `Este site é operado por Lucas Prestes (lucasprestes.com). Dúvidas ou pedidos sobre seus dados: ${EMAIL}.`,
    ],
  },
  {
    titulo: 'Quais dados coletamos',
    corpo: [
      'No formulário de diagnóstico (/diagnostico): seu nome, seu WhatsApp e as respostas que você escrever sobre o seu negócio (tipo de negócio, o que quer resolver, como faz hoje e quantas horas isso consome).',
      'Automaticamente: dados de navegação e de origem do clique (como a campanha de anúncio que trouxe você), coletados por cookies e pelas ferramentas Google Analytics e Pixel da Meta.',
    ],
  },
  {
    titulo: 'Para que usamos',
    corpo: [
      'Para entender o seu caso e entrar em contato com você pelo WhatsApp sobre o diagnóstico. Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing deles.',
      'As respostas do formulário são analisadas por uma ferramenta de inteligência artificial (Google Gemini) apenas para preparar a conversa, e o resultado é enviado por e-mail ao responsável. Nenhuma decisão automática é tomada sobre você.',
      'Medimos a eficiência dos anúncios com o Pixel da Meta e o Google Analytics, o que pode incluir mostrar anúncios para pessoas parecidas com quem visitou o site.',
    ],
  },
  {
    titulo: 'Com quem os dados passam',
    corpo: [
      'Apenas com os prestadores necessários para o serviço funcionar: Google (hospedagem, análise e e-mail) e Meta (medição de anúncios). Cada um trata os dados conforme a própria política.',
    ],
  },
  {
    titulo: 'Por quanto tempo guardamos',
    corpo: [
      'Pelo tempo necessário para atender seu pedido e acompanhar a conversa comercial. Você pode pedir a exclusão a qualquer momento.',
    ],
  },
  {
    titulo: 'Seus direitos e exclusão de dados',
    corpo: [
      `Conforme a LGPD, você pode pedir acesso, correção ou exclusão dos seus dados, e revogar o seu consentimento. Envie um e-mail para ${EMAIL} com o seu nome e WhatsApp usados no formulário; respondemos e excluímos em até 15 dias.`,
      'Para deixar de receber anúncios personalizados, ajuste as preferências de anúncios na sua conta do Facebook ou Instagram.',
    ],
  },
];

export default function Privacidade() {
  useEffect(() => {
    document.title = 'Política de Privacidade | Lucas Prestes';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="max-w-2xl mx-auto px-5 py-12 sm:py-16 text-[#C8CCD0]">
      <a href="/" className="text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
        ← lucasprestes.com
      </a>
      <h1 className="mt-6 text-3xl sm:text-4xl font-black text-white tracking-tight">Política de Privacidade</h1>
      <p className="mt-2 text-xs text-[#8C9094]">Última atualização: 27 de outubro de 2026</p>

      {secoes.map((s) => (
        <section key={s.titulo} className="mt-8 space-y-3">
          <h2 className="text-lg font-bold text-white">{s.titulo}</h2>
          {s.corpo.map((p) => (
            <p key={p} className="text-sm leading-relaxed">
              {p}
            </p>
          ))}
        </section>
      ))}
    </main>
  );
}
