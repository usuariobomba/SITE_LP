import { Project, Service, ProcessStep, Principle } from './types';

export const specialties = [
  'HORAS RECUPERADAS NA SUA ROTINA',
  'MENOS TRABALHO REPETITIVO',
  'FIM DAS TAREFAS MANUAIS',
  'PROCESSOS QUE RODAM SOZINHOS',
  'CONFERÊNCIAS EM SEGUNDOS',
  'OPERAÇÃO CENTRALIZADA E CLARA',
  'CHEGA DE COPIAR E COLAR DADOS',
  'MAIS TEMPO PARA O SEU NEGÓCIO',
];

export const projects: Project[] = [
  {
    id: 'gestao-contabil',
    number: '01',
    name: 'SISTEMA DE GESTÃO CONTÁBIL',
    painHeadline: 'Acompanhar dezenas de obrigações contábeis não deveria exigir caçar arquivos e cobrar status o dia todo.',
    category: 'Operação Centralizada // Demandas e Documentos',
    description: 'Sistema interno criado para centralizar a operação de um escritório contábil. Reúne comunicação entre colaboradores, gestão de demandas, acompanhamento de tarefas, cadastro de empresas, documentos, agenda e histórico completo das movimentações.',
    result: 'Centralizou toda a operação em um painel único. Eliminou a perda de tempo procurando documentos e cobrando status, dando visibilidade instantânea de todas as obrigações sem reuniões desnecessárias.',
    technologies: ['Painel de Operações', 'Gestão de Demandas', 'Arquivo Digital', 'Histórico em Tempo Real'],
    youtubeId: 'frSZzJq6dR8',
    videoUrl: 'https://www.youtube.com/watch?v=frSZzJq6dR8',
    specs: [
      { label: 'Antes (O trabalho manual)', value: 'Informações espalhadas em planilhas, conversas isoladas e pastas soltas. Horas perdidas toda semana para descobrir em que pé estava cada obrigação e risco contínuo de atrasos.' },
      { label: 'O que foi criado', value: 'Painel operacional único integrando clientes, tarefas, documentos e agenda com histórico detalhado e status em tempo real de cada colaborador.' },
      { label: 'O que mudou na rotina', value: 'Fim da caça manual a documentos e da cobrança constante de status. A equipe sabe exatamente o que fazer e a liderança acompanha tudo em segundos.' },
    ],
    architecture: {
      nodes: [
        { id: 'client', label: 'Painel do Escritório', type: 'client' },
        { id: 'tasks', label: 'Gestor de Demandas', type: 'service' },
        { id: 'docs', label: 'Arquivo Digital', type: 'db' },
        { id: 'history', label: 'Histórico Operacional', type: 'service' }
      ],
      edges: [
        { from: 'client', to: 'tasks', label: 'Atribui e monitora tarefas' },
        { from: 'tasks', to: 'docs', label: 'Vincula documentos da empresa' },
        { from: 'docs', to: 'history', label: 'Registra movimentações' },
        { from: 'history', to: 'client', label: 'Visão consolidada em tempo real' }
      ]
    }
  },
  {
    id: 'conferencia-pedidos-nfe',
    number: '02',
    name: 'CONFERÊNCIA DE PEDIDOS × NOTAS FISCAIS',
    painHeadline: 'Conferir se o que foi entregue bate com o pedido de compra não deveria exigir horas checando nota impressa item por item.',
    category: 'Cruzamento Automático // Auditoria Fiscal',
    description: 'Sistema desenvolvido para automatizar a conferência de pedidos de compra e entregas. O usuário importa o pedido original e, conforme recebe as mercadorias, adiciona os XMLs das notas fiscais. O sistema cruza automaticamente as informações e aponta divergências.',
    result: 'Transformou horas de conferência manual em um processo automático de segundos. Cruza pedidos com XMLs, aponta divergências de valores ou quantidades e impede faturamentos indevidos.',
    technologies: ['Leitor de XML', 'Cruzamento Automático', 'Auditoria de Pedidos', 'Gestão de Pendências'],
    youtubeId: 'Fkfijfqlkok',
    videoUrl: 'https://www.youtube.com/watch?v=Fkfijfqlkok',
    specs: [
      { label: 'Antes (O trabalho manual)', value: 'Conferência manual exaustiva de notas fiscais impressas contra pedidos de compra, linha por linha. Horas diárias gastas e divergências que passavam despercebidas.' },
      { label: 'O que foi criado', value: 'Motor que lê e cruza os arquivos XML das notas fiscais com os pedidos de compra originais em tempo real, calculando saldos e identificando divergências.' },
      { label: 'O que mudou na rotina', value: 'Auditoria instantânea de faltas, excessos e valores divergentes. A equipe deixou de conferir papel e tem segurança total nos pagamentos.' },
    ],
    architecture: {
      nodes: [
        { id: 'client', label: 'Painel do Conferidor', type: 'client' },
        { id: 'nfe', label: 'Leitor de XML (NF-e)', type: 'service' },
        { id: 'match', label: 'Motor de Cruzamento', type: 'service' },
        { id: 'audit', label: 'Relatório de Divergências', type: 'service' }
      ],
      edges: [
        { from: 'client', to: 'nfe', label: 'Importa pedido e XMLs' },
        { from: 'nfe', to: 'match', label: 'Extrai itens e valores' },
        { from: 'match', to: 'audit', label: 'Calcula saldos e divergências' },
        { from: 'audit', to: 'client', label: 'Alerta instantâneo de inconsistências' }
      ]
    }
  },
  {
    id: 'gestao-patrimonial',
    number: '03',
    name: 'SISTEMA DE GESTÃO PATRIMONIAL',
    painHeadline: 'Gerenciar imóveis não deveria significar pilhas de recibos, planilhas desatualizadas e contas checadas na mão todo mês.',
    category: 'Controle Unificado // Gestão de Imóveis',
    description: 'Plataforma criada para centralizar a administração de imóveis. Permite acompanhar contratos de aluguel, recebimentos, recibos, documentos, contas de água e energia, IPTU, vencimentos e pendências.',
    result: 'Substituiu o controle manual fragmentado por uma visão unificada de todo o patrimônio. Monitoramento contínuo de vencimentos e contas sem esforço repetitivo.',
    technologies: ['Painel Imobiliário', 'Controle de Contratos', 'Gestão de Vencimentos', 'Arquivo Digital'],
    youtubeId: '5d_ASMH1bto',
    videoUrl: 'https://www.youtube.com/watch?v=5d_ASMH1bto',
    specs: [
      { label: 'Antes (O trabalho manual)', value: 'Controle disperso em recibos de papel, planilhas e boletos soltos. Tempo gasto checando manualmente água, energia, IPTU e conferindo se houve pagamento.' },
      { label: 'O que foi criado', value: 'Plataforma para monitorar cada imóvel, automatizar alertas de contas de água, energia, IPTU e unificar contratos e comprovantes em um só lugar.' },
      { label: 'O que mudou na rotina', value: 'Visão clara da rentabilidade do patrimônio em tempo real, zero contas atrasadas por esquecimento e fim da checagem manual rotineira.' },
    ],
    architecture: {
      nodes: [
        { id: 'client', label: 'Painel Patrimonial', type: 'client' },
        { id: 'contracts', label: 'Gestor de Contratos', type: 'service' },
        { id: 'utilities', label: 'Monitor de Contas & IPTU', type: 'service' },
        { id: 'db', label: 'Acervo de Documentos', type: 'db' }
      ],
      edges: [
        { from: 'client', to: 'contracts', label: 'Gerencia locações e recibos' },
        { from: 'contracts', to: 'utilities', label: 'Rastreia contas e vencimentos' },
        { from: 'utilities', to: 'db', label: 'Armazena comprovantes' },
        { from: 'db', to: 'client', label: 'Relatórios de rentabilidade e alertas' }
      ]
    }
  },
  {
    id: 'gestao-curadoria',
    number: '04',
    name: 'SISTEMA DE GESTÃO PARA CURADORIA',
    painHeadline: 'Calcular comissões, devoluções e repasses de parceiras não deveria exigir dias fechando contas na ponta do lápis.',
    category: 'Fluxo Comercial // Repasses e Comissões',
    description: 'Sistema desenvolvido para controlar toda a operação de uma empresa de curadoria e revenda de peças. Centraliza clientes, parceiras, produtos, prazos, reservas, vendas, devoluções, contratos, comissões e repasses.',
    result: 'Automação total de cálculos de comissões, repasses e ciclo de vida de cada peça consignada ou vendida, eliminando o fechamento manual e retrabalhos.',
    technologies: ['Rastreamento de Peças', 'Cálculo de Repasses', 'Gestão de Consignações', 'Fluxo de Vendas'],
    youtubeId: '1yzdRgtTRe4',
    videoUrl: 'https://www.youtube.com/watch?v=1yzdRgtTRe4',
    specs: [
      { label: 'Antes (O trabalho manual)', value: 'Cálculo manual e complexo de comissões e repasses para diversas parceiras, controle confuso de peças reservadas ou devolvidas gerando retrabalho no fechamento.' },
      { label: 'O que foi criado', value: 'Fluxo automatizado que registra o ciclo de vida completo de cada peça e calcula automaticamente repasses, prazos e comissões de cada venda.' },
      { label: 'O que mudou na rotina', value: 'Fim dos cálculos manuais na ponta do lápis, transparência imediata nos acertos com parceiras e relatórios financeiros instantâneos.' },
    ],
    architecture: {
      nodes: [
        { id: 'client', label: 'Painel da Curadoria', type: 'client' },
        { id: 'inventory', label: 'Controle de Peças', type: 'service' },
        { id: 'commissions', label: 'Calculadora de Repasses', type: 'service' },
        { id: 'sales', label: 'Registro de Vendas', type: 'db' }
      ],
      edges: [
        { from: 'client', to: 'inventory', label: 'Entrada e consignação de peças' },
        { from: 'inventory', to: 'sales', label: 'Registra reservas e vendas' },
        { from: 'sales', to: 'commissions', label: 'Calcula repasses e comissões' },
        { from: 'commissions', to: 'client', label: 'Extratos e relatórios automáticos' }
      ]
    }
  }
];

