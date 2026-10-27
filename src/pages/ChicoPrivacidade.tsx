import React, { useEffect } from 'react';
import { ShieldCheck, ExternalLink, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from '../lib/router';
import SiteFooter from '../components/SiteFooter';

export default function ChicoPrivacidade() {
  useEffect(() => {
    document.title = 'Política de Privacidade | Chico (Lucas Prestes)';
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#B7FF00]" />
            <span>DOCUMENTO OFICIAL DE PRIVACIDADE</span>
          </div>

          <h1 className="font-impact text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight">
            POLÍTICA DE PRIVACIDADE DO CHICO
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-tech text-[#8C9094]">
            <span>PRODUTO: <strong>CHICO (ASSISTENTE DE IA)</strong></span>
            <span>•</span>
            <span>RESPONSÁVEL: <strong>LUCAS PRESTES</strong></span>
            <span>•</span>
            <span className="text-[#B7FF00]">ÚLTIMA ATUALIZAÇÃO: 14 DE OUTUBRO DE 2026</span>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#C8CCD0] leading-relaxed pt-2">
            Esta Política de Privacidade descreve de forma clara, objetiva e transparente como o assistente <strong>Chico</strong> trata informações ao ser utilizado por pequenas empresas, com especial atenção à integração com os serviços da Google LLC (Google APIs / Gmail).
          </p>
        </section>

        {/* 1. Quem somos */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>1. QUEM SOMOS</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            IDENTIFICAÇÃO E CONTATO DO OPERADOR
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-2 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              O <strong>Chico</strong> é um assistente operacional de inteligência artificial desenvolvido, implementado e operado exclusivamente por <strong>Lucas Prestes</strong>.
            </p>
            <p>
              Para qualquer dúvida sobre o funcionamento do sistema, tratamento de dados ou direitos de privacidade, o contato direto do responsável é:
            </p>
            <div className="pt-1">
              <a
                href="mailto:eu@lucasprestes.com"
                className="font-tech text-xs text-[#B7FF00] hover:underline underline-offset-4 font-bold"
              >
                eu@lucasprestes.com ↗
              </a>
            </div>
          </div>
        </section>

        {/* 2. Dados do Google que acessamos */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>2. DADOS DO GOOGLE QUE ACESSAMOS</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            ESCOPO E LIMITES DE ACESSO VIA GOOGLE OAUTH
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-4 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              Quando o usuário opta por conectar sua Conta Google ao seu ambiente do Chico, o aplicativo solicita <strong>exclusivamente</strong> os seguintes dados e permissões:
            </p>

            <div className="space-y-3 pl-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#B7FF00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-semibold">(a) Endereço de e-mail da conta conectada:</strong>
                  <p className="text-xs text-[#8C9094] pt-0.5">
                    Utilizado unicamente para identificar qual conta de e-mail está associada ao ambiente do cliente e exibir essa identificação no painel.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#B7FF00] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-semibold">(b) Permissão "Enviar e-mail em seu nome" (escopo OAuth: <code className="text-[#B7FF00] text-xs">gmail.send</code>):</strong>
                  <p className="text-xs text-[#8C9094] pt-0.5">
                    Permite apenas despachar mensagens de e-mail autorizadas expressamente pelo usuário após revisão.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#050607] border border-red-500/20 text-xs text-[#D8DCDF] space-y-1">
              <strong className="text-[#FF6B6B] uppercase font-tech tracking-wider block">
                DELIMITAÇÃO EXPRESSA DO QUE NÃO ACESSAMOS:
              </strong>
              <p>
                O Chico <strong>NÃO acessa o conteúdo da sua caixa de entrada</strong>, <strong>NÃO lê nem lista seus e-mails recebidos ou enviados</strong>, <strong>NÃO visualiza sua lista de contatos</strong>, <strong>NÃO altera</strong> e <strong>NÃO apaga</strong> nenhuma mensagem ou pasta da sua conta Google.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Para que usamos */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>3. FINALIDADE DO USO DOS DADOS</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            PARA QUE UTILIZAMOS ESSAS INFORMAÇÕES
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-3 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              Os dados e permissões concedidos são utilizados <strong>exclusivamente para enviar os e-mails solicitados e aprovados pelo próprio usuário</strong> (como o envio de orçamentos, confirmações de pedidos ou respostas operacionais a clientes da empresa), disparados a partir do endereço de e-mail conectado.
            </p>
            <div className="p-3.5 rounded-lg bg-[#0E1317] border border-[#B7FF00]/20 text-xs text-white">
              <strong className="text-[#B7FF00]">Regra de aprovação prévia:</strong> Nenhum e-mail é enviado de forma autônoma. Todo disparo requer que o usuário veja o rascunho na conversa e confirme expressamente a autorização (por exemplo, respondendo "pode enviar").
            </div>
            <p className="text-xs text-[#8C9094]">
              <strong>Proibição de outros usos:</strong> Não utilizamos os dados do Google para fins de publicidade ou marketing direcionado, não realizamos perfilamento comportamental e não usamos os dados para treinar modelos de inteligência artificial.
            </p>
          </div>
        </section>

        {/* 4. Declaração Obrigatória do Google: Requisitos de Uso Limitado */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#090D10] border-2 border-[#B7FF00] shadow-[0_0_30px_rgba(183,255,0,0.12)] space-y-4">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-black uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#B7FF00]" />
            <span>4. DECLARAÇÃO DE USO LIMITADO (GOOGLE API SERVICES USER DATA POLICY)</span>
          </div>

          <div className="space-y-2">
            <p className="font-sans text-sm sm:text-base text-white font-medium leading-relaxed italic border-l-2 border-[#B7FF00] pl-4 py-1">
              "O uso e a transferência para qualquer outro aplicativo das informações recebidas das APIs do Google estarão em conformidade com a Política de Dados do Usuário dos Serviços de API do Google, incluindo os requisitos de Uso Limitado."
            </p>
          </div>

          <div className="pt-2 text-xs font-tech">
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#B7FF00] hover:underline underline-offset-4 font-bold"
            >
              <span>Consultar a Política de Dados do Usuário dos Serviços de API do Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* 5. O que guardamos */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>5. ARMAZENAMENTO E LOCALIZAÇÃO DOS DADOS</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            O QUE GUARDAMOS E ONDE FICA HOSPEDADO
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-3 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              Guardamos estritamente o necessário para o funcionamento da funcionalidade aprovada:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1 text-xs sm:text-sm text-[#C8CCD0]">
              <li>O <strong>endereço de e-mail conectado</strong>;</li>
              <li>A <strong>autorização de acesso (tokens de autenticação OAuth)</strong> concedida pelo Google, mantida de forma cifrada;</li>
              <li>O <strong>registro operacional dos envios</strong> (destinatário, assunto, data e resultado do envio).</li>
            </ul>
            <p className="text-xs text-[#8C9094] pt-2">
              Esses dados ficam armazenados exclusivamente no ambiente dedicado da própria empresa cliente, administrado tecnicamente por Lucas Prestes, sem compartilhamento com infraestruturas de outros clientes.
            </p>
          </div>
        </section>

        {/* 6. Compartilhamento */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>6. COMPARTILHAMENTO DE DADOS</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            COMPARTILHAMENTO E PROVEDORES CONTRATADOS
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-3 text-sm text-[#A2A8AF] leading-relaxed">
            <p className="text-white font-medium">
              Não vendemos, não alugamos, não comercializamos e não compartilhamos dados com terceiros para fins de marketing, publicidade ou perfilamento.
            </p>
            <p>
              <strong>Processamento por Inteligência Artificial:</strong> Para a elaboração de rascunhos e compreensão das solicitações operacionais, o conteúdo das mensagens e as instruções fornecidas por você são processados por provedores de infraestrutura de inteligência artificial contratados (atualmente, a <strong>OpenRouter</strong>), estritamente para preparar a mensagem que você vai avaliar.
            </p>
            <p className="text-xs text-[#8C9094]">
              Fora essa finalidade técnica estrita e o despacho do e-mail aprovado pela API oficial do Google, nenhum dado é transmitido a qualquer outro terceiro.
            </p>
          </div>
        </section>

        {/* 7. Retenção e exclusão */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>7. RETENÇÃO E EXCLUSÃO DE DADOS</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            PRAZOS DE GUARDA E COMO SOLICITAR A EXCLUSÃO
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-4 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              Os dados e tokens de acesso são mantidos apenas enquanto o cliente mantiver o serviço ativo. Para desconectar a conta do Google ou solicitar a exclusão de todos os dados armazenados, o usuário pode agir por três caminhos imediatos:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-lg bg-[#050607] border border-white/[0.06] space-y-1.5">
                <span className="font-tech text-xs text-[#B7FF00] font-bold uppercase block">
                  OPÇÃO 1: DIRETO NO CHICO
                </span>
                <p className="text-xs text-[#C8CCD0] leading-relaxed">
                  Direto no Chico: na tela 'E-mail', clique em 'Desconectar o Google'. Isso revoga a autorização no Google e apaga a autorização guardada.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#050607] border border-white/[0.06] space-y-1.5">
                <span className="font-tech text-xs text-[#B7FF00] font-bold uppercase block">
                  OPÇÃO 2: DIRETO NO GOOGLE
                </span>
                <p className="text-xs text-[#C8CCD0] leading-relaxed">
                  Você pode revogar a permissão instantaneamente a qualquer momento na página oficial de segurança da sua conta Google:
                </p>
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tech text-xs text-[#B7FF00] hover:underline underline-offset-4 inline-flex items-center gap-1 font-bold pt-1"
                >
                  <span>myaccount.google.com/permissions ↗</span>
                </a>
              </div>

              <div className="p-4 rounded-lg bg-[#050607] border border-white/[0.06] space-y-1.5">
                <span className="font-tech text-xs text-[#B7FF00] font-bold uppercase block">
                  OPÇÃO 3: POR E-MAIL
                </span>
                <p className="text-xs text-[#C8CCD0] leading-relaxed">
                  Basta enviar uma solicitação para <strong>eu@lucasprestes.com</strong> solicitando a desconexão e exclusão. Todos os dados e tokens do seu ambiente serão apagados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Segurança */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>8. MEDIDAS DE SEGURANÇA</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            PROTEÇÃO TÉCNICA E CRIPTOGRAFIA
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-2 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              Adotamos práticas rigorosas de proteção e segurança da informação:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1 text-xs sm:text-sm text-[#C8CCD0]">
              <li><strong>Armazenamento cifrado:</strong> tokens de acesso OAuth são armazenados com criptografia no banco de dados;</li>
              <li><strong>Comunicação segura:</strong> todo o tráfego entre navegador, servidores e APIs do Google é transmitido obrigatoriamente por conexões cifradas via HTTPS / TLS;</li>
              <li><strong>Ambiente isolado:</strong> o acesso ao sistema é restrito ao ambiente do próprio cliente.</li>
            </ul>
          </div>
        </section>

        {/* 9. Direitos do titular (LGPD) */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>9. DIREITOS DO TITULAR (LGPD)</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            SEUS DIREITOS SEGUNDO A LEGISLAÇÃO BRASILEIRA
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-3 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), você possui o direito de solicitar a qualquer momento:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1 text-xs sm:text-sm text-[#C8CCD0]">
              <li>Confirmação da existência de tratamento e acesso aos dados armazenados;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
              <li>Portabilidade dos dados a outro fornecedor de serviço ou produto;</li>
              <li>Informação sobre com quem os dados foram compartilhados;</li>
              <li>Revogação do consentimento e eliminação completa dos dados tratados mediante essa base legal.</li>
            </ul>
            <p className="text-xs text-[#8C9094] pt-1">
              Todas as solicitações de exercício de direitos devem ser enviadas ao responsável pelo e-mail <a href="mailto:eu@lucasprestes.com" className="text-[#B7FF00] hover:underline">eu@lucasprestes.com</a>, em até 15 dias. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
          </div>
        </section>

        {/* 10. Cookies e métricas */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>10. COOKIES E FERRAMENTAS DE ANÁLISE</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            NAVEGAÇÃO NO SITE PÚBLICO
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-2 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              O website público <code>lucasprestes.com</code> pode utilizar cookies técnicos e serviços analíticos (como Google Analytics / Google Tag Manager) exclusivamente para contabilizar visitantes, monitorar desempenho e aprimorar a experiência de navegação do site.
            </p>
            <p className="text-xs text-[#8C9094]">
              Essas métricas estatísticas de navegação são totalmente independentes da aplicação Chico e não têm qualquer acesso ou vínculo com a sua conta Google, credenciais OAuth ou mensagens de e-mail.
            </p>
          </div>
        </section>

        {/* 11. Alterações nesta política */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>11. ATUALIZAÇÕES DESTA POLÍTICA</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            HISTÓRICO E NOTIFICAÇÃO DE MUDANÇAS
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-2 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              Esta política pode ser revisada periodicamente para refletir melhorias no produto ou atualizações nas exigências regulatórias e das plataformas parceiras. A versão vigente sempre estará publicada nesta URL com a indicação da última atualização.
            </p>
            <p className="text-xs text-[#8C9094]">
              Modificações relevantes serão comunicadas diretamente aos clientes ativos por meio do canal de contato cadastrado.
            </p>
          </div>
        </section>

        {/* 12. Contato do responsável */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-tech text-xs text-[#B7FF00] font-bold uppercase tracking-wider">
            <span>12. ENCARREGADO PELO TRATAMENTO DE DADOS</span>
          </div>
          <h2 className="font-impact text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
            CONTATO DO RESPONSÁVEL
          </h2>
          <div className="p-5 rounded-xl bg-[#080B0D] border border-white/[0.08] space-y-2 text-sm text-[#A2A8AF] leading-relaxed">
            <p>
              O responsável pelo tratamento de dados e pela presente Política de Privacidade é:
            </p>
            <div className="p-3 rounded-lg bg-[#050607] border border-white/[0.05] text-xs font-tech space-y-1">
              <div><span className="text-[#8C9094]">RESPONSÁVEL:</span> <strong className="text-white">Lucas Prestes</strong></div>
              <div><span className="text-[#8C9094]">E-MAIL OFICIAL:</span> <a href="mailto:eu@lucasprestes.com" className="text-[#B7FF00] hover:underline">eu@lucasprestes.com</a></div>
            </div>
          </div>
        </section>

        {/* Navigation back / cross-links */}
        <section className="p-5 rounded-xl bg-[#0A0D10] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4 font-tech text-xs">
          <div className="text-[#8C9094]">
            Consulte também os <Link to="/chico/termos" className="text-[#B7FF00] hover:underline underline-offset-4 font-bold">Termos de Uso</Link> do Chico.
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
