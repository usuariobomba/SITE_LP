import React, { useEffect } from 'react';
import { FileText, Shield, AlertTriangle, CheckCircle2, Mail, ExternalLink } from 'lucide-react';
import { Link } from '../lib/router';
import SiteFooter from '../components/SiteFooter';

export default function ChicoTermos() {
  useEffect(() => {
    document.title = 'Termos de Uso | Chico (Lucas Prestes)';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050607] text-[#F0EEE8] font-sans antialiased selection:bg-[#B7FF00] selection:text-[#050607] pt-24">
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[#B7FF00]/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-10 md:py-16 space-y-12">
        
        {/* Header / Intro */}
        <section className="space-y-4 border-b border-[#1F252C] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0A0D10] border border-[#1F252C] text-[11px] font-tech tracking-widest text-[#B7FF00] uppercase font-bold">
            <FileText className="w-3.5 h-3.5 text-[#B7FF00]" />
            <span>DOCUMENTO LEGAL OFICIAL</span>
          </div>

          <h1 className="font-impact text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            TERMOS DE USO DO CHICO
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-tech text-[#8C9094]">
            <span>PRODUTO: <strong>CHICO (ASSISTENTE DE IA)</strong></span>
            <span>•</span>
            <span>RESPONSÁVEL: <strong>LUCAS PRESTES</strong></span>
            <span>•</span>
            <span className="text-[#B7FF00]">ÚLTIMA ATUALIZAÇÃO: 14 DE OUTUBRO DE 2026</span>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#C8CCD0] leading-relaxed pt-2">
            Estes Termos de Uso regulam o acesso e a utilização do assistente <strong>Chico</strong>, operado por <strong>Lucas Prestes</strong>. Ao utilizar o serviço ou conectar integrações, o usuário concorda integralmente com as condições aqui estabelecidas.
          </p>
        </section>

        {/* 1. O que é o serviço */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>1. DEFINIÇÃO DO SERVIÇO</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            O QUE É O CHICO
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-2 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              O <strong>Chico</strong> é um assistente de inteligência artificial operacional voltado para pequenas empresas. O serviço é configurado e calibrado sob medida para cada empresa cliente, funcionando em um ambiente computacional dedicado e isolado para organizar fluxos de vendas, estoque, orçamentos e comunicações operacionais.
            </p>
          </div>
        </section>

        {/* 2. Responsabilidade pelas ações */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>2. RESPONSABILIDADE PELAS AÇÕES E COMUNICAÇÕES</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            PAPEL DO ASSISTENTE E REVISÃO DO DONO
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-3 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              O Chico atua como uma ferramenta de apoio analítico e de elaboração de sugestões e rascunhos. O Chico usa inteligência artificial e pode cometer erros. Revise sempre o conteúdo antes de aprovar.
            </p>
            <div className="p-4 rounded-lg bg-[#050607] border border-[#B7FF00]/30 text-xs text-white space-y-2">
              <p className="font-semibold text-[#B7FF00] uppercase font-tech tracking-wider">
                Fluxo de Aprovação pelo Usuário:
              </p>
              <p className="text-[#C8CCD0] leading-relaxed">
                Você lê o rascunho na conversa com o Chico. Para mudar algo, é só pedir a alteração ao Chico. O e-mail só é enviado quando você responde confirmando, por exemplo, "pode enviar". Nenhuma mensagem externa é disparada sem essa confirmação expressa.
              </p>
            </div>
            <p className="text-xs text-[#8C9094]">
              O usuário é o único e exclusivo responsável pelo teor de todo o conteúdo enviado, pela veracidade dos dados transmitidos e por quaisquer decisões operacionais ou comerciais tomadas com base nas análises e sugestões geradas pelo Chico.
            </p>
          </div>
        </section>

        {/* 3. Integração com a conta Google */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>3. INTEGRAÇÃO COM A CONTA GOOGLE (GMAIL)</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            AUTORIZAÇÃO, PROCESSAMENTO E REVOGAÇÃO DE ACESSO
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-3 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              Ao vincular sua conta Google ao Chico, o usuário autoriza a aplicação a enviar e-mails em seu nome (utilizando o escopo OAuth <code className="text-[#B7FF00] text-xs">gmail.send</code>), <strong>sempre e obrigatoriamente mediante aprovação prévia de cada mensagem na conversa antes do disparo</strong>.
            </p>
            <p>
              O texto do rascunho e os endereços informados são processados por provedores de IA contratados (atualmente, a OpenRouter) unicamente para redigir a mensagem a ser aprovada por você. Nós não usamos esses dados para treinar modelos de IA.
            </p>
            <p>
              O Chico não tem permissão para ler, alterar, listar ou excluir os e-mails da sua caixa de entrada, nem para acessar seus contatos pessoais.
            </p>
            <div className="pt-2 text-xs font-tech text-[#C8CCD0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-[#050607] border border-white/[0.06]">
              <span>O usuário pode revogar essa permissão a qualquer momento:</span>
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B7FF00] hover:underline underline-offset-4 inline-flex items-center gap-1 font-bold shrink-0"
              >
                <span>Revogar acesso no Google ↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* 4. Uso aceitável */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>4. USO ACEITÁVEL E CONDUTA</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            RESTRIÇÕES E VEDAÇÕES
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-3 text-sm text-[#A2A8AF] leading-relaxed">
            <p>É expressamente proibido utilizar o Chico para:</p>
            <ul className="list-disc list-inside space-y-2 pl-1 text-xs sm:text-sm text-[#C8CCD0]">
              <li>Envio de <strong>spam</strong>, correntes, propagandas abusivas ou comunicações em massa não solicitadas;</li>
              <li>Transmissão de conteúdo ilícito, difamatório, calunioso, fraudulento, ameaçador ou que promova atos ilegais;</li>
              <li>Violação de direitos autorais, marcas, segredos de negócio ou direitos de privacidade de terceiros;</li>
              <li>Práticas que violem as políticas de uso do Google ou quaisquer leis vigentes.</li>
            </ul>
            <p className="text-xs text-[#FF6B6B] pt-1">
              O desrespeito a essas regras ensejará a rescisão imediata do acesso e a revogação de todas as permissões concedidas.
            </p>
          </div>
        </section>

        {/* 5. Disponibilidade */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>5. DISPONIBILIDADE DO SERVIÇO</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            CONDIÇÕES DE FORNECIMENTO
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-2 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              O serviço é fornecido no estado em que se encontra ("como está"), empregando esforço técnico razoável para manter a operação disponível e estável. Não há, contudo, garantia de operação ininterrupta, livre de erros temporários ou imune a instabilidades decorrentes de falhas de conectividade de terceiros ou indisponibilidade de APIs externas (como a infraestrutura do Google ou do provedor de IA).
            </p>
          </div>
        </section>

        {/* 6. Limitação de responsabilidade */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>6. LIMITAÇÃO DE RESPONSABILIDADE</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            LIMITAÇÃO DE RESPONSABILIDADE
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-2 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              O Chico é uma ferramenta de apoio e não garante resultado comercial, financeiro ou operacional. Na máxima extensão permitida pela lei brasileira, o responsável não responde por danos indiretos, lucros cessantes ou decisões tomadas pelo usuário com base nas sugestões e rascunhos do Chico, nem por falhas de serviços de terceiros (como Google e provedores de IA).
            </p>
          </div>
        </section>

        {/* 7. Cancelamento e rescisão */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>7. CANCELAMENTO E RESCISÃO</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            ENCERRAMENTO DO SERVIÇO E EXCLUSÃO DE DADOS
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-2 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              O cliente pode solicitar o cancelamento e encerramento do uso do Chico a qualquer momento, sem multa ou período de carência, mediante simples comunicação por e-mail para <a href="mailto:eu@lucasprestes.com" className="text-[#B7FF00] hover:underline font-bold">eu@lucasprestes.com</a>.
            </p>
            <p className="text-xs text-[#8C9094]">
              Com a rescisão, o acesso ao ambiente do cliente é desativado e todos os dados associados à autorização da conta Google (tokens de autenticação e histórico vinculado) são permanentemente excluídos.
            </p>
          </div>
        </section>

        {/* 8. Legislação aplicável */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>8. LEGISLAÇÃO APLICÁVEL E FORO</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            LEI DE REGÊNCIA E JURISDIÇÃO
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-2 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              Estes Termos de Uso são regidos e interpretados segundo as leis da República Federativa do Brasil. Para dirimir qualquer controvérsia oriunda deste instrumento, fica eleito o foro da comarca de domicílio do responsável legal, Lucas Prestes, com renúncia expressa a qualquer outro, por mais privilegiado que seja. Quando o usuário for consumidor, aplica-se o foro do seu domicílio, conforme o Código de Defesa do Consumidor.
            </p>
          </div>
        </section>

        {/* 9. Contato */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>9. CANAL DE ATENDIMENTO E CONTATO</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            FALE CONOSCO
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-2 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              Em caso de dúvidas, solicitações de esclarecimento ou notificações legais sobre estes Termos de Uso, entre em contato diretamente com o responsável:
            </p>
            <div className="p-3 rounded-lg bg-[#050607] border border-white/[0.05] text-xs font-tech space-y-1">
              <div><span className="text-[#8C9094]">RESPONSÁVEL:</span> <strong className="text-white">Lucas Prestes</strong></div>
              <div><span className="text-[#8C9094]">E-MAIL:</span> <a href="mailto:eu@lucasprestes.com" className="text-[#B7FF00] hover:underline">eu@lucasprestes.com</a></div>
            </div>
          </div>
        </section>

        {/* Cross-navigation back */}
        <section className="p-5 rounded-xl bg-[#0A0D10] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-tech text-xs">
          <div className="text-[#8C9094]">
            Consulte também a <Link to="/chico/privacidade" className="text-[#B7FF00] hover:underline underline-offset-4 font-bold">Política de Privacidade</Link> do Chico.
          </div>
          <div className="flex items-center gap-3">
            <Link to="/chico" className="text-white hover:text-[#B7FF00] transition-colors underline-offset-4 hover:underline">
              ← Voltar à apresentação do Chico
            </Link>
          </div>
        </section>

      </div>

      {/* Shared Site Footer with Chico Subnav */}
      <SiteFooter lastUpdated="14 de outubro de 2026" showChicoSubnav={true} />
    </div>
  );
}
