import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterProvider } from '../lib/router';
import Header from '../components/Header';
import ChicoHome from '../pages/ChicoHome';
import ChicoPrivacidade from '../pages/ChicoPrivacidade';
import ChicoTermos from '../pages/ChicoTermos';

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

export const CHICO_ROUTES: Record<string, {
  component: React.ComponentType;
  meta: PageMeta;
}> = {
  '/chico': {
    component: ChicoHome,
    meta: {
      title: 'Chico | Gerente Virtual de IA para Pequenas Empresas',
      description: 'Gerente virtual de IA para pequenas empresas que analisa dados operacionais e auxilia na tomada de decisão com aprovação prévia obrigatória do dono.',
      canonical: 'https://lucasprestes.com/chico',
    },
  },
  '/chico/privacidade': {
    component: ChicoPrivacidade,
    meta: {
      title: 'Política de Privacidade | Chico (Lucas Prestes)',
      description: 'Política de privacidade do Chico detalhando o escopo gmail.send do Google, conformidade com a LGPD e regras de Uso Limitado.',
      canonical: 'https://lucasprestes.com/chico/privacidade',
    },
  },
  '/chico/termos': {
    component: ChicoTermos,
    meta: {
      title: 'Termos de Uso | Chico (Lucas Prestes)',
      description: 'Termos de uso do Chico regulando responsabilidades, integração com o Google OAuth e revisão de envios.',
      canonical: 'https://lucasprestes.com/chico/termos',
    },
  },
};

export function renderChicoRoute(routePath: string): { html: string; meta: PageMeta } | null {
  const normalized = routePath.replace(/\/+$/, '') || '/';
  const route = CHICO_ROUTES[normalized];
  if (!route) return null;

  const Component = route.component;
  const content = renderToString(
    <RouterProvider initialPath={normalized}>
      <Header />
      <Component />
    </RouterProvider>
  );

  return { html: content, meta: route.meta };
}
