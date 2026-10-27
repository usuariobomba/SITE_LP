// Faixas de tempo e a conta devolvida ao lead. Usado no navegador e no servidor.
export interface FaixaHoras {
  id: string;
  label: string;
  min: number | null;
  max: number | null;
}

export const FAIXAS_HORAS: FaixaHoras[] = [
  { id: 'ate2', label: 'Até 2 horas', min: 0, max: 2 },
  { id: '2a5', label: 'De 2 a 5 horas', min: 2, max: 5 },
  { id: '5a10', label: 'De 5 a 10 horas', min: 5, max: 10 },
  { id: '10a20', label: 'De 10 a 20 horas', min: 10, max: 20 },
  { id: 'mais20', label: 'Mais de 20 horas', min: 20, max: null },
  { id: 'nao_sei', label: 'Não sei dizer', min: null, max: null },
];

const SEMANAS_POR_MES = 4.3;
const HORAS_POR_DIA_UTIL = 8;

export interface ContaHoras {
  texto: string;
  horasMesMin: number;
  diasAnoMin: number;
}

// Conta simples com o número que o próprio lead informou. Usa o limite inferior da faixa (o mais conservador).
export function calcularConta(faixaId: string): ContaHoras | null {
  const faixa = FAIXAS_HORAS.find((f) => f.id === faixaId);
  if (!faixa || faixa.min === null) return null;
  const minMes = Math.round(faixa.min * SEMANAS_POR_MES);
  const maxMes = faixa.max === null ? null : Math.round(faixa.max * SEMANAS_POR_MES);
  const diasAnoMin = Math.round((faixa.min * SEMANAS_POR_MES * 12) / HORAS_POR_DIA_UTIL);
  const mes =
    maxMes === null
      ? `mais de ${minMes} horas por mês`
      : minMes === 0
        ? `até ${maxMes} horas por mês`
        : `entre ${minMes} e ${maxMes} horas por mês`;
  const ano = diasAnoMin >= 1 ? ` Só no mínimo dessa faixa, são cerca de ${diasAnoMin} dias úteis de trabalho por ano.` : '';
  return { texto: `Isso dá ${mes}.${ano}`, horasMesMin: minMes, diasAnoMin };
}
