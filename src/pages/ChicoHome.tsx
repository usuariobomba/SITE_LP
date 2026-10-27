import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  Server, 
  FileText, 
  Sliders, 
  ArrowRight, 
  Lock, 
  UserCheck, 
  Layers
} from 'lucide-react';
import { Link } from '../lib/router';
import SiteFooter from '../components/SiteFooter';

export default function ChicoHome() {
  useEffect(() => {
    document.title = 'Chico | Gerente Virtual de IA para Pequenas Empresas';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050607] text-[#F0EEE8] font-sans antialiased selection:bg-[#B7FF00] selection:text-[#050607] pt-24">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#B7FF00]/[0.035] rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-12 md:py-16 space-y-16">
        
        {/* Hero Banner */}
        <section className="space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0D10] border border-[#1F252C] text-xs font-tech tracking-widest text-[#B7FF00] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00] animate-pulse" />
            <span>ASSISTENTE OPERACIONAL SOB MEDIDA</span>
          </div>

          <h1 className="font-impact text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-[1.05]">
            CHICO // GERENTE VIRTUAL DE IA{' '}
            <span className="block text-[#B7FF00] font-marker normal-case text-[0.85em] tracking-normal pt-2">
              para pequenas empresas
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#C8CCD0] leading-relaxed max-w-2xl mx-auto">
            O Chico é um assistente de inteligência artificial criado para analisar os dados operacionais da sua empresa — vendas, estoque, orçamentos e clientes — e ajudar você a decidir e executar tarefas do dia a dia, com uma regra fundamental: <strong className="text-white font-semibold">nenhuma ação externa é executada sem a aprovação prévia do dono</strong>.
          </p>

          {/* Quick links banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-tech text-xs">
            <Link
              to="/chico/privacidade"
              className="px-4 py-2.5 rounded-lg bg-[#0E1216] border border-white/[0.1] hover:border-[#B7FF00] text-[#E0E2E4] hover:text-[#B7FF00] transition-colors inline-flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#B7FF00]" />
              <span>POLÍTICA DE PRIVACIDADE</span>
            </Link>
            <Link
              to="/chico/termos"
              className="px-4 py-2.5 rounded-lg bg-[#0E1216] border border-white/[0.1] hover:border-[#B7FF00] text-[#E0E2E4] hover:text-[#B7FF00] transition-colors inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#B7FF00]" />
              <span>TERMOS DE USO</span>
            </Link>
          </div>
        </section>

        {/* O que é o Chico */}
        <section className="p-6 sm:p-8 md:p-10 rounded-2xl bg-[#080B0D] border border-white/[0.08] shadow-2xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-tech text-[#8C9094] uppercase tracking-wider">
            <span className="text-[#B7FF00] font-bold">01 //</span>
            <span>VISÃO GERAL DO PRODUTO</span>
          </div>

          <h2 className="font-impact text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
            O QUE É O CHICO E COMO ELE AJUDA SEU NEGÓCIO
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-[#050607]/80 border border-white/[0.05] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00]">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-tech text-sm font-bold text-white uppercase tracking-wider">
                Análise Contínua de Operação
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#A2A8AF] leading-relaxed">
                O Chico conecta informações dispersas da rotina — como vendas diárias, níveis de estoque, orçamentos em aberto e histórico de clientes —, trazendo clareza instantânea para que você não precise caçar dados em várias planilhas ou conversas soltas.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#050607]/80 border border-white/[0.05] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00]">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="font-tech text-sm font-bold text-white uppercase tracking-wider">
                Aprovação Humana Obrigatória
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#A2A8AF] leading-relaxed">
                O Chico atua como um assistente analítico e redator: ele prepara sugestões, confere números e elabora rascunhos. Nenhuma ação externa, comunicado ou envio é feito sozinho. O dono do negócio sempre revisa e aprova cada item.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#050607]/80 border border-white/[0.05] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00]">
                <Server className="w-4 h-4" />
              </div>
              <h3 className="font-tech text-sm font-bold text-white uppercase tracking-wider">
                Ambiente Próprio por Empresa
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#A2A8AF] leading-relaxed">
                Cada empresa cliente possui seu próprio ambiente dedicado do Chico. As informações da sua empresa não são misturadas com as de outras companhias. Não usamos os seus dados para treinar modelos de IA.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#050607]/80 border border-white/[0.05] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00]">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="font-tech text-sm font-bold text-white uppercase tracking-wider">
                Configurado Sob Medida
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#A2A8AF] leading-relaxed">
                Desenvolvido e operado diretamente por Lucas Prestes, o Chico é calibrado conforme os processos reais e as regras operacionais específicas do seu dia a dia de trabalho.
              </p>
            </div>
          </div>
        </section>

        {/* SEÇÃO OBRIGATÓRIA GOOGLE: Envio de e-mail pelo Google */}
        <section className="p-6 sm:p-8 md:p-10 rounded-2xl bg-[#0A0E12] border-2 border-[#B7FF00]/30 shadow-2xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-tech text-[#B7FF00] uppercase tracking-wider font-bold">
              <Mail className="w-4 h-4" />
              <span>INTEGRAÇÃO OFICIAL // GOOGLE OAUTH</span>
            </div>
            <span className="font-tech text-[11px] text-[#8C9094] uppercase tracking-widest bg-[#050607] px-2.5 py-1 rounded border border-white/[0.08]">
              ESCOPO GMAIL.SEND
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="font-impact text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              ENVIO DE E-MAIL PELO GOOGLE
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#D0D4D8] leading-relaxed">
              Para simplificar a rotina de envio de orçamentos, confirmações de pedidos e respostas operacionais a clientes, o Chico pode ser integrado à sua conta Google. Entenda como essa integração funciona com total transparência e segurança:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* O que o Chico FAZ */}
            <div className="p-5 rounded-xl bg-[#050708] border border-[#B7FF00]/20 space-y-3">
              <div className="flex items-center gap-2 font-tech text-xs uppercase tracking-wider text-[#B7FF00] font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#B7FF00]" />
                <span>O QUE O CHICO FAZ</span>
              </div>
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-[#C8CCD0] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#B7FF00] font-bold">•</span>
                  <span><strong>Conexão pelo dono:</strong> Você autoriza a conexão da sua própria conta Google de forma consciente e voluntária.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B7FF00] font-bold">•</span>
                  <span><strong>Somente envia e-mails aprovados:</strong> O Chico apenas dispara mensagens em nome da empresa após você visualizar o rascunho completo e responder confirmando o envio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B7FF00] font-bold">•</span>
                  <span><strong>Identificação da conta:</strong> Utiliza o seu endereço de e-mail conectado apenas para saber qual conta está emitindo a mensagem.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B7FF00] font-bold">•</span>
                  <span><strong>Redação por inteligência artificial:</strong> o texto do rascunho e os endereços informados por você são processados por provedores de IA contratados (hoje, a OpenRouter) apenas para preparar a mensagem que você vai aprovar.</span>
                </li>
              </ul>
            </div>

            {/* O que o Chico NÃO FAZ */}
            <div className="p-5 rounded-xl bg-[#050708] border border-red-500/20 space-y-3">
              <div className="flex items-center gap-2 font-tech text-xs uppercase tracking-wider text-[#FF6B6B] font-bold">
                <XCircle className="w-4 h-4 text-[#FF6B6B]" />
                <span>O QUE O CHICO NÃO FAZ</span>
              </div>
              <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-[#C8CCD0] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B6B] font-bold">✕</span>
                  <span><strong>NÃO lê seus e-mails:</strong> Não acessamos, não lemos e não baixamos mensagens recebidas na sua caixa de entrada.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B6B] font-bold">✕</span>
                  <span><strong>NÃO lista nem apaga:</strong> Não temos permissão para listar e-mails, visualizar contatos pessoais nem excluir mensagens da sua conta.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF6B6B] font-bold">✕</span>
                  <span><strong>NÃO altera a caixa de entrada:</strong> Nenhuma alteração é feita nas pastas, marcadores ou configurações do seu Gmail.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Revogação */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#07090B] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-tech">
            <div className="flex items-center gap-2.5 text-[#C8CCD0]">
              <Lock className="w-4 h-4 text-[#B7FF00] shrink-0" />
              <span>
                <strong>Controle em suas mãos:</strong> A conexão com o Google pode ser revogada por você a qualquer momento, imediatamente e sem custos.
              </span>
            </div>
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B7FF00] hover:underline underline-offset-4 shrink-0 flex items-center gap-1 font-bold"
            >
              <span>Gerenciar permissões no Google ↗</span>
            </a>
          </div>
        </section>

        {/* Como funciona o fluxo de aprovação */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="font-tech text-xs uppercase tracking-widest text-[#B7FF00]">
              PASSO A PASSO
            </span>
            <h2 className="font-impact text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              O CICLO DE DECISÃO E EXECUÇÃO
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.07] space-y-2">
              <span className="font-tech text-xs text-[#B7FF00] font-bold">01 // LEITURA</span>
              <h4 className="font-tech text-sm font-bold text-white uppercase">Dados do Negócio</h4>
              <p className="font-sans text-xs text-[#9A9D9F] leading-relaxed">
                O Chico analisa pedidos, orçamentos e movimentações de estoque registradas no ambiente da sua empresa.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.07] space-y-2">
              <span className="font-tech text-xs text-[#B7FF00] font-bold">02 // PROPOSTA</span>
              <h4 className="font-tech text-sm font-bold text-white uppercase">Elaboração de Rascunho</h4>
              <p className="font-sans text-xs text-[#9A9D9F] leading-relaxed">
                Quando é preciso enviar um orçamento ou aviso a um cliente, o Chico monta o rascunho completo do e-mail.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.07] space-y-2">
              <span className="font-tech text-xs text-[#B7FF00] font-bold">03 // APROVAÇÃO</span>
              <h4 className="font-tech text-sm font-bold text-white uppercase">Revisão do Dono</h4>
              <p className="font-sans text-xs text-[#9A9D9F] leading-relaxed">
                Você lê o rascunho na conversa com o Chico. Para mudar algo, é só pedir a alteração ao Chico. O e-mail só é enviado quando você responde confirmando, por exemplo, 'pode enviar'.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.07] space-y-2">
              <span className="font-tech text-xs text-[#B7FF00] font-bold">04 // DISPARO</span>
              <h4 className="font-tech text-sm font-bold text-white uppercase">Envio pelo Gmail</h4>
              <p className="font-sans text-xs text-[#9A9D9F] leading-relaxed">
                O e-mail é enviado pelo seu endereço oficial, com o registro do envio (destinatário, assunto, data e resultado) disponível no seu painel.
              </p>
            </div>
          </div>
        </section>

        {/* Legal & Document Links Callout */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#0A0D10] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-tech text-base font-bold text-white uppercase tracking-wider">
              DOCUMENTAÇÃO JURÍDICA E DE PRIVACIDADE
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A2A8AF] max-w-xl">
              Consulte os termos que regem o uso do Chico e conheça detalhadamente as diretrizes de proteção de dados e privacidade em conformidade com as políticas do Google.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/chico/privacidade"
              className="px-5 py-3 rounded-xl bg-[#B7FF00] text-[#050607] font-tech text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 hover:bg-[#D4FF55] transition-colors"
            >
              <span>LER POLÍTICA DE PRIVACIDADE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/chico/termos"
              className="px-5 py-3 rounded-xl bg-[#06080A] border border-white/[0.15] text-white hover:border-[#B7FF00] font-tech text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 transition-colors"
            >
              <span>LER TERMOS DE USO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Responsible Developer & Contact Info */}
        <section className="p-6 rounded-xl bg-[#050607] border border-white/[0.05] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 font-tech text-xs text-[#8C9094]">
          <div>
            <span className="text-white font-bold">CHICO // DESENVOLVIDO E OPERADO POR LUCAS PRESTES</span>
            <p className="text-[11px] text-[#6A7077]">Contato oficial: eu@lucasprestes.com</p>
          </div>
          <div>
            <a
              href="mailto:eu@lucasprestes.com"
              className="text-[#B7FF00] hover:underline underline-offset-4"
            >
              Falar com o responsável ↗
            </a>
          </div>
        </section>

      </div>

      {/* Shared Site Footer with Chico Subnav */}
      <SiteFooter lastUpdated="14 de outubro de 2026" showChicoSubnav={true} />
    </div>
  );
}