export const services: Service[] = [
  {
    number: '01',
    title: 'ONDE SEU TEMPO ESTÁ INDO',
    description: 'Encontramos onde as horas da sua equipe estão escapando todos os dias: controles paralelos, conferências manuais e tarefas repetitivas que travam o dia a dia.',
    details: [
      'Identificação de etapas manuais que poderiam acontecer em segundos',
      'Diagnóstico de informações presas em planilhas ou conversas soltas',
      'Separação entre o que exige julgamento humano e o que pode rodar sozinho',
    ],
    deliverables: ['Identificação de Gargalos', 'Horas Perdidas Mapeadas', 'Plano Prático de Ação', 'Foco no Ganho de Tempo'],
  },
  {
    number: '02',
    title: 'ELIMINAÇÃO DE TRABALHO MANUAL',
    description: 'Construímos fluxos e integrações para que tarefas repetitivas aconteçam automaticamente. Informações passam de uma ponta a outra sem ninguém copiando e colando.',
    details: [
      'Cruzamento automático de documentos, notas fiscais, pedidos e relatórios',
      'Envio automático de alertas e lembretes para evitar atrasos e esquecimentos',
      'Geração instantânea de contratos, recibos ou relatórios com um clique',
    ],
    deliverables: ['Automações Sob Medida', 'Cruzamento em Segundos', 'Alertas Automáticos', 'Fim do Retrabalho'],
  },
  {
    number: '03',
    title: 'SISTEMAS INTERNOS SOB MEDIDA',
    description: 'Quando ferramentas prontas do mercado são complexas demais ou não atendem ao seu jeito de trabalhar, desenvolvemos telas simples e feitas exatamente para a sua rotina.',
    details: [
      'Telas diretas ao ponto que qualquer pessoa aprende a usar em minutos',
      'Centralização completa para aposentar planilhas soltas e anotações perdidas',
      'Acesso rápido por computador ou celular para acompanhar o andamento de qualquer lugar',
    ],
    deliverables: ['Painel Exclusivo da Operação', 'Controle Prático de Acessos', 'Uso Simples Sem Treinamento Longo', 'Suporte Próximo'],
  },
  {
    number: '04',
    title: 'INTELIGÊNCIA APLICADA NA PRÁTICA',
    description: 'Aplicamos modelos inteligentes exclusivamente onde eles geram ganho real de tempo, como leitura de documentos, extração de dados e triagem de solicitações.',
    details: [
      'Interpretação e extração automática de dados de PDFs, imagens e contratos',
      'Triagem rápida de mensagens para priorizar o que é mais importante',
      'Organização de informações para você decidir sem perder horas lendo arquivos',
    ],
    deliverables: ['Leitura e Extração Automática', 'Assistentes Práticos no Painel', 'Segurança e Sigilo', 'Tecnologia com Propósito Real'],
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Conversar sobre a rotina',
    description: 'Você me mostra o que está dando trabalho no dia a dia. Você não precisa saber termos técnicos nem qual sistema quer — apenas me conta onde o trabalho está consumindo tempo demais.',
    technicalGoal: 'Entender a rotina real e onde as horas estão se perdendo.',
    artifact: 'Identificação das Tarefas Problemáticas',
  },
  {
    number: '02',
    title: 'Encontrar o tempo perdido',
    description: 'Mapeamos onde as horas estão escapando: tarefas manuais, controles paralelos em planilhas, transferências de dados entre telas e checagens que poderiam rodar automaticamente.',
    technicalGoal: 'Separar o trabalho de valor daquele que é puro esforço repetitivo.',
    artifact: 'Diagnóstico das Horas a Recuperar',
  },
  {
    number: '03',
    title: 'Desenhar o caminho mais simples',
    description: 'Desenhamos a solução mais direta e mostramos o fluxo antes de construir. Garantimos que a ferramenta seja amigável, direta ao ponto e fácil para qualquer pessoa usar.',
    technicalGoal: 'Garantir que a rotina fique leve e sem complicação.',
    artifact: 'Fluxo Simples Aprovado',
  },
  {
    number: '04',
    title: 'Construir a tecnologia certa',
    description: 'Construímos o sistema, automação ou integração cuidando de toda a engenharia nos bastidores. A complexidade técnica fica invisível; na sua tela, você só vê o resultado acontecer.',
    technicalGoal: 'Entregar uma ferramenta sólida, rápida e segura.',
    artifact: 'Solução Pronta e Testada',
  },
  {
    number: '05',
    title: 'Horas de volta na sua agenda',
    description: 'Colocamos a solução para rodar junto com a sua equipe e acompanhamos os primeiros dias para assegurar que as horas prometidas voltem de fato para a sua rotina diária.',
    technicalGoal: 'Garantir que o ganho de tempo seja real e permanente na operação.',
    artifact: 'Tempo Recuperado na Prática',
  },
];

