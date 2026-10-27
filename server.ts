import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import crypto from 'crypto';

const CHICO_PATHS = new Set(['/chico', '/chico/privacidade', '/chico/termos']);
let cachedRenderChicoRoute: ((routePath: string) => { html: string; meta: { title: string; description: string; canonical: string } } | null) | null = null;

async function getRenderChicoRoute() {
  if (!cachedRenderChicoRoute) {
    const mod = await import('./src/prerender/renderPages');
    cachedRenderChicoRoute = mod.renderChicoRoute;
  }
  return cachedRenderChicoRoute;
}

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));

// In-Memory storage for created diagnoses (persisted during container session)
interface StoredTimeDiagnosis {
  id: string;
  createdAt: string;
  data: {
    timeSinks: string[];
    frictionCauses: string[];
    frequency: string;
    impact: string;
    desiredRelief: string;
    deepeningQuestion?: string;
    deepeningAnswer?: string;
  };
  timeSpentArea: string;
  rootCause: string;
  whatCanBeDone: string;
  categorySummary: string;
}

const diagnosisStore = new Map<string, StoredTimeDiagnosis>();

// Simple IP-based rate limiting helper
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const checkRateLimit = (ip: string, limit = 60, windowMs = 60000): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= limit) {
    return false;
  }
  record.count += 1;
  return true;
};

// Lazy initialization of GoogleGenAI SDK
let genAIClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not configured');
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

