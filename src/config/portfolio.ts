export interface PortfolioConfig {
  name: string;
  role: string;
  email: string;
  linkedin: string;
  instagram: string;
  whatsapp?: string;
  location?: string;
  availability: string;
  description: string;
}

export const portfolioConfig: PortfolioConfig = {
  name: 'Lucas Prestes',
  role: 'Tecnologia Sob Medida // Recuperação de Tempo',
  email: 'eu@lucasprestes.com',
  linkedin: 'https://linkedin.com/in/lucasprestes',
  instagram: 'https://www.instagram.com/lucascprestes/',
  whatsapp: 'https://wa.me/5515998300680',
  location: 'São Paulo, Brasil',
  availability: 'Disponível para diagnóstico de tempo e projetos sob medida',
  description: 'Lucas encontra tarefas que consomem horas desnecessariamente e constrói tecnologia sob medida para devolver tempo para a sua operação.'
};