export const principles: Principle[] = [
  {
    statement: 'A tecnologia é o meio. O produto é o tempo recuperado.',
    explanation: 'Não criamos sistemas para impressionar com jargões técnicos. O único indicador de sucesso de um projeto é quantas horas desnecessárias ele eliminou da sua rotina.',
  },
  {
    statement: 'Se for difícil de usar, rouba tempo em vez de economizar.',
    explanation: 'Boa tecnologia deve ser autoexplicativa. Se você ou sua equipe precisarem de manuais densos ou treinamentos longos para operar uma tela, o design falhou.',
  },
  {
    statement: 'A ferramenta se adapta à sua empresa, não o contrário.',
    explanation: 'Sua empresa tem formas de trabalhar que já funcionam. Em vez de forçar sua equipe a caber em softwares genéricos, construímos a solução sob medida para o seu fluxo.',
  },
  {
    statement: 'A complexidade técnica fica invisível nos bastidores.',
    explanation: 'Cuidamos de integrações, conexões e segurança por trás das cortinas. Na sua tela, tudo o que você vê é um painel limpo, rápido e focado no essencial.',
  },
  {
    statement: 'Sucesso é você nunca mais precisar fazer aquela tarefa manual.',
    explanation: 'O projeto só está concluído quando você e sua equipe sentem o alívio na rotina: menos retrabalho, menos conferência manual e mais tempo livre para fazer o negócio crescer.',
  },
];

export const contactInfo = {
  email: 'eu@lucasprestes.com',
  linkedin: 'https://linkedin.com/in/lucasprestes',
  instagram: 'https://www.instagram.com/lucascprestes/',
  whatsapp: 'https://wa.me/5515998300680',
};