function generateShortId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = 'TEMPO-';
  const bytes = crypto.randomBytes(3);
  for (let i = 0; i < 3; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

// Fallback deterministic synthesis when Gemini is unavailable or rate-limited
function generateFallbackSynthesis(data: {
  timeSinks: string[];
  frictionCauses: string[];
  frequency: string;
  impact: string;
  desiredRelief: string;
  deepeningAnswer?: string;
}) {
  const sinksStr = data.timeSinks.join(', ') || 'atividades operacionais';
  const frictionStr = data.frictionCauses.join(', ') || 'etapas manuais';
  const relief = data.desiredRelief ? data.desiredRelief.trim() : '';
  const deepening = data.deepeningAnswer ? data.deepeningAnswer.trim() : '';

  let timeSpentArea = '';
  if (relief) {
    timeSpentArea = `Você dedica tempo significativo da operação com ${relief.toLowerCase().startsWith('com') ? relief.slice(3).trim() : relief}, principalmente em tarefas de ${sinksStr.toLowerCase()}.`;
  } else {
    timeSpentArea = `Você parece gastar uma parte relevante da rotina com ${sinksStr.toLowerCase()}, gerando esforço contínuo na equipe.`;
  }

  let rootCause = `O atrito ocorre porque ${frictionStr.toLowerCase()}${data.frequency ? `, acontecendo ${data.frequency.toLowerCase()}` : ''}${data.impact ? ` e demandando ${data.impact.toLowerCase()}` : ''}.`;
  if (deepening) {
    rootCause += ` Além disso, ${deepening}.`;
  }

  const whatCanBeDone = `Esse tipo de trabalho pode eventualmente ser reduzido com uma mudança de processo, automação ou uma ferramenta específica. A melhor alternativa depende de como essa rotina funciona hoje na prática.`;

  const categorySummary = relief.slice(0, 60) || sinksStr.slice(0, 60);

  return {
    timeSpentArea,
    rootCause,
    whatCanBeDone,
    categorySummary,
  };
}

// =========================================================================
// API ROUTES
// =========================================================================

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Retrieve previously generated diagnosis by ID
app.get('/api/diagnosis/:id', (req: Request, res: Response) => {
  const id = req.params.id?.toUpperCase();
  const diagnosis = diagnosisStore.get(id);
  if (!diagnosis) {
    return res.status(404).json({ error: 'Diagnóstico não encontrado' });
  }
  res.json({ success: true, diagnosis });
});

// Analyze Diagnóstico de Tempo (Evaluates if follow-up is needed OR finalizes)
app.post('/api/diagnosis/analyze', async (req: Request, res: Response) => {
  try {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        error: 'Muitas requisições. Aguarde alguns instantes antes de tentar novamente.',
      });
    }

    const {
      timeSinks = [],
      frictionCauses = [],
      frequency = '',
      impact = '',
      desiredRelief = '',
      deepeningQuestion = '',
      deepeningAnswer = '',
      isFinalStep = false,
    } = req.body;

    const sanitizedData = {
      timeSinks: (Array.isArray(timeSinks) ? timeSinks : []).map((s) => String(s).slice(0, 100)),
      frictionCauses: (Array.isArray(frictionCauses) ? frictionCauses : []).map((s) => String(s).slice(0, 100)),
      frequency: String(frequency || '').slice(0, 100),
      impact: String(impact || '').slice(0, 100),
      desiredRelief: String(desiredRelief || '').slice(0, 500),
      deepeningQuestion: String(deepeningQuestion || '').slice(0, 300),
      deepeningAnswer: String(deepeningAnswer || '').slice(0, 500),
    };

    // If already at final step (or answered follow-up question), we MUST finalize
    const mustFinalize = isFinalStep || !!sanitizedData.deepeningAnswer || sanitizedData.desiredRelief.length > 30;

    let ai: GoogleGenAI | null = null;
    try {
      ai = getGemini();
    } catch {
      ai = null;
    }

    if (!ai) {
      // Deterministic fallback when AI is unavailable
      if (mustFinalize) {
        const synth = generateFallbackSynthesis(sanitizedData);
        const diagId = generateShortId();
        const stored: StoredTimeDiagnosis = {
          id: diagId,
          createdAt: new Date().toISOString(),
          data: sanitizedData,
          ...synth,
        };
        diagnosisStore.set(diagId, stored);
        return res.json({
          isComplete: true,
          diagnosticId: diagId,
          ...synth,
        });
      }

      // If text is empty and not final step, generate 1 simple deepening question
      return res.json({
        isComplete: false,
        deepeningQuestion: 'Hoje, o que você costuma fazer para tentar contornar essa demora?',
        suggestedOptions: ['Faço tudo manualmente', 'Cobro as pessoas envolvidas', 'Deixo acumular para fazer de uma vez'],
      });
    }

    // AI-powered analysis
    const systemInstruction = `Você é o Analista do "Diagnóstico de Tempo" do especialista Lucas Prestes.

PROPOSTA DE VALOR:
O produto oferecido é TEMPO ("Eu devolvo seu tempo"). A tecnologia é secundária.
NUNCA tente vender soluções previamente conhecidas (automação, IA, software, ERP, WhatsApp, chatbot).
NUNCA invente números de ROI, volume, economia em dinheiro ou sistemas não informados.
Diferencie rigorosamente o FATO (o que o usuário respondeu) da HIPÓTESE.

SEU PAPEL:
1. Avaliar as respostas acumuladas sobre o desperdício de tempo:
   - Em que perde tempo: ${sanitizedData.timeSinks.join(', ') || 'Não especificado'}
   - O que torna demorado: ${sanitizedData.frictionCauses.join(', ') || 'Não especificado'}
   - Frequência: ${sanitizedData.frequency || 'Não especificado'}
   - Dimensão do trabalho: ${sanitizedData.impact || 'Não especificado'}
   - O que gostaria de deixar de fazer: "${sanitizedData.desiredRelief || 'Não preenchido'}"
   ${sanitizedData.deepeningAnswer ? `- Resposta de aprofundamento: "${sanitizedData.deepeningAnswer}"` : ''}

2. DECISÃO DE COMPLETUDE:
   - Se 'mustFinalize' for true OU se o usuário já forneceu contexto suficiente sobre o problema real (por exemplo, explicou no texto livre ou nos atritos):
     Retorne 'isComplete: true' e construa o parecer final.
   - Se ainda for muito vago e for a PRIMEIRA avaliação pós-etapa 5 (sem aprofundamento prévio):
     Retorne 'isComplete: false' e formule UMA ÚNICA pergunta curta, empática e direta para entender a rotina concreta (ex: "Hoje, onde essas informações costumam ficar guardadas?" ou "Quando essa tarefa acontece, quem mais precisa participar?").

3. ESTRUTURA DO RESULTADO (quando isComplete: true):
   - timeSpentArea: "ONDE O TEMPO ESTÁ SENDO GASTO" (Descrição concreta e direta do trabalho desnecessário, baseada exclusivamente no que o usuário respondeu).
   - rootCause: "O QUE ESTÁ POR TRÁS DISSO" (Explicação curta da causa do atrito: etapas manuais, conferência de dados dispersos, dependência de terceiros, repetição, etc.).
   - whatCanBeDone: "O QUE PODE SER FEITO" (Texto objetivo e pragmático: "Esse tipo de trabalho pode eventualmente ser reduzido com uma mudança de processo, automação ou uma ferramenta específica. A melhor alternativa depende de como essa rotina funciona hoje.").
   - categorySummary: Resumo de 3 a 6 palavras do problema para mensagem de WhatsApp.`;

    const prompt = `Analise as informações do usuário e determine se o diagnóstico está completo ou se necessita de uma única pergunta de aprofundamento.
mustFinalize = ${mustFinalize}

Dados do usuário:
- Tarefas onde perde tempo: ${sanitizedData.timeSinks.join(', ')}
- Motivo da demora: ${sanitizedData.frictionCauses.join(', ')}
- Frequência: ${sanitizedData.frequency}
- Dimensão: ${sanitizedData.impact}
- O que gostaria de deixar de fazer: "${sanitizedData.desiredRelief}"
${sanitizedData.deepeningAnswer ? `- Resposta extra: "${sanitizedData.deepeningAnswer}"` : ''}`;

    const modelsToTry = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-3.7-flash'];
    let parsed: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.2,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                isComplete: {
                  type: Type.BOOLEAN,
                  description: 'True se já há dados suficientes para concluir o diagnóstico.',
                },
                deepeningQuestion: {
                  type: Type.STRING,
                  description: 'Pergunta curta caso isComplete seja false.',
                },
                suggestedOptions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Opções curtas opcionais para responder a pergunta.',
                },
                timeSpentArea: {
                  type: Type.STRING,
                  description: 'Onde o tempo está sendo gasto (descrição concreta).',
                },
                rootCause: {
                  type: Type.STRING,
                  description: 'O que está por trás disso (causa identificada).',
                },
                whatCanBeDone: {
                  type: Type.STRING,
                  description: 'O que pode ser feito (texto pragmático).',
                },
                categorySummary: {
                  type: Type.STRING,
                  description: 'Resumo em poucas palavras para WhatsApp.',
                },
              },
              required: ['isComplete'],
            },
          },
        });

        const rawText = response?.text;
        if (rawText) {
          parsed = JSON.parse(rawText);
          break;
        }
      } catch (err: any) {
        console.warn(`Tentativa com ${modelName} falhou:`, err?.status || err?.message || 'erro');
      }
    }

    if (!parsed) {
      const synth = generateFallbackSynthesis(sanitizedData);
      const diagId = generateShortId();
      const stored: StoredTimeDiagnosis = {
        id: diagId,
        createdAt: new Date().toISOString(),
        data: sanitizedData,
        ...synth,
      };
      diagnosisStore.set(diagId, stored);
      return res.json({
        isComplete: true,
        diagnosticId: diagId,
        ...synth,
      });
    }

    if (parsed.isComplete || mustFinalize) {
      const diagId = generateShortId();
      const synth = {
        timeSpentArea: parsed.timeSpentArea || generateFallbackSynthesis(sanitizedData).timeSpentArea,
        rootCause: parsed.rootCause || generateFallbackSynthesis(sanitizedData).rootCause,
        whatCanBeDone: parsed.whatCanBeDone || 'Esse tipo de trabalho pode eventualmente ser reduzido com uma mudança de processo, automação ou uma ferramenta específica. A melhor alternativa depende de como essa rotina funciona hoje.',
        categorySummary: parsed.categorySummary || sanitizedData.desiredRelief.slice(0, 50) || sanitizedData.timeSinks[0] || 'rotina operacional',
      };

      const stored: StoredTimeDiagnosis = {
        id: diagId,
        createdAt: new Date().toISOString(),
        data: sanitizedData,
        ...synth,
      };
      diagnosisStore.set(diagId, stored);

      return res.json({
        isComplete: true,
        diagnosticId: diagId,
        ...synth,
      });
    }

    return res.json({
      isComplete: false,
      deepeningQuestion: parsed.deepeningQuestion || 'Hoje, onde essa etapa costuma travar mais?',
      suggestedOptions: Array.isArray(parsed.suggestedOptions) ? parsed.suggestedOptions : [],
    });
  } catch (error: any) {
    console.error('Erro na rota /api/diagnosis/analyze:', error);
    return res.status(500).json({
      error: 'Ocorreu um erro ao processar o diagnóstico. Tente novamente.',
      details: error?.message || 'Erro interno',
    });
  }
});

// =========================================================================
// CHICO PRE-RENDERED PAGES HELPER & SERVER STARTUP
// =========================================================================
async function renderChicoHtml(template: string, urlPath: string): Promise<string | null> {
  const normalized = urlPath.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  if (!CHICO_PATHS.has(normalized)) return null;

  const renderChicoRoute = await getRenderChicoRoute();
  const result = renderChicoRoute(normalized);
  if (!result) return null;

  let pageHtml = template;
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${result.meta.title}</title>`);
  if (pageHtml.includes('name="description"')) {
    pageHtml = pageHtml.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${result.meta.description}" />`
    );
  }
  const canonicalTag = `<link rel="canonical" href="${result.meta.canonical}" />`;
  if (!pageHtml.includes('rel="canonical"')) {
    pageHtml = pageHtml.replace('</head>', `  ${canonicalTag}\n  </head>`);
  } else {
    pageHtml = pageHtml.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, canonicalTag);
  }
  pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${result.html}</div>`);
  return pageHtml;
}

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    // Serve pre-rendered HTML for Chico routes in dev
    app.use(async (req: Request, res: Response, next) => {
      const cleanPath = req.path.replace(/\/+$/, '') || '/';
      if (CHICO_PATHS.has(cleanPath)) {
        try {
          const indexRaw = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
          const transformed = await vite.transformIndexHtml(req.originalUrl, indexRaw);
          const fullHtml = await renderChicoHtml(transformed, cleanPath);
          if (fullHtml) {
            return res.status(200).set({ 'Content-Type': 'text/html' }).end(fullHtml);
          }
        } catch (e: any) {
          vite.ssrFixStacktrace(e);
          console.error('Error rendering Chico page:', e);
        }
      }
      next();
    });

    app.use(vite.middlewares);

    // SPA fallback in development
    app.use('*', async (req: Request, res: Response, next) => {
      try {
        const url = req.originalUrl;
        let template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');

    // Serve pre-rendered or SSR HTML for Chico routes in production
    app.get(['/chico', '/chico/privacidade', '/chico/termos', '/chico/', '/chico/privacidade/', '/chico/termos/'], async (req: Request, res: Response) => {
      const cleanPath = req.path.replace(/\/+$/, '') || '/';
      const staticFile = path.join(distPath, cleanPath.replace(/^\//, ''), 'index.html');
      if (fs.existsSync(staticFile)) {
        return res.sendFile(staticFile);
      }
      const directHtml = path.join(distPath, `${cleanPath.replace(/^\//, '')}.html`);
      if (fs.existsSync(directHtml)) {
        return res.sendFile(directHtml);
      }
      try {
        const template = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
        const rendered = await renderChicoHtml(template, cleanPath);
        if (rendered) {
          return res.status(200).set({ 'Content-Type': 'text/html' }).end(rendered);
        }
      } catch (err) {
        console.error('Error in fallback SSR:', err);
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });

    app.use(express.static(distPath));

    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    setTimeout(() => {
      getRenderChicoRoute().catch(() => {});
    }, 500);
  });
}

startServer();
